import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SportEvent,
  Registration,
  VolunteerApplication,
  ContactMessage,
  NavTab
} from '../types/index.ts';
import {
  INITIAL_EVENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_VOLUNTEERS,
  INITIAL_MESSAGES
} from '../data/initialData.ts';
import { generateRegistrationCode } from '../utils/sportsLogic.ts';

interface SportsContextType {
  events: SportEvent[];
  registrations: Registration[];
  volunteers: VolunteerApplication[];
  messages: ContactMessage[];
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  selectedEventForModal: SportEvent | null;
  setSelectedEventForModal: (event: SportEvent | null) => void;
  selectedEventForRegistration: SportEvent | null;
  setSelectedEventForRegistration: (event: SportEvent | null) => void;
  
  // Event Operations
  addEvent: (eventData: Omit<SportEvent, 'id' | 'registeredCount'>) => SportEvent;
  updateEvent: (id: string, updates: Partial<SportEvent>) => void;
  deleteEvent: (id: string) => void;
  toggleEventStatus: (id: string) => void;

  // Registration Operations
  addRegistration: (data: Omit<Registration, 'id' | 'registrationCode' | 'createdAt'>) => {
    success: boolean;
    registration?: Registration;
    error?: string;
  };
  updateRegistrationStatus: (id: string, status: Registration['status']) => void;
  deleteRegistration: (id: string) => void;

  // Volunteer & Messages Operations
  addVolunteerApplication: (data: Omit<VolunteerApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateVolunteerStatus: (id: string, status: VolunteerApplication['status']) => void;
  addContactMessage: (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;

  // System
  resetToDemoData: () => void;
}

const SportsContext = createContext<SportsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  EVENTS: 'miscarea_sportiva_events_v2',
  REGISTRATIONS: 'miscarea_sportiva_registrations_v2',
  VOLUNTEERS: 'miscarea_sportiva_volunteers_v2',
  MESSAGES: 'miscarea_sportiva_messages_v2'
};

export const SportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<SportEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
      return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
    } catch {
      return INITIAL_VOLUNTEERS;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedEventForModal, setSelectedEventForModal] = useState<SportEvent | null>(null);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState<SportEvent | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.warn('Storage sync failed for events', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.warn('Storage sync failed for registrations', e);
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers));
    } catch (e) {
      console.warn('Storage sync failed for volunteers', e);
    }
  }, [volunteers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn('Storage sync failed for messages', e);
    }
  }, [messages]);

  const addEvent = (eventData: Omit<SportEvent, 'id' | 'registeredCount'>): SportEvent => {
    const id = `ev-${Date.now()}`;
    const newEvent: SportEvent = {
      ...eventData,
      id,
      registeredCount: 0
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<SportEvent>) => {
    setEvents(prev =>
      prev.map(ev => (ev.id === id ? { ...ev, ...updates } : ev))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const toggleEventStatus = (id: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === id) {
          const nextStatus = ev.status === 'open' ? 'closed' : 'open';
          return { ...ev, status: nextStatus };
        }
        return ev;
      })
    );
  };

  const addRegistration = (
    data: Omit<Registration, 'id' | 'registrationCode' | 'createdAt'>
  ): { success: boolean; registration?: Registration; error?: string } => {
    const targetEvent = events.find(e => e.id === data.eventId);
    if (!targetEvent) {
      return { success: false, error: 'Evenimentul specificat nu a fost găsit.' };
    }

    if (targetEvent.registeredCount >= targetEvent.maxParticipants) {
      return { success: false, error: 'Ne pare rău, toate locurile pentru acest eveniment s-au epuizat.' };
    }

    const newRegistration: Registration = {
      ...data,
      id: `reg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      registrationCode: generateRegistrationCode(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRegistrations(prev => [newRegistration, ...prev]);

    // Increment registered count for the event
    setEvents(prev =>
      prev.map(ev =>
        ev.id === data.eventId
          ? {
              ...ev,
              registeredCount: ev.registeredCount + 1,
              status: ev.registeredCount + 1 >= ev.maxParticipants ? 'closed' : ev.status
            }
          : ev
      )
    );

    return { success: true, registration: newRegistration };
  };

  const updateRegistrationStatus = (id: string, status: Registration['status']) => {
    setRegistrations(prev =>
      prev.map(reg => (reg.id === id ? { ...reg, status } : reg))
    );
  };

  const deleteRegistration = (id: string) => {
    const targetReg = registrations.find(r => r.id === id);
    if (targetReg) {
      // Decrement event registered count
      setEvents(prev =>
        prev.map(ev =>
          ev.id === targetReg.eventId
            ? { ...ev, registeredCount: Math.max(0, ev.registeredCount - 1) }
            : ev
        )
      );
    }
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  const addVolunteerApplication = (data: Omit<VolunteerApplication, 'id' | 'createdAt' | 'status'>) => {
    const newVol: VolunteerApplication = {
      ...data,
      id: `vol-${Date.now()}`,
      status: 'nou',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setVolunteers(prev => [newVol, ...prev]);
  };

  const updateVolunteerStatus = (id: string, status: VolunteerApplication['status']) => {
    setVolunteers(prev =>
      prev.map(vol => (vol.id === id ? { ...vol, status } : vol))
    );
  };

  const addContactMessage = (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      status: 'nou',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, status } : msg))
    );
  };

  const resetToDemoData = () => {
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setVolunteers(INITIAL_VOLUNTEERS);
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEYS.VOLUNTEERS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  };

  return (
    <SportsContext.Provider
      value={{
        events,
        registrations,
        volunteers,
        messages,
        currentTab,
        setCurrentTab,
        selectedEventForModal,
        setSelectedEventForModal,
        selectedEventForRegistration,
        setSelectedEventForRegistration,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventStatus,
        addRegistration,
        updateRegistrationStatus,
        deleteRegistration,
        addVolunteerApplication,
        updateVolunteerStatus,
        addContactMessage,
        updateMessageStatus,
        resetToDemoData
      }}
    >
      {children}
    </SportsContext.Provider>
  );
};

export const useSports = () => {
  const context = useContext(SportsContext);
  if (!context) {
    throw new Error('useSports must be used within a SportsProvider');
  }
  return context;
};
