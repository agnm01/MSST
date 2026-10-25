import React from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { SportEvent } from '../types/index.ts';
import { formatDateRo, calculateRemainingSpots, isEventRegistrationAvailable } from '../utils/sportsLogic.ts';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Flame,
  Award,
  Users,
  Compass,
  Trophy,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { events, setCurrentTab, setSelectedEventForModal, setSelectedEventForRegistration } = useSports();

  const featuredEvents = events.filter(e => e.isFeatured).slice(0, 3);

  const stats = [
    { value: '15.000+', label: 'Participanți la Evenimente' },
    { value: '85+', label: 'Competiții Organizate' },
    { value: '450+', label: 'Voluntari Sportivi Activi' },
    { value: '11 Ani', label: 'De Tradiție Universitară' },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Campionate & Turnee Studențești',
      desc: 'Competiții oficiale de fotbal, baschet 3x3, volei și tenis dedicate studenților și comunității academice din Transilvania.',
      badge: 'Competiții Oficiale'
    },
    {
      num: '02',
      title: 'Alergare Comunitară & Crosuri',
      desc: 'Cursa emblematică Crosul Studențesc Cluj și alergări tematice în Parcul Central și pe malul Someșului, accesibile oricui.',
      badge: 'Alergare de Masă'
    },
    {
      num: '03',
      title: 'Tabere de Aventură & Trail Running',
      desc: 'Stagii de pregătire fizică, orientare turistică și ateliere de siguranță montană în Masivul Vlădeasa și platoul Mărișel.',
      badge: 'Outdoor & Munte'
    },
    {
      num: '04',
      title: 'Voluntariat la Turnee Internaționale',
      desc: 'Pregătim și coordonăm echipe de voluntari pentru marile evenimente sportive naționale: Billie Jean King Cup, turnee WTA și FRH.',
      badge: 'Voluntariat Pro'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        
        {/* Subtle geometric background sports elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Mission Kicker */}
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-blue-300 bg-blue-950/90 border border-blue-800/80 px-3.5 py-1.5 rounded-full">
              <img src="/assets/aistudio/image_66583382.png" alt="" className="w-4 h-4 object-contain shrink-0" />
              <span>Asociația Mișcarea Sportivă a Studenților Transilvăneni</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Trăiește Pasiunea Sportului
              <span className="block text-blue-400 mt-1.5">în Cluj-Napoca.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Platforma oficială dedicată calendarului de competiții, curselor de alergare, turneelor universitare și programelor de voluntariat din inima Transilvaniei.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setCurrentTab('events');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explorează Calendarul 2026</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setCurrentTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                Despre Noi & Istoric
              </button>

              <button
                onClick={() => {
                  setCurrentTab('volunteering');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3.5 bg-transparent hover:bg-slate-800/50 text-slate-300 text-sm font-medium rounded-xl transition-all cursor-pointer"
              >
                Devino Voluntar
              </button>
            </div>
          </div>

          {/* Metric KPIs Strip */}
          <div className="mt-16 pt-12 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              Înscrieri & Activități
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Următoarele Evenimente Recomandate
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentTab('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group"
          >
            <span>Vezi toate cele {events.length} evenimente</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Featured Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map(event => {
            const remaining = calculateRemainingSpots(event);
            const isAvailable = isEventRegistrationAvailable(event);

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Event Card Header */}
                <div className="p-6 space-y-4">
                  {/* Category & Fee Bar */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">{event.categoryBadge}</span>
                    <span className="font-bold text-slate-900">{event.fee}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {event.summary}
                  </p>

                  {/* Meta Details */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800">
                        {formatDateRo(event.date)}, ora {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Capacity Progress */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>{event.registeredCount} înscriși</span>
                      <span className="font-semibold text-slate-700">
                        {remaining > 0 ? `${remaining} locuri rămase` : 'Complet'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${Math.min(100, Math.round((event.registeredCount / event.maxParticipants) * 100))}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedEventForModal(event)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-950 py-1.5 px-3 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Detalii & Program
                  </button>

                  {isAvailable ? (
                    <button
                      onClick={() => setSelectedEventForRegistration(event)}
                      className="text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 py-1.5 px-4 rounded-lg shadow-sm transition-colors"
                    >
                      Înscrie-te
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-600 py-1.5 px-2">
                      {event.status === 'closed' ? 'Locuri Epuizate' : 'În Curând'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capabilities & Pillars Section */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              Domenii de Activitate
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Cum Transformăm Mișcarea în Stil de Viață
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Organizația Mișcarea Sportivă a Studenților Transilvăneni funcționează ca nucleu de coagulare a energiei sportive universitare și comunitare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="text-2xl font-extrabold text-blue-700 font-mono">
                    {pillar.num}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-slate-600 border-t border-slate-100">
                  {pillar.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Parteneri Instituționali & Federativi
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Încrederea Marilor Foruri Sportive
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center text-center">
          {[
            'UBB Cluj-Napoca',
            'Facultatea de Educație Fizică și Sport (FEFS)',
            'Federația Română de Tenis (FRT)',
            'Federația Română de Handbal (FRH)',
            'Salvamont Cluj'
          ].map((partner, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-800 shadow-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Vrei să organizezi o competiție sau să susții sportul clujean?
            </h2>
            <p className="text-sm text-blue-150 leading-relaxed text-blue-100">
              Punem la dispoziție experiența noastră în logistică sportivă, arbitraj, cronometrare electronică și o rețea de sute de voluntari activi.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setCurrentTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white text-blue-900 hover:bg-blue-50 text-xs font-extrabold rounded-xl transition-all shadow"
              >
                Trimite o Propunere
              </button>
              <button
                onClick={() => {
                  setCurrentTab('events');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white text-xs font-extrabold rounded-xl border border-blue-400/30 transition-all"
              >
                Consultă Calendarul
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
