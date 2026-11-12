import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, ScreenId } from '../types';
import { ASSETS, UI_COPY } from '../data/visaData';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export function TopBar({ activeScreen, onNavigate, lang }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'overview', label: UI_COPY.nav.overview[lang] },
    { id: 'pathways', label: UI_COPY.nav.pathways[lang] },
    { id: 'calculator', label: UI_COPY.nav.calculator[lang] },
  ];

  const handleSelect = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 h-[68px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand logo */}
        <button
          type="button"
          onClick={() => handleSelect('overview')}
          aria-label="Visa5S Trang chủ"
          className="inline-flex items-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1E78] rounded"
        >
          <img
            src={ASSETS.logo}
            alt="Visa5S — Hãy Đến Nơi Nào Bạn Muốn"
            referrerPolicy="no-referrer"
            className="h-12 w-auto object-contain"
          />
        </button>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7"
        >
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1E78] rounded ${
                  isActive
                    ? 'text-[#1B1E78]'
                    : 'text-slate-600 hover:text-[#1B1E78]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-[#E11D24] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('consultation')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D24] focus-visible:ring-offset-2"
          >
            {UI_COPY.nav.bookCta[lang]}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#1B1E78]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSelect('consultation')}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
            >
              {UI_COPY.nav.bookCta[lang]}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
