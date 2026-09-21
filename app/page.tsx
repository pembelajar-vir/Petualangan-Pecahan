'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import {
  Volume2,
  VolumeX,
  Trophy,
  Play,
  BookOpen,
  Award,
  Sparkles,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  FileDown,
  Flame,
  GraduationCap,
  Star,
  Home,
  Layers,
  ChevronRight,
  HelpCircle,
  Clock,
  Compass,
  Swords,
  Smartphone,
  Maximize,
  Minimize,
} from 'lucide-react';
import { QUESTIONS, LEVEL_INFO, Question } from '../data/questions';
import { FractionDisplay, FractionBarVisual } from '../components/FractionDisplay';
import { sound } from '../lib/sound';
import { fireConfetti } from '../lib/confetti';
import { LearningObjectivesModal } from '../components/LearningObjectivesModal';
import { DeveloperModal } from '../components/DeveloperModal';
import { QuestionBankModal } from '../components/QuestionBankModal';
import { LeaderboardModal, LeaderboardEntry } from '../components/LeaderboardModal';
import { StudentProfileCard } from '../components/StudentProfileCard';
import { MaterialSummary } from '../components/MaterialSummary';
import { downloadStandaloneHtml } from '../components/SingleFileExport';
import { DeviceViewportControl, DeviceMode } from '../components/DeviceViewportControl';
import { BattleDuelArena } from '../components/BattleDuelArena';

