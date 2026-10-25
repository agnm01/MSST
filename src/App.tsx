import React from 'react';
import { SportsProvider, useSports } from './context/SportsContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomeView } from './views/HomeView.tsx';
import { EventsView } from './views/EventsView.tsx';
import { AboutView } from './views/AboutView.tsx';
import { VolunteeringView } from './views/VolunteeringView.tsx';
import { ContactView } from './views/ContactView.tsx';
import { EventDetailModal } from './components/EventDetailModal.tsx';
import { RegistrationModal } from './components/RegistrationModal.tsx';

const AppContent: React.FC = () => {
  const {
    currentTab,
    selectedEventForModal,
    setSelectedEventForModal,
    selectedEventForRegistration,
    setSelectedEventForRegistration
  } = useSports();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Navbar />

      {/* Main Multi-page Dynamic Router */}
      <main className="flex-1">
        {currentTab === 'home' && <HomeView />}
        {currentTab === 'events' && <EventsView />}
        {currentTab === 'about' && <AboutView />}
        {currentTab === 'volunteering' && <VolunteeringView />}
        {currentTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal: Event Details & Schedule */}
      {selectedEventForModal && (
        <EventDetailModal
          event={selectedEventForModal}
          onClose={() => setSelectedEventForModal(null)}
          onOpenRegister={event => {
            setSelectedEventForModal(null);
            setSelectedEventForRegistration(event);
          }}
        />
      )}

      {/* Modal: Official Registration Form */}
      {selectedEventForRegistration && (
        <RegistrationModal
          event={selectedEventForRegistration}
          onClose={() => setSelectedEventForRegistration(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <SportsProvider>
      <AppContent />
    </SportsProvider>
  );
}
