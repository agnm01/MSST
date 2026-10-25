import React, { useState } from 'react';
import { useSports } from '../context/SportsContext.tsx';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { addContactMessage } = useSports();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Întrebare Generală',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Introduceți numele dumneavoastră.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Introduceți o adresă de email validă.';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Mesajul trebuie să aibă cel puțin 10 caractere.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addContactMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      subject: formData.subject,
      message: formData.message.trim()
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Suntem Aici Pentru Tine
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Contact & Parteneriate Sportive
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Ai o propunere de competiție, dorești să susții evenimentele noastre ca sponsor sau ai întrebări despre înscriere? Scrie-ne!
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details & Info */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Informații Directe
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Sediul Asociației Mișcarea Sportivă
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Asociația își desfășoară activitatea administrativă în parteneriat cu Facultatea de Educație Fizică și Sport din cadrul Universității Babeș-Bolyai.
              </p>
            </div>

            <div className="space-y-5 text-xs text-slate-700">
              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3.5 shadow-xs">
                <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Adresă Oficială</h4>
                  <p className="text-slate-600 mt-0.5">
                    Facultatea de Educație Fizică și Sport (FEFS), UBB
                    <br />
                    Str. Pandurilor nr. 7, 400376 Cluj-Napoca, Județul Cluj
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3.5 shadow-xs">
                <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email-uri Oficiale</h4>
                  <p className="text-slate-600 mt-0.5">
                    General: <strong className="text-slate-900">contact@miscareasportiva.ro</strong>
                    <br />
                    Președinție: <strong className="text-slate-900">presedinte@miscareasportiva.ro</strong>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3.5 shadow-xs">
                <Phone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Telefon & WhatsApp</h4>
                  <p className="text-slate-600 mt-0.5">
                    Secretariat: <strong className="text-slate-900">+40 (264) 420 709</strong>
                    <br />
                    Coordonare Evenimente: <strong className="text-slate-900">+40 (745) 123 456</strong>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3.5 shadow-xs">
                <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Program Secretariat</h4>
                  <p className="text-slate-600 mt-0.5">
                    Luni – Vineri: 09:00 – 17:00
                    <br />
                    Sâmbătă – Duminică: În funcție de orarul competițiilor oficiale
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Mesaj Trimis cu Succes!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Îți mulțumim pentru mesaj. Echipa noastră de secretariat va reveni cu un răspuns în cel mult 24-48 de ore.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Întrebare Generală',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Trimite un alt mesaj
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Formular de Contact
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Scrie-ne un Mesaj
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800 block">
                      Nume & Prenume <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Dan Ionescu"
                      value={formData.name}
                      onChange={e => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.name ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-[11px]">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">
                        Adresă Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="dan@exemplu.ro"
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

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">
                        Telefon (opțional)
                      </label>
                      <input
                        type="tel"
                        placeholder="07xx xxx xxx"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800 block">
                      Subiect
                    </label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="Întrebare Generală">Întrebare Generală despre Evenimente</option>
                      <option value="Propunere Parteneriat / Sponsor">Propunere Parteneriat sau Sponsorizare</option>
                      <option value="Înscrieri de Grup / Echipe">Înscrieri de Grup / Cluburi / Școli</option>
                      <option value="Suport Voluntariat">Suport Departamentul Voluntari</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800 block">
                      Mesajul Tău <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Scrie-ne detaliile solicitării tale..."
                      value={formData.message}
                      onChange={e => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.message ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && <p className="text-red-600 text-[11px]">{errors.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Trimite Mesajul</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
