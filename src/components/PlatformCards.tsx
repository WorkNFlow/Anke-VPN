import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Download, ChevronDown } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/vpnData';
import { SpotlightShell } from './AnkeLogo';

export const PlatformCards: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<'windows' | 'linux' | null>(null);
  const [showMsiOptions, setShowMsiOptions] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section
      id="platforms"
      ref={sectionRef}
      className="relative z-20 bg-[#111111] py-20 lg:py-28 border-b border-[#2A2A2A]"
    >
      {/* Subtle bottom metallic rim highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Official Section Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
            className="font-bold tracking-tight text-[#FAFAFA]"
          >
            Доступно на всех устройствах
          </h2>
          <p className="mt-3 text-base text-[#A1A1AA]">
            Используй Anke на смартфонах, планшетах и компьютерах
          </p>
        </motion.div>

        {/* 4 Glossy Cards Row: App Store, Google Play, Windows, Linux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. App Store */}
          <motion.a
            href={OFFICIAL_LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group block h-full focus-visible:outline-2 focus-visible:outline-[#FDE047]"
          >
            <SpotlightShell
              className="h-full group-hover:border-[#FDE047]/50 group-hover:shadow-[0_0_35px_rgba(253,224,71,0.1)]"
              innerClassName="h-full p-4 sm:p-5 flex items-center justify-between gap-3 bg-gradient-to-b from-white/[0.04] to-transparent"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FAFAFA] group-hover:border-[#FDE047]/40 group-hover:text-[#FDE047] transition-colors">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.67-.81 1.12-1.94 1-3.08-.96.04-2.13.64-2.82 1.45-.61.7-.15 1.86-1.03 2.97 1.08.08 2.18-.53 2.85-1.34z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="text-base font-bold text-[#FAFAFA] whitespace-nowrap">App Store</div>
                  <div className="text-xs text-[#A1A1AA] whitespace-nowrap">iOS &amp; macOS</div>
                </div>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[#FAFAFA] group-hover:bg-[#FDE047] group-hover:text-black transition-all duration-200">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </SpotlightShell>
          </motion.a>

          {/* 2. Google Play */}
          <motion.a
            href={OFFICIAL_LINKS.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group block h-full focus-visible:outline-2 focus-visible:outline-[#FDE047]"
          >
            <SpotlightShell
              className="h-full group-hover:border-[#FDE047]/50 group-hover:shadow-[0_0_35px_rgba(253,224,71,0.1)]"
              innerClassName="h-full p-4 sm:p-5 flex items-center justify-between gap-3 bg-gradient-to-b from-white/[0.04] to-transparent"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FAFAFA] group-hover:border-[#FDE047]/40 group-hover:text-[#FDE047] transition-colors">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="text-base font-bold text-[#FAFAFA] whitespace-nowrap">Google Play</div>
                  <div className="text-xs text-[#A1A1AA] whitespace-nowrap">Android</div>
                </div>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[#FAFAFA] group-hover:bg-[#FDE047] group-hover:text-black transition-all duration-200">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </SpotlightShell>
          </motion.a>

          {/* 3. Windows (with official Microsoft Store + .msi dropdown) */}
          <div className="relative h-full">
            <motion.button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'windows' ? null : 'windows')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FDE047]"
            >
              <SpotlightShell
                className={`h-full group-hover:border-[#FDE047]/50 group-hover:shadow-[0_0_35px_rgba(253,224,71,0.1)] ${
                  openMenu === 'windows' ? 'border-[#FDE047]/60' : ''
                }`}
                innerClassName="h-full p-4 sm:p-5 flex items-center justify-between gap-3 bg-gradient-to-b from-white/[0.04] to-transparent"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FAFAFA] group-hover:border-[#FDE047]/40 group-hover:text-[#FDE047] transition-colors">
                    <svg viewBox="0 0 22 22" className="h-5 w-5 fill-current" aria-hidden="true">
                      <rect width="10" height="10" />
                      <rect x="12" width="10" height="10" />
                      <rect y="12" width="10" height="10" />
                      <rect x="12" y="12" width="10" height="10" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-[#FAFAFA] whitespace-nowrap">Windows</div>
                    <div className="text-xs text-[#A1A1AA] whitespace-nowrap">
                      <span className="hidden lg:inline xl:hidden">MS</span>
                      <span className="lg:hidden xl:inline">Microsoft</span> Store / .msi
                    </div>
                  </div>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[#FAFAFA] group-hover:bg-[#FDE047] group-hover:text-black transition-all duration-200">
                  <Download className="h-4 w-4" />
                </span>
              </SpotlightShell>
            </motion.button>

            <AnimatePresence>
              {openMenu === 'windows' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'top center' }}
                  className="absolute left-0 right-0 top-full mt-2 z-40 double-bezel-shell shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                >
                  <div className="double-bezel-core p-2.5 space-y-1.5 bg-[#181818]">
                    <a
                      href={OFFICIAL_LINKS.microsoftStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-[#2A2A2A] bg-[#121212] hover:border-[#FDE047]/50 p-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg viewBox="0 0 22 22" width="18" height="18" aria-hidden="true">
                          <rect width="10" height="10" fill="#F25022" />
                          <rect x="12" width="10" height="10" fill="#7FBA00" />
                          <rect y="12" width="10" height="10" fill="#00A4EF" />
                          <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                        </svg>
                        <div>
                          <div className="text-xs font-bold text-[#FAFAFA]">Microsoft Store</div>
                          <div className="text-[11px] text-[#FDE047]">Рекомендуется</div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[#A1A1AA]" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowMsiOptions((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-[#A1A1AA] hover:bg-white/[0.04] hover:text-[#FAFAFA] cursor-pointer"
                    >
                      <span>Без магазина — установщик .msi</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          showMsiOptions ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {showMsiOptions && (
                      <div className="space-y-1 pl-2 pt-1 border-t border-[#2A2A2A]">
                        <a
                          href={OFFICIAL_LINKS.windowsMsiX64}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-md px-3 py-2 text-xs text-[#FAFAFA] hover:bg-[#FDE047] hover:text-black font-medium transition-colors"
                        >
                          Windows 10/11 (x64)
                        </a>
                        <a
                          href={OFFICIAL_LINKS.windowsMsiArm64}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-md px-3 py-2 text-xs text-[#FAFAFA] hover:bg-[#FDE047] hover:text-black font-medium transition-colors"
                        >
                          Windows 10/11 (ARM64)
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Linux (with official AppImage, .deb, .rpm dropdown) */}
          <div className="relative h-full">
            <motion.button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'linux' ? null : 'linux')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FDE047]"
            >
              <SpotlightShell
                className={`h-full group-hover:border-[#FDE047]/50 group-hover:shadow-[0_0_35px_rgba(253,224,71,0.1)] ${
                  openMenu === 'linux' ? 'border-[#FDE047]/60' : ''
                }`}
                innerClassName="h-full p-4 sm:p-5 flex items-center justify-between gap-3 bg-gradient-to-b from-white/[0.04] to-transparent"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FAFAFA] group-hover:border-[#FDE047]/40 group-hover:text-[#FDE047] transition-colors">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z" />
                      </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-[#FAFAFA] whitespace-nowrap">Linux</div>
                    <div className="text-xs text-[#A1A1AA] whitespace-nowrap">
                      <span className="hidden lg:inline xl:hidden">AppImg</span>
                      <span className="lg:hidden xl:inline">AppImage</span> / .deb / .rpm
                    </div>
                  </div>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[#FAFAFA] group-hover:bg-[#FDE047] group-hover:text-black transition-all duration-200">
                  <Download className="h-4 w-4" />
                </span>
              </SpotlightShell>
            </motion.button>

            <AnimatePresence>
              {openMenu === 'linux' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'top center' }}
                  className="absolute left-0 right-0 top-full mt-2 z-40 double-bezel-shell shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                >
                  <div className="double-bezel-core p-2 space-y-1 bg-[#181818]">
                    <a
                      href={OFFICIAL_LINKS.linuxAppImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#FAFAFA] hover:bg-[#FDE047] hover:text-black transition-colors"
                    >
                      <span>AppImage</span>
                      <Download className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={OFFICIAL_LINKS.linuxDeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#FAFAFA] hover:bg-[#FDE047] hover:text-black transition-colors"
                    >
                      <span>.deb</span>
                      <Download className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={OFFICIAL_LINKS.linuxRpm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#FAFAFA] hover:bg-[#FDE047] hover:text-black transition-colors"
                    >
                      <span>.rpm</span>
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
