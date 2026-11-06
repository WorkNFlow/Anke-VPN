import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/vpnData';

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  time: string;
}

interface SupportChatWidgetProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

export const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({
  externalOpen,
  onExternalClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'support',
      text: 'Здравствуйте! Напишите ваш вопрос — ответим прямо здесь. Если вопрос по подписке, укажите номер аккаунта, так решим быстрее.',
      time: 'Сейчас',
    },
  ]);

  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
    }
  }, [externalOpen]);

  // Safe lazyOnload initialization pattern (AGENTS.md Rule #4)
  useEffect(() => {
    const initLazyChat = () => {
      setScriptReady(true);
    };

    if ('requestIdleCallback' in window) {
      const id = (
        window as Window & { requestIdleCallback: (cb: () => void) => number }
      ).requestIdleCallback(initLazyChat);
      return () => {
        if ('cancelIdleCallback' in window) {
          (
            window as Window & { cancelIdleCallback: (id: number) => void }
          ).cancelIdleCallback(id);
        }
      };
    } else {
      const timer = setTimeout(initLazyChat, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onExternalClose?.();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: 'Только что',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `s-${Date.now()}`,
          sender: 'support',
          text: 'Сообщение получено! Специалист поддержки уже подключается к диалогу. Вы также можете написать нам в Telegram @anke_support.',
          time: 'Только что',
        },
      ]);
    }, 550);
  };

  if (!scriptReady) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'bottom right' }}
            className="mb-3 w-[340px] sm:w-[370px] double-bezel-shell shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          >
            <div className="double-bezel-core overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] bg-[#141414] px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.svg"
                    alt="Anke"
                    referrerPolicy="no-referrer"
                    className="h-5 w-auto"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#FAFAFA]">
                      Поддержка Anke
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      Чат на сайте · Ответим прямо здесь
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Свернуть чат поддержки"
                  className="tactile-btn rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto p-4 space-y-3 bg-[#181818]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#FDE047] text-black font-medium'
                          : 'border border-[#2A2A2A] bg-[#121212] text-[#FAFAFA]'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="mt-1 text-[10px] text-[#A1A1AA]">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#2A2A2A] bg-[#141414] p-3">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1 rounded-lg border border-[#2A2A2A] bg-[#111111] px-3 py-2 text-xs text-[#FAFAFA] placeholder:text-[#A1A1AA]/60 focus:border-[#FDE047] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Отправить сообщение"
                    className="tactile-btn flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDE047] text-black hover:bg-[#FDE047]/90 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#A1A1AA] px-1">
                  <span>Telegram:</span>
                  <a
                    href={OFFICIAL_LINKS.telegramSupport}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#FDE047] hover:underline"
                  >
                    <span>@anke_support</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Открыть чат поддержки"
        className="flex items-center gap-2.5 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#FDE047]/60 px-4 py-3 text-xs font-bold text-[#FAFAFA] shadow-[0_12px_32px_rgba(0,0,0,0.75)] cursor-pointer"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDE047] text-black">
          <MessageSquare className="h-3.5 w-3.5" />
        </span>
        <span className="pr-1">Чат на сайте</span>
      </motion.button>
    </div>
  );
};
