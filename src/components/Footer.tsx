import React from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { MapPin, Mail, Phone, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentTab } = useSports();

  const handleNav = (tab: 'home' | 'events' | 'about' | 'volunteering' | 'contact') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Organization Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs shrink-0">
                <img
                  src="/assets/aistudio/image_66583382.png"
                  alt="Logo Mișcarea Sportivă"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Mișcarea Sportivă
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Asociația Mișcarea Sportivă a Studenților Transilvăneni (M.S.S.T.) din Cluj-Napoca promovează sportul universitar, stilul de viață activ, competițiile de masă și voluntariatul sportiv de înaltă clasă.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Acreditată & Parteneră UBB Cluj-Napoca</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigare Rapidă
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Acasă & Noutăți</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-white transition-colors flex items-center gap-1 text-blue-400 font-semibold cursor-pointer"
                >
                  <span>Calendar Activități & Înscrieri</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Despre Asociație & Echipă
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('volunteering')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Program Voluntari Internaționali
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Propuneri Parteneriate
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Programe & Competiții */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Programe Tradiționale
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Crosul Studențesc Cluj (10km & 5km)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Cupa Cluj Arena la Baschet 3x3</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Campionatul Universitar de Tenis UBB</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Tabăra de Trail & Munte Mărișel</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Echipa de Voluntari Billie Jean King Cup</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Headquarters */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Sediu & Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Facultatea de Educație Fizică și Sport, UBB
                  <br />
                  Str. Pandurilor nr. 7, 400376 Cluj-Napoca
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href="mailto:contact@miscareasportiva.ro"
                  className="hover:text-white transition-colors"
                >
                  contact@miscareasportiva.ro
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+40 (264) 420 709</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Asociația Mișcarea Sportivă a Studenților Transilvăneni. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={() => handleNav('about')}>
              Regulament Oficial
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={() => handleNav('contact')}>
              Protecția Datelor (GDPR)
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              Creat cu <Heart className="w-3 h-3 text-red-500 fill-red-500" /> pentru sportul clujean
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
