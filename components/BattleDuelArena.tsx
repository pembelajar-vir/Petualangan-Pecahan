'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Swords,
  Trophy,
  Users,
  Bot,
  Zap,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Crown,
  Flame,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  X,
  Play,
  Home,
} from 'lucide-react';
import { QUESTIONS, Question } from '../data/questions';
import { FractionDisplay } from './FractionDisplay';
import { sound } from '../lib/sound';
import { fireConfetti } from '../lib/confetti';

export type DuelOpponent = 'friend' | 'bot';
export type BotDifficulty = 'easy' | 'medium' | 'hard';

interface PlayerState {
  name: string;
  avatar: string;
  score: number;
  correctAnswers: number;
  streak: number;
  selectedAnswer: number | null;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  responseTimeMs: number | null;
}

const AVATAR_PRESETS_P1 = ['🦊', '🦁', '🐼', '🚀', '⚡', '🐱', '🦖'];
const AVATAR_PRESETS_P2 = ['🐯', '🐸', '🦄', '🐲', '🌟', '🐬', '🐶'];

const BOT_PRESETS: Record<
  BotDifficulty,
  { name: string; avatar: string; label: string; minMs: number; maxMs: number; accuracy: number; desc: string }
> = {
  easy: {
    name: 'Budi Ceria',
    avatar: '🐥',
    label: 'Pemula (Mudah)',
    minMs: 5000,
    maxMs: 8000,
    accuracy: 0.65,
    desc: 'Budi sedang belajar pecahan, sesekali butuh waktu berpikir.',
  },
  medium: {
    name: 'Siti Sang Juara',
    avatar: '🦉',
    label: 'Bintang Kelas (Sedang)',
    minMs: 3500,
    maxMs: 5500,
    accuracy: 0.85,
    desc: 'Siti sangat teliti dan cepat menghitung pecahan.',
  },
  hard: {
    name: 'Profesor Pecahan',
    avatar: '🐲',
    label: 'Master (Menantang)',
    minMs: 2000,
    maxMs: 3800,
    accuracy: 0.96,
    desc: 'Reaksi kilat dan rumus pecahan sudah di luar kepala!',
  },
};

interface BattleDuelArenaProps {
  initialPlayer1Name: string;
  initialPlayer1Avatar: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onExit: () => void;
  onSaveLeaderboardScore?: (name: string, avatar: string, score: number, accuracy: number) => void;
}

