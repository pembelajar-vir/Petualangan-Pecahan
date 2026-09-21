'use client';

import React, { useState } from 'react';
import { BookOpen, ArrowRight, Lightbulb, Calculator, Check, Sparkles } from 'lucide-react';
import { FractionDisplay, FractionBarVisual } from './FractionDisplay';

export function MaterialSummary({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [activeTab, setActiveTab] = useState<'jenis' | 'campuran-biasa' | 'biasa-desimal' | 'campuran-desimal' | 'simulasi'>('jenis');

  // Interactive Simulator state
  const [simWhole, setSimWhole] = useState<number>(1);
  const [simNum, setSimNum] = useState<number>(3);
  const [simDen, setSimDen] = useState<number>(4);

  const tabs = [
    { id: 'jenis', label: '1. Jenis Pecahan', icon: '📚' },
    { id: 'campuran-biasa', label: '2. Campuran ⇄ Biasa', icon: '🔄' },
    { id: 'biasa-desimal', label: '3. Biasa ⇄ Desimal', icon: '🔢' },
    { id: 'campuran-desimal', label: '4. Campuran ⇄ Desimal', icon: '✨' },
    { id: 'simulasi', label: '5. Lab Simulasi Visual', icon: '🧪' },
  ] as const;

  // Simulator calculations
  const totalNumerator = simWhole * simDen + simNum;
  const decimalValue = (simWhole + simNum / simDen).toFixed(3).replace(/\.?0+$/, '').replace('.', ',');

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2 text-amber-200">
              <Lightbulb className="w-3.5 h-3.5" /> Konsep Esensial Kelas 6
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ringkasan Materi & Panduan Kilat Pecahan
            </h2>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              Pelajari cara cepat, trik matematika mudah, dan visualisasi interaktif sebelum menaklukkan 100 level kuis!
            </p>
          </div>
          <button
            onClick={onStartQuiz}
            className="shrink-0 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Mulai Kuis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-xs ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm transition-all min-h-[420px]">
        {/* TAB 1: JENIS PECAHAN */}
        {activeTab === 'jenis' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                <span>📚</span> Mengenal 3 Bentuk Utama Pecahan
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Pecahan digunakan untuk menyatakan bagian dari suatu keseluruhan atau perbandingan dua bilangan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pecahan Biasa */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase text-blue-700 tracking-wider">Bentuk 1</div>
                  <h4 className="font-extrabold text-lg text-slate-800 mt-1">Pecahan Biasa</h4>
                  <p className="text-xs text-slate-600 mt-2">
                    Terdiri dari <strong>pembilang</strong> (atas) dan <strong>penyebut</strong> (bawah).
                  </p>
                  <div className="my-4 flex justify-center py-2 bg-white rounded-xl border border-blue-100 shadow-xs">
                    <FractionDisplay numerator={3} denominator={4} size="lg" />
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Pecahan murni: pembilang &lt; penyebut (contoh: 1/2, 3/4)</li>
                    <li>Pecahan tidak murni: pembilang &ge; penyebut (contoh: 7/4, 9/2)</li>
                  </ul>
                </div>
              </div>

              {/* Pecahan Campuran */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase text-amber-700 tracking-wider">Bentuk 2</div>
                  <h4 className="font-extrabold text-lg text-slate-800 mt-1">Pecahan Campuran</h4>
                  <p className="text-xs text-slate-600 mt-2">
                    Gabungan antara <strong>bilangan bulat utuh</strong> dan <strong>pecahan biasa</strong>.
                  </p>
                  <div className="my-4 flex justify-center py-2 bg-white rounded-xl border border-amber-100 shadow-xs">
                    <FractionDisplay whole={2} numerator={1} denominator={4} size="lg" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Hanya dapat dibentuk dari pecahan biasa yang nilainya lebih dari 1 (pembilang &gt; penyebut).
                  </p>
                </div>
              </div>

              {/* Pecahan Desimal */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-700 tracking-wider">Bentuk 3</div>
                  <h4 className="font-extrabold text-lg text-slate-800 mt-1">Pecahan Desimal</h4>
                  <p className="text-xs text-slate-600 mt-2">
                    Pecahan berbasis persepuluhan, perseratusan, perseribuan yang ditandai dengan <strong>tanda koma (,)</strong>.
                  </p>
                  <div className="my-4 flex justify-center py-2 bg-white rounded-xl border border-emerald-100 shadow-xs">
                    <FractionDisplay decimal="0,75" size="lg" />
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>1 angka di belakang koma = per 10 (0,3 = 3/10)</li>
                    <li>2 angka di belakang koma = per 100 (0,25 = 25/100)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CAMPURAN KE BIASA & SEBALIKNYA */}
        {activeTab === 'campuran-biasa' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <span>🔄</span> Mengubah Pecahan Campuran ⇄ Pecahan Biasa
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cara 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">A</span>
                  <h4 className="font-bold text-slate-800 text-base">Campuran ke Biasa</h4>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200 text-center font-mono text-sm text-blue-900 font-bold">
                  a b/c = (a × c + b) / c
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p><strong>Langkah:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Kalikan bilangan bulat dengan penyebut.</li>
                    <li>Tambahkan hasilnya dengan pembilang.</li>
                    <li>Penyebut tetap sama!</li>
                  </ol>
                  <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="font-bold text-blue-800 mb-1">Contoh Nyata:</div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span>Ubah</span>
                      <FractionDisplay whole={2} numerator={3} denominator={4} size="sm" />
                      <span>ke pecahan biasa:</span>
                    </div>
                    <div className="mt-1 font-mono font-semibold text-slate-800">
                      = (2 × 4 + 3) / 4 = (8 + 3) / 4 = <strong className="text-blue-700">11/4</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cara 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">B</span>
                  <h4 className="font-bold text-slate-800 text-base">Biasa ke Campuran</h4>
                </div>
                <div className="p-3 bg-white rounded-xl border border-indigo-200 text-center font-mono text-sm text-indigo-900 font-bold">
                  Bagi pembilang dengan penyebut
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p><strong>Langkah:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Bagi pembilang dengan penyebut secara bersusun (porogapit).</li>
                    <li>Hasil bagi bulat menjadi bilangan bulat depan.</li>
                    <li>Sisa pembagian menjadi pembilang baru.</li>
                  </ol>
                  <div className="mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="font-bold text-indigo-800 mb-1">Contoh Nyata:</div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span>Ubah</span>
                      <FractionDisplay numerator={9} denominator={4} size="sm" />
                      <span>ke pecahan campuran:</span>
                    </div>
                    <div className="mt-1 text-slate-800">
                      9 ÷ 4 = <strong>2</strong> sisa <strong>1</strong>.
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      <span>Maka hasilnya adalah</span>
                      <FractionDisplay whole={2} numerator={1} denominator={4} size="sm" />.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BIASA KE DESIMAL & SEBALIKNYA */}
        {activeTab === 'biasa-desimal' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <span>🔢</span> Mengubah Pecahan Biasa ⇄ Pecahan Desimal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Biasa ke Desimal */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <span className="text-emerald-600">●</span> Pecahan Biasa ke Desimal
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Ubah penyebut menjadi <strong>10, 100, atau 1.000</strong>:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Penyebut 2:</span> kalikan 5<br/>
                    1/2 = 5/10 = <strong>0,5</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Penyebut 4:</span> kalikan 25<br/>
                    3/4 = 75/100 = <strong>0,75</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Penyebut 5:</span> kalikan 2<br/>
                    2/5 = 4/10 = <strong>0,4</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500">Penyebut 20:</span> kalikan 5<br/>
                    7/20 = 35/100 = <strong>0,35</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">
                  💡 Tips: Jika penyebut tidak bisa dijadikan 10 atau 100 (misal 3 atau 8), gunakan pembagian bersusun (porogapit): 3 ÷ 8 = 0,375.
                </p>
              </div>

              {/* Desimal ke Biasa */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <span className="text-blue-600">●</span> Desimal ke Pecahan Biasa
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <p>1. Tulis desimal sebagai pecahan persepuluhan atau perseratusan:</p>
                  <ul className="list-disc list-inside pl-1 space-y-1">
                    <li>0,6 = 6/10</li>
                    <li>0,25 = 25/100</li>
                  </ul>
                  <p className="pt-2">2. <strong>Sederhanakan</strong> dengan membagi pembilang dan penyebut dengan FPB:</p>
                  <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1.5 font-mono text-xs">
                    <p>• 6/10 = (6 ÷ 2) / (10 ÷ 2) = <strong className="text-blue-700 text-sm">3/5</strong></p>
                    <p>• 25/100 = (25 ÷ 25) / (100 ÷ 25) = <strong className="text-blue-700 text-sm">1/4</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CAMPURAN KE DESIMAL & SEBALIKNYA */}
        {activeTab === 'campuran-desimal' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <span>✨</span> Mengubah Pecahan Campuran ⇄ Pecahan Desimal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <h4 className="font-bold text-slate-800 text-base">Campuran ke Desimal</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pisahkan bilangan bulat utuh dan pecahannya. Ubah pecahannya ke desimal, lalu satukan kembali!
                </p>
                <div className="p-3.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm space-y-2">
                  <p className="font-semibold text-amber-900">Contoh: Ubah 3 1/4 ke desimal</p>
                  <p>• Bilangan bulat = 3</p>
                  <p>• Pecahan 1/4 = 0,25</p>
                  <p className="font-bold text-slate-800 border-t pt-1.5 border-slate-100">
                    Hasil: 3 + 0,25 = <span className="text-amber-700 font-extrabold text-base">3,25</span>
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-3">
                <h4 className="font-bold text-slate-800 text-base">Desimal ke Campuran</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Angka di depan koma adalah bilangan bulat. Angka di belakang koma jadikan pecahan biasa lalu sederhanakan.
                </p>
                <div className="p-3.5 bg-white rounded-xl border border-purple-200 text-xs sm:text-sm space-y-2">
                  <p className="font-semibold text-purple-900">Contoh: Ubah 2,75 ke campuran</p>
                  <p>• Bilangan bulat = 2</p>
                  <p>• Desimal 0,75 = 75/100 = 3/4</p>
                  <p className="font-bold text-slate-800 border-t pt-1.5 border-slate-100">
                    Hasil: <span className="text-purple-700 font-extrabold text-base">2 3/4</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Tabel Pasangan Emas yang Wajib Diingat */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Pasangan Emas Pecahan yang Sering Keluar di Ujian:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-center font-mono">
                <div className="p-2 bg-white rounded-lg border border-slate-200">1/2 = <strong>0,5</strong></div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">1/4 = <strong>0,25</strong></div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">3/4 = <strong>0,75</strong></div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">1/5 = <strong>0,2</strong></div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">2/5 = <strong>0,4</strong></div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">3/5 = <strong>0,6</strong></div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">4/5 = <strong>0,8</strong></div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">1/8 = <strong>0,125</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SIMULASI VISUAL INTERAKTIF */}
        {activeTab === 'simulasi' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-600" /> Laboratorium Konversi & Simulasi Pecahan
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Geser atau ubah angka berikut untuk melihat bentuk pecahan dan konversinya secara langsung!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Controls */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Bilangan Bulat:</span>
                    <span className="text-blue-600 font-bold">{simWhole}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={simWhole}
                    onChange={(e) => setSimWhole(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Pembilang:</span>
                    <span className="text-blue-600 font-bold">{simNum}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max={simDen - 1 || 1}
                    value={Math.min(simNum, simDen - 1 || 1)}
                    onChange={(e) => setSimNum(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Penyebut:</span>
                    <span className="text-blue-600 font-bold">{simDen}</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={simDen}
                    onChange={(e) => {
                      const newDen = parseInt(e.target.value);
                      setSimDen(newDen);
                      if (simNum >= newDen) setSimNum(newDen - 1);
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="pt-2">
                  <FractionBarVisual numerator={simNum} denominator={simDen} whole={simWhole} />
                </div>
              </div>

              {/* Conversion Results Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/90 space-y-4 shadow-xs">
                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider text-blue-900">
                  Hasil Konversi Multi-Bentuk:
                </h4>

                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Pecahan Campuran:</span>
                    <FractionDisplay whole={simWhole} numerator={simNum} denominator={simDen} size="md" />
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Pecahan Biasa:</span>
                    <FractionDisplay numerator={totalNumerator} denominator={simDen} size="md" />
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Bentuk Desimal:</span>
                    <span className="font-extrabold text-emerald-700 text-xl font-mono">{decimalValue}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-100/60 text-xs text-blue-900 leading-relaxed font-sans">
                  <strong>Langkah Konversi:</strong> ({simWhole} × {simDen} + {simNum}) / {simDen} = {totalNumerator}/{simDen} = {decimalValue}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onStartQuiz}
          className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
        >
          <span>Siap Bertualang di Kuis 100 Soal!</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
