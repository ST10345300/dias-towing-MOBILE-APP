import { useState } from 'react';
import { Toaster } from '@/app/components/ui/sonner';
import { RoleSelection } from '@/app/components/RoleSelection';

// Client Components
import { SplashScreen } from '@/app/components/client/SplashScreen';
import { WelcomeSlides } from '@/app/components/client/WelcomeSlides';
import { LoginScreen } from '@/app/components/client/LoginScreen';
import { ClientHome } from '@/app/components/client/ClientHome';
import { RequestTow } from '@/app/components/client/RequestTow';
import { TrackingScreen } from '@/app/components/client/TrackingScreen';
import { RatingScreen } from '@/app/components/client/RatingScreen';
import { TripHistory } from '@/app/components/client/TripHistory';
import { ClientProfile } from '@/app/components/client/ClientProfile';

// Driver Components
import { DriverHome } from '@/app/components/driver/DriverHome';
import { ActiveTrip } from '@/app/components/driver/ActiveTrip';
import { EarningsDashboard } from '@/app/components/driver/EarningsDashboard';

// Admin Components
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';

type UserRole = 'client' | 'driver' | 'admin' | null;
type ClientScreen = 'splash' | 'welcome' | 'login' | 'home' | 'request' | 'tracking' | 'rating' | 'history' | 'profile';
type DriverScreen = 'home' | 'active-trip' | 'earnings' | 'history';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  
  // Client state
  const [clientScreen, setClientScreen] = useState<ClientScreen>('splash');
  
  // Driver state
  const [driverScreen, setDriverScreen] = useState<DriverScreen>('home');

  // Role Selection
  if (!selectedRole) {
    return <RoleSelection onSelectRole={setSelectedRole} />;
  }

  // CLIENT APP
  if (selectedRole === 'client') {
    if (clientScreen === 'splash') {
      return <SplashScreen onComplete={() => setClientScreen('welcome')} />;
    }

    if (clientScreen === 'welcome') {
      return <WelcomeSlides onComplete={() => setClientScreen('login')} />;
    }

    if (clientScreen === 'login') {
      return <LoginScreen onLogin={() => setClientScreen('home')} />;
    }

    if (clientScreen === 'home') {
      return (
        <>
          <ClientHome
            onRequestTow={() => setClientScreen('request')}
            onNavigate={(page) => {
              if (page === 'history') setClientScreen('history');
              if (page === 'profile') setClientScreen('profile');
            }}
          />
          <Toaster />
        </>
      );
    }

    if (clientScreen === 'request') {
      return (
        <>
          <RequestTow
            onBack={() => setClientScreen('home')}
            onConfirm={() => setClientScreen('tracking')}
          />
          <Toaster />
        </>
      );
    }

    if (clientScreen === 'tracking') {
      return (
        <>
          <TrackingScreen onComplete={() => setClientScreen('rating')} />
          <Toaster />
        </>
      );
    }

    if (clientScreen === 'rating') {
      return (
        <>
          <RatingScreen onComplete={() => setClientScreen('home')} />
          <Toaster />
        </>
      );
    }

    if (clientScreen === 'history') {
      return (
        <>
          <TripHistory onBack={() => setClientScreen('home')} />
          <Toaster />
        </>
      );
    }

    if (clientScreen === 'profile') {
      return (
        <>
          <ClientProfile onBack={() => setClientScreen('home')} />
          <Toaster />
        </>
      );
    }
  }

  // DRIVER APP
  if (selectedRole === 'driver') {
    if (driverScreen === 'home') {
      return (
        <>
          <DriverHome
            onAcceptRequest={() => setDriverScreen('active-trip')}
            onNavigate={(page) => {
              if (page === 'earnings') setDriverScreen('earnings');
            }}
          />
          <Toaster />
        </>
      );
    }

    if (driverScreen === 'active-trip') {
      return (
        <>
          <ActiveTrip onComplete={() => setDriverScreen('home')} />
          <Toaster />
        </>
      );
    }

    if (driverScreen === 'earnings') {
      return (
        <>
          <EarningsDashboard onBack={() => setDriverScreen('home')} />
          <Toaster />
        </>
      );
    }
  }

  // ADMIN APP
  if (selectedRole === 'admin') {
    return (
      <>
        <AdminDashboard />
        <Toaster />
      </>
    );
  }

  return null;
}