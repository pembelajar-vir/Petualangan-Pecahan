'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { X, Trophy, Medal, Award, Flame, Star, Sparkles, RefreshCw, UserCheck, Trash2, RotateCcw, ArrowRight } from 'lucide-react';
import { sound } from '../lib/sound';

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  accuracy: number;
  level: number | string;
  badge: string;
  date: string;
  isCurrentUser?: boolean;
}

// Initial default leaderboard data representing fellow students
const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    name: 'Ahmad Fauzi',
    avatar: '🦊',
    score: 180,
    accuracy: 100,
    level: 'Master (1-10)',
    badge: 'Raja Pecahan 👑',
    date: 'Hari Ini',
  },
  {
    id: 'lead-2',
    name: 'Nabila Putri',
    avatar: '🦉',
    score: 165,
    accuracy: 95,
    level: 'Level 10',
    badge: 'Penjelajah Hebat ⭐',
    date: 'Hari Ini',
  },
  {
    id: 'lead-3',
    name: 'Rian Hidayat',
    avatar: '🦁',
    score: 150,
    accuracy: 90,
    level: 'Level 8',
    badge: 'Bintang Matematika 🌟',
    date: 'Kemarin',
  },
  {
    id: 'lead-4',
    name: 'Siti Rahmawati',
    avatar: '🐼',
    score: 140,
    accuracy: 88,
    level: 'Level 7',
    badge: 'Ksatria Pecahan 🛡️',
    date: 'Kemarin',
  },
  {
    id: 'lead-5',
    name: 'Budi Santoso',
    avatar: '🚀',
    score: 125,
    accuracy: 85,
    level: 'Level 6',
    badge: 'Penjelajah Cilik 🎯',
    date: '2 hari lalu',
  },
  {
    id: 'lead-6',
    name: 'Dewi Lestari',
    avatar: '🐬',
    score: 110,
    accuracy: 80,
    level: 'Level 5',
    badge: 'Pejuang Pecahan ⚡',
    date: '3 hari lalu',
  },
];

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudentName?: string;
  currentStudentAvatar?: string;
  currentScore?: number;
  currentUser?: {
    name: string;
    avatar: string;
    score: number;
  };
  onStartQuiz?: () => void;
}

