'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Edit2, User, Trophy, Heart, ArrowRight } from 'lucide-react';
import { sound } from '../lib/sound';

export interface AvatarOption {
  icon: string;
  name: string;
  title: string;
  color: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { icon: '🦊', name: 'Piko', title: 'Rubah Cerdik', color: 'from-amber-400 to-orange-500' },
  { icon: '🦉', name: 'Owi', title: 'Burung Bijak', color: 'from-indigo-400 to-purple-500' },
  { icon: '🦁', name: 'Leon', title: 'Singa Tangguh', color: 'from-yellow-400 to-amber-600' },
  { icon: '🚀', name: 'Astro', title: 'Penjelajah Bintang', color: 'from-blue-400 to-cyan-500' },
  { icon: '🐼', name: 'Pandi', title: 'Panda Juara', color: 'from-emerald-400 to-teal-600' },
  { icon: '🐬', name: 'Delpi', title: 'Lumba Cepat', color: 'from-sky-400 to-blue-600' },
];

interface StudentProfileCardProps {
  studentName: string;
  studentAvatar: string;
  onSaveProfile: (name: string, avatar: string) => void;
  onOpenLeaderboard: () => void;
  onStartAdventure: () => void;
}

export function StudentProfileCard({
  studentName,
  studentAvatar,
  onSaveProfile,
  onOpenLeaderboard,
  onStartAdventure,
}: StudentProfileCardProps) {
  const [isEditing, setIsEditing] = useState(!studentName);
  const [inputName, setInputName] = useState(studentName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(studentAvatar || '🦊');
  const [inputError, setInputError] = useState('');

  const currentAvatarInfo =
    AVATAR_OPTIONS.find((a) => a.icon === (studentAvatar || selectedAvatar)) || AVATAR_OPTIONS[0];

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) {
      setInputError('Yuk ketik nama panggilanmu dulu ya!');
      return;
    }
    setInputError('');
    sound.playCorrect();
    onSaveProfile(trimmed, selectedAvatar);
    setIsEditing(false);
  };

  const handleAvatarClick = (avatarIcon: string) => {
    sound.playClick();
    setSelectedAvatar(avatarIcon);
  };

  const sampleNames = ['Ahmad', 'Nabila', 'Rian', 'Siti', 'Budi', 'Dewi'];

  // When profile is set and not in editing mode:
  if (!isEditing && studentName) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-5 sm:p-7 shadow-xl border border-blue-400/30">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Avatar & Greeting */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 shadow-lg flex items-center justify-center text-4xl sm:text-5xl">
                {studentAvatar || '🦊'}
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 p-1 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-extrabold uppercase tracking-wide text-amber-300">
                <Sparkles className="w-3 h-3" /> Petualang Pecahan Aktif
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                Halo, {studentName}! 🌟
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Partner: <strong className="text-amber-200">{currentAvatarInfo.name} ({currentAvatarInfo.title})</strong> • Siap pecahkan 100 tantangan!
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => {
                sound.playClick();
                setIsEditing(true);
                setInputName(studentName);
                setSelectedAvatar(studentAvatar);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-xs border border-white/20 transition-all flex items-center gap-1.5"
              title="Ganti nama atau karakter avatar"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Ganti Profil</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-extrabold shadow-md shadow-amber-400/30 transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Papan Peringkat</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onStartAdventure();
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-extrabold shadow-md shadow-emerald-500/30 transition-all flex items-center gap-1.5"
            >
              <span>Mulai Main</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    );
  }

  // Editing / Initial Entry Form
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-amber-300 shadow-xl p-5 sm:p-8 animate-in fade-in duration-200">
      {/* Playful Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-md shadow-amber-400/20 text-white shrink-0">
          ✨
        </div>
        <div>
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wide">
            Langkah Awal Petualangan
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
            Halo Juara! Siapa Namamu? 🎒
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Ketik namamu dan pilih karakter teman belajarmu agar namamu muncul di Papan Peringkat!
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Step 1: Input Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Nama Lengkap / Panggilan Siswa:
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                if (inputError) setInputError('');
              }}
              placeholder="Contoh: Ahmad Fauzi / Nabila"
              maxLength={30}
              className="w-full px-4 py-3.5 pl-11 text-sm sm:text-base font-bold bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-400/20 transition-all text-slate-800 placeholder:text-slate-400 placeholder:font-normal"
            />
            <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {inputError && (
            <p className="text-xs font-bold text-rose-500 mt-1.5 flex items-center gap-1">
              ⚠️ {inputError}
            </p>
          )}

          {/* Quick Name Suggestions */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Pilih cepat:</span>
            {sampleNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setInputName(name);
                  if (inputError) setInputError('');
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 hover:text-amber-800 rounded-lg font-medium transition-colors border border-slate-200"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Mascot Avatar */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            2. Pilih Maskot Teman Belajarmu:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {AVATAR_OPTIONS.map((avatar) => {
              const isSelected = selectedAvatar === avatar.icon;
              return (
                <button
                  key={avatar.name}
                  type="button"
                  onClick={() => handleAvatarClick(avatar.icon)}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/30 scale-105'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-3xl sm:text-4xl">{avatar.icon}</div>
                  <div className="font-extrabold text-xs text-slate-800">{avatar.name}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{avatar.title}</div>
                  {isSelected && (
                    <span className="mt-0.5 bg-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Dipilih
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 text-center sm:text-left">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
            <span>
              Namamu akan dicantumkan pada sertifikat hasil dan papan peringkat juara!
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {studentName && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-1/2 sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Batal
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Profil & Mulai Petualangan!</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
