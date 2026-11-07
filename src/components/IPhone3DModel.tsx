import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Globe,
  Settings,
  Copy,
  Check,
  CreditCard,
  ChevronRight,
  LogOut,
  Send,
  Headphones,
  Power,
} from 'lucide-react';
import { OFFICIAL_SERVERS } from '../data/vpnData';
import { AnkeLogo } from './AnkeLogo';

export type IPhoneTab = 'home' | 'regions' | 'settings';

interface IPhone3DModelProps {
  activeTab: IPhoneTab;
  onTabChange: (tab: IPhoneTab) => void;
  customScreenshotUrl?: string | null;
  className?: string;
}

// 16 Z-extrusion slices from -1px to -22px to form a solid, continuous 3D Titanium block
const EXTRUSION_SLICES = Array.from({ length: 16 }, (_, i) => {
  const depth = -(i + 1) * 1.4; // from -1.4px to -22.4px
  const isChamfer = i === 0 || i === 15;
  const isAntennaBand = i === 7 || i === 8;
  return { depth, isChamfer, isAntennaBand, index: i };
});

export const IPhone3DModel: React.FC<IPhone3DModelProps> = ({
  activeTab,
  onTabChange,
  customScreenshotUrl,
  className = '',
}) => {
  const [selectedServerId, setSelectedServerId] = useState<string>('fi-hel');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  const currentServer =
    OFFICIAL_SERVERS.find((s) => s.id === selectedServerId) || OFFICIAL_SERVERS[0];

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1234 5678 9012 3456');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 1800);
  };

  return (
    <div
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative mx-auto w-[300px] sm:w-[320px] h-[635px] select-none ${className}`}
    >
      {/* =====================================================================
          1. DEEP 3D SPATIAL DROP SHADOW PLANE (translateZ: -42px)
         ===================================================================== */}
      <div
        aria-hidden="true"
        style={{
          transform: 'translateZ(-42px) scale(0.96)',
        }}
        className="pointer-events-none absolute inset-0 rounded-[56px] bg-black/85 blur-2xl"
      />

      {/* =====================================================================
          2. VOLUMETRIC TITANIUM CHASSIS SLICES (translateZ: -1.4px to -22.4px)
          Creates real 3D physical thickness from any rotation angle!
         ===================================================================== */}
      {EXTRUSION_SLICES.map(({ depth, isChamfer, isAntennaBand, index }) => (
        <div
          key={index}
          aria-hidden="true"
          style={{
            transform: `translateZ(${depth}px)`,
            background: isChamfer
              ? 'linear-gradient(135deg, #71717A 0%, #27272A 45%, #52525B 75%, #18181B 100%)'
              : isAntennaBand
                ? 'linear-gradient(135deg, #52525B 0%, #3F3F46 50%, #27272A 100%)'
                : 'linear-gradient(135deg, #636369 0%, #38383D 30%, #242428 65%, #48484F 88%, #1C1C1F 100%)',
            boxShadow:
              index === 0
                ? '0 0 0 1px rgba(255,255,255,0.28)'
                : index === 15
                  ? '0 0 0 1px rgba(0,0,0,0.8)'
                  : '0 0 0 0.5px rgba(255,255,255,0.08)',
          }}
          className="pointer-events-none absolute inset-0 rounded-[52px]"
        />
      ))}

      {/* =====================================================================
          3. 3D SIDE RAIL FACETS (Left/Right Buttons + Bottom USB-C & Speaker)
         ===================================================================== */}
      {/* Left Side Wall Facet (Action & Volume Buttons in 3D space) */}
      <div
        aria-hidden="true"
        style={{
          width: '22px',
          transform: 'translateX(-11px) translateZ(-11px) rotateY(-90deg)',
          transformStyle: 'preserve-3d',
        }}
        className="pointer-events-none absolute top-[90px] bottom-[90px] left-0 flex flex-col items-center justify-start pt-4 gap-4"
      >
        {/* Action Button */}
        <div
          style={{ transform: 'translateZ(2px)' }}
          className="h-7 w-2.5 rounded-full bg-gradient-to-b from-[#71717A] via-[#3F3F46] to-[#27272A] border border-white/25 shadow-md"
        />
        {/* Volume Up */}
        <div
          style={{ transform: 'translateZ(2px)' }}
          className="h-12 w-2.5 rounded-full bg-gradient-to-b from-[#71717A] via-[#3F3F46] to-[#27272A] border border-white/25 shadow-md"
        />
        {/* Volume Down */}
        <div
          style={{ transform: 'translateZ(2px)' }}
          className="h-12 w-2.5 rounded-full bg-gradient-to-b from-[#71717A] via-[#3F3F46] to-[#27272A] border border-white/25 shadow-md"
        />
      </div>

      {/* Right Side Wall Facet (Power Button in 3D space) */}
      <div
        aria-hidden="true"
        style={{
          width: '22px',
          transform: 'translateX(11px) translateZ(-11px) rotateY(90deg)',
          transformStyle: 'preserve-3d',
        }}
        className="pointer-events-none absolute top-[140px] h-24 right-0 flex items-center justify-center"
      >
        <div
          style={{ transform: 'translateZ(2px)' }}
          className="h-16 w-2.5 rounded-full bg-gradient-to-b from-[#71717A] via-[#3F3F46] to-[#27272A] border border-white/25 shadow-md"
        />
      </div>

      {/* Bottom Edge Wall Facet (USB-C Port & Speaker Grille visible when tilted) */}
      <div
        aria-hidden="true"
        style={{
          height: '22px',
          transform: 'translateY(11px) translateZ(-11px) rotateX(-90deg)',
        }}
        className="pointer-events-none absolute bottom-0 left-[54px] right-[54px] flex items-center justify-center gap-4 bg-gradient-to-r from-[#27272A] via-[#48484F] to-[#27272A] rounded-full border-y border-white/10"
      >
        {/* Left Speaker Dots */}
        <div className="flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-black/80" />
          <span className="h-1 w-1 rounded-full bg-black/80" />
          <span className="h-1 w-1 rounded-full bg-black/80" />
        </div>
        {/* USB-C Port Cutout */}
        <div className="h-2.5 w-7 rounded-full bg-[#09090B] border border-white/20 shadow-inner" />
        {/* Right Speaker Dots */}
        <div className="flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-black/80" />
          <span className="h-1 w-1 rounded-full bg-black/80" />
          <span className="h-1 w-1 rounded-full bg-black/80" />
        </div>
      </div>

      {/* =====================================================================
          4. FRONT MACHINED TITANIUM FACE & RECESSED OLED DISPLAY (translateZ: 0px)
         ===================================================================== */}
      <div
        style={{
          transform: 'translateZ(0px)',
          transformStyle: 'preserve-3d',
          boxShadow:
            'inset 0 0 0 2px rgba(255,255,255,0.22), inset 0 0 6px 2px rgba(0,0,0,0.85)',
        }}
        className="relative h-full w-full rounded-[52px] bg-gradient-to-b from-[#45454A] via-[#27272B] to-[#1C1C1F] p-[10px]"
      >
        {/* Inner Black Bezel & OLED Screen */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="relative h-full w-full overflow-hidden rounded-[42px] bg-[#161618] border-[2px] border-black flex flex-col justify-between"
        >
          {/* Specular Glass Glare Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]"
          />

          {/* Dynamic Island */}
          <div className="relative z-20 pt-3 pb-2 flex justify-center bg-[#161618]">
            <div className="flex h-[25px] w-[96px] items-center justify-between rounded-full bg-black px-2.5 border border-white/[0.08] shadow-md">
              <span className="h-2.5 w-2.5 rounded-full bg-[#050505] ring-1 ring-[#222222]/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#050510] ring-1 ring-[#222222]/20" />
            </div>
          </div>

          {/* Screen Content Area */}
          {customScreenshotUrl ? (
            <div className="flex-1 overflow-hidden bg-[#141414]">
              <img
                src={customScreenshotUrl}
                alt="Экран интерфейса приложения Anke VPN"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="relative flex-1 overflow-hidden px-4 pt-2 pb-2 flex flex-col">
              <AnimatePresence mode="wait">
                {/* SCREEN 1: ГЛАВНАЯ (Home Connection Screen) */}
                {activeTab === 'home' && (
                  <motion.div
                    key="screen-home"
                    initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-1 flex-col justify-between py-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AnkeLogo className="h-5 w-auto" />
                        <span className="text-sm font-bold text-[#FAFAFA]">Anke</span>
                      </div>
                      <span className="rounded-full border border-[#FDE047]/35 bg-[#FDE047]/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-[#FDE047]">
                        Ядро Mantle
                      </span>
                    </div>

                    <div className="my-auto flex flex-col items-center text-center">
                      <div className="relative flex items-center justify-center">
                        {isConnected && (
                          <motion.div
                            animate={{ scale: [1, 1.55], opacity: [0.4, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                            className="pointer-events-none absolute h-28 w-28 rounded-full border border-[#FDE047]/50"
                          />
                        )}
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => setIsConnected((prev) => !prev)}
                          className={`relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer ${isConnected
                            ? 'border-[#FDE047] bg-[#FDE047] text-black shadow-[0_0_45px_rgba(253,224,71,0.35)]'
                            : 'border-[#2E2E32] bg-[#202024] text-[#A1A1AA]'
                            }`}
                        >
                          <Power className="h-10 w-10 stroke-[2.2]" />
                        </motion.button>
                      </div>

                      <div className="mt-5 text-lg font-bold text-[#FAFAFA]">
                        {isConnected ? 'Подключено' : 'Отключено'}
                      </div>
                      <div className="mt-1 text-xs text-[#A1A1AA]">
                        {isConnected
                          ? 'Канал 15 Гбит/с · Без ограничений'
                          : 'Нажмите для моментального подключения'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onTabChange('regions')}
                      className="flex w-full items-center justify-between rounded-2xl border border-[#2C2C30] bg-[#1E1E22] p-3.5 text-left hover:border-[#FDE047]/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={currentServer.flagUrl}
                          alt={currentServer.country}
                          referrerPolicy="no-referrer"
                          className="h-8 w-8 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#FAFAFA]">
                            {currentServer.country}
                          </div>
                          <div className="text-[11px] text-[#A1A1AA]">
                            {currentServer.city}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#A1A1AA]" />
                    </button>
                  </motion.div>
                )}

                {/* SCREEN 2: РЕГИОНЫ ("Список серверов") */}
                {activeTab === 'regions' && (
                  <motion.div
                    key="screen-regions"
                    initial={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-1 flex-col overflow-hidden"
                  >
                    <h4 className="text-base font-bold text-[#FAFAFA] mb-2">
                      Список серверов
                    </h4>
                    <div className="text-[11px] font-medium text-[#A1A1AA] mb-2">
                      Премиум серверы
                    </div>

                    <div className="flex-1 space-y-1 overflow-y-auto pr-1">
                      {OFFICIAL_SERVERS.map((server) => {
                        const isSelected = server.id === selectedServerId;
                        return (
                          <button
                            key={server.id}
                            type="button"
                            onClick={() => {
                              setSelectedServerId(server.id);
                              setIsConnected(true);
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-1.5 py-2 text-left hover:bg-white/[0.04] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`h-1.5 w-1.5 rounded-full shrink-0 transition-opacity ${isSelected ? 'bg-[#FDE047] opacity-100' : 'opacity-0'
                                  }`}
                              />
                              <img
                                src={server.flagUrl}
                                alt={server.country}
                                referrerPolicy="no-referrer"
                                className="h-7 w-7 rounded-full object-cover shrink-0 border border-white/10"
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-[#FAFAFA] truncate">
                                  {server.country}
                                </div>
                                <div className="text-[10px] text-[#8E8E93] truncate">
                                  {server.city}
                                </div>
                              </div>
                            </div>

                            {server.tag && (
                              <span className="shrink-0 text-[10px] font-medium inline-flex items-center gap-1.5">
                                <span className="text-[#FDE047] font-semibold">
                                  {server.tag.name}
                                </span>
                                <span className="text-[#8E8E93]">{server.tag.note}</span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* SCREEN 3: НАСТРОЙКИ ("Настройки") */}
                {activeTab === 'settings' && (
                  <motion.div
                    key="screen-settings"
                    initial={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-1 flex-col justify-between overflow-y-auto"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-[#FAFAFA]">Настройки</h4>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF453A]">
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Выход</span>
                        </span>
                      </div>

                      <div>
                        <div className="text-[11px] text-[#8E8E93] mb-1.5">Ваш номер</div>
                        <button
                          type="button"
                          onClick={handleCopyAccount}
                          className="flex w-full items-center justify-between rounded-xl border border-[#2C2C30] bg-[#1E1E22] px-3.5 py-2.5 text-left cursor-pointer hover:border-[#FDE047]/40 transition-colors"
                        >
                          <span className="font-mono text-xs font-bold tracking-wider text-[#FDE047]">
                            1234 5678 9012 3456
                          </span>
                          {copiedAccount ? (
                            <Check className="h-3.5 w-3.5 text-[#FDE047]" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-[#8E8E93]" />
                          )}
                        </button>
                      </div>

                      <div>
                        <div className="text-[11px] text-[#8E8E93] mb-1.5">Подписка</div>
                        <div className="flex items-center justify-between rounded-2xl border border-[#FDE047] bg-[#1E1E22] p-3.5">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-[#A1A1AA]">
                              <CreditCard className="h-4 w-4" />
                            </span>
                            <div>
                              <div className="text-xs font-bold text-[#FAFAFA]">Подписка</div>
                              <div className="text-[10px] text-[#8E8E93]">
                                Возобновится <span className="text-[#FAFAFA] font-semibold">26 октября</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-[#8E8E93]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl border border-[#2C2C30] bg-[#1E1E22] p-3.5">
                        <div>
                          <div className="text-xs font-bold text-[#FAFAFA]">
                            Где должен работать Anke?
                          </div>
                          <div className="text-[10px] text-[#8E8E93] mt-0.5">
                            Во всех местах · 1 правило
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-[#8E8E93]" />
                      </div>
                    </div>

                    <div className="space-y-2 pt-3">
                      <div className="flex items-center justify-between rounded-xl border border-[#2C2C30] bg-[#1E1E22] px-3.5 py-2.5 text-xs text-[#FAFAFA]">
                        <div className="flex items-center gap-2">
                          <Globe className="h-3.5 w-3.5 text-[#8E8E93]" />
                          <span>Сайт</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-[#8E8E93]" />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center justify-center rounded-xl border border-[#2C2C30] bg-[#1E1E22] py-2.5 text-[#8E8E93]">
                          <Settings className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-center rounded-xl border border-[#2C2C30] bg-[#1E1E22] py-2.5 text-[#FAFAFA]">
                          <Send className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-center rounded-xl border border-[#2C2C30] bg-[#1E1E22] py-2.5 text-[#8E8E93]">
                          <Headphones className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Authentic Bottom Tab Bar ("Главная" | "Регионы" | "Настройки") */}
          <div className="relative z-20 border-t border-white/[0.06] bg-[#161618] px-4 pt-2 pb-4">
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => onTabChange('home')}
                className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors cursor-pointer ${activeTab === 'home' ? 'text-[#FDE047]' : 'text-[#8E8E93] hover:text-[#FAFAFA]'
                  }`}
              >
                <Home className="h-4 w-4" />
                <span>Главная</span>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('regions')}
                className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors cursor-pointer ${activeTab === 'regions'
                  ? 'text-[#FDE047]'
                  : 'text-[#8E8E93] hover:text-[#FAFAFA]'
                  }`}
              >
                <Globe className="h-4 w-4" />
                <span>Регионы</span>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('settings')}
                className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors cursor-pointer ${activeTab === 'settings'
                  ? 'text-[#FDE047]'
                  : 'text-[#8E8E93] hover:text-[#FAFAFA]'
                  }`}
              >
                <Settings className="h-4 w-4" />
                <span>Настройки</span>
              </button>
            </div>
            <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-white/25" />
          </div>
        </div>
      </div>
    </div>
  );
};
