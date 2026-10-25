import React, { useState } from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { SportEvent, Registration } from '../types/index.ts';
import { validateRegistrationForm, formatDateRo, calculateRemainingSpots } from '../utils/sportsLogic.ts';
import { X, Calendar, MapPin, CheckCircle2, AlertCircle, Printer, Download, UserCheck, Shield } from 'lucide-react';

interface RegistrationModalProps {
  event: SportEvent;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ event, onClose }) => {
  const { addRegistration } = useSports();
  const remainingSpots = calculateRemainingSpots(event);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ageGroup: '18-29 ani',
    categoryOrRace: event.category === 'alergare' ? 'Cros 5km' : event.category === 'tenis' ? 'Simplu Open' : 'Participare Standard',
    affiliation: '',
    emergencyContact: '',
    emergencyPhone: '',
    tshirtSize: 'M',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedRegistration, setConfirmedRegistration] = useState<Registration | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const result = addRegistration({
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      ageGroup: formData.ageGroup,
      categoryOrRace: formData.categoryOrRace,
      affiliation: formData.affiliation.trim() || undefined,
      emergencyContact: formData.emergencyContact.trim(),
      emergencyPhone: formData.emergencyPhone.trim(),
      tshirtSize: formData.tshirtSize,
      status: 'confirmed'
    });

    if (result.success && result.registration) {
      setConfirmedRegistration(result.registration);
    } else {
      setSubmissionError(result.error || 'A apărut o eroare la salvarea înscrierii.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase">
              Înscriere Oficială
            </span>
            <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
              {event.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Închide formularul"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedRegistration ? (
          /* Confirmation Pass Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                Înscriere Confirmată cu Succes!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Felicitări, te-ai înregistrat oficial la <strong className="text-slate-900">{event.title}</strong>. Te așteptăm cu drag la linia de start!
              </p>
            </div>

            {/* Official Digital Ticket */}
            <div className="bg-slate-50 border-2 border-dashed border-blue-300 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Bilet Concurs
              </div>

              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-200">
                <img
                  src="/assets/aistudio/image_66583382.png"
                  alt="Logo Mișcarea Sportivă"
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Asociația Mișcarea Sportivă</div>
                  <div className="text-[10px] text-slate-500">Pass Oficial Participant · Cluj-Napoca</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div>
                  <span className="text-slate-600 text-[11px] block">Cod Înscriere Unic:</span>
                  <span className="text-base font-extrabold text-blue-800 tracking-wider font-mono">
                    {confirmedRegistration.registrationCode}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600 text-[11px] block">Nume Participant:</span>
                  <span className="text-sm font-bold text-slate-900">
                    {confirmedRegistration.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600 text-[11px] block">Dată & Oră Start:</span>
                  <span className="font-semibold text-slate-900">
                    {formatDateRo(event.date)}, ora {event.time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600 text-[11px] block">Probă / Categorie:</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedRegistration.categoryOrRace} ({confirmedRegistration.ageGroup})
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-600 text-[11px] block">Locație Desfășurare:</span>
                  <span className="font-semibold text-slate-900">
                    {event.location}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Prezintă acest cod sau actul de identitate la ridicarea kitului.</span>
                <span className="font-bold text-emerald-700">Validat Oficial</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Tipărește Confirmarea</span>
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Gata, Am Înțeles
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Event Summary Bar */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span className="font-semibold">{formatDateRo(event.date)}, ora {event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-blue-700" />
                <span>{event.location}</span>
              </div>
              <div className="text-blue-900 font-bold">
                Taxă: {event.fee} · Locuri rămase: {remainingSpots}
              </div>
            </div>

            {submissionError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submissionError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Nume & Prenume <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Andrei Muntean"
                  value={formData.fullName}
                  onChange={e => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && <p className="text-red-600 text-[11px]">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Adresă Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="andrei@exemplu.ro"
                  value={formData.email}
                  onChange={e => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.email && <p className="text-red-600 text-[11px]">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Număr de Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="0740 123 456"
                  value={formData.phone}
                  onChange={e => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.phone && <p className="text-red-600 text-[11px]">{errors.phone}</p>}
              </div>

              {/* Age Group */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Categorie Vârstă <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.ageGroup}
                  onChange={e => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="16-17 ani">Sub 18 ani (Junior)</option>
                  <option value="18-29 ani">18 - 29 ani (Student / Tineret)</option>
                  <option value="30-45 ani">30 - 45 ani (Senior)</option>
                  <option value="45+ ani">Peste 45 ani (Master)</option>
                </select>
              </div>

              {/* Race / Category */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Probă / Secțiune Concurs <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Cros 5km sau 10km, Simplu, Echipă"
                  value={formData.categoryOrRace}
                  onChange={e => {
                    setFormData({ ...formData, categoryOrRace: e.target.value });
                    if (errors.categoryOrRace) setErrors({ ...errors, categoryOrRace: '' });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.categoryOrRace ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.categoryOrRace && <p className="text-red-600 text-[11px]">{errors.categoryOrRace}</p>}
              </div>

              {/* Affiliation / Faculty */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Club / Facultate / Companie (opțional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: UBB Cluj, UTCN, Club Sportiv"
                  value={formData.affiliation}
                  onChange={e => setFormData({ ...formData, affiliation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* T-shirt size */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Mărime Tricou Oficial
                </label>
                <select
                  value={formData.tshirtSize}
                  onChange={e => setFormData({ ...formData, tshirtSize: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Persoană Contact Urgență <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nume rudă sau prieten"
                  value={formData.emergencyContact}
                  onChange={e => {
                    setFormData({ ...formData, emergencyContact: e.target.value });
                    if (errors.emergencyContact) setErrors({ ...errors, emergencyContact: '' });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.emergencyContact ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.emergencyContact && <p className="text-red-600 text-[11px]">{errors.emergencyContact}</p>}
              </div>

              {/* Emergency Phone */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-slate-800 block">
                  Telefon Contact Urgență <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="07xx xxx xxx"
                  value={formData.emergencyPhone}
                  onChange={e => {
                    setFormData({ ...formData, emergencyPhone: e.target.value });
                    if (errors.emergencyPhone) setErrors({ ...errors, emergencyPhone: '' });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.emergencyPhone ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.emergencyPhone && <p className="text-red-600 text-[11px]">{errors.emergencyPhone}</p>}
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={e => {
                    setFormData({ ...formData, agreedToTerms: e.target.checked });
                    if (errors.agreedToTerms) setErrors({ ...errors, agreedToTerms: '' });
                  }}
                  className="mt-0.5 rounded text-blue-700 focus:ring-blue-600"
                />
                <span>
                  Confirm că sunt apt din punct de vedere medical pentru efort fizic și accept{' '}
                  <strong className="text-slate-900">Regulamentul Competiției</strong> și termenii asociației Mișcarea Sportivă.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-red-600 text-[11px] mt-1">{errors.agreedToTerms}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Anulează
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-700/20 transition-all flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Confirmă Înscrierea Oficială</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
