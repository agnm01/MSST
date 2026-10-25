import React, { useState } from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { HeartHandshake, CheckCircle2, Award, Users, Shield, Send, AlertCircle } from 'lucide-react';

export const VolunteeringView: React.FC = () => {
  const { addVolunteerApplication } = useSports();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    facultyOrOccupation: '',
    preferredRoles: [] as string[],
    experience: '',
    availability: 'Weekend și după-amiezi'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const availableRoles = [
    'Coordonare Traseu & Puncte Hidratare',
    'Secretariat Tehnic & Înscrieri',
    'Acreditări & Primire Delegații Oficiale',
    'Media, Foto & Social Media Eveniment',
    'Asistență Kinetoterapie & Siguranță',
    'Logistică Arenă & Echipamente'
  ];

  const handleRoleToggle = (role: string) => {
    if (formData.preferredRoles.includes(role)) {
      setFormData({
        ...formData,
        preferredRoles: formData.preferredRoles.filter(r => r !== role)
      });
    } else {
      setFormData({
        ...formData,
        preferredRoles: [...formData.preferredRoles, role]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Introduceți numele complet.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Introduceți o adresă de email validă.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!formData.phone || cleanPhone.length < 9) {
      newErrors.phone = 'Introduceți un număr de telefon valid.';
    }

    if (!formData.facultyOrOccupation) {
      newErrors.facultyOrOccupation = 'Specificați facultatea sau ocupația curentă.';
    }

    if (formData.preferredRoles.length === 0) {
      newErrors.roles = 'Selectați cel puțin un rol de interes.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addVolunteerApplication({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      facultyOrOccupation: formData.facultyOrOccupation.trim(),
      preferredRoles: formData.preferredRoles,
      experience: formData.experience.trim() || 'Fără experiență anterioară menționată',
      availability: formData.availability
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Echipa Din Spatele Succesului
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Fii Voluntar la Marile Evenimente Sportive
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Trăiește emoția din culisele marilor meciuri internaționale și crosuri universitare alături de asociația Mișcarea Sportivă din Cluj-Napoca.
          </p>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Certificat & Practică Recunoscută
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliberăm adeverințe oficiale de voluntariat recunoscute de universități (inclusiv ore de practică pentru studenții FEFS).
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Echipament Oficial & Facilități
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Primești tricou/hanorac tehnic oficial de voluntar, ecuson de acces VIP în arene, catering și băuturi pe durata evenimentelor.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Comunitate & Oportunități Profesionale
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cunoști sportivi de elită, antrenori, arbitri federali și îți construiești relații valoroase în industria sportului românesc.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Aplicație Înregistrată cu Succes!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Îți mulțumim pentru entuziasm! Coordonatorul departamentului de voluntari al Mișcării Sportive te va contacta pe WhatsApp sau email pentru următorul briefing.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    facultyOrOccupation: '',
                    preferredRoles: [],
                    experience: '',
                    availability: 'Weekend și după-amiezi'
                  });
                }}
                className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Trimite o altă înscriere
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Formular Oficial de Recrutare
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Completează Formularul de Voluntar
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Completează datele tale și selectează rolurile în care consideri că te potrivești cel mai bine.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    Nume & Prenume <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Marius Popa"
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
                    placeholder="marius@exemplu.ro"
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
                    Telefon (WhatsApp) <span className="text-red-500">*</span>
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

                {/* Faculty / Occupation */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    Facultate / Ocupație <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: FEFS UBB Anul II / UTCN / Angajat"
                    value={formData.facultyOrOccupation}
                    onChange={e => {
                      setFormData({ ...formData, facultyOrOccupation: e.target.value });
                      if (errors.facultyOrOccupation) setErrors({ ...errors, facultyOrOccupation: '' });
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.facultyOrOccupation ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.facultyOrOccupation && (
                    <p className="text-red-600 text-[11px]">{errors.facultyOrOccupation}</p>
                  )}
                </div>
              </div>

              {/* Roles Multi-selection */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-800 text-xs block">
                  Roluri de Interes (alege una sau mai multe opțiuni) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {availableRoles.map(role => {
                    const isSelected = formData.preferredRoles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => handleRoleToggle(role)}
                        className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{role}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {errors.roles && <p className="text-red-600 text-[11px]">{errors.roles}</p>}
              </div>

              {/* Availability */}
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-800 block">
                  Disponibilitate Generală
                </label>
                <select
                  value={formData.availability}
                  onChange={e => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="Weekend și după-amiezi">Weekenduri și după-amiezi (Flexibil)</option>
                  <option value="Exclusiv în weekend">Exclusiv în zilele de sâmbătă și duminică</option>
                  <option value="Full-time pe durata turneului">Full-time pe întreaga durată a competițiilor</option>
                </select>
              </div>

              {/* Experience notes */}
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-800 block">
                  Experiență anterioară relevantă (opțional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ai mai fost voluntar la vreun eveniment sportiv, cultural sau universitar? Menționează pe scurt..."
                  value={formData.experience}
                  onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 placeholder-slate-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Trimite Candidatura de Voluntar</span>
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
