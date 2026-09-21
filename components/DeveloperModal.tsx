'use client';

import React from 'react';
import { X, Mail, Award, School, BadgeCheck, Sparkles, Heart } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperModal({ isOpen, onClose }: DeveloperModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-6 py-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-xs">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white leading-tight">Profil Pengembang</h3>
              <p className="text-xs text-blue-100">Pendidik & Kreator Media Pembelajaran Interaktif</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Photo & Identity Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 rounded-3xl border border-slate-200/90 shadow-2xs">
            {/* Developer Photo - Non-clickable, prominent portrait frame */}
            <div className="relative shrink-0 select-none">
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-2 ring-blue-500/20 bg-slate-100 flex items-center justify-center">
                <img
                  src="https://i.ibb.co.com/KjLLKX1K/Chat-GPT-Image-20-Sep-2026-20-20-42.png"
                  alt="Foto Pengembang Robiyanto, S.Pd."
                  className="w-full h-full object-cover object-top pointer-events-none"
                  draggable={false}
                />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md flex items-center gap-1.5 border-2 border-white whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-amber-300" /> Guru SD
              </span>
            </div>

            {/* Core Info - Proportional Typography & Clean Structure */}
            <div className="flex-1 min-w-0 text-center sm:text-left space-y-3">
              <div>
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/90 px-2.5 py-1 rounded-lg">
                  Pengembang Media Pembelajaran
                </span>
                <h4 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight mt-1.5">
                  Robiyanto, S.Pd.
                </h4>
              </div>

              {/* Data Items */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-slate-700 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs justify-center sm:justify-start">
                  <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-500">NIP:</span>
                  <span className="font-bold text-slate-800 tracking-wide">19930720 201902 1 005</span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-700 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs justify-center sm:justify-start">
                  <School className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-semibold text-slate-500">Unit Kerja:</span>
                  <span className="font-bold text-slate-800">SD Negeri 2 Kebondalem</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 justify-center sm:justify-start pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Kabupaten Banjarnegara, Jawa Tengah</span>
              </div>
            </div>
          </div>

          {/* Details Table & Contact */}
          <div className="space-y-2.5 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 text-blue-900">
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                <Mail className="w-4 h-4 shrink-0" /> Email Kontak Resmi:
              </span>
              <a
                href="mailto:robiyantospd07@guru.sd.belajar.id"
                className="text-xs sm:text-sm font-extrabold hover:underline text-blue-800 break-all select-all"
                title="Kirim Email"
              >
                robiyantospd07@guru.sd.belajar.id
              </a>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-1">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 shrink-0 fill-rose-500" />
                Dedikasi untuk Pendidikan Dasar:
              </p>
              <p className="text-slate-600 leading-normal">
                Aplikasi media interaktif ini dirancang khusus untuk mempermudah siswa kelas 6 SD menguasai materi perubahan pecahan (biasa, campuran, dan desimal) secara visual, menyenangkan, bertahap, dan bebas rasa takut matematika.
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Tutup Jendela
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
