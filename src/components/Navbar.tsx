import React from 'react';
import { AnkeLogo } from './AnkeLogo';
import { OFFICIAL_LINKS } from '../data/vpnData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'top', label: 'Главная', href: '#top' },
    { id: 'mantle', label: 'Ядро Mantle', href: '#mantle' },
    { id: 'platforms', label: 'Устройства', href: '#platforms' },
    { id: 'features', label: 'Список серверов', href: '#features' },
    { id: 'pricing', label: 'Цены', href: '#pricing' },
    { id: 'support', label: 'Поддержка', href: '#support' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2A2A2A] bg-[#111111]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Official Brand Lockup */}
        <a
          href="#top"
          className="group flex items-center gap-3 text-lg font-bold tracking-tight text-[#FAFAFA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#FDE047]"
        >
          <AnkeLogo className="h-7 w-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-6" />
          <span>Anke</span>
        </a>

        {/* Zone 2: Official Navigation Links with Dynamic Scroll Highlighting */}
        <nav aria-label="Основная навигация" className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`transition-colors duration-200 whitespace-nowrap shrink-0 underline-offset-4 hover:underline ${
                  isActive
                    ? 'text-[#FDE047] font-semibold drop-shadow-[0_0_8px_rgba(253,224,71,0.4)]'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Official Primary Action ("Войти") */}
        <div className="flex items-center shrink-0">
          <a
            href={OFFICIAL_LINKS.appLogin}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-btn rounded-xl bg-[#FDE047] px-5 py-2 text-xs sm:text-sm font-bold text-black hover:bg-[#FDE047]/90 shadow-[0_0_20px_rgba(253,224,71,0.2)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDE047]"
          >
            Войти
          </a>
        </div>
      </div>
    </header>
  );
};
