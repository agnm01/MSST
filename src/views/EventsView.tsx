import React, { useState, useMemo } from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { SportEvent, EventCategory, EventStatus } from '../types/index.ts';
import { filterEvents, formatDateRo, calculateRemainingSpots, isEventRegistrationAvailable } from '../utils/sportsLogic.ts';
import {
  Calendar as CalendarIcon,
  LayoutGrid,
  Search,
  Filter,
  MapPin,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';

export const EventsView: React.FC = () => {
  const { events, setSelectedEventForModal, setSelectedEventForRegistration } = useSports();

  // Filters & State
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calendar month state
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 4, 1)); // May 2026 as starting point for upcoming season

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return filterEvents(events, {
      category: selectedCategory,
      status: selectedStatus,
      search: searchQuery
    });
  }, [events, selectedCategory, selectedStatus, searchQuery]);

  const categories: { id: EventCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Toate Categoriile' },
    { id: 'alergare', label: 'Alergare & Cros' },
    { id: 'baschet', label: 'Baschet 3x3' },
    { id: 'tenis', label: 'Tenis de Câmp' },
    { id: 'outdoor', label: 'Outdoor & Munte' },
    { id: 'voluntariat', label: 'Voluntariat' },
    { id: 'fotbal', label: 'Fotbal & Futsal' }
  ];

  // Calendar Calculation Helpers
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const monthNamesRo = [
    'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Normalize Monday as first day (0=Mon, 6=Sun)
  const startOffset = (firstDayOfWeek + 6) % 7;

  const calendarDays = useMemo(() => {
    const days: { dayNumber: number | null; dateStr: string | null; dayEvents: SportEvent[] }[] = [];

    // Empty leading padding days
    for (let i = 0; i < startOffset; i++) {
      days.push({ dayNumber: null, dateStr: null, dayEvents: [] });
    }

    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      const padMonth = String(month + 1).padStart(2, '0');
      const padDay = String(d).padStart(2, '0');
      const dateStr = `${year}-${padMonth}-${padDay}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      days.push({ dayNumber: d, dateStr, dayEvents });
    }

    return days;
  }, [year, month, startOffset, daysInMonth, events]);

  const nextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentCalendarDate(new Date(year, month - 1, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Calendar Oficial & Înscrieri
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-1">
            Evenimente & Competiții Sportive
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            Alege evenimentul dorit, consultă programul oficial și înregistrează-te online în câteva momente. Locurile sunt alocate în ordinea înscrierii.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-blue-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Carduri Detaliate</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'calendar'
                ? 'bg-white text-blue-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Calendar Lunar</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        {/* Search & Status Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Caută eveniment, locație (ex: Parcul Central, Hațieganu, Cros, Tenis)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Șterge
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as EventStatus | 'all')}
              className="py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Toate Statusurile</option>
              <option value="open">Înscrieri Deschise</option>
              <option value="upcoming">În Curând</option>
              <option value="closed">Înscrieri Închise</option>
            </select>
          </div>
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-500 font-medium">
            Se afișează <strong>{filteredEvents.length}</strong> evenimente
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">
                Niciun eveniment nu corespunde filtrelor selectate
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Încearcă să resetezi termenii de căutare sau alege o altă categorie din meniul de mai sus.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
                className="mt-2 py-2 px-4 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Resetează Toate Filtrele
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => {
                const remaining = calculateRemainingSpots(event);
                const isAvailable = isEventRegistrationAvailable(event);

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      {/* Category & Status Header */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-blue-700">{event.categoryBadge}</span>
                        <span className="font-bold text-slate-900">{event.fee}</span>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {event.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {event.summary}
                      </p>

                      {/* Key details */}
                      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-900">
                            {formatDateRo(event.date, { showDayOfWeek: true })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>Start ora {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Spots Capacity Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>{event.registeredCount} din {event.maxParticipants} înscriși</span>
                          <span className="font-semibold text-slate-700">
                            {remaining > 0 ? `${remaining} locuri rămase` : 'Capacitate Atinsă'}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              remaining === 0 ? 'bg-red-500' : 'bg-blue-600'
                            }`}
                            style={{
                              width: `${Math.min(100, Math.round((event.registeredCount / event.maxParticipants) * 100))}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedEventForModal(event)}
                        className="py-1.5 px-3 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Regulament & Orar
                      </button>

                      {isAvailable ? (
                        <button
                          onClick={() => setSelectedEventForRegistration(event)}
                          className="py-1.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                        >
                          Înscrie-te
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-500 py-1 px-2">
                          {event.status === 'closed' ? 'Locuri Închise' : 'În Curând'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: Monthly Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {monthNamesRo[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-700"
                aria-label="Luna precedentă"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-700"
                aria-label="Luna următoare"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mie</div>
            <div>Joi</div>
            <div>Vin</div>
            <div>Sâm</div>
            <div>Dum</div>
          </div>

          {/* Calendar Days Matrix */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((cell, idx) => {
              if (cell.dayNumber === null) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="h-28 bg-slate-50/50 rounded-xl border border-dashed border-slate-200/50"
                  />
                );
              }

              const hasEvents = cell.dayEvents.length > 0;

              return (
                <div
                  key={`day-${cell.dayNumber}`}
                  className={`h-28 p-2 rounded-xl border flex flex-col justify-between transition-all ${
                    hasEvents
                      ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        hasEvents ? 'text-blue-800' : 'text-slate-700'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>
                    {hasEvents && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>

                  <div className="space-y-1 overflow-y-auto max-h-16">
                    {cell.dayEvents.map(ev => (
                      <button
                        key={ev.id}
                        onClick={() => setSelectedEventForModal(ev)}
                        className="w-full text-left text-[11px] p-1 bg-blue-700 text-white rounded font-medium truncate block hover:bg-blue-800"
                        title={ev.title}
                      >
                        {ev.title}
                      </button>
                    ))}
                  </div>

                  {hasEvents && (
                    <div className="text-[10px] text-blue-700 font-semibold truncate">
                      {cell.dayEvents.length} {cell.dayEvents.length === 1 ? 'eveniment' : 'evenimente'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
