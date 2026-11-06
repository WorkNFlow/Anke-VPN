/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroMantleChoreography } from './components/HeroMantleChoreography';
import { PlatformCards } from './components/PlatformCards';
import { BentoFeatures } from './components/BentoFeatures';
import { PricingSection } from './components/PricingSection';
import { SupportChatWidget } from './components/SupportChatWidget';
import { OFFICIAL_LINKS } from './data/vpnData';
import { AnkeLogo } from './components/AnkeLogo';

export default function App() {
  const [chatOpenFromSupport, setChatOpenFromSupport] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');

  useEffect(() => {
    const sectionIds = ['top', 'mantle', 'platforms', 'features', 'pricing', 'support'];

    const handleScroll = () => {
      // Bottom of page detection (support section)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('support');
        return;
      }

      // Top of page detection
      if (window.scrollY < 120) {
        setActiveSection('top');
        return;
      }

      const scrollPos = window.scrollY + 220; // Offset for header and mid-viewport detection

      // Check sections from bottom to top
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('top');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="top"
      className="min-h-[100dvh] bg-[#111111] text-[#FAFAFA] flex flex-col selection:bg-[#FDE047] selection:text-black"
    >
      {/* Official 3-Zone Top Bar with active section scroll spy */}
      <Navbar activeSection={activeSection} />

      {/* Main Content */}
      <main className="flex-1">
        {/* UNIFIED HERO & MANTLE CHOREOGRAPHY:
            1. Hero Section (z-10) with smart OS-detected direct download CTA
            2. Single 3D iPhone flying uninterrupted directly from Hero into Mantle
            3. Pinned "Mantle — ядро Anke" section (steps 01, 02, 03) + "VLESS против Mantle" benchmarks */}
        <HeroMantleChoreography />

        {/* SECTION 2: PLATFORMS ("Доступно на всех устройствах") */}
        <PlatformCards />

        {/* BENTO GRID FEATURES & OFFICIAL SERVER LIST */}
        <BentoFeatures />

        {/* PRICING PLANS, 15-DAY REFUND BANNER & SUPPORT */}
        <PricingSection onOpenChat={() => setChatOpenFromSupport(true)} />
      </main>

      {/* OFFICIAL FOOTER */}
      <footer className="bg-[#111111] py-12 text-xs text-[#A1A1AA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-3 text-sm font-bold text-[#FAFAFA]">
              <AnkeLogo className="h-6 w-auto" />
              <span>Anke</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
              <a
                href={OFFICIAL_LINKS.pricingPage}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAFAFA] transition-colors"
              >
                Цены
              </a>
              <a
                href={OFFICIAL_LINKS.privacyPage}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAFAFA] transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href={OFFICIAL_LINKS.termsPage}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAFAFA] transition-colors"
              >
                Условия использования
              </a>
              <a
                href={OFFICIAL_LINKS.refundPage}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAFAFA] transition-colors"
              >
                Возврат средств
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-[#A1A1AA]">
            <p>
              © 2026 Anke LLC ·{' '}
              <a
                href={OFFICIAL_LINKS.ankeLabs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FDE047] hover:underline"
              >
                ankelabs.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Global Floating Support Chat Widget */}
      <SupportChatWidget
        externalOpen={chatOpenFromSupport}
        onExternalClose={() => setChatOpenFromSupport(false)}
      />
    </div>
  );
}
