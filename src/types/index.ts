export type EventCategory = 
  | 'alergare' 
  | 'tenis' 
  | 'fotbal' 
  | 'baschet' 
  | 'outdoor' 
  | 'voluntariat' 
  | 'campionat';

export type EventStatus = 'open' | 'upcoming' | 'closed' | 'completed';

export interface EventScheduleItem {
  time: string;
  activity: string;
}

export interface SportEvent {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  endDate?: string;
  location: string;
  locationDetails?: string;
  maxParticipants: number;
  registeredCount: number;
  fee: string;
  status: EventStatus;
  summary: string;
  description: string;
  rules: string[];
  schedule: EventScheduleItem[];
  organizer: string;
  isFeatured?: boolean;
  categoryBadge: string;
  colorScheme: 'blue' | 'orange' | 'emerald' | 'indigo' | 'amber';
}

export interface Registration {
  id: string;
  registrationCode: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  categoryOrRace: string;
  affiliation?: string;
  emergencyContact: string;
  emergencyPhone: string;
  tshirtSize?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  facultyOrOccupation: string;
  preferredRoles: string[];
  experience: string;
  availability: string;
  status: 'nou' | 'contactat' | 'acceptat';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'nou' | 'rezolvat';
  createdAt: string;
}

export type NavTab = 'home' | 'events' | 'about' | 'volunteering' | 'contact';

