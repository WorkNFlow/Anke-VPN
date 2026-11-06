import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { OFFICIAL_LINKS, MANTLE_BENCHMARKS } from '../data/vpnData';
import { SpotlightShell } from './AnkeLogo';
import { PlatformCards } from './PlatformCards';
import { IPhone3DModel, IPhoneTab } from './IPhone3DModel';

export const HeroMantleChoreography: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const heroSlotRef = useRef<HTMLDivElement>(null);
  const mantleTrackRef = useRef<HTMLDivElement>(null);
  const mantleSlotRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<IPhoneTab>('home');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [pinProgress, setPinProgress] = useState<number>(0);
  const [flightProgress, setFlightProgress] = useState<number>(0);

  // Direct pixel coordinates for the single unified 3D iPhone
  const [phoneCoords, setPhoneCoords] = useState<{
    x: number;
    y: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
    ready: boolean;
  }>({
    x: 0,
    y: 0,
    rotateX: 4,
    rotateY: -8,
    rotateZ: -2,
    scale: 1,
    ready: false,
  });

  // Smooth spring values for 3D rotations so switching steps & parabolic flight feel silky
  const springRotateX = useSpring(4, { stiffness: 180, damping: 24 });
  const springRotateY = useSpring(-8, { stiffness: 180, damping: 24 });
  const springRotateZ = useSpring(-2, { stiffness: 180, damping: 24 });
  const springScale = useSpring(1, { stiffness: 180, damping: 24 });

  const updateChoreography = useCallback(() => {
    const heroEl = heroSlotRef.current;
    const mantleTrackEl = mantleTrackRef.current;
    const mantleSlotEl = mantleSlotRef.current;

    if (!heroEl || !mantleTrackEl || !mantleSlotEl) return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const stickyTopOffset = 64; // height of sticky navbar

    const heroRect = heroEl.getBoundingClientRect();
    const mantleTrackRect = mantleTrackEl.getBoundingClientRect();
    const mantleSlotRect = mantleSlotEl.getBoundingClientRect();

    // Document Y where the Mantle section locks onto the screen
    const mantleTrackDocTop = mantleTrackRect.top + scrollY;
    const arrivalScrollY = Math.max(1, mantleTrackDocTop - stickyTopOffset);

    // Total scroll distance while the Mantle section stays pinned
    const pinDuration = Math.max(1, mantleTrackRect.height - (vh - stickyTopOffset));

    // Phase 1 progress: t in [0, 1] from Hero (0) to Mantle Lock (1)
    const rawT = Math.min(1, Math.max(0, scrollY / arrivalScrollY));
    // Smoothstep easing for vertical/horizontal base interpolation
    const smoothT = rawT * rawT * (3 - 2 * rawT);
    // Symmetric parabola 4 * t * (1 - t), peaking at 1.0 when passing behind #platforms
    const parabola = 4 * rawT * (1 - rawT);

    // Horizontal parabolic arc amplitude (sweeps inward toward center on desktop, then back out to right slot)
    const arcAmplitude = shouldReduceMotion ? 0 : vw >= 1024 ? -210 : vw >= 640 ? -70 : 0;

    // Exact interpolated viewport X and Y
    const currentX =
      heroRect.left +
      (mantleSlotRect.left - heroRect.left) * smoothT +
      arcAmplitude * parabola;

    const currentY =
      heroRect.top + (mantleSlotRect.top - heroRect.top) * smoothT;

    // Phase 2 progress: p in [0, 1] while pinned on the Mantle section
    const rawP = Math.min(1, Math.max(0, (scrollY - arrivalScrollY) / pinDuration));

    setFlightProgress(rawT);
    setPinProgress(rawP);

    // Determine active screen & 3D orientation
    let targetRotateX = 4;
    let targetRotateY = -8;
    let targetRotateZ = -2;
    let targetScale = 1;

    if (rawT < 1) {
      // In Hero or flying along the parabola behind "Доступно на всех устройствах"
      targetRotateZ = shouldReduceMotion ? 0 : -3 * (1 - rawT) - 14 * parabola;
      targetRotateY = shouldReduceMotion ? 0 : -18 * (1 - rawT) - 34 * parabola - 22 * rawT;
      targetRotateX = shouldReduceMotion ? 0 : 8 * (1 - rawT) + 20 * parabola + 10 * rawT;
      targetScale = shouldReduceMotion ? 1 : 1 - 0.04 * parabola;

      // While in Hero / early flight, show Главная; as it emerges into Mantle, ready step 01
      setActiveStepIndex(0);
      setActiveTab('home');
    } else {
      // Landed in Mantle! Step through 01 -> 02 -> 03 while Mantle is pinned
      if (rawP < 0.34) {
        const localP = rawP / 0.34;
        setActiveStepIndex(0);
        setActiveTab('home');
        targetRotateY = shouldReduceMotion ? 0 : -22 + 38 * localP;
        targetRotateX = shouldReduceMotion ? 0 : 10 - 6 * localP;
        targetRotateZ = shouldReduceMotion ? 0 : -2 + 4 * localP;
      } else if (rawP < 0.68) {
        const localP = (rawP - 0.34) / 0.34;
        setActiveStepIndex(1);
        setActiveTab('regions');
        targetRotateY = shouldReduceMotion ? 0 : 16 - 34 * localP;
        targetRotateX = shouldReduceMotion ? 0 : 4 + 6 * Math.sin(localP * Math.PI);
        targetRotateZ = shouldReduceMotion ? 0 : 2 - 4 * localP;
      } else {
        const localP = (rawP - 0.68) / 0.32;
        setActiveStepIndex(2);
        setActiveTab('settings');
        targetRotateY = shouldReduceMotion ? 0 : -18 + 6 * localP;
        targetRotateX = shouldReduceMotion ? 0 : 4 * (1 - localP);
        targetRotateZ = shouldReduceMotion ? 0 : -2 * (1 - localP);
      }
      targetScale = 1;
    }

    springRotateX.set(targetRotateX);
    springRotateY.set(targetRotateY);
    springRotateZ.set(targetRotateZ);
    springScale.set(targetScale);

    setPhoneCoords({
      x: currentX,
      y: currentY,
      rotateX: targetRotateX,
      rotateY: targetRotateY,
      rotateZ: targetRotateZ,
      scale: targetScale,
      ready: true,
    });
  }, [shouldReduceMotion, springRotateX, springRotateY, springRotateZ, springScale]);

  useEffect(() => {
    updateChoreography();
    let rafId: number | null = null;

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateChoreography();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [updateChoreography]);

  // Jump to a specific step in the pinned Mantle track when clicking 01, 02, or 03
  const handleJumpToStep = (stepIdx: number, tab: IPhoneTab) => {
    setActiveStepIndex(stepIdx);
    setActiveTab(tab);

    const mantleTrackEl = mantleTrackRef.current;
    if (!mantleTrackEl) return;

    const stickyTopOffset = 64;
    const vh = window.innerHeight;
    const mantleTrackDocTop = mantleTrackEl.getBoundingClientRect().top + window.scrollY;
    const arrivalScrollY = Math.max(1, mantleTrackDocTop - stickyTopOffset);
    const pinDuration = Math.max(1, mantleTrackEl.offsetHeight - (vh - stickyTopOffset));

    const targetRatio = stepIdx === 0 ? 0.12 : stepIdx === 1 ? 0.5 : 0.85;
    window.scrollTo({
      top: arrivalScrollY + pinDuration * targetRatio,
      behavior: 'smooth',
    });
  };

  const steps: {
    tab: IPhoneTab;
    num: string;
    title: string;
    desc: string;
  }[] = [
    {
      tab: 'home',
      num: '01',
      title: '01. Моментальное подключение',
      desc: 'Запуск туннеля в одно касание без задержек и лишних настроек.',
    },
    {
      tab: 'regions',
      num: '02',
      title: '02. Премиум серверы и YouTube\u00A0без\u00A0рекламы',
      desc: 'Быстрое переключение между локациями в Европе, США и Азии прямо из списка регионов.',
    },
    {
      tab: 'settings',
      num: '03',
      title: '03. Прозрачное управление подпиской',
      desc: 'Доступ по персональному номеру аккаунта, гибкие правила работы и связь с поддержкой в один клик.',
    },
  ];

  return (
    <div className="relative">

      {/* =====================================================================
          SINGLE UNIFIED 3D IPHONE LAYER (z-20)
          Sits ABOVE Hero (z-10) & Mantle (z-10), and UNDERNEATH Platforms (z-30)!
         ===================================================================== */}
      <div
        style={{ perspective: 1400 }}
        className={`fixed inset-0 z-20 pointer-events-none transition-opacity duration-200 ${
          phoneCoords.ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div
          style={{
            x: phoneCoords.x,
            y: phoneCoords.y,
            rotateX: springRotateX,
            rotateY: springRotateY,
            rotateZ: springRotateZ,
            scale: springScale,
            transformStyle: 'preserve-3d',
          }}
          className="absolute top-0 left-0 w-[300px] sm:w-[320px] pointer-events-auto will-change-transform"
        >
          {/* Ambient golden aura following the single 3D iPhone */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[#FDE047]/[0.1] blur-3xl"
          />
          <IPhone3DModel
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              const idx = tab === 'home' ? 0 : tab === 'regions' ? 1 : 2;
              setActiveStepIndex(idx);
            }}
          />
        </motion.div>
      </div>

      {/* =====================================================================
          SECTION 1: HERO (z-10)
         ===================================================================== */}
      <section className="relative z-10 overflow-hidden border-b border-[#2A2A2A] bg-structural-grid py-16 sm:py-24 lg:py-28">
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.04, 0.08, 0.04],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[480px] w-[920px] rounded-full bg-[#FDE047] blur-[130px]"
        />

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Expanded to fill available space up to the 3D iPhone */}
            <div className="lg:col-span-7 xl:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: 'clamp(2.75rem, 5.6vw, 5.25rem)' }}
                className="w-full font-bold tracking-tight text-[#FAFAFA] leading-[1.04]"
              >
                Быстрое и <span className="text-[#FDE047]">приватное</span> соединение
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 w-full max-w-2xl text-xl sm:text-2xl text-[#A1A1AA] leading-relaxed"
              >
                Стабильная работа, моментальное подключение
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <motion.a
                  href={OFFICIAL_LINKS.appLogin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-4 rounded-full bg-[#FDE047] pl-8 pr-3.5 py-4 text-base sm:text-lg font-bold text-black shadow-[0_0_35px_rgba(253,224,71,0.25)] transition-shadow hover:shadow-[0_0_50px_rgba(253,224,71,0.4)] whitespace-nowrap shrink-0"
                >
                  <span>Купить подписку</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/15 text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </motion.a>
              </motion.div>

              <div className="mt-8 flex items-center gap-3 text-xs sm:text-sm text-[#A1A1AA]">
                <span>Листайте вниз — смартфон проследует за вами</span>
              </div>
            </div>

            {/* Right Column: Hero Launch Anchor Slot for the Single 3D iPhone */}
            <div className="lg:col-span-5 xl:col-span-4 relative flex justify-center lg:justify-end">
              {/* Exact Bounding Box Anchor for Hero iPhone Start Position */}
              <div
                ref={heroSlotRef}
                className="w-[300px] sm:w-[320px] h-[635px] shrink-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: PLATFORMS ("Доступно на всех устройствах") — z-30!
          The z-20 3D iPhone physically passes UNDERNEATH this section!
         ===================================================================== */}
      <PlatformCards />

      {/* =====================================================================
          SECTION 3: MANTLE CORE STICKY PIN TRACK & BENCHMARKS (z-10)
         ===================================================================== */}
      <section id="mantle" className="relative z-10 border-b border-[#2A2A2A]">
        {/* Tall Sticky Track (320vh) — locks scroll while stepping through 01, 02, 03 */}
        <div ref={mantleTrackRef} className="relative h-[320vh]">
          <div className="sticky top-[64px] min-h-[calc(100dvh-64px)] flex items-center py-10 overflow-hidden">
            <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column: Header + Pinned Scroll Progress + Steps 01, 02, 03 */}
                <div className="lg:col-span-6">
                  <div className="mb-8">
                    <h2
                      style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)' }}
                      className="font-bold tracking-tight text-[#FAFAFA] leading-[1.08]"
                    >
                      Mantle — ядро <span className="text-[#FDE047]">Anke</span>
                    </h2>
                    <p className="mt-2.5 text-base sm:text-lg text-[#A1A1AA]">
                      Не VLESS и не готовая сборка — своё ядро, написанное с нуля
                    </p>
                  </div>

                  {/* Steps List with Continuous Scroll Progress Bar */}
                  <div className="relative pl-5 space-y-3.5">
                    {/* Vertical Track Line */}
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#2A2A2A] overflow-hidden"
                    >
                      <div
                        style={{ height: `${Math.round(pinProgress * 100)}%` }}
                        className="w-full bg-[#FDE047] shadow-[0_0_12px_#FDE047] transition-all duration-75"
                      />
                    </div>

                    {steps.map((step, idx) => {
                      const isActive = activeStepIndex === idx;
                      return (
                        <button
                          key={step.tab}
                          type="button"
                          onClick={() => handleJumpToStep(idx, step.tab)}
                          className="w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FDE047]"
                        >
                          <SpotlightShell
                            className={`transition-all duration-300 ${
                              isActive
                                ? 'border-[#FDE047] shadow-[0_0_35px_rgba(253,224,71,0.12)] translate-x-1'
                                : 'opacity-60 hover:opacity-90 hover:border-[#FAFAFA]/25'
                            }`}
                            innerClassName={`p-5 sm:p-6 transition-colors ${
                              isActive
                                ? 'bg-gradient-to-r from-[#FDE047]/[0.08] to-transparent'
                                : ''
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <h3
                                className={`text-base sm:text-lg font-bold tracking-tight transition-colors flex-1 min-w-0 ${
                                  isActive ? 'text-[#FDE047]' : 'text-[#FAFAFA]'
                                }`}
                              >
                                {step.title}
                              </h3>
                              <span
                                className={`text-xs font-mono px-2.5 py-0.5 rounded-md whitespace-nowrap shrink-0 ${
                                  isActive
                                    ? 'bg-[#FDE047] text-black font-bold'
                                    : 'bg-[#222226] text-[#A1A1AA]'
                                }`}
                              >
                                {step.num} / 03
                              </span>
                            </div>
                            <p className="mt-1.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                              {step.desc}
                            </p>
                          </SpotlightShell>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Mantle Landing Anchor Slot for the Single 3D iPhone */}
                <div className="lg:col-span-6 relative flex justify-center">
                  <div
                    ref={mantleSlotRef}
                    className="w-[300px] sm:w-[320px] h-[635px] shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: Exact "VLESS против Mantle" Benchmark Comparison (scrolls normally after step 03!) */}
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 pb-24 lg:pb-32 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightShell
              className="border-[#2A2A2A] hover:border-[#FDE047]/35"
              innerClassName="p-6 sm:p-10 lg:p-12 bg-[#161616]"
            >
              <div className="max-w-2xl">
                <h3
                  style={{ fontSize: 'clamp(1.85rem, 3.5vw, 3rem)' }}
                  className="font-bold tracking-tight text-[#FAFAFA] leading-[1.1]"
                >
                  VLESS против <span className="text-[#FDE047]">Mantle</span>
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#A1A1AA]">
                  Anke и Happ на одинаковой нагрузке: чем короче полоска, тем лучше
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-[#FAFAFA]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-7 rounded-full bg-[#FDE047]" />
                    <span>Anke · Mantle</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-7 rounded-full bg-[#52555E]" />
                    <span className="text-[#A1A1AA]">Happ · VLESS</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:grid md:grid-cols-12 gap-6 mt-10 pb-3 border-b border-[#2A2A2A] text-sm font-semibold text-[#A1A1AA]">
                <div className="md:col-span-4" />
                <div className="md:col-span-4">iPhone</div>
                <div className="md:col-span-4">Android</div>
              </div>

              <div className="divide-y divide-[#2A2A2A]">
                {MANTLE_BENCHMARKS.map((row, idx) => (
                  <div
                    key={row.id}
                    className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    <div className="md:col-span-4">
                      <div className="text-base sm:text-lg font-bold text-[#FAFAFA]">
                        {row.metric}
                      </div>
                      <div className="text-xs sm:text-sm text-[#8E8E93] mt-0.5">
                        {row.subtitle}
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <div className="flex items-center justify-between md:block mb-2">
                        <span className="text-xs font-medium text-[#8E8E93] md:hidden">
                          iPhone
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#FDE047] tabular-nums">
                          {row.iphone.label}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded-full bg-transparent overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.iphone.mantlePercent}%` }}
                            viewport={{ once: false, margin: '-40px' }}
                            transition={{
                              duration: 0.75,
                              delay: idx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full min-w-[12px] rounded-full bg-[#FDE047] shadow-[0_0_16px_rgba(253,224,71,0.35)]"
                          />
                        </div>
                        <div className="h-3 w-full rounded-full bg-transparent overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.iphone.vlessPercent}%` }}
                            viewport={{ once: false, margin: '-40px' }}
                            transition={{
                              duration: 0.85,
                              delay: idx * 0.08 + 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full rounded-full bg-[#4A4D55]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <div className="flex items-center justify-between md:block mb-2">
                        <span className="text-xs font-medium text-[#8E8E93] md:hidden">
                          Android
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#FDE047] tabular-nums">
                          {row.android.label}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded-full bg-transparent overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.android.mantlePercent}%` }}
                            viewport={{ once: false, margin: '-40px' }}
                            transition={{
                              duration: 0.75,
                              delay: idx * 0.08 + 0.1,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full min-w-[12px] rounded-full bg-[#FDE047] shadow-[0_0_16px_rgba(253,224,71,0.35)]"
                          />
                        </div>
                        <div className="h-3 w-full rounded-full bg-transparent overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.android.vlessPercent}%` }}
                            viewport={{ once: false, margin: '-40px' }}
                            transition={{
                              duration: 0.85,
                              delay: idx * 0.08 + 0.15,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full rounded-full bg-[#4A4D55]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A2A2A] text-xs text-[#8E8E93]">
                iPhone 15 Pro Max и Samsung Galaxy S10 · Happ 4.3.0 · сервер во Франкфурте
              </div>
            </SpotlightShell>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
