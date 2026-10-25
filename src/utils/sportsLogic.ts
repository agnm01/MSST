import { SportEvent, Registration, EventCategory, EventStatus } from '../types/index.ts';

/**
 * Validates registration data for an event
 */
export function validateRegistrationForm(data: {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  categoryOrRace: string;
  emergencyContact: string;
  emergencyPhone: string;
  agreedToTerms: boolean;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Numele complet este obligatoriu (minim 3 caractere).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Adresa de email nu este validă.';
  }

  const cleanPhone = data.phone.replace(/[\s\-\+\(\)]/g, '');
  if (!data.phone || cleanPhone.length < 9) {
    errors.phone = 'Introduceți un număr de telefon valid (minim 9 cifre).';
  }

  if (!data.ageGroup) {
    errors.ageGroup = 'Selectați categoria de vârstă.';
  }

  if (!data.categoryOrRace) {
    errors.categoryOrRace = 'Selectați proba sau categoria de participare.';
  }

  if (!data.emergencyContact || data.emergencyContact.trim().length < 3) {
    errors.emergencyContact = 'Introduceți numele persoanei de contact pentru urgențe.';
  }

  const cleanEmergPhone = data.emergencyPhone.replace(/[\s\-\+\(\)]/g, '');
  if (!data.emergencyPhone || cleanEmergPhone.length < 9) {
    errors.emergencyPhone = 'Introduceți numărul de telefon de urgență.';
  }

  if (!data.agreedToTerms) {
    errors.agreedToTerms = 'Trebuie să confirmați acordul cu regulamentul competiției.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates admin event creation/edit form
 */
export function validateEventForm(event: Partial<SportEvent>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!event.title || event.title.trim().length < 4) {
    errors.title = 'Titlul evenimentului este obligatoriu (minim 4 caractere).';
  }

  if (!event.category) {
    errors.category = 'Selectați categoria evenimentului.';
  }

  if (!event.date) {
    errors.date = 'Data evenimentului este obligatorie.';
  }

  if (!event.time) {
    errors.time = 'Ora de start este obligatorie.';
  }

  if (!event.location || event.location.trim().length < 3) {
    errors.location = 'Locația este obligatorie.';
  }

  if (typeof event.maxParticipants !== 'number' || event.maxParticipants < 1) {
    errors.maxParticipants = 'Numărul maxim de participanți trebuie să fie cel puțin 1.';
  }

  if (!event.fee || event.fee.trim().length === 0) {
    errors.fee = 'Specificați taxa (ex: Gratuit sau 50 RON).';
  }

  if (!event.summary || event.summary.trim().length < 10) {
    errors.summary = 'Descrierea succintă trebuie să aibă minim 10 caractere.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Calculates remaining available spots for an event
 */
export function calculateRemainingSpots(event: { maxParticipants: number; registeredCount: number }): number {
  return Math.max(0, event.maxParticipants - event.registeredCount);
}

/**
 * Determines whether registration is open and spots are available
 */
export function isEventRegistrationAvailable(event: { status: EventStatus; maxParticipants: number; registeredCount: number }): boolean {
  if (event.status !== 'open') return false;
  return calculateRemainingSpots(event) > 0;
}

/**
 * Filters events by category, status, and search query
 */
export function filterEvents(
  events: SportEvent[],
  filters: {
    category?: EventCategory | 'all';
    status?: EventStatus | 'all';
    search?: string;
  }
): SportEvent[] {
  return events.filter(event => {
    if (filters.category && filters.category !== 'all' && event.category !== filters.category) {
      return false;
    }
    if (filters.status && filters.status !== 'all' && event.status !== filters.status) {
      return false;
    }
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      const matchTitle = event.title.toLowerCase().includes(q);
      const matchLocation = event.location.toLowerCase().includes(q);
      const matchSummary = event.summary.toLowerCase().includes(q);
      const matchCategory = event.category.toLowerCase().includes(q);
      if (!matchTitle && !matchLocation && !matchSummary && !matchCategory) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Formats a date string (YYYY-MM-DD) into Romanian localized readable format
 */
export function formatDateRo(dateStr: string, options?: { showDayOfWeek?: boolean }): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, monthIndex, day);

      const monthsRo = [
        'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
        'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
      ];
      const daysRo = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

      const monthName = monthsRo[monthIndex] || '';
      const dayOfWeek = daysRo[date.getDay()] || '';

      if (options?.showDayOfWeek) {
        return `${dayOfWeek}, ${day} ${monthName} ${year}`;
      }
      return `${day} ${monthName} ${year}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * Generates an official readable registration code, e.g. MS-2026-8942
 */
export function generateRegistrationCode(): string {
  const year = 2026;
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `MS-${year}-${randomNum}`;
}

/**
 * Converts a list of participant registrations to valid CSV format
 */
export function generateParticipantsCsv(registrations: Registration[]): string {
  const headers = [
    'Cod Inscriere',
    'Eveniment',
    'Data Eveniment',
    'Nume Participant',
    'Email',
    'Telefon',
    'Proba / Categorie',
    'Grupa Varsta',
    'Afiliere / Club',
    'Contact Urgenta',
    'Telefon Urgenta',
    'Marime Tricou',
    'Status',
    'Data Inregistrarii'
  ];

  const escapeCsv = (str: string | undefined): string => {
    if (!str) return '""';
    const clean = str.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = registrations.map(reg => [
    escapeCsv(reg.registrationCode),
    escapeCsv(reg.eventTitle),
    escapeCsv(reg.eventDate),
    escapeCsv(reg.fullName),
    escapeCsv(reg.email),
    escapeCsv(reg.phone),
    escapeCsv(reg.categoryOrRace),
    escapeCsv(reg.ageGroup),
    escapeCsv(reg.affiliation || '-'),
    escapeCsv(reg.emergencyContact),
    escapeCsv(reg.emergencyPhone),
    escapeCsv(reg.tshirtSize || '-'),
    escapeCsv(reg.status),
    escapeCsv(reg.createdAt)
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}
