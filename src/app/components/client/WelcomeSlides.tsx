import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { MapPin, Clock, Shield, ChevronRight } from 'lucide-react';

interface WelcomeSlidesProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: MapPin,
    title: 'Quick & Easy Booking',
    description: 'Request a tow truck in seconds with just a few taps. We\'ll find the nearest driver for you.',
    color: 'text-blue-600'
  },
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    description: 'Track your driver\'s location in real-time and know exactly when they\'ll arrive.',
    color: 'text-orange-600'
  },
  {
    icon: Shield,
    title: 'Safe & Reliable',
    description: 'All our drivers are certified professionals. Your vehicle is in good hands.',
    color: 'text-green-600'
  }
];

export function WelcomeSlides({ onComplete }: WelcomeSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className={`mb-12 w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center`}>
          <Icon className={`w-20 h-20 ${slide.color}`} />
        </div>
        
        <h2 className="text-3xl text-center mb-4">{slide.title}</h2>
        <p className="text-center text-muted-foreground text-lg max-w-md">
          {slide.description}
        </p>

        <div className="flex space-x-2 mt-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <Button onClick={handleNext} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            'Get Started'
          )}
        </Button>
        {currentSlide < slides.length - 1 && (
          <Button variant="ghost" onClick={handleSkip} className="w-full">
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}