export function LeaderboardModal({
  isOpen,
  onClose,
  currentStudentName,
  currentStudentAvatar,
  currentScore = 0,
  currentUser,
  onStartQuiz,
}: LeaderboardModalProps) {
  const activeName = currentUser?.name || currentStudentName || 'Petualang Cilik';
  const activeAvatar = currentUser?.avatar || currentStudentAvatar || '🦊';
  const activeScore = currentUser?.score ?? currentScore;

  const [filterTier, setFilterTier] = useState<'all' | 'top3' | 'mine'>('all');

  const rawStorage = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      return () => window.removeEventListener('storage', onStoreChange);
    },
    () => {
      try {
        return localStorage.getItem('math_leaderboard_data');
      } catch {
        return null;
      }
    },
    () => null
  );

  const leaderboard: LeaderboardEntry[] = useMemo(() => {
    if (rawStorage === null) return DEFAULT_LEADERBOARD;
    try {
      const parsed = JSON.parse(rawStorage);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [rawStorage]);

  if (!isOpen) return null;

  // Check if current student has an entry
  const userEntry = leaderboard.find((e) => e.isCurrentUser || e.name === activeName);

  const sortedList = [...leaderboard].sort((a, b) => b.score - a.score);

  const filteredList = sortedList.filter((item, index) => {
    if (filterTier === 'top3') return index < 3;
    if (filterTier === 'mine') return item.isCurrentUser || item.name === activeName;
    return true;
  });

  const handleClearLeaderboard = () => {
    sound.playClick();
    const isConfirmed = window.confirm(
      'Apakah Anda yakin ingin MENGHAPUS & BERSIHKAN semua data peringkat?\n\nPapan peringkat akan dikosongkan agar Anda atau siswa di kelas bisa memulai kompetisi kembali dari awal.'
    );
    if (isConfirmed) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('math_leaderboard_data', JSON.stringify([]));
        window.dispatchEvent(new Event('storage'));
        sound.playClick();
      }
    }
  };

  const handleRestoreDemoData = () => {
    sound.playClick();
    if (typeof window !== 'undefined') {
      localStorage.setItem('math_leaderboard_data', JSON.stringify(DEFAULT_LEADERBOARD));
      window.dispatchEvent(new Event('storage'));
      sound.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-5 text-white flex justify-between items-center shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-xs">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-lg text-white leading-tight">
                  Papan Peringkat Juara Pecahan
                </h3>
                <span className="bg-white/25 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Kelas 6 SD
                </span>
              </div>
              <p className="text-xs text-amber-100">
                SD Negeri 2 Kebondalem • Ayo raih skor tertinggi dan jadilah Juara 1!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            title="Tutup Papan Peringkat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Student Profile Snapshot Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-4 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white border-2 border-blue-300 shadow-xs flex items-center justify-center text-2xl">
                {activeAvatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                    Profil Kamu Saat Ini:
                  </span>
                  <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.2 rounded-full">
                    Aktif
                  </span>
                </div>
                <div className="font-extrabold text-sm sm:text-base text-slate-900">
                  {activeName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-white rounded-xl border border-blue-200 shadow-2xs text-center">
                <div className="text-[10px] font-semibold text-slate-500">Skor Kamu</div>
                <div className="text-sm font-extrabold text-blue-700">{activeScore} Pts</div>
              </div>
              <div className="px-3 py-1.5 bg-white rounded-xl border border-emerald-200 shadow-2xs text-center">
                <div className="text-[10px] font-semibold text-slate-500">Predikat</div>
                <div className="text-xs font-extrabold text-emerald-700">
                  {activeScore >= 150 ? 'Master 👑' : activeScore >= 80 ? 'Jagoan ⭐' : 'Petualang 🎯'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterTier('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterTier === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Semua Peringkat ({sortedList.length})
            </button>
            <button
              onClick={() => setFilterTier('top3')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                filterTier === 'top3'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Trophy className="w-3 h-3" /> Top 3 Podium
            </button>
            <button
              onClick={() => setFilterTier('mine')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                filterTier === 'mine'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <UserCheck className="w-3 h-3" /> Skor Saya
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {sortedList.length > 0 ? (
              <button
                onClick={handleClearLeaderboard}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 px-2.5 py-1.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1 shadow-2xs"
                title="Hapus dan bersihkan semua data peringkat agar mulai dari awal"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus / Kosongkan</span>
              </button>
            ) : (
              <button
                onClick={handleRestoreDemoData}
                className="text-xs font-bold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200 transition-colors flex items-center gap-1 shadow-2xs"
                title="Muat contoh data peringkat bawaan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Muat Contoh</span>
              </button>
            )}
          </div>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5 flex-1">
          {sortedList.length === 0 ? (
            /* Empty State when Leaderboard is Cleared */
            <div className="py-10 px-4 text-center flex flex-col items-center justify-center space-y-4 my-auto bg-slate-50/70 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center text-3xl shadow-xs">
                🏆
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Papan Peringkat Telah Dikosongkan
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Data peringkat telah bersih dan dimulai dari awal lagi. Ayo selesaikan tantangan kuis untuk mencatatkan rekor pertamamu di posisi Juara #1!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onStartQuiz?.();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Mulai Main & Catat Skor Baru</span>
                </button>
                <button
                  onClick={handleRestoreDemoData}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-slate-200 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Muat Data Contoh</span>
                </button>
              </div>
            </div>
          ) : filteredList.length === 0 ? (
            /* Empty filtered state */
            <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <div className="text-3xl">🎯</div>
              <div className="font-bold text-slate-800 text-sm">
                {filterTier === 'mine'
                  ? 'Kamu Belum Memiliki Catatan Skor'
                  : 'Tidak ada data untuk kategori ini'}
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {filterTier === 'mine'
                  ? 'Mainkan minimal satu level kuis agar skormu langsung tercatat di papan peringkat juara!'
                  : 'Pilih tab Semua Peringkat untuk melihat daftar keseluruhan.'}
              </p>
              {filterTier === 'mine' && (
                <button
                  onClick={() => {
                    onClose();
                    onStartQuiz?.();
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Mulai Kuis Sekarang
                </button>
              )}
            </div>
          ) : (
            filteredList.map((entry) => {
              const actualRank = sortedList.findIndex((item) => item.id === entry.id) + 1;
              const isTop1 = actualRank === 1;
              const isTop2 = actualRank === 2;
              const isTop3 = actualRank === 3;
              const isMe = entry.isCurrentUser || entry.name === activeName;

              let rankBadge = (
                <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center border border-slate-200">
                  #{actualRank}
                </span>
              );

              let cardStyles = 'bg-white border-slate-200 hover:border-slate-300';

              if (isTop1) {
                rankBadge = (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-amber-950 font-black text-sm flex items-center justify-center shadow-md shadow-amber-400/30">
                    👑 1
                  </div>
                );
                cardStyles = 'bg-gradient-to-r from-amber-50/90 via-yellow-50/50 to-white border-amber-300 shadow-xs ring-1 ring-amber-300/50';
              } else if (isTop2) {
                rankBadge = (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-200 to-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shadow-xs">
                    🥈 2
                  </div>
                );
                cardStyles = 'bg-gradient-to-r from-slate-50 to-white border-slate-300 shadow-2xs';
              } else if (isTop3) {
                rankBadge = (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-200 to-amber-200 text-amber-900 font-black text-sm flex items-center justify-center shadow-xs">
                    🥉 3
                  </div>
                );
                cardStyles = 'bg-gradient-to-r from-orange-50/60 to-white border-orange-200 shadow-2xs';
              }

              if (isMe) {
                cardStyles += ' ring-2 ring-blue-500 border-blue-400 bg-blue-50/40';
              }

              return (
                <div
                  key={entry.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${cardStyles}`}
                >
                  {/* Left: Rank & Avatar & Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">{rankBadge}</div>

                    <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                      {entry.avatar}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {entry.name}
                        </h4>
                        {isMe && (
                          <span className="bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-md shrink-0">
                            KAMU
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-blue-600">{entry.level}</span>
                        <span>•</span>
                        <span className="text-[11px] text-slate-400">{entry.badge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Score & Accuracy */}
                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1.5">
                      <Flame className="w-4 h-4 text-amber-500 fill-amber-500 hidden sm:inline" />
                      <span className="font-extrabold text-base sm:text-lg text-slate-900">
                        {entry.score}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">pts</span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-600">
                      Akurasi {entry.accuracy}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Advice & Reset Control */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            {sortedList.length > 0 ? (
              <button
                onClick={handleClearLeaderboard}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Hapus dan bersihkan semua peringkat agar mulai dari awal lagi"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Hapus / Kosongkan Peringkat</span>
              </button>
            ) : (
              <button
                onClick={handleRestoreDemoData}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                <span>Muat Contoh Peringkat</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-colors"
          >
            Tutup & Mulai Main
          </button>
        </div>
      </div>
    </div>
  );
}
