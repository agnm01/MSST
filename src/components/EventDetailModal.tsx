import React from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { SportEvent } from '../types/index.ts';
import { formatDateRo, calculateRemainingSpots, isEventRegistrationAvailable } from '../utils/sportsLogic.ts';
import { X, Calendar, Clock, MapPin, Users, Award, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';

interface EventDetailModalProps {
  event: SportEvent;
  onClose: () => void;
  onOpenRegister: (event: SportEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onOpenRegister
}) => {
  const remaining = calculateRemainingSpots(event);
  const isAvailable = isEventRegistrationAvailable(event);

  const getStatusBadge = () => {
    switch (event.status) {
      case 'open':
        return (
          <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            Înscrieri Deschise ({remaining} locuri rămase)
          </span>
        );
      case 'upcoming':
        return (
          <span className="text-amber-700 font-bold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            În Curând
          </span>
        );
      case 'closed':
        return (
          <span className="text-red-700 font-bold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            Înscrieri Închise (Capacitate maximă)
          </span>
        );
      case 'completed':
        return (
          <span className="text-slate-600 font-bold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span>
            Eveniment Finalizat
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Top Banner with Sport Category */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Închide detaliile"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-2">
            {event.categoryBadge} · {event.organizer}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            {event.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-300" />
              {formatDateRo(event.date, { showDayOfWeek: true })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-300" />
              Start ora {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-300" />
              Taxă: {event.fee}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          
          {/* Status & Location Pill Strip */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>{getStatusBadge()}</div>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Despre Eveniment
            </h4>
            <p className="leading-relaxed text-slate-700">
              {event.description}
            </p>
          </div>

          {/* Program & Schedule */}
          {event.schedule && event.schedule.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Program & Orar Desfășurare
              </h4>
              <div className="space-y-2 border-l-2 border-blue-600 pl-4">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-bold text-slate-900">{item.time}</span>
                    <span className="text-slate-500 mx-2">—</span>
                    <span className="text-slate-700">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules & Requirements */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Regulament & Cerințe Participare
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Capacity Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>Capacitate Participanți</span>
              <span>
                {event.registeredCount} din {event.maxParticipants} înscriși ({remaining} disponibile)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  remaining === 0 ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{
                  width: `${Math.min(100, Math.round((event.registeredCount / event.maxParticipants) * 100))}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Închide
          </button>

          {isAvailable ? (
            <button
              onClick={() => {
                onClose();
                onOpenRegister(event);
              }}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-700/20 transition-all flex items-center gap-2"
            >
              <span>Înscrie-te Acum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs font-semibold text-slate-500">
              Înscrierile nu sunt active pentru acest eveniment
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
