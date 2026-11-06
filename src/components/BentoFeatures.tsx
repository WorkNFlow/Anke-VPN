import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Zap, Lock, Globe, Check, Smartphone, Laptop, Monitor } from 'lucide-react';
import { OFFICIAL_SERVERS, OfficialServer } from '../data/vpnData';
import { SpotlightShell } from './AnkeLogo';

export const BentoFeatures: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeServer, setActiveServer] = useState<OfficialServer>(OFFICIAL_SERVERS[5]); // Албания YouTube без рекламы
  const [activeRule, setActiveRule] = useState<string>('all');
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

                {/* Animated High-Speed Light Streams */}
                <div className="space-y-2.5">
                  {[0.92, 1, 0.85].map((widthRatio, idx) => (
                    <div
                      key={idx}
                      className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#1E1E1E]"
                    >
                      <motion.div
                        initial={{ width: '35%' }}
                        whileInView={{ width: `${widthRatio * 100}%` }}
                        viewport={{ once: false }}
                        animate={{
                          width: isSpeedBoosted ? '100%' : `${widthRatio * 100}%`,
                        }}
                        transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FDE047]/40 via-[#FDE047] to-[#FAFAFA]"
                      />
                    </div>
                  ))}
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

          {/* BENTO CARD 3: Доступность & Exact Official Server List (Col Span 5 - поуже, в 1 столбец) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <SpotlightShell
              className="h-full hover:border-[#FDE047]/45"
              innerClassName="h-full p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047] shrink-0">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FAFAFA]">
                        Доступность
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1A1AA]">
                        Моментальное подключение к серверам
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#FDE047] self-start sm:self-center shrink-0">
                    Премиум серверы
                  </span>
                </div>

                {/* Exact 8 Official Production Servers in 1 Single Column */}
                <div className="flex flex-col gap-2">
                  {OFFICIAL_SERVERS.map((server, idx) => {
                    const isSelected = activeServer.id === server.id;
                    return (
                      <motion.button
                        key={server.id}
                        type="button"
                        onClick={() => setActiveServer(server)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.3,
                          delay: idx * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all cursor-pointer ${
                          isSelected
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
                          <span className="shrink-0 rounded-lg border border-[#FDE047]/40 bg-[#FDE047]/15 px-2 py-0.5 text-[10px] font-medium text-[#FAFAFA]">
                            <strong className="text-[#FDE047]">{server.tag.name}</strong>{' '}
                            <span className="text-[#A1A1AA]">{server.tag.note}</span>
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
            </SpotlightShell>
          </motion.div>

          {/* BENTO CARD 4: Подписка для нескольких устройств (Col Span 7 - пошире) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <SpotlightShell
              className="h-full hover:border-[#FDE047]/45"
              innerClassName="h-full p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#FDE047]/35 bg-[#FDE047]/10 px-3 py-1 text-xs font-mono font-semibold text-[#FDE047]">
                    До 5 устройств
                  </span>
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    Единая подписка
                  </span>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
                  Умные правила и работа на всех устройствах
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  Настраивайте, где должен работать Anke, и подключайте смартфоны, планшеты и компьютеры одновременно без потери скорости.
                </p>
              </div>

              {/* Clean, Modern Devices & Rules Panel */}
              <div className="flex-1 flex flex-col justify-between gap-4 rounded-2xl border border-[#2A2A2A] bg-[#121212] p-4 sm:p-5">
                {/* Clean Rule Selector */}
                <div className="rounded-xl border border-[#2A2A2A] bg-[#141416] p-3.5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-[#FAFAFA] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#FDE047]" />
                      Где должен работать Anke?
                    </span>
                    <span className="text-[11px] text-[#A1A1AA]">
                      Умная маршрутизация
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'all', title: 'Во всех приложениях' },
                      { id: 'youtube', title: 'YouTube без рекламы' },
                      { id: 'local', title: 'Локальные сайты напрямую' },
                    ].map((rule) => {
                      const isActive = activeRule === rule.id;
                      return (
                        <button
                          key={rule.id}
                          type="button"
                          onClick={() => setActiveRule(rule.id)}
                          className={`rounded-lg px-2.5 py-2 text-center text-xs font-medium transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#FDE047] text-black font-semibold shadow-sm'
                              : 'bg-[#1C1C1E] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#2A2A2A]'
                          }`}
                        >
                          {rule.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Connected Devices Grid (Clean 2-column with ZERO clutter) */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#A1A1AA] px-1">
                    <span>Подключенные устройства</span>
                    <span className="font-mono text-[#FDE047]">4 из 5 активно</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { name: 'iPhone 15 Pro Max', icon: Smartphone, region: 'Швеция' },
                      { name: 'MacBook Pro 16"', icon: Laptop, region: 'Германия' },
                      { name: 'Windows 11 PC', icon: Monitor, region: 'Албания (YouTube)' },
                      { name: 'Samsung Galaxy', icon: Smartphone, region: 'Финляндия' },
                    ].map((dev, i) => (
                      <motion.div
                        key={dev.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#2A2A2A] bg-[#181818] p-3 transition-colors hover:border-[#FDE047]/35"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                            <dev.icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-semibold text-[#FAFAFA] truncate">
                              {dev.name}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              <span className="text-[11px] text-[#A1A1AA]">Подключено</span>
                            </div>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-[#FDE047]">
                          {dev.region}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Available 5th Slot Status Indicator */}
                <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-3 text-xs text-[#A1A1AA]">
                  <span className="flex items-center gap-2 font-mono text-[#FAFAFA]">
                    <span className="flex h-2 w-2 rounded-full bg-[#FDE047] shadow-[0_0_8px_rgba(253,224,71,0.5)]" />
                    1 слот свободен
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#A1A1AA]">
                    Подключите планшет, второй телефон или Smart TV
                  </span>
                </div>
              </div>
            </SpotlightShell>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
