import React from 'react';
import { useSports } from '../context/SportsContext.tsx';
import {
  Calendar,
  Users,
  Award,
  BookOpen,
  Trophy,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Landmark,
  GraduationCap,
  Quote
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentTab } = useSports();

  const founders = [
    {
      name: 'Radu-Tiberiu Șerban',
      roleAtFounding: 'Student Senator F.E.F.S. UBB',
      desc: 'Membru fondator M.S.S.T., reprezentant în Senatul universității și în comisiile studențești, inițiator al proiectelor de anvergură pentru studenți.'
    },
    {
      name: 'Andreea Badache',
      roleAtFounding: 'Student Cancelar F.E.F.S. UBB',
      desc: 'Membră fondatoare M.S.S.T., implicată activ în Consiliul Facultății și reprezentarea drepturilor și oportunităților studenților la sport.'
    },
    {
      name: 'Alexandru Zadic',
      roleAtFounding: 'Student Entuziast & Organizator',
      desc: 'Membru fondator M.S.S.T., forță motrice în transpunerea cunoștințelor academice în competiții practice și evenimente pentru comunitate.'
    }
  ];

  const personalities = [
    {
      name: 'Prof. univ. dr. Vasile Bogdan',
      role: 'Personalitate Academică & Sportivă',
      desc: 'Figură marcantă a învățământului sportiv universitar clujean, susținător al inițiativelor studențești.'
    },
    {
      name: 'Prof. univ. dr. Leon Gomboș',
      role: 'Decan & Mentor FEFS UBB',
      desc: 'Susținător constant al proiectelor educaționale și sportive dedicate studenților universității.'
    },
    {
      name: 'Florin Berceanu',
      role: 'Antrenor Emerit de Judo',
      desc: 'Arhitectul performanțelor de top mondial din judo-ul românesc și clujean, model de devotament și disciplină.'
    },
    {
      name: 'Corina Căprioriu',
      role: 'Vicecampioană Olimpică (Londra 2012)',
      desc: 'Campioană a judo-ului românesc, sursă vie de inspirație pentru generațiile tinere de sportivi din Transilvania.'
    },
    {
      name: 'Cristi Dulca',
      role: 'Fotbalist & Tehnician de Renume',
      desc: 'Nume emblematic al fotbalului clujean și național, mereu aproape de competițiile universitare de fotbal.'
    }
  ];

  const historicalGalleries = [
    {
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
      tag: 'Campionatele Sportive UBB',
      title: 'Baschet 3X3 & Fotbal Universitar',
      desc: 'Edițiile I și II au adunat peste 400 de studenți în arenă, transformând campusul într-un festival autentic de mișcare.'
    },
    {
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80',
      tag: 'Conferințe Educaționale',
      title: 'Importanța Activităților Fizice în Societatea de Azi',
      desc: 'Edițiile I și II au adus în amfiteatre cadre didactice, medici, sportivi de performanță și sute de tineri dornici să învețe.'
    },
    {
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
      tag: 'Comunitate Solidară',
      title: 'Peste 100 de Voluntari Specialiști',
      desc: 'Studenți FEFS și tineri calificați care coordonează logistică, arbitraj, kinetoterapie și securitate la nivel profesionist.'
    }
  ];

  const futurePillars = [
    {
      title: 'Continuarea Proiectelor Proprii',
      desc: 'Dezvoltarea constantă a competițiilor tradiționale de fotbal, baschet 3x3, cros universitar și a taberelor tematice de mișcare.'
    },
    {
      title: 'Parteneriate cu Federațiile Naționale',
      desc: 'Consolidarea colaborărilor cu federațiile sportive din România pentru furnizarea de suport tehnic și echipe de voluntari calificați.'
    },
    {
      title: 'Evenimente Culturale, Educaționale & Sportive',
      desc: 'Lansarea de noi conferințe, simpozioane și ateliere practice dedicate promovării stilului de viață sănătos în rândul tinerilor.'
    },
    {
      title: 'Sinergie cu Mediul Privat & Instituțional',
      desc: 'Atragerea companiilor responsabile și a organismelor de resort în sprijinirea infrastructurii și a performanței studențești.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 text-slate-800">
      
      {/* Hero Header Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1920&q=80"
            alt="Pistă de atletism și sportivi"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Constituită legal la 19.06.2013 • Cluj-Napoca</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Asociația Mișcarea Sportivă a Studenților Transilvăneni
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            O entitate fondată de studenți pentru studenți, cu rădăcini adânci în Facultatea de Educație Fizică și Sport (F.E.F.S.) a Universității Babeș-Bolyai, dedicată excelenței organizatorice și promovării mișcării în Transilvania.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>19.06.2013 Înființare Legală</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>F.E.F.S. · Universitatea Babeș-Bolyai</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <Users className="w-4 h-4 text-blue-400" />
              <span>100+ Voluntari Specialiști</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative: Scurt Istoric */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-14 space-y-10">
          
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md mb-3">
              Document Oficial de Prezentare
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Scurt istoric…
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Geneza, oamenii și parcursul Asociației Mișcarea Sportivă a Studenților Transilvăneni (M.S.S.T.)
            </p>
          </div>

          {/* Section 1: Constituirea și Fondatorii */}
          <div className="space-y-6">
            <div className="prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
              <p>
                <strong className="text-slate-900 font-bold">Asociaţia Mişcarea Sportivă a Studenţilor Transilvăneni (M.S.S.T.)</strong> s-a constituit legal în data de <span className="underline decoration-blue-500 decoration-2 font-semibold text-slate-900">19.06.2013</span> la inițiativa studenților <span className="font-semibold text-slate-900">Radu-Tiberiu Șerban</span>, <span className="font-semibold text-slate-900">Andreea Badache</span> și <span className="font-semibold text-slate-900">Alexandru Zadic</span>. Primul, student senator al Facultății de Educație Fizică și Sport (F.E.F.S.) la acel moment, a doua, student cancelar și al treilea, student entuziast, au simțit nevoia unei entități de acest gen pentru organizarea la un nivel superior, de evenimente cultural-sportive la care au întâmpinat dificultăți în trecut.
              </p>
            </div>

            {/* Founder Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {founders.map((founder, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-blue-50/50 transition-colors border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-950">
                        {founder.name}
                      </h4>
                      <p className="text-xs font-semibold text-blue-700">
                        {founder.roleAtFounding}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {founder.desc}
                    </p>
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 border-t border-slate-200/70 pt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Membru Fondator M.S.S.T. (19.06.2013)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Reprezentarea Intereselor Studențești & Primele Evenimente */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="text-base sm:text-lg leading-relaxed text-slate-700 space-y-4 font-normal">
              <p>
                Cei trei membrii fondatori ai acestei asociații au luat parte la reprezentarea intereselor studenților F.E.F.S. încă dinaintea nașterii M.S.S.T. prin participarea la ședințele Consiliului Facultății, ale Senatului universității precum și la cele ale Consiliului Studenților din U.B.B. sau ca reprezentanți ai studenților în diverse comisii precum cele de cazare, tabere studențești și burse.
              </p>
              <p>
                Simțind nevoia de a aplica cunoștințele dobândite în practică, aceștia au inițiat mai multe activități cu și pentru studenții facultății și ai universității, cele mai relevante dintre acestea fiind conferințele <em>„Importanța Activităților Fizice în Societatea de Azi”</em>, edițiile I și II precum și <em>Campionatele Sportive ale UBB</em> la disciplinele fotbal și baschet 3X3, Edițiile I și II. La aceste evenimente au participat numeroși studenți, campionatele sportive adunănd peste 400, precum și personalități din lumea sportului clujean ca <span className="font-medium text-slate-900">Vasile Bogdan, Leon Gomboș, Florin Berceanu, Corina Căprioriu, Cristi Dulca</span> și alții.
              </p>
            </div>

            {/* Reprezentare Tags */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 sm:p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-blue-700" />
                <span>Organisme Universitare în Care Fondatorii au Reprezentat Studenții</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-blue-950">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                  🏛️ Consiliul Facultății F.E.F.S.
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                  🎓 Senatul Universității Babeș-Bolyai
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                  🤝 Consiliul Studenților din U.B.B. (CS UBB)
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                  🏠 Comisiile de Cazare & Cămine
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                  🏕️ Comisiile de Tabere Studențești
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                  🏅 Comisiile de Burse Universitare
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Cadrul Nou & Scopul Statutar */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="text-base sm:text-lg leading-relaxed text-slate-700 space-y-4 font-normal">
              <p>
                Înființarea asociației noastre a oferit un cadru nou în care studenții să poată duce la un alt nivel organizarea de astfel de evenimente, cu o ușurință mai mare. Mișcarea Sportivă se poate baza acum pe un număr de peste 100 de voluntari, specialiști în domeniul educației fizice și a sportului și are suportul legal de a se apropia mai mult de mediul privat, care se dovedește a fi un jucător implicat în astfel de activități.
              </p>
            </div>

            {/* Official Statutory Mission Quote */}
            <div className="relative bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md overflow-hidden">
              <Quote className="absolute right-4 bottom-4 w-32 h-32 text-white/5 pointer-events-none" />
              <div className="relative space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Scopul Oficial Asumat (Statut M.S.S.T.)
                </div>
                <blockquote className="text-base sm:text-xl font-medium leading-relaxed italic text-white">
                  „M.S.S.T. are ca scop reprezentarea intereselor studenţilor Facultăţii de Educaţie Fizică şi Sport din cadrul Universităţii Babeş-Bolyai şi a tinerilor sportivi din Transilvania în vederea stimulării şi dezvoltării educaţiei şi performanţei sportive.”
                </blockquote>
                <div className="pt-2 text-xs text-blue-200 font-medium">
                  — Asociația Mișcarea Sportivă a Studenților Transilvăneni
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: În viitor... */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="border-l-4 border-blue-700 pl-4 py-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                În viitor…
              </h3>
            </div>
            
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
              În viitor, activitățile noastre se vor concentra în jurul continuării proiectelor proprii, în păstrarea parteneriatelor cu federațiile sportive naționale deja începute și în dezvoltarea de noi evenimente cu caracter cultural, educațional și sportiv, precum și de noi parteneriate cu instituții și organisme implicate în domeniul sportiv sau cele tangente acestuia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {futurePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-4">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Visual Photo Gallery Reflecting the Authentic Text */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            Activități Relevante & Proiecte
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Evenimente Reflectate în Istoricul M.S.S.T.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Imagini care ilustrează spiritul conferințelor noastre educaționale, meciurile de fotbal și baschet 3x3 din campusul universitar și implicarea voluntarilor specialiști.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {historicalGalleries.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                  {item.tag}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personalități din Lumea Sportului Clujean menționate în istoric */}
      <section className="bg-slate-100/80 border-y border-slate-200/90 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              Parteneri & Mentori
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Personalități ale Sportului Clujean Alături de Asociație
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Nume menționate în documentul istoric al asociației care au susținut conferințele și campionatele organizate pentru studenți.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {personalities.map((pers, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs mb-3">
                    <Trophy className="w-5 h-5 text-blue-700" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {pers.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-700">
                    {pers.role}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {pers.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Banner card for over 400 athletes */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-5 text-white flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="text-3xl font-extrabold text-white">
                  400+
                </div>
                <div className="text-sm font-bold text-blue-100">
                  Studenți Participanți
                </div>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Adunați încă de la primele ediții ale Campionatelor Sportive UBB la fotbal și baschet 3X3, dovedind nevoia acută a unei asociații dedicate.
                </p>
              </div>
              <div className="pt-3 border-t border-blue-500/40 text-[11px] text-blue-200 font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Tradiție & Continuitate din 2013</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Implică-te Alături de Noi
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Vrei să organizezi competiții sau să participi ca sportiv?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Fie că ești student FEFS, pasionat de mișcare sau dorești să te alături celor peste 100 de voluntari M.S.S.T., ești binevenit în comunitatea noastră.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setCurrentTab('volunteering');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Devino Voluntar</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm cursor-pointer"
            >
              <span>Calendar Evenimente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
