import { SportEvent, Registration, VolunteerApplication, ContactMessage } from '../types/index.ts';

export const INITIAL_EVENTS: SportEvent[] = [
  {
    id: 'ev-cros-cluj-2026',
    title: 'Crosul Studențesc Cluj - Ediția de Primăvară 2026',
    slug: 'crosul-studentesc-cluj-2026',
    category: 'alergare',
    date: '2026-05-16',
    time: '09:30',
    location: 'Parcul Central Simion Bărnuțiu, Cluj-Napoca',
    locationDetails: 'Zona Clădirii Casino - Punct de Start & Finish',
    maxParticipants: 600,
    registeredCount: 418,
    fee: 'Gratuit',
    status: 'open',
    summary: 'Cea mai populară cursă universitară de alergare din Cluj (5km & 10km). Kit complet de concurs, cronometrare electronică cu cip, medalie turnată și puncte de hidratare.',
    description: 'Mișcarea Sportivă a Studenților Transilvăneni invită toți studenții, cadrele universitare și pasionații de mișcare din Cluj-Napoca la cea de-a XI-a ediție a Crosului Studențesc. Traseul este complet plat și asfaltat, traversând aleile umbroase ale Parcului Central și promenada râului Someșul Mic. Evenimentul pune accent pe sănătate, spirit de comunitate și bucuria alergării în aer liber.',
    rules: [
      'Participarea este deschisă tuturor persoanelor cu vârsta de minim 16 ani împliniți la data cursei.',
      'Fiecare participant trebuie să prezinte o declarație pe proprie răspundere semnată la ridicarea kitului.',
      'Numărul de concurs cu cip de cronometrare trebuie purtat obligatoriu pe piept pe toată durata cursei.',
      'Sunt asigurate puncte de revitalizare cu apă, fructe și izotonice la kilometrul 2.5 și la linia de sosire.'
    ],
    schedule: [
      { time: '08:00 - 09:15', activity: 'Validare înscrieri și ridicare pachete de concurs' },
      { time: '09:15 - 09:25', activity: 'Încălzire oficială ghidată de kinetoterapeuți FEFS' },
      { time: '09:30', activity: 'Start oficial proba 10km & 5km' },
      { time: '11:30', activity: 'Festivitatea oficială de premiere și tombolă cu echipament sportiv' }
    ],
    organizer: 'Asociația Mișcarea Sportivă & FEFS UBB Cluj-Napoca',
    isFeatured: true,
    categoryBadge: 'Alergare & Atletism',
    colorScheme: 'blue'
  },
  {
    id: 'ev-baschet-3x3-arena',
    title: 'Cupa Mișcarea Sportivă la Baschet 3x3 Cluj Arena',
    slug: 'cupa-baschet-3x3-cluj-arena',
    category: 'baschet',
    date: '2026-05-30',
    time: '10:00',
    location: 'Esplanada Cluj Arena, Aleea Stadionului nr. 2',
    locationDetails: 'Terenurile speciale de Streetball montate pe esplanada stadionului',
    maxParticipants: 32,
    registeredCount: 26,
    fee: '50 RON / echipă',
    status: 'open',
    summary: 'Turneu intens de baschet 3x3 pe jumătate de teren, conform regulamentului FIBA 3x3. Atmosferă urbană cu DJ, concurs de slam-dunk și aruncări de la distanță.',
    description: 'Vino cu echipa ta pe terenurile de la Cluj Arena! Competiția adună cele mai bune echipe universitare și de liceu din Transilvania pentru o zi plină de energie, baschet rapid și spectacol. Echipele sunt formate din 3 jucători pe teren + 1 rezervă opțională.',
    rules: [
      'Meciurile se desfășoară conform regulamentului oficial FIBA 3x3 pe un singur coș.',
      'Timpul de joc este de 10 minute sau până când o echipă ajunge la 21 de puncte.',
      'Fiecare echipă poate înscrie maxim 4 jucători.',
      'Arbitrajul este asigurat de arbitri federali din cadrul Colegiului de Arbitri Cluj.'
    ],
    schedule: [
      { time: '09:00 - 09:45', activity: 'Înregistrare echipe și tragere la sorți grupe' },
      { time: '10:00 - 14:00', activity: 'Faza meciurilor din grupe' },
      { time: '14:30 - 15:30', activity: 'Concurs 3-Point Contest & Slam Dunk Exhibition' },
      { time: '16:00 - 18:00', activity: 'Sferturi, Semifinale și Marea Finală' }
    ],
    organizer: 'Asociația Mișcarea Sportivă & Federația Română de Baschet',
    isFeatured: true,
    categoryBadge: 'Sporturi de Echipă',
    colorScheme: 'orange'
  },
  {
    id: 'ev-tenis-hatieganu',
    title: 'Campionatul Universitar de Tenis UBB - Ediția 2026',
    slug: 'campionat-universitar-tenis-ubb-2026',
    category: 'tenis',
    date: '2026-06-12',
    time: '09:00',
    location: 'Parcul Sportiv Universitar «Prof. Dr. Iuliu Hațieganu»',
    locationDetails: 'Terenurile de zgură 1-6, Str. Pandurilor nr. 7, Cluj-Napoca',
    maxParticipants: 48,
    registeredCount: 48,
    fee: '35 RON',
    status: 'closed',
    summary: 'Competiție de tenis de câmp pe zgură, probe de simplu masculin, simplu feminin și dublu mixt. Mingi oficiale asigurate de organizatori.',
    description: 'Campionatul Universitar de Tenis este cea mai prestigioasă întrecere pe zgură din mediul academic clujean. Înscrierile pentru această ediție au atins capacitatea maximă de 48 de jucători. Vă așteptăm în tribunele cochetei baze Iuliu Hațieganu pentru a susține viitorii campioni.',
    rules: [
      'Sistem eliminatoriu cu tablou principal de 32/16 și tablou de consolare pentru cei învinși în primul tur.',
      'Meciurile se joacă după sistemul 2 seturi din 3, cu super tie-break (până la 10) în loc de set decisiv.',
      'Mingile oficiale sunt puse la dispoziție de Asociația Mișcarea Sportivă.',
      'Ținuta sportivă specifică tenisului este obligatorie pe teren.'
    ],
    schedule: [
      { time: '08:30', activity: 'Briefing tehnic și afișare program de joc' },
      { time: '09:00 - 13:30', activity: 'Turul I și optimi de finală' },
      { time: '14:00 - 17:30', activity: 'Sferturi de finală și semifinale' },
      { time: '18:00', activity: 'Finalele de simplu și festivitatea de închidere' }
    ],
    organizer: 'Mișcarea Sportivă în parteneriat cu Federația Română de Tenis',
    isFeatured: true,
    categoryBadge: 'Tenis & Rachetă',
    colorScheme: 'emerald'
  },
  {
    id: 'ev-marisel-trail-camp',
    title: 'Tabăra de Trail Running & Orientare Mărișel - Apuseni',
    slug: 'tabara-trail-running-marisel-2026',
    category: 'outdoor',
    date: '2026-07-03',
    time: '08:00',
    endDate: '2026-07-05',
    location: 'Comuna Mărișel, Munții Apuseni, Jud. Cluj',
    locationDetails: 'Punct de întâlnire: Baza Salvamont Cluj / Pensiunea Popasul Iancului',
    maxParticipants: 50,
    registeredCount: 38,
    fee: '280 RON (include cazare, 3 mese/zi, ghizi)',
    status: 'open',
    summary: 'Trei zile de aventură în inima munților: trasee ghidate de trail running, atelier de navigație cu busolă și GPS, nutriție montană și prim ajutor montan.',
    description: 'Ieși din agitația orașului și antrenează-te pe culmile spectaculoase ale platoului Mărișel, la peste 1200m altitudine. Tabăra este gândită atât pentru alergători începători care vor să învețe tehnica de urcare și coborâre pe poteci tehnice, cât și pentru cei avansați care se pregătesc pentru maratoane montane.',
    rules: [
      'Echipament obligatoriu: încălțăminte cu profil montan, geacă de ploaie/vânt, rucsac de hidratare (minim 1.5L) și fluier.',
      'Respectarea strictă a indicațiilor ghizilor montani și salvamontiștilor însoțitori.',
      'Politica Zero Deșeuri: este interzisă abandonarea ambalajelor pe trasee.',
      'Adeverință medicală cu mențiunea «Apt pentru efort fizic intens».'
    ],
    schedule: [
      { time: 'Vineri 14:00', activity: 'Sosire, cazare și alergare ușoară de acomodare (6 km)' },
      { time: 'Sâmbătă 08:30', activity: 'Traseul principal pe creasta Mărișelului (16 km, +650m diferență de nivel)' },
      { time: 'Sâmbătă 17:00', activity: 'Atelier practic de prim ajutor și recuperare neuromusculară' },
      { time: 'Duminică 09:00', activity: 'Cursă simbolică de orientare turistică cu busola & prânz festiv' }
    ],
    organizer: 'Asociația Mișcarea Sportivă & Serviciul Public Județean Salvamont Cluj',
    isFeatured: true,
    categoryBadge: 'Outdoor & Munte',
    colorScheme: 'indigo'
  },
  {
    id: 'ev-voluntariat-bjk-cup',
    title: 'Recrutare Voluntari: Meciurile Internaționale Billie Jean King Cup',
    slug: 'recrutare-voluntari-bjk-cup-cluj-2026',
    category: 'voluntariat',
    date: '2026-08-18',
    time: '08:30',
    location: 'BT Arena (Sala Polivalentă Cluj-Napoca)',
    locationDetails: 'Acces Poarta Media & Voluntari, Aleea Stadionului nr. 4',
    maxParticipants: 120,
    registeredCount: 94,
    fee: 'Gratuit',
    status: 'open',
    summary: 'Alătură-te celei mai dinamice echipe de organizare sportivă! Căutăm voluntari pentru acreditări, ghidaj spectatori, asistență media, logistică și teren.',
    description: 'Asociația Mișcarea Sportivă a Studenților Transilvăneni este partenerul oficial de voluntariat al marilor evenimente internaționale de tenis și handbal din Cluj-Napoca. Voluntarii primesc echipament oficial de brand, certificat de voluntariat recunoscut universitar, masă caldă pe durata turelor și acces în culisele marilor victorii.',
    rules: [
      'Vârsta minimă este de 18 ani (sau 16 ani cu acordul scris al părinților).',
      'Disponibilitate pe parcursul celor 4 zile de pregătire și meciuri oficiale.',
      'Cunoștințe de limba engleză la nivel conversațional constituie un avantaj.',
      'Seriozitate, spirit de echipă și atitudine proactivă.'
    ],
    schedule: [
      { time: '18 August 10:00', activity: 'Sesiune introductivă de training și distribuire acreditări' },
      { time: '19 August 09:00', activity: 'Repetiție generală și preluare posturi la BT Arena' },
      { time: '20-21 August', activity: 'Zilele de meci oficiale și suport continuu pentru echipe' }
    ],
    organizer: 'Mișcarea Sportivă în parteneriat cu Federația Română de Tenis',
    isFeatured: false,
    categoryBadge: 'Voluntariat Sportiv',
    colorScheme: 'amber'
  },
  {
    id: 'ev-fotbal-inter-facultati',
    title: 'Cupa Mișcarea Sportivă la Minifotbal 6v6 Inter-Facultăți',
    slug: 'cupa-minifotbal-6v6-inter-facultati',
    category: 'fotbal',
    date: '2026-09-26',
    time: '11:00',
    location: 'Terenurile Sintetice Baza Sportivă FEFS UBB',
    locationDetails: 'Strada Pandurilor nr. 7, Cluj-Napoca',
    maxParticipants: 16,
    registeredCount: 11,
    fee: '80 RON / echipă',
    status: 'upcoming',
    summary: 'Campionatul universitar tradițional de toamnă pe gazon sintetic cu nocturnă. Arbitraj asigurat de studenți licențiați ai facultății de sport.',
    description: '16 facultăți, un singur trofeu! Turneul aduce pe teren rivalitățile amicale dintre viitorii ingineri, medici, sportivi, economiști și juriști. Meciurile se joacă în format 5 jucători de câmp + 1 portar, cu schimbări nelimitate de la margine.',
    rules: [
      'Componența echipei: minim 6 jucători, maxim 12 jucători înscriși pe foaia de joc.',
      'Toți jucătorii trebuie să fie studenți activi la facultatea reprezentată (carnet de student vizat la zi).',
      'Timpul de joc: 2 reprize a câte 20 de minute cu pauză de 5 minute.',
      'Toleranță zero pentru comportament nesportiv sau jigniri aduse arbitrilor.'
    ],
    schedule: [
      { time: '10:30', activity: 'Verificarea legitimațiilor și carnetelor de student' },
      { time: '11:00 - 15:00', activity: 'Meciurile din cele 4 grupe paralele' },
      { time: '16:00 - 18:30', activity: 'Fazele eliminatorii și marea finală universitară' }
    ],
    organizer: 'Asociația Mișcarea Sportivă & FEFS UBB',
    isFeatured: false,
    categoryBadge: 'Fotbal & Futsal',
    colorScheme: 'emerald'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-01',
    registrationCode: 'MS-2026-4819',
    eventId: 'ev-cros-cluj-2026',
    eventTitle: 'Crosul Studențesc Cluj - Ediția de Primăvară 2026',
    eventDate: '2026-05-16',
    fullName: 'Radu Călin Mureșan',
    email: 'radu.muresan@stud.ubbcluj.ro',
    phone: '0745123456',
    ageGroup: '18-29 ani',
    categoryOrRace: 'Cros 10km Open',
    affiliation: 'UBB Cluj - FSEGA',
    emergencyContact: 'Elena Mureșan (Mamă)',
    emergencyPhone: '0744987654',
    tshirtSize: 'L',
    status: 'confirmed',
    createdAt: '2026-04-10'
  },
  {
    id: 'reg-02',
    registrationCode: 'MS-2026-5921',
    eventId: 'ev-cros-cluj-2026',
    eventTitle: 'Crosul Studențesc Cluj - Ediția de Primăvară 2026',
    eventDate: '2026-05-16',
    fullName: 'Andreea Diana Pop',
    email: 'andreea.pop@yahoo.com',
    phone: '0721888999',
    ageGroup: '18-29 ani',
    categoryOrRace: 'Cros 5km Feminin',
    affiliation: 'Universitatea Tehnică din Cluj-Napoca (UTCN)',
    emergencyContact: 'Mihai Pop (Tată)',
    emergencyPhone: '0722333444',
    tshirtSize: 'S',
    status: 'confirmed',
    createdAt: '2026-04-12'
  },
  {
    id: 'reg-03',
    registrationCode: 'MS-2026-7734',
    eventId: 'ev-baschet-3x3-arena',
    eventTitle: 'Cupa Mișcarea Sportivă la Baschet 3x3 Cluj Arena',
    eventDate: '2026-05-30',
    fullName: 'Cristian Alexandru Stan',
    email: 'cristi.stan@gmail.com',
    phone: '0755678123',
    ageGroup: '18-29 ani',
    categoryOrRace: 'Echipă Masculin Open',
    affiliation: 'Echipa "Cluj Ballers" (FEFS UBB)',
    emergencyContact: 'Ion Stan',
    emergencyPhone: '0755999000',
    tshirtSize: 'XL',
    status: 'confirmed',
    createdAt: '2026-04-15'
  },
  {
    id: 'reg-04',
    registrationCode: 'MS-2026-8842',
    eventId: 'ev-marisel-trail-camp',
    eventTitle: 'Tabăra de Trail Running & Orientare Mărișel - Apuseni',
    eventDate: '2026-07-03',
    fullName: 'Ioana Simona Dobre',
    email: 'ioana.dobre@runnerscluj.ro',
    phone: '0733445566',
    ageGroup: '30-45 ani',
    categoryOrRace: 'Traseu Avansați (16km)',
    affiliation: 'Cluj Runners Community',
    emergencyContact: 'Gabriel Dobre (Soț)',
    emergencyPhone: '0733998877',
    tshirtSize: 'M',
    status: 'confirmed',
    createdAt: '2026-04-18'
  }
];