export function BattleDuelArena({
  initialPlayer1Name,
  initialPlayer1Avatar,
  isMuted,
  onToggleMute,
  onExit,
  onSaveLeaderboardScore,
}: BattleDuelArenaProps) {
  // Game Phase: 'setup' | 'countdown' | 'playing' | 'round_result' | 'game_over'
  const [phase, setPhase] = useState<'setup' | 'countdown' | 'playing' | 'round_result' | 'game_over'>('setup');

  // Setup Options
  const [opponentType, setOpponentType] = useState<DuelOpponent>('friend');
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium');
  const [totalRounds, setTotalRounds] = useState<number>(5);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'mixed' | 'fraction_to_decimal' | 'decimal_to_fraction'>('all');

  // Players
  const [player1, setPlayer1] = useState<PlayerState>({
    name: initialPlayer1Name || 'Pemain 1',
    avatar: initialPlayer1Avatar || '🦊',
    score: 0,
    correctAnswers: 0,
    streak: 0,
    selectedAnswer: null,
    hasAnswered: false,
    isCorrect: null,
    responseTimeMs: null,
  });

  const [player2, setPlayer2] = useState<PlayerState>({
    name: 'Pemain 2',
    avatar: '🐯',
    score: 0,
    correctAnswers: 0,
    streak: 0,
    selectedAnswer: null,
    hasAnswered: false,
    isCorrect: null,
    responseTimeMs: null,
  });

  // Questions and Rounds
  const [duelQuestions, setDuelQuestions] = useState<Question[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [countdownNum, setCountdownNum] = useState<number>(3);
  const [roundTimeLeft, setRoundTimeLeft] = useState<number>(15);
  const [firstScorer, setFirstScorer] = useState<'p1' | 'p2' | null>(null);

  // Timers and Refs
  const roundStartTimeRef = useRef<number>(0);
  const roundTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const botTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (roundTimerIntervalRef.current) clearInterval(roundTimerIntervalRef.current);
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
    };
  }, []);

  const handleSelectOpponentType = (type: DuelOpponent) => {
    sound.playClick();
    setOpponentType(type);
    if (type === 'bot') {
      const b = BOT_PRESETS[botDifficulty];
      setPlayer2((prev) => ({
        ...prev,
        name: b.name,
        avatar: b.avatar,
      }));
    } else {
      setPlayer2((prev) => ({
        ...prev,
        name: 'Pemain 2',
        avatar: '🐯',
      }));
    }
  };

  const handleSelectBotDifficulty = (diff: BotDifficulty) => {
    sound.playClick();
    setBotDifficulty(diff);
    const b = BOT_PRESETS[diff];
    setPlayer2((prev) => ({
      ...prev,
      name: b.name,
      avatar: b.avatar,
    }));
  };

  // Filter and pick questions for the duel
  const prepareQuestions = () => {
    let pool = [...QUESTIONS];
    if (categoryFilter === 'mixed') {
      pool = pool.filter((q) => q.category.toLowerCase().includes('campuran'));
    } else if (categoryFilter === 'fraction_to_decimal') {
      pool = pool.filter((q) => q.category.toLowerCase().includes('biasa ke desimal'));
    } else if (categoryFilter === 'decimal_to_fraction') {
      pool = pool.filter((q) => q.category.toLowerCase().includes('desimal ke pecahan'));
    }
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, totalRounds);
  };

  const handleRoundTimeout = useCallback(() => {
    sound.playDuelBuzzer();
    setPhase('round_result');
  }, []);

  const checkBothAnswered = useCallback((p1Done: boolean, p2Done: boolean) => {
    if (p1Done && p2Done) {
      if (roundTimerIntervalRef.current) clearInterval(roundTimerIntervalRef.current);
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

      setTimeout(() => {
        setPhase('round_result');
      }, 500);
    }
  }, []);

  // Handle player answer submission
  const handlePlayerAnswer = useCallback(
    (
      playerKey: 'p1' | 'p2',
      optionIdx: number,
      customElapsedMs?: number,
      questionParam?: Question
    ) => {
      const q = questionParam || duelQuestions[currentRoundIndex];
      if (!q) return;

      const elapsed = customElapsedMs ?? (Date.now() - roundStartTimeRef.current);
      const isCorrect = optionIdx === q.answerIndex;

      if (playerKey === 'p1') {
        if (player1.hasAnswered) return;
        const wasFirst = firstScorer === null;
        if (wasFirst && isCorrect) {
          setFirstScorer('p1');
          sound.playDuelHit();
        } else if (isCorrect) {
          sound.playCorrect();
        } else {
          sound.playDuelBuzzer();
        }

        const pointsEarned = isCorrect ? (wasFirst ? 15 : 10) + player1.streak * 2 : -5;

        setPlayer1((prev) => ({
          ...prev,
          selectedAnswer: optionIdx,
          hasAnswered: true,
          isCorrect,
          responseTimeMs: elapsed,
          score: Math.max(0, prev.score + pointsEarned),
          correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
          streak: isCorrect ? prev.streak + 1 : 0,
        }));

        setTimeout(() => checkBothAnswered(true, player2.hasAnswered), 50);
      } else {
        if (player2.hasAnswered) return;
        const wasFirst = firstScorer === null;
        if (wasFirst && isCorrect) {
          setFirstScorer('p2');
          sound.playDuelHit();
        } else if (isCorrect) {
          sound.playCorrect();
        } else {
          sound.playDuelBuzzer();
        }

        const pointsEarned = isCorrect ? (wasFirst ? 15 : 10) + player2.streak * 2 : -5;

        setPlayer2((prev) => ({
          ...prev,
          selectedAnswer: optionIdx,
          hasAnswered: true,
          isCorrect,
          responseTimeMs: elapsed,
          score: Math.max(0, prev.score + pointsEarned),
          correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
          streak: isCorrect ? prev.streak + 1 : 0,
        }));

        setTimeout(() => checkBothAnswered(player1.hasAnswered, true), 50);
      }
    },
    [checkBothAnswered, duelQuestions, currentRoundIndex, player1, player2, firstScorer]
  );

  // Start a specific round
  const handleStartRound = useCallback(
    (roundIdx: number, questionsList = duelQuestions) => {
      if (roundTimerIntervalRef.current) clearInterval(roundTimerIntervalRef.current);
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

      setFirstScorer(null);
      setRoundTimeLeft(15);
      roundStartTimeRef.current = Date.now();

      // Reset round states for both players
      setPlayer1((prev) => ({
        ...prev,
        selectedAnswer: null,
        hasAnswered: false,
        isCorrect: null,
        responseTimeMs: null,
      }));

      setPlayer2((prev) => ({
        ...prev,
        selectedAnswer: null,
        hasAnswered: false,
        isCorrect: null,
        responseTimeMs: null,
      }));

      // Round timer (15 seconds)
      roundTimerIntervalRef.current = setInterval(() => {
        setRoundTimeLeft((prev) => {
          if (prev <= 1) {
            if (roundTimerIntervalRef.current) clearInterval(roundTimerIntervalRef.current);
            handleRoundTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // If opponent is BOT, schedule bot answer
      if (opponentType === 'bot') {
        const q = questionsList[roundIdx];
        const botConfig = BOT_PRESETS[botDifficulty];
        const responseTime =
          Math.floor(Math.random() * (botConfig.maxMs - botConfig.minMs)) + botConfig.minMs;

        botTimeoutRef.current = setTimeout(() => {
          const isBotCorrect = Math.random() < botConfig.accuracy;
          let chosenOption = q.answerIndex;
          if (!isBotCorrect) {
            const wrongIndices = [0, 1, 2, 3].filter((i) => i !== q.answerIndex);
            chosenOption = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
          }
          handlePlayerAnswer('p2', chosenOption, responseTime, q);
        }, responseTime);
      }
    },
    [botDifficulty, duelQuestions, handlePlayerAnswer, handleRoundTimeout, opponentType]
  );

  // Start Match & Countdown
  const handleStartDuel = () => {
    sound.playClick();
    const questions = prepareQuestions();
    setDuelQuestions(questions);
    setCurrentRoundIndex(0);

    // Reset player scores
    setPlayer1((prev) => ({
      ...prev,
      score: 0,
      correctAnswers: 0,
      streak: 0,
      selectedAnswer: null,
      hasAnswered: false,
      isCorrect: null,
      responseTimeMs: null,
    }));

    setPlayer2((prev) => ({
      ...prev,
      score: 0,
      correctAnswers: 0,
      streak: 0,
      selectedAnswer: null,
      hasAnswered: false,
      isCorrect: null,
      responseTimeMs: null,
    }));

    setFirstScorer(null);
    setPhase('countdown');
    setCountdownNum(3);
    sound.playDuelCountdown();

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdownNum(count);
        sound.playDuelCountdown();
      } else {
        clearInterval(interval);
        setPhase('playing');
        sound.playDuelStart();
        handleStartRound(0, questions);
      }
    }, 900);
  };

  // Advance to next round or end game
  const handleNextRound = () => {
    sound.playClick();
    const nextRound = currentRoundIndex + 1;
    if (nextRound < duelQuestions.length) {
      setCurrentRoundIndex(nextRound);
      setPhase('playing');
      handleStartRound(nextRound);
    } else {
      // Game Over
      if (roundTimerIntervalRef.current) clearInterval(roundTimerIntervalRef.current);
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

      setPhase('game_over');
      sound.playWin();
      fireConfetti();

      // Record high score for Player 1
      if (onSaveLeaderboardScore && player1.score > 0) {
        const accuracy = Math.round((player1.correctAnswers / duelQuestions.length) * 100);
        onSaveLeaderboardScore(player1.name, player1.avatar, player1.score, accuracy);
      }
    }
  };

  const currentQ = duelQuestions[currentRoundIndex];

  return (
    <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-200">
      {/* ======================================================== */}
      {/* 1. SETUP PHASE */}
      {/* ======================================================== */}
      {phase === 'setup' && (
        <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-xs rounded-2xl">
                <Swords className="w-6 h-6 text-amber-200" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  <span>Arena Duel Matematika</span>
                  <span className="text-xs font-bold bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full uppercase">
                    Battle Mode
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-red-100">
                  Tantang teman sekelasmu atau tanding melawan Bot Juara Pecahan!
                </p>
              </div>
            </div>

            <button
              onClick={onExit}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Kembali ke Beranda"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Choose Opponent Mode */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
                1. Pilih Jenis Lawan Tanding
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => handleSelectOpponentType('friend')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                    opponentType === 'friend'
                      ? 'border-blue-500 bg-blue-50/70 text-blue-900 shadow-md ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-3 bg-blue-500 text-white rounded-xl shadow-xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                      <span>Duel Bersama Teman</span>
                      <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded-md font-bold">
                        1 Perangkat
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Main berdua di satu layar ponsel, tablet, atau komputer. Siapa cepat dan tepat dialah juaranya!
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectOpponentType('bot')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                    opponentType === 'bot'
                      ? 'border-amber-500 bg-amber-50/70 text-amber-950 shadow-md ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-3 bg-amber-500 text-white rounded-xl shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                      <span>Lawan Bot Juara Kelas</span>
                      <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                        Solo Play
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Latih kecepatan berpikirmu melawan simulasi bot AI teman sekelas dengan berbagai level!
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* If Bot Opponent: Select Difficulty */}
            {opponentType === 'bot' && (
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-amber-900">
                  Tingkat Kecepatan & Kecerdasan Bot:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(BOT_PRESETS) as BotDifficulty[]).map((diff) => {
                    const b = BOT_PRESETS[diff];
                    return (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => handleSelectBotDifficulty(diff)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          botDifficulty === diff
                            ? 'bg-amber-100 border-amber-400 shadow-xs font-bold text-amber-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-extrabold">
                          <span className="text-lg">{b.avatar}</span>
                          <span>{b.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal mt-1">
                          {b.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Players Setup Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Player 1 (Blue) */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    Pemain 1 (Sisi Kiri / Bawah)
                  </span>
                  <span className="text-xl">{player1.avatar}</span>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Nama Pemain 1:</label>
                  <input
                    type="text"
                    value={player1.name}
                    onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-blue-200 text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama Pemain 1"
                    maxLength={15}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Pilih Avatar:</label>
                  <div className="flex items-center gap-1.5 mt-1">
                    {AVATAR_PRESETS_P1.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setPlayer1({ ...player1, avatar: av });
                        }}
                        className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-transform ${
                          player1.avatar === av
                            ? 'bg-blue-600 text-white scale-110 shadow-xs ring-2 ring-blue-400'
                            : 'bg-white hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Player 2 (Red/Orange) */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                    {opponentType === 'bot' ? 'Bot Teman Kelas' : 'Pemain 2 (Sisi Kanan / Atas)'}
                  </span>
                  <span className="text-xl">{player2.avatar}</span>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">
                    {opponentType === 'bot' ? 'Nama Karakter Bot:' : 'Nama Pemain 2:'}
                  </label>
                  <input
                    type="text"
                    value={player2.name}
                    disabled={opponentType === 'bot'}
                    onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-orange-200 text-sm font-bold text-slate-800 disabled:bg-slate-100 disabled:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                    placeholder="Nama Pemain 2"
                    maxLength={15}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Pilih Avatar:</label>
                  <div className="flex items-center gap-1.5 mt-1">
                    {AVATAR_PRESETS_P2.map((av) => (
                      <button
                        key={av}
                        type="button"
                        disabled={opponentType === 'bot'}
                        onClick={() => {
                          sound.playClick();
                          setPlayer2({ ...player2, avatar: av });
                        }}
                        className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-transform disabled:opacity-50 ${
                          player2.avatar === av
                            ? 'bg-orange-600 text-white scale-110 shadow-xs ring-2 ring-orange-400'
                            : 'bg-white hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rounds & Category Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  Jumlah Ronde Pertandingan:
                </label>
                <div className="flex items-center gap-2">
                  {[5, 10, 15].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setTotalRounds(count);
                      }}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        totalRounds === count
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {count} Ronde
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  Topik Soal Duel:
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    sound.playClick();
                    setCategoryFilter(e.target.value as typeof categoryFilter);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">🎲 Acak Seluruh Topik Pecahan (100 Soal)</option>
                  <option value="mixed">🍰 Khusus Pecahan Campuran ke Biasa</option>
                  <option value="fraction_to_decimal">🔢 Khusus Pecahan Biasa ke Desimal</option>
                  <option value="decimal_to_fraction">🔄 Khusus Desimal ke Pecahan</option>
                </select>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleStartDuel}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-lg shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Swords className="w-6 h-6 animate-pulse" />
                <span>MULAI PERTANDINGAN DUEL!</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. COUNTDOWN PHASE */}
      {/* ======================================================== */}
      {phase === 'countdown' && (
        <div className="max-w-md mx-auto w-full text-center py-16 px-6 bg-white rounded-3xl border border-slate-200 shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wide">
            <Zap className="w-3.5 h-3.5 text-orange-600" /> Siap-Siap Bertanding!
          </div>

          <div className="flex items-center justify-center gap-6 text-xl font-black">
            <div className="flex flex-col items-center">
              <span className="text-4xl">{player1.avatar}</span>
              <span className="text-sm text-blue-700 mt-1">{player1.name}</span>
            </div>
            <span className="text-2xl text-slate-400 font-bold">VS</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl">{player2.avatar}</span>
              <span className="text-sm text-orange-700 mt-1">{player2.name}</span>
            </div>
          </div>

          <div className="text-7xl font-black text-orange-600 animate-bounce">
            {countdownNum}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Siapa yang menjawab benar dan paling cepat akan memimpin skor!
          </p>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. PLAYING & 4. ROUND RESULT PHASE */}
      {/* ======================================================== */}
      {(phase === 'playing' || phase === 'round_result') && currentQ && (
        <div className="max-w-5xl mx-auto w-full space-y-4">
          {/* Duel Top Header: Players Scoreboard & Timer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm flex items-center justify-between gap-3">
            {/* Player 1 Banner */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-xl shrink-0">
                {player1.avatar}
              </div>
              <div>
                <div className="text-xs font-bold text-blue-700 flex items-center gap-1">
                  <span>{player1.name}</span>
                  {player1.streak > 1 && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded flex items-center">
                      <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      {player1.streak}x
                    </span>
                  )}
                </div>
                <div className="text-lg font-black text-slate-900 leading-tight">
                  {player1.score} <span className="text-xs text-slate-400 font-semibold">pts</span>
                </div>
              </div>
            </div>

            {/* Center Status: Round Counter & Clock */}
            <div className="text-center px-2">
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Ronde {currentRoundIndex + 1} / {duelQuestions.length}
              </div>
              <div
                className={`text-base sm:text-lg font-black inline-flex items-center gap-1 px-3 py-0.5 rounded-full ${
                  roundTimeLeft <= 4
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{roundTimeLeft}s</span>
              </div>
            </div>

            {/* Player 2 Banner */}
            <div className="flex items-center gap-2.5 text-right">
              <div>
                <div className="text-xs font-bold text-orange-700 flex items-center justify-end gap-1">
                  {player2.streak > 1 && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded flex items-center">
                      <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      {player2.streak}x
                    </span>
                  )}
                  <span>{player2.name}</span>
                </div>
                <div className="text-lg font-black text-slate-900 leading-tight">
                  {player2.score} <span className="text-xs text-slate-400 font-semibold">pts</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-xl shrink-0">
                {player2.avatar}
              </div>
            </div>
          </div>

          {/* Central Math Challenge Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-md text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-3">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>{currentQ.category}</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-slate-800 max-w-2xl mx-auto leading-snug mb-4">
              {currentQ.question}
            </h3>

            {currentQ.displayMath && (
              <div className="my-3 flex justify-center scale-110 sm:scale-125">
                <FractionDisplay {...currentQ.displayMath} size="lg" />
              </div>
            )}

            {/* Round Feedback / Explanation if round result */}
            {phase === 'round_result' && (
              <div className="mt-4 p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-left space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Jawaban Benar: {currentQ.options[currentQ.answerIndex]}</span>
                  </div>
                  {firstScorer && (
                    <span className="text-xs font-bold bg-amber-300 text-amber-950 px-2.5 py-0.5 rounded-full shadow-2xs">
                      ⚡ Tercepat:{' '}
                      {firstScorer === 'p1' ? player1.name : player2.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="pt-2 text-right">
                  <button
                    onClick={handleNextRound}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-transform hover:scale-105 inline-flex items-center gap-2"
                  >
                    <span>
                      {currentRoundIndex + 1 < duelQuestions.length ? 'Ronde Berikutnya' : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Dual Answer Arena */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sisi Jawaban Pemain 1 (Biru) */}
            <div className="p-4 rounded-3xl bg-blue-50/70 border-2 border-blue-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-blue-200/80">
                <span className="text-xs font-black text-blue-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span>{player1.avatar}</span>
                  <span>Panel Jawaban: {player1.name}</span>
                </span>
                {player1.hasAnswered && (
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                      player1.isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {player1.isCorrect ? '✓ Benar' : '✗ Salah'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = player1.selectedAnswer === idx;
                  const isAnswerPhase = phase === 'playing';

                  let btnStyle = 'bg-white hover:bg-blue-100/60 text-slate-800 border-blue-200 shadow-xs';
                  if (player1.hasAnswered) {
                    if (isSelected) {
                      btnStyle = player1.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                        : 'bg-rose-500 text-white border-rose-600';
                    } else if (phase === 'round_result' && idx === currentQ.answerIndex) {
                      btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold';
                    } else {
                      btnStyle = 'bg-white/60 text-slate-400 border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={player1.hasAnswered || !isAnswerPhase}
                      onClick={() => handlePlayerAnswer('p1', idx)}
                      className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 disabled:active:scale-100 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-blue-200 text-blue-900 flex items-center justify-center text-xs font-black shrink-0">
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <span className="truncate">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sisi Jawaban Pemain 2 (Orange/Merah) */}
            <div className="p-4 rounded-3xl bg-orange-50/70 border-2 border-orange-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-orange-200/80">
                <span className="text-xs font-black text-orange-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span>{player2.avatar}</span>
                  <span>Panel Jawaban: {player2.name}</span>
                </span>
                {player2.hasAnswered && (
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                      player2.isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {player2.isCorrect ? '✓ Benar' : '✗ Salah'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = player2.selectedAnswer === idx;
                  const isAnswerPhase = phase === 'playing';

                  let btnStyle = 'bg-white hover:bg-orange-100/60 text-slate-800 border-orange-200 shadow-xs';
                  if (player2.hasAnswered) {
                    if (isSelected) {
                      btnStyle = player2.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                        : 'bg-rose-500 text-white border-rose-600';
                    } else if (phase === 'round_result' && idx === currentQ.answerIndex) {
                      btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold';
                    } else {
                      btnStyle = 'bg-white/60 text-slate-400 border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={opponentType === 'bot' || player2.hasAnswered || !isAnswerPhase}
                      onClick={() => handlePlayerAnswer('p2', idx)}
                      className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 disabled:active:scale-100 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-orange-200 text-orange-900 flex items-center justify-center text-xs font-black shrink-0">
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <span className="truncate">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. GAME OVER & PODIUM SELEBRASI */}
      {/* ======================================================== */}
      {phase === 'game_over' && (
        <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-600" /> Hasil Akhir Pertandingan Duel
          </div>

          {/* Winner Title */}
          <div>
            {player1.score > player2.score ? (
              <div>
                <div className="text-5xl mb-2">{player1.avatar} 👑</div>
                <h3 className="text-3xl font-black text-slate-900">
                  {player1.name} Menang!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Selamat atas kecepatan dan ketepatan perhitungan pecahan yang luar biasa!
                </p>
              </div>
            ) : player2.score > player1.score ? (
              <div>
                <div className="text-5xl mb-2">{player2.avatar} 👑</div>
                <h3 className="text-3xl font-black text-slate-900">
                  {player2.name} Menang!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pertandingan yang seru dan menegangkan! Tetap semangat berlatih!
                </p>
              </div>
            ) : (
              <div>
                <div className="text-5xl mb-2">🤝 ⭐</div>
                <h3 className="text-3xl font-black text-slate-900">
                  Pertandingan Seri!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kedua pemain sama-sama tangguh dan hebat menguasai pecahan!
                </p>
              </div>
            )}
          </div>

          {/* Scores Comparison Card */}
          <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            {/* Player 1 Card */}
            <div
              className={`p-4 rounded-xl border ${
                player1.score >= player2.score
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-3xl mb-1">{player1.avatar}</div>
              <div className="font-extrabold text-sm text-slate-800">{player1.name}</div>
              <div className="text-2xl font-black text-blue-700 my-1">{player1.score} Poin</div>
              <div className="text-xs text-slate-500">
                Benar: {player1.correctAnswers} / {duelQuestions.length} Soal
              </div>
            </div>

            {/* Player 2 Card */}
            <div
              className={`p-4 rounded-xl border ${
                player2.score >= player1.score
                  ? 'bg-orange-50 border-orange-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-3xl mb-1">{player2.avatar}</div>
              <div className="font-extrabold text-sm text-slate-800">{player2.name}</div>
              <div className="text-2xl font-black text-orange-700 my-1">{player2.score} Poin</div>
              <div className="text-xs text-slate-500">
                Benar: {player2.correctAnswers} / {duelQuestions.length} Soal
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartDuel}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tanding Ulang (Rematch)</span>
            </button>

            <button
              onClick={() => setPhase('setup')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Ganti Lawan / Ronde</span>
            </button>

            <button
              onClick={onExit}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
