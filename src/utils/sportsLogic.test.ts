import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateRegistrationForm,
  validateEventForm,
  calculateRemainingSpots,
  isEventRegistrationAvailable,
  filterEvents,
  formatDateRo,
  generateRegistrationCode,
  generateParticipantsCsv
} from './sportsLogic.ts';
import { SportEvent, Registration } from '../types/index.ts';

test('validateRegistrationForm: flags missing or invalid fields', () => {
  const result = validateRegistrationForm({
    fullName: '',
    email: 'invalid-email',
    phone: '123',
    ageGroup: '',
    categoryOrRace: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreedToTerms: false
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.agreedToTerms);
});

test('validateRegistrationForm: succeeds on valid input', () => {
  const result = validateRegistrationForm({
    fullName: 'Mihai Popescu',
    email: 'mihai.popescu@exemplu.ro',
    phone: '0744123456',
    ageGroup: '18-29 ani',
    categoryOrRace: 'Cros 5km',
    emergencyContact: 'Ioana Popescu',
    emergencyPhone: '0744999888',
    agreedToTerms: true
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('calculateRemainingSpots & isEventRegistrationAvailable: handles capacity accurately', () => {
  const event1 = {
    status: 'open' as const,
    maxParticipants: 100,
    registeredCount: 85
  };
  assert.equal(calculateRemainingSpots(event1), 15);
  assert.equal(isEventRegistrationAvailable(event1), true);

  const eventFull = {
    status: 'open' as const,
    maxParticipants: 100,
    registeredCount: 100
  };
  assert.equal(calculateRemainingSpots(eventFull), 0);
  assert.equal(isEventRegistrationAvailable(eventFull), false);

  const eventUpcoming = {
    status: 'upcoming' as const,
    maxParticipants: 50,
    registeredCount: 0
  };
  assert.equal(calculateRemainingSpots(eventUpcoming), 50);
  assert.equal(isEventRegistrationAvailable(eventUpcoming), false);
});

test('filterEvents: filters accurately by category, status, and search query', () => {
  const sampleEvents: SportEvent[] = [
    {
      id: '1',
      title: 'Crosul Studențesc Cluj',
      slug: 'crosul-studentesc-cluj',
      category: 'alergare',
      date: '2026-05-16',
      time: '09:00',
      location: 'Parcul Central Cluj-Napoca',
      maxParticipants: 500,
      registeredCount: 320,
      fee: 'Gratuit',
      status: 'open',
      summary: 'Eveniment atletic dedicat studenților și comunității din Cluj.',
      description: 'Descriere completă...',
      rules: ['Regula 1'],
      schedule: [{ time: '09:00', activity: 'Start' }],
      organizer: 'Mișcarea Sportivă',
      categoryBadge: 'Alergare & Atletism',
      colorScheme: 'blue'
    },
    {
      id: '2',
      title: 'Campionatul Universitar de Tenis UBB',
      slug: 'campionat-tenis-ubb',
      category: 'tenis',
      date: '2026-06-06',
      time: '10:00',
      location: 'Baza Sportivă Iuliu Hațieganu',
      maxParticipants: 64,
      registeredCount: 64,
      fee: '35 RON',
      status: 'closed',
      summary: 'Turneu pe zgură pentru studenți și cadre universitare.',
      description: 'Descriere tenis...',
      rules: ['Regula tenis'],
      schedule: [{ time: '10:00', activity: 'Meciuri' }],
      organizer: 'Mișcarea Sportivă',
      categoryBadge: 'Tenis',
      colorScheme: 'orange'
    }
  ];

  // Category filter
  const runningOnly = filterEvents(sampleEvents, { category: 'alergare' });
  assert.equal(runningOnly.length, 1);
  assert.equal(runningOnly[0].id, '1');

  // Status filter
  const openOnly = filterEvents(sampleEvents, { status: 'open' });
  assert.equal(openOnly.length, 1);
  assert.equal(openOnly[0].id, '1');

  // Search keyword
  const searchMatch = filterEvents(sampleEvents, { search: 'Hațieganu' });
  assert.equal(searchMatch.length, 1);
  assert.equal(searchMatch[0].id, '2');
});

test('formatDateRo: formats date properly in Romanian', () => {
  const formatted = formatDateRo('2026-05-16');
  assert.equal(formatted, '16 Mai 2026');
});

test('generateRegistrationCode: generates standard format MS-2026-XXXX', () => {
  const code = generateRegistrationCode();
  assert.match(code, /^MS-2026-\d{4}$/);
});

test('generateParticipantsCsv: builds compliant CSV headers and records', () => {
  const sampleRegistrations: Registration[] = [
    {
      id: 'reg-1',
      registrationCode: 'MS-2026-1234',
      eventId: '1',
      eventTitle: 'Crosul Studențesc Cluj',
      eventDate: '2026-05-16',
      fullName: 'Andrei Ionescu',
      email: 'andrei@example.com',
      phone: '0722112233',
      ageGroup: '18-29 ani',
      categoryOrRace: 'Cros 5km',
      affiliation: 'UBB FEFS',
      emergencyContact: 'Maria Ionescu',
      emergencyPhone: '0722998877',
      tshirtSize: 'M',
      status: 'confirmed',
      createdAt: '2026-05-01'
    }
  ];

  const csv = generateParticipantsCsv(sampleRegistrations);
  assert.ok(csv.includes('Cod Inscriere,Eveniment,Data Eveniment'));
  assert.ok(csv.includes('"MS-2026-1234"'));
  assert.ok(csv.includes('"Andrei Ionescu"'));
});