export const INITIAL_VOLUNTEERS: VolunteerApplication[] = [
  {
    id: 'vol-01',
    fullName: 'Vlad Tiberiu Moldovan',
    email: 'vlad.moldovan@stud.fefs.ro',
    phone: '0741223344',
    facultyOrOccupation: 'Student Anul II, FEFS UBB Cluj-Napoca',
    preferredRoles: ['Coordonare Traseu & Hidratare', 'Arbitraj & Asistență Tehnică'],
    experience: 'Voluntar activ la WTT Transylvania Open și la Semimaratonul Cluj 2025.',
    availability: 'Disponibil în weekenduri și după-amiezile din timpul săptămânii.',
    status: 'acceptat',
    createdAt: '2026-04-05'
  },
  {
    id: 'vol-02',
    fullName: 'Daria Teodora Crișan',
    email: 'daria.crisan@gmail.com',
    phone: '0752334455',
    facultyOrOccupation: 'Studentă FSPAC UBB - Comunicare și Relații Publice',
    preferredRoles: ['Social Media & Foto', 'Acreditări & Secretariat Concurs'],
    experience: 'Pasionată de fotografie sportivă și gestionare conturi Instagram/TikTok evenimente.',
    availability: 'Complet disponibilă pe toată durata competițiilor.',
    status: 'nou',
    createdAt: '2026-04-19'
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'Cosmin Dan',
    email: 'cosmin.dan@sponsor-sport.ro',
    phone: '0720112233',
    subject: 'Propunere de Parteneriat / Sponsorizare Crosul Studențesc',
    message: 'Bună ziua, reprezentăm un brand de suplimente nutritive și echipament sportiv din Cluj. Dorim să susținem cu pachete de premiere și batoane proteice participanții de la Crosul Studențesc 2026. Cum putem stabili o scurtă întâlnire?',
    status: 'nou',
    createdAt: '2026-04-17'
  },
  {
    id: 'msg-02',
    name: 'Prof. Mircea Vancea',
    email: 'mircea.vancea@liceulsportivcluj.ro',
    phone: '0744778899',
    subject: 'Înscriere delegație 25 de elevi la Cros',
    message: 'Salutare echipei Mișcarea Sportivă! Suntem de la Liceul cu Program Sportiv Cluj și dorim să aducem o grupă de atleți la cursa de 5km. Putem trimite un tabel centralizat de la secretariat?',
    status: 'rezolvat',
    createdAt: '2026-04-14'
  }
];
