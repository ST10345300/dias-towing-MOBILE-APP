import { useEffect } from 'react';
import { Truck } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-white rounded-full animate-pulse">
          <Truck className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-5xl text-white mb-4">Dias Towing</h1>
        <p className="text-blue-100 text-xl">Reliable Towing, Anytime</p>
      </div>
    </div>
  );
}
