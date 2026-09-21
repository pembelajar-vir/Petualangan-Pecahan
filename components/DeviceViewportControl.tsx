'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Minimize2,
  Tv,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { sound } from '../lib/sound';

export type DeviceMode = 'auto' | 'mobile' | 'tablet' | 'desktop' | 'projector';

interface DeviceViewportControlProps {
  deviceMode: DeviceMode;
  onDeviceModeChange: (mode: DeviceMode) => void;
}

export function DeviceViewportControl({
  deviceMode,
  onDeviceModeChange,
}: DeviceViewportControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const getDeviceLabel = (mode: DeviceMode) => {
    switch (mode) {
      case 'mobile':
        return 'Ponsel (390px)';
      case 'tablet':
        return 'Tablet (768px)';
      case 'desktop':
        return 'Desktop (1024px)';
      case 'projector':
        return 'Proyektor Kelas';
      default:
        return 'Otomatis';
    }
  };

  const detectedCategory =
    windowWidth < 640
      ? 'Layar Ponsel'
      : windowWidth < 1024
      ? 'Layar Tablet'
      : 'Layar Desktop / Laptop';

  return (
    <div className="relative inline-block text-left select-none">
      <div className="flex items-center gap-1.5">
        {/* Device Mode Dropdown Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            setIsOpen(!isOpen);
          }}
          className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
            deviceMode !== 'auto'
              ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400/30'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
          title="Sesuaikan Mode Tampilan Perangkat"
          aria-label="Pengaturan Mode Perangkat"
        >
          {deviceMode === 'mobile' && <Smartphone className="w-3.5 h-3.5" />}
          {deviceMode === 'tablet' && <Tablet className="w-3.5 h-3.5" />}
          {deviceMode === 'desktop' && <Monitor className="w-3.5 h-3.5" />}
          {deviceMode === 'projector' && <Tv className="w-3.5 h-3.5 text-amber-300" />}
          {deviceMode === 'auto' && <Smartphone className="w-3.5 h-3.5 text-blue-600" />}

          <span className="hidden sm:inline font-semibold">
            {getDeviceLabel(deviceMode)}
          </span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>

        {/* Fullscreen Button for Classroom & Device Focus */}
        <button
          onClick={toggleFullscreen}
          className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${
            isFullscreen
              ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200 shadow-2xs'
          }`}
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh (Fokus Belajar / Proyektor)'}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-700" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-2.5 text-slate-800 space-y-1 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 flex items-center justify-between">
                <span>Optimasi Tampilan</span>
                <span className="text-[10px] text-slate-400 font-semibold normal-case">
                  {detectedCategory}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pilih format yang paling nyaman sesuai perangkat atau kebutuhan kelas:
              </p>
            </div>

            {/* Option: Auto */}
            <button
              onClick={() => {
                sound.playClick();
                onDeviceModeChange('auto');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                deviceMode === 'auto'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold">Otomatis (Adaptif Penuh)</div>
                  <div className="text-[10px] text-slate-500">
                    Menyesuaikan ukuran layar fisik secara cerdas
                  </div>
                </div>
              </div>
              {deviceMode === 'auto' && <Check className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Option: Mobile */}
            <button
              onClick={() => {
                sound.playClick();
                onDeviceModeChange('mobile');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                deviceMode === 'mobile'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold">Mode Ponsel (HP / Smartphone)</div>
                  <div className="text-[10px] text-slate-500">
                    Tata letak ramping ramah jempol satu tangan
                  </div>
                </div>
              </div>
              {deviceMode === 'mobile' && <Check className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Option: Tablet */}
            <button
              onClick={() => {
                sound.playClick();
                onDeviceModeChange('tablet');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                deviceMode === 'tablet'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                  <Tablet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold">Mode Tablet / iPad</div>
                  <div className="text-[10px] text-slate-500">
                    Ideal untuk belajar kelompok dan layar sentuh meja
                  </div>
                </div>
              </div>
              {deviceMode === 'tablet' && <Check className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Option: Desktop */}
            <button
              onClick={() => {
                sound.playClick();
                onDeviceModeChange('desktop');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                deviceMode === 'desktop'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                  <Monitor className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold">Mode Laptop / Komputer</div>
                  <div className="text-[10px] text-slate-500">
                    Tampilan luas dengan kenyamanan klik mouse
                  </div>
                </div>
              </div>
              {deviceMode === 'desktop' && <Check className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Option: Projector / Big Screen */}
            <button
              onClick={() => {
                sound.playClick();
                onDeviceModeChange('projector');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                deviceMode === 'projector'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                  <Tv className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold flex items-center gap-1">
                    <span>Proyektor Kelas / Smart TV</span>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Teks & tombol ekstra besar agar jelas terlihat dari belakang kelas
                  </div>
                </div>
              </div>
              {deviceMode === 'projector' && <Check className="w-4 h-4 text-amber-600" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
