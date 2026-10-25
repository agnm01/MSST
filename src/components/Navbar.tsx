import React, { useState } from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { NavTab } from '../types/index.ts';
import { Menu, X, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentTab, setCurrentTab } = useSports();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Acasă' },
    { id: 'events', label: 'Calendar Evenimente' },
    { id: 'about', label: 'Despre Noi' },
    { id: 'volunteering', label: 'Voluntariat' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand wordmark (single text element / brand identity) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0 cursor-pointer"
            aria-label="Mișcarea Sportivă Acasă"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-1 group-hover:scale-105 group-hover:border-blue-400 group-hover:shadow-xs transition-all shrink-0">
              <img
                src="/assets/aistudio/image_66583382.png"
                alt="Logo Mișcarea Sportivă"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors whitespace-nowrap block">
                Mișcarea Sportivă
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase block">
                Transilvania · Cluj-Napoca
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {navLinks.map(link => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action & mobile menu toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('events')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm shadow-blue-600/20 transition-all hover:shadow whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar Evenimente</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Închide meniu' : 'Deschide meniu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map(link => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('events')}
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-blue-700 rounded-lg"
            >
              Înscrieri Evenimente
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
            >
              Contact Asociație
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
