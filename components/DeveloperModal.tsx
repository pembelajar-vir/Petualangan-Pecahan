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
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            {/* Developer Photo with provided link tag */}
            <div className="relative shrink-0">
              <div className="w-24 h-32 rounded-xl overflow-hidden shadow-md border-2 border-white ring-2 ring-blue-500/20 bg-slate-200 flex items-center justify-center">
                <a
                  href="https://ibb.co.com/RkLn8FYH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  title="Lihat Pas Foto Pengembang"
                >
                  <img
                    src="https://i.ibb.co.com/YFv9gCPj/Pas-Foto.jpg"
                    alt="Pas-Foto"
                    className="w-full h-full object-cover object-top"
                  />
                </a>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Guru SD
              </span>
            </div>

            {/* Core Info */}
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <h4 className="font-extrabold text-xl text-slate-800 tracking-tight">
                Robiyanto, S.Pd.
              </h4>
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium">NIP: 19930720 201902 1 005</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium pt-1">
                <School className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>SD Negeri 2 Kebondalem, Banjarnegara</span>
              </div>
            </div>
          </div>

          {/* Details Table & Contact */}
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900">
              <span className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> Email Resmi:
              </span>
              <a
                href="mailto:robiyantospd07@guru.sd.belajar.id"
                className="text-xs font-bold hover:underline truncate max-w-[240px] text-blue-800"
                title="Kirim Email"
              >
                robiyantospd07@guru.sd.belajar.id
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-1.5">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 shrink-0 fill-rose-500" />
                Dedikasi untuk Pendidikan Dasar:
              </p>
              <p>
                Aplikasi media interaktif ini dirancang khusus untuk mempermudah siswa kelas 6 SD menguasai konsep perubahan pecahan (biasa, campuran, dan desimal) secara visual, menyenangkan, bertahap, dan bebas rasa takut matematika.
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
