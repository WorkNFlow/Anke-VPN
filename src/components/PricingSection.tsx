import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageSquare, Send, Mail, RotateCcw } from 'lucide-react';
import { CIS_PRICING_TERMS, GLOBAL_PRICING_TERMS, OFFICIAL_LINKS } from '../data/vpnData';
import { SpotlightShell } from './AnkeLogo';

interface PricingSectionProps {
  onOpenChat: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenChat }) => {
  const [region, setRegion] = useState<'cis' | 'global'>('cis');
  const [selectedGlobalMonths, setSelectedGlobalMonths] = useState<number>(1);

  const activeTerms = region === 'cis' ? CIS_PRICING_TERMS : GLOBAL_PRICING_TERMS;
  const activeTerm =
    region === 'cis'
      ? CIS_PRICING_TERMS[0]
      : GLOBAL_PRICING_TERMS.find((t) => t.months === selectedGlobalMonths) ||
        GLOBAL_PRICING_TERMS[0];

  return (
    <>
      {/* PRICING SECTION: Exact Official Copy ("Варианты подписок") */}
      <section id="pricing" className="relative py-24 lg:py-32 border-b border-[#2A2A2A]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8"
          >
            <h2
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.85rem)' }}
              className="font-bold tracking-tight text-[#FDE047]"
            >
              Варианты подписок
            </h2>
          </motion.div>

          {/* Region Switcher: СНГ vs Весь мир */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2A2A2A] bg-[#141416] p-1.5 shadow-lg">
              <button
                type="button"
                onClick={() => setRegion('cis')}
                className={`tactile-btn rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  region === 'cis'
                    ? 'bg-[#FDE047] text-black shadow-md'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                СНГ (Рубли)
              </button>
              <button
                type="button"
                onClick={() => setRegion('global')}
                className={`tactile-btn rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  region === 'global'
                    ? 'bg-[#FDE047] text-black shadow-md'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                Иностранные пользователи (USD)
              </button>
            </div>
          </div>

          {/* Two Official Cards: "Подписка" and "Индивидуальная подписка" */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Card 1: Подписка */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <SpotlightShell
                className="h-full border-[#FDE047]/45 shadow-[0_0_50px_rgba(253,224,71,0.07)]"
                innerClassName="h-full p-7 sm:p-9 flex flex-col justify-between bg-gradient-to-b from-[#FDE047]/[0.05] to-transparent"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
                      Подписка
                    </h3>
                    <span className="rounded-full border border-[#FDE047]/40 bg-[#FDE047]/10 px-3 py-1 text-xs font-mono text-[#FDE047]">
                      {region === 'cis' ? 'Тариф СНГ' : 'Global Tier'}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm sm:text-base text-[#A1A1AA]">
                    Для обычного пользования
                  </p>

                  {/* Exact Official Features List */}
                  <ul className="mt-7 space-y-3.5 text-sm sm:text-base text-[#FAFAFA]">
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE047]/15">
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M1.9 6.4 L4.6 9.1 L10.1 3.1"
                            stroke="#FDE047"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>До 5 устройств</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE047]/15">
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M1.9 6.4 L4.6 9.1 L10.1 3.1"
                            stroke="#FDE047"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Серверы без ограничений по трафику</span>
                    </li>
                  </ul>

                  {/* Official Price Display */}
                  <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex flex-wrap items-baseline gap-2 tabular-nums">
                    <motion.span
                      key={`${region}-${activeTerm.priceDisplay}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FDE047] font-mono"
                    >
                      {activeTerm.priceDisplay}
                    </motion.span>
                    <span className="text-base text-[#A1A1AA]">
                      {region === 'cis' ? '/ месяц' : `за ${activeTerm.label.toLowerCase()}`}
                    </span>
                    {region === 'global' && activeTerm.months > 1 && (
                      <span className="text-xs font-mono text-[#8E8E93] ml-1 bg-[#1c1c1f] px-2 py-0.5 rounded border border-[#2A2A2A]">
                        ≈ {activeTerm.perMonthDisplay} / мес
                      </span>
                    )}
                  </div>

                  {/* Pricing Terms */}
                  {region === 'cis' ? (
                    <div className="mt-5 rounded-xl border border-[#2A2A2A] bg-[#121212] p-4 text-xs sm:text-sm text-[#A1A1AA]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#FAFAFA]">Единый тариф для СНГ</span>
                        <span className="font-mono text-[#FDE047] font-bold">199 ₽ / месяц</span>
                      </div>
                      <p className="mt-1 text-xs text-[#8E8E93]">
                        Без скрытых условий и сложных долгосрочных контрактов.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {GLOBAL_PRICING_TERMS.map((term) => {
                        const active = selectedGlobalMonths === term.months;
                        return (
                          <button
                            key={term.months}
                            type="button"
                            onClick={() => setSelectedGlobalMonths(term.months)}
                            className={`tactile-btn rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                              active
                                ? 'border-[#FDE047] bg-[#FDE047]/15 text-[#FAFAFA]'
                                : 'border-[#2A2A2A] bg-[#121212] text-[#A1A1AA] hover:border-[#FAFAFA]/30 hover:text-[#FAFAFA]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-semibold text-[#FAFAFA]">
                                {term.label}
                              </span>
                              {term.discountPercent > 0 && (
                                <span className="text-[10px] font-mono font-bold text-[#FDE047]">
                                  −{term.discountPercent}%
                                </span>
                              )}
                            </div>
                            <div className="mt-1 text-xs font-mono text-[#A1A1AA] tabular-nums">
                              {term.priceDisplay}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-[#2A2A2A]">
                  <a
                    href={OFFICIAL_LINKS.appLogin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group tactile-btn w-full flex items-center justify-between rounded-full bg-[#FDE047] pl-6 pr-2.5 py-3 text-sm font-bold text-black hover:bg-[#FDE047]/95 shadow-[0_0_28px_rgba(253,224,71,0.2)]"
                  >
                    <span>Купить подписку</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </SpotlightShell>
            </motion.div>

            {/* Card 2: Индивидуальная подписка */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <SpotlightShell
                className="h-full hover:border-[#FDE047]/45"
                innerClassName="h-full p-7 sm:p-9 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
                    Индивидуальная подписка
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#A1A1AA]">
                    Для команд и нестандартных задач
                  </p>

                  {/* Exact Official Custom Features */}
                  <ul className="mt-7 space-y-3.5 text-sm sm:text-base text-[#FAFAFA]">
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE047]/15">
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M1.9 6.4 L4.6 9.1 L10.1 3.1"
                            stroke="#FDE047"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Больше пяти устройств — по запросу</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE047]/15">
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M1.9 6.4 L4.6 9.1 L10.1 3.1"
                            stroke="#FDE047"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Срок и условия — под вашу задачу</span>
                    </li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-[#2A2A2A]">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FDE047]">
                      Индивидуально
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#2A2A2A]">
                  <a
                    href="#support"
                    className="group tactile-btn w-full flex items-center justify-between rounded-full border border-[#2A2A2A] bg-[#121212] hover:border-[#FDE047]/60 pl-6 pr-2.5 py-3 text-sm font-bold text-[#FAFAFA]"
                  >
                    <span>Обсудить в поддержке</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-[#FDE047] group-hover:bg-[#FDE047] group-hover:text-black transition-all">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </div>
              </SpotlightShell>
            </motion.div>
          </div>

          {/* Official 15-Day Refund Banner ("Возврат в течение 15 дней") */}
          <motion.a
            href={OFFICIAL_LINKS.refundPage}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            className="group mt-6 block"
          >
            <SpotlightShell
              className="group-hover:border-[#FDE047]/50"
              innerClassName="p-6 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                  <RotateCcw className="h-5 w-5" />
                </span>
                <div>
                  <strong className="block text-base sm:text-lg font-bold text-[#FAFAFA]">
                    Возврат в течение 15 дней
                  </strong>
                  <span className="mt-0.5 block text-sm text-[#A1A1AA]">
                    Честно и прозрачно: не подошло — вернём деньги полностью, без объяснений и вопросов
                  </span>
                </div>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[#FDE047] group-hover:bg-[#FDE047] group-hover:text-black transition-all self-end sm:self-center">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </SpotlightShell>
          </motion.a>
        </div>
      </section>

      {/* OFFICIAL SUPPORT SECTION ("Поддержка") */}
      <section id="support" className="relative py-24 lg:py-28 border-b border-[#2A2A2A]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-10"
          >
            <h2
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              className="font-bold tracking-tight text-[#FAFAFA]"
            >
              Поддержка
            </h2>
            <p className="mt-3 text-base text-[#A1A1AA] leading-relaxed">
              Возникли вопросы? Напишите нам — отвечаем в течение одного рабочего дня. Укажите номер аккаунта, так решим быстрее.
            </p>
          </motion.div>

          {/* 3 Official Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Чат на сайте */}
            <motion.button
              type="button"
              onClick={onOpenChat}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group text-left cursor-pointer"
            >
              <SpotlightShell
                className="h-full group-hover:border-[#FDE047]/50"
                innerClassName="p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                    <MessageSquare className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-base font-bold text-[#FAFAFA]">Чат на сайте</div>
                    <div className="text-xs text-[#A1A1AA]">Ответим прямо здесь</div>
                  </div>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[#FDE047] group-hover:bg-[#FDE047] group-hover:text-black transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </SpotlightShell>
            </motion.button>

            {/* 2. Telegram @anke_support */}
            <motion.a
              href={OFFICIAL_LINKS.telegramSupport}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group block"
            >
              <SpotlightShell
                className="h-full group-hover:border-[#FDE047]/50"
                innerClassName="p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                    <Send className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-base font-bold text-[#FAFAFA]">Telegram</div>
                    <div className="text-xs text-[#A1A1AA]">@anke_support</div>
                  </div>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[#FDE047] group-hover:bg-[#FDE047] group-hover:text-black transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </SpotlightShell>
            </motion.a>

            {/* 3. Почта support@anke.dev */}
            <motion.a
              href={OFFICIAL_LINKS.emailSupport}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group block"
            >
              <SpotlightShell
                className="h-full group-hover:border-[#FDE047]/50"
                innerClassName="p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#121212] text-[#FDE047]">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-base font-bold text-[#FAFAFA]">Почта</div>
                    <div className="text-xs text-[#A1A1AA]">support@anke.dev</div>
                  </div>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[#FDE047] group-hover:bg-[#FDE047] group-hover:text-black transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </SpotlightShell>
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
};
