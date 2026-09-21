'use client';

import React, { useState } from 'react';
import { X, Search, Filter, BookOpen, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { QUESTIONS, LEVEL_INFO, Question } from '../data/questions';
import { FractionDisplay } from './FractionDisplay';

interface QuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion?: (q: Question) => void;
}

export function QuestionBankModal({ isOpen, onClose, onSelectQuestion }: QuestionBankModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredQuestions = QUESTIONS.filter((q) => {
    const matchLevel = selectedLevel === 'all' || q.level === selectedLevel;
    const matchSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-indigo-900 px-6 py-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white leading-tight">
                Bank 100 Soal Pecahan Kelas 6
              </h3>
              <p className="text-xs text-slate-300">
                Katalog lengkap 10 level berjenjang dengan kunci & pembahasan rinci
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari soal, konsep, atau kata kunci..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Semua Level (1 - 10)</option>
                {LEVEL_INFO.map((lvl) => (
                  <option key={lvl.level} value={lvl.level}>
                    Level {lvl.level} ({lvl.tier}) - {lvl.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex justify-between items-center">
            <span>Menampilkan <strong>{filteredQuestions.length}</strong> dari 100 soal</span>
            <span className="text-[11px] text-blue-600 font-medium">Klik pada soal untuk melihat kunci & cara cepat</span>
          </div>
        </div>

        {/* Questions List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="border border-slate-200 rounded-2xl p-4 bg-white hover:border-blue-300 transition-colors shadow-xs"
              >
                <div
                  className="flex items-start justify-between gap-3 cursor-pointer select-none"
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                      #{q.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          q.tier === 'Mudah' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          q.tier === 'Sedang' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          Level {q.level} • {q.tier}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {q.category}
                        </span>
                      </div>
                      <p className="font-bold text-slate-800 text-sm">
                        {q.question}
                      </p>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs sm:text-sm animate-in fade-in duration-150">
                    {/* Visual fraction if available */}
                    {q.displayMath && (
                      <div className="p-3 bg-slate-50 rounded-xl inline-flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-500">Bentuk Soal:</span>
                        <FractionDisplay
                          whole={q.displayMath.whole}
                          numerator={q.displayMath.numerator}
                          denominator={q.displayMath.denominator}
                          decimal={q.displayMath.decimal}
                          size="md"
                        />
                      </div>
                    )}

                    {/* Options list with correct marked */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = optIdx === q.answerIndex;
                        const label = String.fromCharCode(65 + optIdx);
                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {label}
                            </span>
                            <span>{opt}</span>
                            {isCorrect && (
                              <CheckCircle className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step explanation */}
                    <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
                      <p className="font-bold flex items-center gap-1.5 text-blue-800">
                        💡 Pembahasan & Cara Cepat:
                      </p>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm transition-colors"
          >
            Tutup Bank Soal
          </button>
        </div>
      </div>
    </div>
  );
}
