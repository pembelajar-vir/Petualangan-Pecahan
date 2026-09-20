'use client';

import React from 'react';

interface FractionDisplayProps {
  whole?: number;
  numerator?: number;
  denominator?: number;
  decimal?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPie?: boolean;
}

export function FractionDisplay({
  whole,
  numerator,
  denominator,
  decimal,
  className = '',
  size = 'md',
  showPie = false,
}: FractionDisplayProps) {
  const sizeClasses = {
    sm: {
      text: 'text-base',
      numDen: 'text-sm',
      gap: 'gap-1',
      pieSize: 24,
    },
    md: {
      text: 'text-xl',
      numDen: 'text-base',
      gap: 'gap-1.5',
      pieSize: 36,
    },
    lg: {
      text: 'text-3xl font-bold',
      numDen: 'text-xl font-bold',
      gap: 'gap-2',
      pieSize: 48,
    },
    xl: {
      text: 'text-4xl font-extrabold',
      numDen: 'text-2xl font-bold',
      gap: 'gap-2.5',
      pieSize: 64,
    },
  }[size];

  // Render pure decimal if provided
  if (decimal !== undefined) {
    return (
      <span className={`inline-flex items-center font-bold font-sans text-sky-700 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200 ${sizeClasses.text} ${className}`}>
        {decimal}
      </span>
    );
  }

  // Fraction or Mixed Fraction
  const hasFraction = numerator !== undefined && denominator !== undefined;

  return (
    <span className={`inline-flex items-center ${sizeClasses.gap} ${className} select-none`}>
      {whole !== undefined && whole > 0 && (
        <span className={`font-bold font-sans text-amber-700 ${sizeClasses.text}`}>
          {whole}
        </span>
      )}

      {hasFraction && (
        <span className="inline-flex flex-col items-center justify-center align-middle text-center mx-0.5">
          <span className={`leading-none pb-0.5 font-bold font-sans text-blue-700 ${sizeClasses.numDen}`}>
            {numerator}
          </span>
          <span className="w-full border-b-2 border-slate-700 my-0.5" />
          <span className={`leading-none pt-0.5 font-bold font-sans text-blue-700 ${sizeClasses.numDen}`}>
            {denominator}
          </span>
        </span>
      )}

      {showPie && hasFraction && denominator <= 12 && (
        <span className="ml-2 inline-block">
          <svg
            width={sizeClasses.pieSize}
            height={sizeClasses.pieSize}
            viewBox="0 0 36 36"
            className="transform -rotate-90 rounded-full shadow-sm bg-slate-100"
          >
            <circle
              cx="18"
              cy="18"
              r="15.91549430918954"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="15.91549430918954"
              fill="transparent"
              stroke="#3B82F6"
              strokeWidth="31.83"
              strokeDasharray={`${((numerator! % denominator!) / denominator!) * 100} 100`}
            />
          </svg>
        </span>
      )}
    </span>
  );
}

// Visual interactive bar for fractions
export function FractionBarVisual({
  numerator,
  denominator,
  whole = 0,
}: {
  numerator: number;
  denominator: number;
  whole?: number;
}) {
  if (denominator <= 0) return null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm w-full max-w-sm">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
        <span>Visualisasi Pecahan:</span>
        <span className="text-blue-600 font-bold">
          {whole > 0 ? `${whole} ` : ''}
          {numerator}/{denominator}
        </span>
      </div>

      <div className="flex gap-1.5 items-center w-full">
        {whole > 0 &&
          Array.from({ length: Math.min(whole, 3) }).map((_, i) => (
            <div
              key={`whole-${i}`}
              className="h-7 flex-1 bg-amber-400 rounded-lg border border-amber-500 flex items-center justify-center text-xs font-bold text-amber-900 shadow-xs"
              title="1 Bagian Utuh"
            >
              1 Utuh
            </div>
          ))}

        <div className="flex h-7 flex-1 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shadow-xs">
          {Array.from({ length: denominator }).map((_, i) => {
            const isFilled = i < (numerator % denominator || (whole === 0 ? numerator : denominator));
            return (
              <div
                key={`part-${i}`}
                className={`h-full flex-1 border-r border-slate-200 last:border-r-0 transition-colors duration-200 ${
                  isFilled ? 'bg-blue-500' : 'bg-slate-100'
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="text-[11px] text-slate-400 text-center">
        {numerator % denominator} bagian diwarnai dari {denominator} bagian sama besar
      </div>
    </div>
  );
}
