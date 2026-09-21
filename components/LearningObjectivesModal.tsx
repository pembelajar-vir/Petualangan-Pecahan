'use client';

import React from 'react';
import { X, Target, BookOpen, CheckCircle2, Compass } from 'lucide-react';

interface LearningObjectivesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LearningObjectivesModal({ isOpen, onClose }: LearningObjectivesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-xs">
              <Target className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white leading-tight">Capaian & Tujuan Pembelajaran</h3>
              <p className="text-xs text-emerald-100">Kurikulum Merdeka • Fase C • Matematika Kelas 6 SD</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Capaian Pembelajaran (CP) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Capaian Pembelajaran (CP) Elemen Bilangan:</span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Peserta didik menunjukkan pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 1.000.000; 
              membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, melakukan komposisi dan dekomposisi bilangan; 
              menyelesaikan masalah yang berkaitan dengan uang; melakukan operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan cacah sampai 100.000; serta menyelesaikan masalah yang berkaitan dengan KPK dan FPB.
            </p>
            <p className="text-slate-700 font-semibold text-xs sm:text-sm bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-900 leading-relaxed">
              Fokus Materi Pecahan: Membandingkan dan mengurutkan berbagai pecahan termasuk pecahan campuran, melakukan operasi penjumlahan dan pengurangan pecahan, serta melakukan operasi perkalian dan pembagian pecahan dengan bilangan asli; <span className="underline decoration-emerald-500 font-extrabold">mengubah pecahan menjadi berbagai bentuk pecahan lain</span>, serta membandingkan dan mengurutkan bilangan desimal.
            </p>
          </div>

          {/* Tujuan Pembelajaran (TP) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Compass className="w-5 h-5 text-blue-600" />
              <span>Tujuan Pembelajaran (TP):</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-medium leading-relaxed">
              Peserta didik mampu <strong className="text-blue-800 font-extrabold">mengidentifikasi dan merubah berbagai bentuk pecahan</strong> meliputi:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Pecahan campuran ke pecahan biasa dan sebaliknya</li>
                <li>Pecahan biasa ke pecahan desimal dan sebaliknya</li>
                <li>Pecahan campuran ke pecahan desimal dan sebaliknya</li>
                <li>Menyelesaikan permasalahan kontekstual sehari-hari yang berkaitan dengan konversi pecahan</li>
              </ul>
            </div>
          </div>

          {/* Indikator Keberhasilan Siswa */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-500">
              Indikator Ketercapaian Kompetensi (IKTP):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Membedakan pecahan biasa, campuran, dan desimal secara tepat.</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Mengubah pecahan campuran menjadi pecahan biasa dengan rumus matematis.</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Mengubah pecahan biasa ke desimal melalui pembagian atau penyebut 10/100/1000.</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Menyederhanakan pecahan ke bentuk paling ringkas dengan membagi FPB.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Saya Siap Belajar!
          </button>
        </div>
      </div>
    </div>
  );
}