function useClientStorage<T>(
  key: string,
  parse: (val: string | null) => T,
  serverFallback: T
): [T, (val: T) => void] {
  const [override, setOverride] = useState<T | null>(null);

  const snapshot = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      return () => window.removeEventListener('storage', onStoreChange);
    },
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null
  );

  const value = override !== null ? override : (snapshot !== null ? parse(snapshot) : serverFallback);

  const update = (newVal: T) => {
    setOverride(newVal);
    try {
      localStorage.setItem(key, String(newVal));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  return [value, update];
}

export default function MathFractionApp() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<'home' | 'material' | 'quiz' | 'result' | 'battle'>('home');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');

  // Modals
  const [showObjectivesModal, setShowObjectivesModal] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  // Student Profile with SSR-safe hydration
  const [studentName, setStudentName] = useClientStorage<string>(
    'math_student_name',
    (val) => val || '',
    ''
  );
  const [studentAvatar, setStudentAvatar] = useClientStorage<string>(
    'math_student_avatar',
    (val) => val || '🦊',
    '🦊'
  );

  // Audio State with SSR-safe hydration
  const [isMuted, setIsMuted] = useClientStorage<boolean>(
    'math_quiz_muted',
    (val) => val === 'true',
    false
  );

  // Quiz State
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<
    { question: Question; chosenIndex: number; isCorrect: boolean }[]
  >([]);

  // Timer
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // High score tracking with SSR-safe hydration
  const [highestScore, setHighestScore] = useClientStorage<number>(
    'math_highest_score',
    (val) => (val ? parseInt(val, 10) || 0 : 0),
    0
  );

  // Fullscreen State & Auto-Fullscreen Detection
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showFullscreenNotice, setShowFullscreenNotice] = useState<boolean>(false);

  // Automatic fullscreen when website loads completely & fallback on first gesture
  useEffect(() => {
    const updateFsState = () => {
      const doc = document as any;
      const active = Boolean(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(active);
      if (active) {
        setShowFullscreenNotice(false);
      }
    };

    document.addEventListener('fullscreenchange', updateFsState);
    document.addEventListener('webkitfullscreenchange', updateFsState);
    document.addEventListener('mozfullscreenchange', updateFsState);
    document.addEventListener('MSFullscreenChange', updateFsState);

    // Initial state check
    updateFsState();

    const attemptFullscreen = async () => {
      try {
        const doc = document as any;
        const docEl = document.documentElement as any;
        const alreadyFs = Boolean(
          doc.fullscreenElement ||
          doc.webkitFullscreenElement ||
          doc.mozFullScreenElement ||
          doc.msFullscreenElement
        );

        if (!alreadyFs) {
          if (docEl.requestFullscreen) {
            await docEl.requestFullscreen();
          } else if (docEl.webkitRequestFullscreen) {
            await docEl.webkitRequestFullscreen();
          } else if (docEl.mozRequestFullScreen) {
            await docEl.mozRequestFullScreen();
          } else if (docEl.msRequestFullscreen) {
            await docEl.msRequestFullscreen();
          }
        }
      } catch {
        // Modern browser required transient user interaction before granting fullscreen
        setShowFullscreenNotice(true);
      }
    };

    // 1. Attempt immediately if page ready or on window load
    if (document.readyState === 'complete') {
      attemptFullscreen();
    } else {
      window.addEventListener('load', attemptFullscreen, { once: true });
    }

    // 2. Also register one-time gesture listeners to seamlessly trigger fullscreen on first interaction
    const handleFirstGesture = () => {
      attemptFullscreen();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true, passive: true });

    return () => {
      document.removeEventListener('fullscreenchange', updateFsState);
      document.removeEventListener('webkitfullscreenchange', updateFsState);
      document.removeEventListener('mozfullscreenchange', updateFsState);
      document.removeEventListener('MSFullscreenChange', updateFsState);
      window.removeEventListener('load', attemptFullscreen);
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    sound.playClick();
    const doc = document as any;
    const docEl = document.documentElement as any;
    try {
      const active = Boolean(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (active) {
        if (doc.exitFullscreen) await doc.exitFullscreen();
        else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
        else if (doc.mozCancelFullScreen) await doc.mozCancelFullScreen();
        else if (doc.msExitFullscreen) await doc.msExitFullscreen();
      } else {
        if (docEl.requestFullscreen) await docEl.requestFullscreen();
        else if (docEl.webkitRequestFullscreen) await docEl.webkitRequestFullscreen();
        else if (docEl.mozRequestFullScreen) await docEl.mozRequestFullScreen();
        else if (docEl.msRequestFullscreen) await docEl.msRequestFullscreen();
      }
    } catch (err) {
      console.debug('Fullscreen toggle:', err);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) sound.playClick();
  };

  const handleSaveDuelScore = (name: string, avatar: string, duelScore: number, accuracy: number) => {
    try {
      const raw = localStorage.getItem('math_leaderboard_data');
      let currentData: LeaderboardEntry[] = [];
      if (raw) {
        currentData = JSON.parse(raw);
      }
      const newEntry: LeaderboardEntry = {
        id: `duel-${Date.now()}`,
        name: name || 'Pahlawan Duel',
        avatar: avatar || '🦊',
        score: duelScore,
        accuracy: accuracy,
        level: 'Juara Duel ⚔️',
        badge: 'Master Duel 🏆',
        date: 'Hari Ini',
        isCurrentUser: true,
      };
      const updated = [newEntry, ...currentData].sort((a, b) => b.score - a.score);
      localStorage.setItem('math_leaderboard_data', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      if (duelScore > highestScore) {
        setHighestScore(duelScore);
      }
    } catch {}
  };

  // Start Level Game
  const handleStartLevel = (levelNum: number) => {
    sound.playClick();
    setActiveLevel(levelNum);
    const questionsForLevel = QUESTIONS.filter((q) => q.level === levelNum);
    setQuizQuestions(questionsForLevel);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setShowHint(false);
    setUserAnswersHistory([]);
    setStartTime(Date.now());
    setElapsedSeconds(0);
    setCurrentView('quiz');
  };

  // Start All 100 Questions Marathon Mode
  const handleStartMarathon = () => {
    sound.playClick();
    setActiveLevel(0); // 0 signifies all 100
    setQuizQuestions([...QUESTIONS]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setShowHint(false);
    setUserAnswersHistory([]);
    setStartTime(Date.now());
    setElapsedSeconds(0);
    setCurrentView('quiz');
  };

  // Current Question
  const currentQ = quizQuestions[currentQuestionIndex];

  // Handle Option Click
  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.answerIndex;
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > maxStreak) setMaxStreak(newStreak);

    if (isCorrect) {
      sound.playCorrect();
      const pointsEarned = 10 + Math.min(newStreak * 2, 10);
      setScore((prev) => prev + pointsEarned);
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }

    setUserAnswersHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        chosenIndex: index,
        isCorrect,
      },
    ]);
  };

  // Next Question or Finish
  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Finished!
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      setElapsedSeconds(totalTime);
      setCurrentView('result');

      const finalAcc = Math.round((correctCount / quizQuestions.length) * 100);
      if (finalAcc >= 70) {
        sound.playWin();
        fireConfetti(3500);
      } else {
        sound.playLevelUp();
      }

      // Update High Score
      if (score > highestScore) {
        setHighestScore(score);
        if (typeof window !== 'undefined') {
          localStorage.setItem('math_highest_score', score.toString());
        }
      }

      // Record to Leaderboard
      try {
        const cleanName = (studentName || '').trim() || 'Petualang Cilik';
        const savedBoard = typeof window !== 'undefined' ? localStorage.getItem('math_leaderboard_data') : null;
        let currentBoard: LeaderboardEntry[] = savedBoard
          ? JSON.parse(savedBoard)
          : [
              { id: 'lead-1', name: 'Ahmad Fauzi', avatar: '🦊', score: 180, accuracy: 100, level: 'Master (1-10)', badge: 'Raja Pecahan 👑', date: 'Hari Ini' },
              { id: 'lead-2', name: 'Nabila Putri', avatar: '🦉', score: 165, accuracy: 95, level: 'Level 10', badge: 'Penjelajah Hebat ⭐', date: 'Hari Ini' },
              { id: 'lead-3', name: 'Rian Hidayat', avatar: '🦁', score: 150, accuracy: 90, level: 'Level 8', badge: 'Bintang Matematika 🌟', date: 'Kemarin' },
              { id: 'lead-4', name: 'Siti Rahmawati', avatar: '🐼', score: 140, accuracy: 88, level: 'Level 7', badge: 'Ksatria Pecahan 🛡️', date: 'Kemarin' },
              { id: 'lead-5', name: 'Budi Santoso', avatar: '🚀', score: 125, accuracy: 85, level: 'Level 6', badge: 'Penjelajah Cilik 🎯', date: '2 hari lalu' },
              { id: 'lead-6', name: 'Dewi Lestari', avatar: '🐬', score: 110, accuracy: 80, level: 'Level 5', badge: 'Pejuang Pecahan ⚡', date: '3 hari lalu' },
            ];

        const existingIdx = currentBoard.findIndex(
          (e) => e.isCurrentUser || e.name === cleanName
        );

        const newBadge =
          finalAcc === 100
            ? 'Raja Pecahan 👑'
            : finalAcc >= 80
            ? 'Master Pecahan ⭐'
            : finalAcc >= 60
            ? 'Penjelajah Tangguh 🛡️'
            : 'Petualang Cilik 🎯';

        const newEntry: LeaderboardEntry = {
          id: existingIdx >= 0 ? currentBoard[existingIdx].id : 'user-' + Date.now(),
          name: cleanName,
          avatar: studentAvatar || '🦊',
          score: existingIdx >= 0 ? Math.max(score, currentBoard[existingIdx].score) : score,
          accuracy: finalAcc,
          level: activeLevel === 0 ? 'Mode Maraton (100)' : `Level ${activeLevel}`,
          badge: newBadge,
          date: 'Baru saja',
          isCurrentUser: true,
        };

        if (existingIdx >= 0) {
          currentBoard[existingIdx] = newEntry;
        } else {
          currentBoard.push(newEntry);
        }

        currentBoard.sort((a, b) => b.score - a.score);
        if (typeof window !== 'undefined') {
          localStorage.setItem('math_leaderboard_data', JSON.stringify(currentBoard));
        }
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* ============================================================ */}
      {/* TOP NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & App Title */}
          <div
            onClick={() => {
              sound.playClick();
              setCurrentView('home');
            }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Friendly Mascot SVG Icon */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🦊</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                  Petualangan Pecahan
                </h1>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-200">
                  Kelas 6 SD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Mengidentifikasi & Merubah Berbagai Bentuk Pecahan
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              suppressHydrationWarning
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                isMuted
                  ? 'bg-slate-100 border-slate-200 text-slate-400'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-xs'
              }`}
              title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
              <span className="hidden md:inline" suppressHydrationWarning>{isMuted ? 'Mute' : 'Audio Aktif'}</span>
            </button>

            {/* Leaderboard Button */}
            <button
              onClick={() => {
                sound.playClick();
                setShowLeaderboardModal(true);
              }}
              className="p-2 sm:px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Papan Peringkat Juara Pecahan"
            >
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="hidden sm:inline">Peringkat</span>
            </button>

            {/* CP / TP Button */}
            <button
              onClick={() => {
                sound.playClick();
                setShowObjectivesModal(true);
              }}
              className="p-2 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5"
              title="Capaian & Tujuan Pembelajaran"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">CP & TP</span>
            </button>

            {/* Bank Soal Button */}
            <button
              onClick={() => {
                sound.playClick();
                setShowBankModal(true);
              }}
              className="p-2 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5"
              title="Bank 100 Soal"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">100 Soal</span>
            </button>

            {/* Duel Battle Button */}
            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('battle');
              }}
              className={`p-2 sm:px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                currentView === 'battle'
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md ring-2 ring-orange-400/30'
                  : 'bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200'
              }`}
              title="Arena Duel 2 Pemain & Lawan Bot"
            >
              <Swords className="w-4 h-4 text-orange-500" />
              <span className="hidden sm:inline">Duel Teman</span>
            </button>

            {/* Multi-Device Viewport Switcher */}
            <DeviceViewportControl
              deviceMode={deviceMode}
              onDeviceModeChange={setDeviceMode}
            />

            {/* Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              className={`p-2 sm:px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                isFullscreen
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200'
              }`}
              title={isFullscreen ? 'Keluar Layar Penuh (Esc)' : 'Masuk Mode Layar Penuh (F11)'}
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-4 h-4 text-emerald-600" />
                  <span className="hidden lg:inline">Layar Normal</span>
                </>
              ) : (
                <>
                  <Maximize className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Layar Penuh</span>
                </>
              )}
            </button>

            {/* Developer Button */}
            <button
              onClick={() => {
                sound.playClick();
                setShowDeveloperModal(true);
              }}
              className="p-2 sm:px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1.5"
              title="Profil Pengembang Robiyanto, S.Pd."
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">Guru Pengembang</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* AUTO FULLSCREEN NOTIFICATION BANNER */}
      {/* ============================================================ */}
      {!isFullscreen && showFullscreenNotice && (
        <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 text-white px-4 py-2 text-xs font-semibold flex flex-wrap items-center justify-between gap-2 shadow-md border-b border-indigo-700/50">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
            <span className="text-slate-100 text-[11px] sm:text-xs leading-tight">
              📺 <strong>Mode Layar Penuh Otomatis</strong>: Ketuk di mana saja pada layar atau klik tombol untuk tampilan belajar maksimal tanpa gangguan bilah browser!
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              onClick={handleToggleFullscreen}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 rounded-xl text-xs font-black shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Maximize className="w-3.5 h-3.5" />
              <span>Buka Layar Penuh</span>
            </button>
            <button
              onClick={() => setShowFullscreenNotice(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold px-2"
              title="Tutup Notifikasi"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MAIN VIEW CONTAINER (ADAPTIVE MULTI-DEVICE WRAPPER) */}
      {/* ============================================================ */}
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${
        deviceMode === 'mobile'
          ? 'max-w-md mx-auto my-4 shadow-2xl rounded-[38px] border-[10px] border-slate-900 bg-white overflow-hidden ring-8 ring-slate-300/40'
          : deviceMode === 'tablet'
          ? 'max-w-3xl mx-auto my-4 shadow-xl rounded-[28px] border-[6px] border-slate-800 bg-white overflow-hidden ring-6 ring-slate-300/30'
          : deviceMode === 'projector'
          ? 'max-w-7xl mx-auto text-lg'
          : 'w-full'
      }`}>
        {/* Simulated Phone Top Speaker & Status Bar */}
        {deviceMode === 'mobile' && (
          <div className="bg-slate-900 text-white text-[11px] px-6 py-2 flex items-center justify-between font-mono select-none">
            <span className="font-bold">09:41</span>
            <div className="w-20 h-3.5 bg-slate-950 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
            <span className="flex items-center gap-1 font-sans text-[10px] font-bold text-slate-300">
              <span>📶 5G</span>
              <span>100%</span>
            </span>
          </div>
        )}

        {/* Simulated Tablet Top Bar */}
        {deviceMode === 'tablet' && (
          <div className="bg-slate-800 text-white text-[11px] px-6 py-1.5 flex items-center justify-between font-mono select-none">
            <span className="font-bold text-amber-300">Tablet Sentuh Siswa</span>
            <div className="w-16 h-2 bg-slate-900 rounded-full" />
            <span className="text-[10px] text-slate-300">Mode Layar Sentuh Luas</span>
          </div>
        )}

        <main className="flex-1 max-w-6xl w-full mx-auto p-3.5 sm:p-6 flex flex-col pb-24 md:pb-8">
        {/* ======================================================== */}
        {/* VIEW 1: BERANDA / HOME */}
        {/* ======================================================== */}
        {currentView === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-sky-700 text-white p-6 sm:p-10 shadow-xl">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-extrabold tracking-wide uppercase text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" /> Media Pembelajaran Interaktif Matematika SD
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Petualangan Mengubah Bentuk Pecahan
                </h2>

                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  Selamat datang di petualangan seru matematika! Di sini kamu akan menjelajahi dan menguasai perubahan <strong>pecahan campuran ke biasa</strong>, <strong>pecahan biasa ke desimal</strong>, dan <strong>sebaliknya</strong> melalui 100 tantangan berjenjang yang dilengkapi visualisasi interaktif.
                </p>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleStartLevel(1)}
                    className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-sm shadow-lg shadow-amber-400/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-amber-950" />
                    <span>Mulai Petualangan (Level 1)</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentView('material');
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Ringkasan Materi & Lab</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentView('battle');
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    title="Duel 2 Pemain di 1 Layar atau Lawan Bot Juara"
                  >
                    <Swords className="w-4 h-4 text-amber-200" />
                    <span>Mode Duel (Battle Teman / Bot)</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowLeaderboardModal(true);
                    }}
                    className="px-4 py-3.5 rounded-2xl bg-amber-500/25 hover:bg-amber-500/35 text-amber-200 font-bold text-xs border border-amber-400/30 transition-all flex items-center gap-1.5"
                    title="Buka Papan Peringkat"
                  >
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>Papan Peringkat</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      downloadStandaloneHtml();
                    }}
                    className="px-4 py-3.5 rounded-2xl bg-sky-500/30 hover:bg-sky-500/40 text-sky-100 font-bold text-xs border border-sky-300/30 transition-all flex items-center gap-1.5"
                    title="Unduh Berkas HTML Mandiri untuk Penggunaan Offline"
                  >
                    <FileDown className="w-4 h-4 text-amber-300" />
                    <span>Unduh HTML Mandiri</span>
                  </button>
                </div>
              </div>

              {/* Decorative Hero Math Elements */}
              <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10 text-center">
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl space-y-3 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Konversi Kunci:
                  </div>
                  <div className="flex items-center gap-3 text-2xl font-extrabold text-white">
                    <span>1 1/2</span>
                    <span className="text-amber-300">⇄</span>
                    <span>3/2</span>
                    <span className="text-amber-300">⇄</span>
                    <span>1,5</span>
                  </div>
                  <div className="text-[11px] text-blue-200">
                    Nilainya Sama Persis!
                  </div>
                </div>
              </div>

              {/* Background Glows */}
              <div className="absolute -right-16 -top-16 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Student Name & Avatar Profile Card */}
            <StudentProfileCard
              studentName={studentName}
              studentAvatar={studentAvatar}
              onSaveProfile={(name, avatar) => {
                setStudentName(name);
                setStudentAvatar(avatar);
              }}
              onOpenLeaderboard={() => setShowLeaderboardModal(true)}
              onStartAdventure={() => handleStartLevel(1)}
            />

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Total Tantangan</div>
                  <div className="text-lg font-extrabold text-slate-800">100 Soal</div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Tingkatan Level</div>
                  <div className="text-lg font-extrabold text-slate-800">10 Level</div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Skor Tertinggi</div>
                  <div className="text-lg font-extrabold text-slate-800" suppressHydrationWarning>{highestScore} Poin</div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Kurikulum</div>
                  <div className="text-lg font-extrabold text-slate-800">Merdeka (Fase C)</div>
                </div>
              </div>
            </div>

            {/* Duel Battle & Multi-Device Spotlight Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 text-white p-6 sm:p-7 shadow-lg">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="space-y-2 text-center md:text-left max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider text-amber-200">
                    <Swords className="w-3.5 h-3.5" /> Fitur Baru: Arena Duel & Multi-Device
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Tantang Temanmu Dalam Duel Pecahan!
                  </h3>
                  <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
                    Main berdua bersama teman sekelas di satu layar (ponsel, tablet, atau komputer), atau uji ketangkasan menghitungmu melawan Bot Juara Pecahan. Desain adaptif responsif otomatis membuat tampilan tetap nyaman di semua perangkat!
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11px] font-bold text-amber-100">
                    <span className="bg-black/20 px-2.5 py-1 rounded-lg">📱 Ponsel Pintar</span>
                    <span className="bg-black/20 px-2.5 py-1 rounded-lg">📟 Tablet / iPad</span>
                    <span className="bg-black/20 px-2.5 py-1 rounded-lg">💻 Laptop / PC</span>
                    <span className="bg-black/20 px-2.5 py-1 rounded-lg">📽️ Proyektor Kelas</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentView('battle');
                    }}
                    className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Swords className="w-5 h-5" />
                    <span>Masuk Arena Duel ⚔️</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setDeviceMode(deviceMode === 'auto' ? 'mobile' : deviceMode === 'mobile' ? 'tablet' : 'auto');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-xs border border-white/30 transition-colors flex items-center justify-center gap-1.5"
                    title="Uji Pratinjau Tampilan Multi Perangkat"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Ganti Pratinjau Perangkat</span>
                  </button>
                </div>
              </div>

              {/* Background Accents */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Leveled Journey Map (10 Levels) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-blue-600" /> Peta Level Petualangan Pecahan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Pilih level yang ingin kamu taklukkan. Setiap level berisi 10 soal terstruktur dengan penjelasan konsep!
                  </p>
                </div>

                <button
                  onClick={handleStartMarathon}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Mode Maraton (100 Soal Penuh)</span>
                </button>
              </div>

              {/* 10 Level Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {LEVEL_INFO.map((lvl) => {
                  const tierColors = {
                    Mudah: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:border-emerald-400',
                    Sedang: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:border-amber-400',
                    Menantang: 'bg-rose-50 text-rose-700 border-rose-200 group-hover:border-rose-400',
                  }[lvl.tier];

                  return (
                    <div
                      key={lvl.level}
                      onClick={() => handleStartLevel(lvl.level)}
                      className="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-2xl flex items-center justify-center border border-slate-200 group-hover:border-blue-200 transition-colors shrink-0">
                          {lvl.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-blue-700">
                              Level {lvl.level}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tierColors}`}>
                              {lvl.tier}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {lvl.questionsRange}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 mt-0.5">
                            {lvl.title}
                          </h4>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-400 transition-all shrink-0">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Developer Banner Footer inside Home */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                {/* Non-clickable Developer Portrait */}
                <div className="shrink-0 select-none">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden border-3 border-white shadow-md ring-2 ring-blue-500/20 bg-slate-100 flex items-center justify-center">
                    <img
                      src="https://i.ibb.co.com/KjLLKX1K/Chat-GPT-Image-20-Sep-2026-20-20-42.png"
                      alt="Foto Pengembang Robiyanto, S.Pd."
                      className="w-full h-full object-cover object-top pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="inline-block text-[11px] font-extrabold text-blue-700 bg-blue-100/90 px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                    Pengembang & Guru Kelas SD
                  </div>
                  <div className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                    Robiyanto, S.Pd.
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600">
                    <span className="font-bold text-slate-700">NIP:</span> 19930720 201902 1 005 • SD Negeri 2 Kebondalem
                  </div>
                  <div className="text-xs text-blue-700 font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Banjarnegara, Jawa Tengah</span>
                    <span className="text-slate-300">•</span>
                    <span>robiyantospd07@guru.sd.belajar.id</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setShowDeveloperModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors shadow-2xs"
                >
                  Lihat Profil
                </button>
                <button
                  onClick={() => downloadStandaloneHtml()}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Unduh HTML</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: RINGKASAN MATERI & LAB SIMULASI */}
        {/* ======================================================== */}
        {currentView === 'material' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('home');
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </button>

              <button
                onClick={() => handleStartLevel(1)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>Mulai Kuis Level 1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <MaterialSummary onStartQuiz={() => handleStartLevel(1)} />
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: KUIS AKTIVITAS INTERAKTIF */}
        {/* ======================================================== */}
        {currentView === 'quiz' && currentQ && (
          <div className="max-w-3xl w-full mx-auto space-y-5 animate-in fade-in duration-200">
            {/* Header: Level info, score, streak, progress */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Student Tag */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 shadow-2xs">
                    <span className="text-sm">{studentAvatar || '🦊'}</span>
                    <span className="max-w-[120px] truncate">{studentName || 'Petualang Cilik'}</span>
                  </div>

                  <span className={`text-xs font-extrabold px-3 py-1 rounded-xl ${
                    currentQ.tier === 'Mudah' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    currentQ.tier === 'Sedang' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {activeLevel === 0 ? 'Mode Maraton' : `Level ${currentQ.level}`} • {currentQ.tier}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold hidden md:inline">
                    {currentQ.category}
                  </span>
                </div>

                {/* Score & Streak */}
                <div className="flex items-center gap-3">
                  {streak > 1 && (
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 font-extrabold text-xs animate-bounce">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{streak}x Combo!</span>
                    </div>
                  )}

                  <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-extrabold text-sm">
                    Skor: {score}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>
                    Soal <strong>{currentQuestionIndex + 1}</strong> dari <strong>{quizQuestions.length}</strong>
                  </span>
                  <span>
                    {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Question Text */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-800 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Visual Fraction Representation */}
                {currentQ.displayMath && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Bentuk Nilai:
                      </span>
                      <FractionDisplay
                        whole={currentQ.displayMath.whole}
                        numerator={currentQ.displayMath.numerator}
                        denominator={currentQ.displayMath.denominator}
                        decimal={currentQ.displayMath.decimal}
                        size="lg"
                        showPie={true}
                      />
                    </div>

                    {currentQ.displayMath.numerator !== undefined && currentQ.displayMath.denominator !== undefined && (
                      <div className="text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                        {currentQ.displayMath.whole ? 'Pecahan Campuran' : 'Pecahan Biasa'}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 4 Interactive Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === currentQ.answerIndex;

                  let btnStyles = 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-800';
                  let letterStyles = 'bg-slate-100 text-slate-700';

                  if (isAnswered) {
                    if (isCorrectOption) {
                      btnStyles = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-400/30';
                      letterStyles = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isCorrectOption) {
                      btnStyles = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                      letterStyles = 'bg-rose-600 text-white';
                    } else {
                      btnStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      letterStyles = 'bg-slate-200 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full min-h-[56px] p-3.5 rounded-2xl border-2 text-left font-semibold text-sm sm:text-base transition-all flex items-center gap-3.5 shadow-2xs select-none active:scale-[0.98] ${btnStyles}`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition-colors ${letterStyles}`}>
                        {letter}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hint Trigger before answering */}
              {!isAnswered && (
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowHint(!showHint);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk Konsep?'}</span>
                  </button>
                </div>
              )}

              {/* Hint Box */}
              {!isAnswered && showHint && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed animate-in fade-in">
                  <strong>💡 Petunjuk Guru:</strong> {currentQ.hint}
                </div>
              )}

              {/* Instant Feedback Banner */}
              {isAnswered && (
                <div
                  className={`p-5 rounded-2xl border animate-in zoom-in-95 duration-200 space-y-3 ${
                    selectedOption === currentQ.answerIndex
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50/90 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedOption === currentQ.answerIndex ? (
                        <>
                          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                            ✓
                          </div>
                          <h4 className="font-extrabold text-base text-emerald-900">
                            Luar Biasa, Jawabanmu Benar!
                          </h4>
                        </>
                      ) : (
                        <>
                          <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                            !
                          </div>
                          <h4 className="font-extrabold text-base text-amber-900">
                            Hampir Benar, Yuk Pahami Konsepnya!
                          </h4>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Step-by-step Mathematical Working */}
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-xs sm:text-sm text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Langkah Penyelesaian Matematis:</span>
                    </div>
                    <p className="leading-relaxed font-sans">{currentQ.explanation}</p>
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <span>
                        {currentQuestionIndex + 1 < quizQuestions.length
                          ? 'Soal Berikutnya'
                          : 'Lihat Hasil Akhir'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Quick Quit */}
            <div className="flex justify-between items-center text-xs text-slate-500">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentView('home');
                }}
                className="hover:underline flex items-center gap-1 text-slate-600 font-semibold"
              >
                <Home className="w-3.5 h-3.5" /> Kembali ke Peta Level
              </button>

              <span>Klik opsi jawaban A, B, C, atau D</span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: HASIL SKOR & PENUTUP */}
        {/* ======================================================== */}
        {currentView === 'result' && (
          <div className="max-w-3xl w-full mx-auto space-y-6 animate-in zoom-in-95 duration-200">
            {/* Celebration Score Card */}
            <div className="text-center p-8 sm:p-10 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
              {/* Badge Icon */}
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-5xl shadow-xl shadow-amber-400/30 mx-auto">
                  {correctCount === quizQuestions.length
                    ? '👑'
                    : correctCount >= quizQuestions.length * 0.7
                    ? '🏆'
                    : '⭐'}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-md">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Congratulations */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {activeLevel === 0 ? 'Tantangan Maraton Selesai' : `Level ${activeLevel} Selesai`}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2 flex-wrap">
                  <span>{studentAvatar || '🦊'}</span>
                  <span>
                    {studentName ? `${studentName}, ` : ''}
                    {correctCount === quizQuestions.length
                      ? 'Sempurna! Kamu Master Pecahan!'
                      : correctCount >= quizQuestions.length * 0.7
                      ? 'Hebat Sekali! Kamu Lulus dengan Gemilang!'
                      : 'Bagus! Terus Berlatih untuk Hasil Terbaik!'}
                  </span>
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                  Kamu telah menyelesaikan seluruh soal pada babak ini. Lihat rincian nilaimu di bawah:
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-2 text-3xl">
                {[1, 2, 3].map((starIdx) => {
                  const earned =
                    correctCount >= quizQuestions.length * (starIdx === 1 ? 0.4 : starIdx === 2 ? 0.7 : 0.95);
                  return (
                    <span
                      key={starIdx}
                      className={`transition-transform duration-300 ${
                        earned ? 'text-amber-400 scale-110 drop-shadow-md' : 'text-slate-200 scale-95'
                      }`}
                    >
                      ★
                    </span>
                  );
                })}
              </div>

              {/* Statistics Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-left">
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <div className="text-[11px] font-bold text-blue-700">Total Skor</div>
                  <div className="text-2xl font-extrabold text-blue-950 mt-0.5">{score}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-[11px] font-bold text-emerald-700">Ketepatan</div>
                  <div className="text-2xl font-extrabold text-emerald-950 mt-0.5">
                    {Math.round((correctCount / quizQuestions.length) * 100)}%
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="text-[11px] font-bold text-amber-700">Benar / Soal</div>
                  <div className="text-2xl font-extrabold text-amber-950 mt-0.5">
                    {correctCount}/{quizQuestions.length}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                  <div className="text-[11px] font-bold text-indigo-700">Waktu Tempuh</div>
                  <div className="text-2xl font-extrabold text-indigo-950 mt-0.5">
                    {elapsedSeconds}d
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowLeaderboardModal(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-amber-200 fill-amber-200" />
                  <span>Papan Peringkat Juara</span>
                </button>

                <button
                  onClick={() => handleStartLevel(activeLevel || 1)}
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Level Ini</span>
                </button>

                {activeLevel > 0 && activeLevel < 10 && (
                  <button
                    onClick={() => handleStartLevel(activeLevel + 1)}
                    className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <span>Lanjut ke Level {activeLevel + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => {
                    sound.playClick();
                    setCurrentView('home');
                  }}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <Home className="w-4 h-4" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>

            {/* Review Answers List */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>Ulas Pembahasan Soal yang Baru Saja Dikerjakan:</span>
              </h3>

              <div className="space-y-3">
                {userAnswersHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                      item.isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 font-bold text-slate-800">
                      <span>
                        #{index + 1}. {item.question.question}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md shrink-0 ${
                          item.isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.isCorrect ? 'Benar (+10)' : 'Salah'}
                      </span>
                    </div>

                    <div className="text-slate-600 text-xs">
                      Jawabanmu: <strong>{item.question.options[item.chosenIndex]}</strong>{' '}
                      {!item.isCorrect && (
                        <span className="text-emerald-700 font-bold ml-2">
                          (Kunci Tepat: {item.question.options[item.question.answerIndex]})
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                      <strong>Cara Pengerjaan:</strong> {item.question.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: ARENA DUEL (BATTLE BERSAMA TEMAN ATAU BOT) */}
        {/* ======================================================== */}
        {currentView === 'battle' && (
          <BattleDuelArena
            initialPlayer1Name={studentName || 'Pemain 1'}
            initialPlayer1Avatar={studentAvatar || '🦊'}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onExit={() => {
              sound.playClick();
              setCurrentView('home');
            }}
            onSaveLeaderboardScore={handleSaveDuelScore}
          />
        )}
      </main>
      </div>

      {/* ============================================================ */}
      {/* MOBILE BOTTOM NAVIGATION BAR (RAMAH SENTUHAN JEMPOL) */}
      {/* ============================================================ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            sound.playClick();
            setCurrentView('home');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-extrabold transition-colors ${
            currentView === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentView('material');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-extrabold transition-colors ${
            currentView === 'material' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Materi</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentView('battle');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[10px] font-extrabold transition-colors ${
            currentView === 'battle'
              ? 'text-white bg-gradient-to-r from-red-600 to-orange-500 shadow-xs'
              : 'text-orange-600 hover:text-orange-700 bg-orange-50'
          }`}
        >
          <Swords className="w-4 h-4" />
          <span>Duel ⚔️</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setShowLeaderboardModal(true);
          }}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-extrabold text-slate-500 hover:text-slate-800"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Juara</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setShowBankModal(true);
          }}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-extrabold text-slate-500 hover:text-slate-800"
        >
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>100 Soal</span>
        </button>

        <button
          onClick={handleToggleFullscreen}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-extrabold transition-colors ${
            isFullscreen ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-slate-800'
          }`}
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
        >
          {isFullscreen ? (
            <>
              <Minimize className="w-4 h-4 text-emerald-600" />
              <span>Normal</span>
            </>
          ) : (
            <>
              <Maximize className="w-4 h-4 text-indigo-600" />
              <span>Penuh</span>
            </>
          )}
        </button>
      </nav>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="bg-white border-t border-slate-200/80 py-6 px-4 mt-auto text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>🦊</span>
            <span className="font-semibold text-slate-700">
              Media Pembelajaran Matematika SD Fase C
            </span>
            <span>•</span>
            <span>Topik Pecahan Kelas 6</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDeveloperModal(true)}
              className="text-blue-600 hover:underline font-bold"
            >
              Robiyanto, S.Pd. (SDN 2 Kebondalem)
            </button>
            <span>•</span>
            <button
              onClick={downloadStandaloneHtml}
              className="text-emerald-600 hover:underline font-bold flex items-center gap-1"
            >
              <FileDown className="w-3.5 h-3.5" /> Unduh Single File HTML
            </button>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* MODALS */}
      {/* ============================================================ */}
      <LearningObjectivesModal
        isOpen={showObjectivesModal}
        onClose={() => setShowObjectivesModal(false)}
      />

      <DeveloperModal
        isOpen={showDeveloperModal}
        onClose={() => setShowDeveloperModal(false)}
      />

      <QuestionBankModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
      />

      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        currentUser={{
          name: studentName || 'Petualang Cilik',
          avatar: studentAvatar || '🦊',
          score: highestScore,
        }}
        onStartQuiz={() => handleStartLevel(1)}
      />
    </div>
  );
}
