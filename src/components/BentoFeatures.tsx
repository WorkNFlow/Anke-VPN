import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Zap, Lock, Globe, Check, Smartphone, Laptop, Monitor, Tablet, Tv } from 'lucide-react';
import { OFFICIAL_SERVERS, OfficialServer } from '../data/vpnData';
import { SpotlightShell } from './AnkeLogo';

export const BentoFeatures: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeServer, setActiveServer] = useState<OfficialServer>(OFFICIAL_SERVERS[5]); // Албания YouTube без рекламы
  const [isSpeedBoosted, setIsSpeedBoosted] = useState(false);
  const [isPrivacyMasked, setIsPrivacyMasked] = useState(true);

  return (
    <section id="features" className="relative py-24 lg:py-32 border-b border-[#2A2A2A]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Asymmetric Bento Grid with Official 3 Pillars + Server List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* BENTO CARD 1: Скорость (15 Гбит/с) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsSpeedBoosted(true)}
            onMouseLeave={() => setIsSpeedBoosted(false)}
            className="lg:col-span-7"
          >
            <SpotlightShell
              className="h-full hover:border-[#FDE047]/45"
              innerClassName="h-full p-6 sm:p-9 flex flex-col justify-between bg-gradient-to-br from-[#FDE047]/[0.05] via-transparent to-transparent"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                  <Zap className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
                  Скорость
                </h3>
                <p className="mt-2 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                  Серверы с каналом 15 Гбит/с. Никаких ограничений по трафику
                </p>
              </div>

              {/* Animated 15 Gbit/s Visualizer */}
              <div className="mt-8 rounded-2xl border border-[#2A2A2A] bg-[#121212] p-5 overflow-hidden relative">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs text-[#A1A1AA]">Пропускная способность</span>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FDE047] tabular-nums mt-0.5">
                      15 Гбит/с
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#FAFAFA]/80">
                    Безлимитный трафик
                  </span>
                </div>

                {/* Single Animated High-Speed Light Stream */}
                <div className="space-y-3">
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-[#1A1A1A] border border-white/5">
                    <motion.div
                      initial={{
                        width: shouldReduceMotion ? '95%' : '0%',
                        opacity: shouldReduceMotion ? 1 : 0,
                      }}
                      whileInView={{
                        width: isSpeedBoosted ? '100%' : '95%',
                        opacity: 1,
                      }}
                      viewport={{ once: false, margin: '-40px' }}
                      transition={{
                        width: {
                          duration: shouldReduceMotion ? 0 : isSpeedBoosted ? 0.35 : 1.1,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        opacity: { duration: 0.3 },
                      }}
                      className="relative h-full rounded-full bg-gradient-to-r from-[#FDE047]/40 via-[#FDE047] to-[#FAFAFA] shadow-[0_0_20px_rgba(253,224,71,0.45)]"
                    >
                      {/* Fluid kinetic shimmer pulse */}
                      {!shouldReduceMotion && (
                        <motion.div
                          animate={{ x: ['-100%', '350%'] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.2,
                            ease: 'linear',
                          }}
                          className="absolute inset-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                        />
                      )}
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#A1A1AA] pt-1">
                    <span>0 Гбит/с</span>
                    <span className="text-[#FDE047] font-mono font-medium">
                      Максимальная пропускная способность
                    </span>
                    <span className="font-mono">15 Гбит/с</span>
                  </div>
                </div>
              </div>
            </SpotlightShell>
          </motion.div>

          {/* BENTO CARD 2: Приватность */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <SpotlightShell
              className="h-full hover:border-[#FDE047]/45"
              innerClassName="h-full p-6 sm:p-9 flex flex-col justify-between"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                  <Lock className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
                  Приватность
                </h3>
                <p className="mt-2 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                  Ваши данные и активность не сохраняются
                </p>
              </div>

              {/* Interactive Animated Privacy Shield Demo */}
              <div
                onClick={() => setIsPrivacyMasked((prev) => !prev)}
                className="mt-8 rounded-2xl border border-[#2A2A2A] bg-[#121212] p-5 cursor-pointer select-none group"
              >
                <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-3">
                  <span>Статус активности</span>
                  <span className="text-[#FDE047] group-hover:underline">
                    {isPrivacyMasked ? 'Скрыто' : 'Нажмите для защиты'}
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { label: 'IP-адрес', raw: '185.220.101.42', masked: '•••.•••.•••.•••' },
                    { label: 'История посещений', raw: 'Не записывается', masked: 'Не сохраняется' },
                    { label: 'Личные данные', raw: 'Защищены', masked: 'Анонимно' },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-[#2A2A2A]/80 bg-[#181818] px-3.5 py-2.5"
                    >
                      <span className="text-[#A1A1AA]">{row.label}</span>
                      <motion.span
                        key={isPrivacyMasked ? 'masked' : 'raw'}
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.2 }}
                        className="text-[#FDE047] font-semibold"
                      >
                        {isPrivacyMasked ? row.masked : row.raw}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightShell>
          </motion.div>

          {/* BENTO CARD 3: Доступность & Exact Official Server List (Col Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <SpotlightShell
              className="h-full hover:border-[#FDE047]/45"
              innerClassName="h-full p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                    <Globe className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-[#FDE047]/30 bg-[#FDE047]/10 px-3 py-1 text-xs font-semibold text-[#FDE047]">
                    Премиум серверы
                  </span>
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
                  Доступность
                </h3>
                <p className="mt-2 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                  Моментальное подключение к серверам в ключевых локациях
                </p>

                {/* Exact 8 Official Production Servers in 2 balanced columns */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {OFFICIAL_SERVERS.map((server, idx) => {
                    const isSelected = activeServer.id === server.id;
                    return (
                      <motion.button
                        key={server.id}
                        type="button"
                        onClick={() => setActiveServer(server)}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.35,
                          delay: shouldReduceMotion ? 0 : idx * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ willChange: 'transform, opacity' }}
                        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-colors duration-200 cursor-pointer ${isSelected
                            ? 'border-[#FDE047] bg-[#FDE047]/[0.09] shadow-[0_0_24px_rgba(253,224,71,0.12)]'
                            : 'border-[#2A2A2A] bg-[#121212] hover:border-[#FAFAFA]/30'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={server.flagUrl}
                            alt={server.country}
                            referrerPolicy="no-referrer"
                            className="h-7 w-7 rounded-full object-cover shrink-0 border border-white/10"
                          />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-[#FAFAFA] truncate">
                              {server.country}
                            </div>
                            <div className="text-[11px] text-[#A1A1AA] truncate">
                              {server.city}
                            </div>
                          </div>
                        </div>

                        {server.tag ? (
                          <span className="shrink-0 rounded-lg border border-[#FDE047]/40 bg-[#FDE047]/15 px-2.5 py-1 text-[11px] font-medium text-[#FAFAFA] inline-flex items-center gap-1.5">
                            <strong className="text-[#FDE047] font-semibold tracking-normal">{server.tag.name}</strong>
                            <span className="text-[#FAFAFA]/90">{server.tag.note}</span>
                          </span>
                        ) : (
                          isSelected && (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FDE047] text-black">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </span>
                          )
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Active Server Telemetry Status Footer */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#2A2A2A] bg-[#121212] px-4 py-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FDE047] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FDE047]" />
                  </span>
                  <span className="text-[#A1A1AA]">
                    Активный узел:{' '}
                    <strong className="text-[#FAFAFA] font-semibold">
                      {activeServer.country}
                    </strong>{' '}
                    ({activeServer.city})
                  </span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[#FDE047] text-[11px]">
                  <span className="rounded bg-[#181818] px-2 py-0.5 border border-white/5">Mantle</span>
                  <span className="text-[#A1A1AA]">Задержка &lt; 20 мс</span>
                </div>
              </div>
            </SpotlightShell>
          </motion.div>

          {/* BENTO CARD 4: До 5 устройств (Col Span 5 — просторная и гармоничная) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <SpotlightShell
              className="h-full hover:border-[#FDE047]/45"
              innerClassName="h-full p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-[#FDE047]/30 bg-[#FDE047]/10 px-3 py-1 text-xs font-semibold text-[#FDE047]">
                    5 слотов
                  </span>
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
                  До 5 устройств
                </h3>
                <p className="mt-2 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                  Одна подписка защищает всю вашу технику одновременно
                </p>
              </div>

              {/* Spacious 5-Device Grid */}
              <div className="mt-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: Smartphone, label: 'Смартфон', os: 'iOS / Android' },
                    { icon: Laptop, label: 'Ноутбук', os: 'macOS / Windows' },
                    { icon: Monitor, label: 'ПК', os: 'Windows / Linux' },
                    { icon: Tablet, label: 'Планшет', os: 'iPadOS / Android' },
                  ].map((slot, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-3 rounded-xl border border-[#2A2A2A] bg-[#121212] p-3 transition-colors hover:border-[#FDE047]/40"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2A2A2A] bg-[#181818] text-[#FDE047]">
                        <slot.icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-[#FAFAFA] truncate">
                          {slot.label}
                        </div>
                        <div className="text-[10px] text-[#A1A1AA] truncate">
                          {slot.os}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* 5th Device Slot spanning full 2-columns */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="col-span-2 flex items-center justify-between rounded-xl border border-[#2A2A2A] bg-[#121212] p-3 transition-colors hover:border-[#FDE047]/40"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2A2A2A] bg-[#181818] text-[#FDE047]">
                        <Tv className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-[#FAFAFA] truncate">
                          Smart TV & ТВ-приставки
                        </div>
                        <div className="text-[10px] text-[#A1A1AA] truncate">
                          Apple TV, Android TV, Google TV
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] font-mono text-[#FDE047] hidden sm:inline-block">
                      15 Гбит/с
                    </span>
                  </motion.div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#121212] px-4 py-3 text-xs">
                  <span className="text-[#A1A1AA]">Скорость не делится</span>
                  <span className="font-mono text-[#FDE047] font-semibold">15 Гбит/с на каждый слот</span>
                </div>
              </div>
            </SpotlightShell>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
