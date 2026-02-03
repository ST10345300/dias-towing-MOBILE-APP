import { useState, useEffect } from 'react';
import { MapView, createPickupIcon, createDropoffIcon } from '@/app/components/MapView';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Phone, MessageCircle, Camera, Navigation, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ActiveTripProps {
  onComplete: () => void;
}

export function ActiveTrip({ onComplete }: ActiveTripProps) {
  const [step, setStep] = useState<'navigate_to_pickup' | 'at_pickup' | 'vehicle_loaded' | 'navigate_to_dropoff' | 'delivered'>('navigate_to_pickup');
  const [odometer, setOdometer] = useState('');

  const customer = {
    name: 'John Smith',
    photo: 'https://i.pravatar.cc/150?img=68',
    phoneNumber: '+1 (555) 987-6543',
    vehicle: {
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      color: 'Silver',
      licensePlate: 'ABC123'
    }
  };

  const pickupLocation: [number, number] = [40.7580, -73.9855];
  const dropoffLocation: [number, number] = [40.8580, -73.8855];
  const estimatedEarnings = 83;

  useEffect(() => {
    if (step === 'delivered') {
      setTimeout(() => {
        toast.success('Trip completed!');
        onComplete();
      }, 2000);
    }
  }, [step, onComplete]);

  const handleArrivedAtPickup = () => {
    setStep('at_pickup');
    toast.success('Marked as arrived at pickup');
  };

  const handleVehicleLoaded = () => {
    setStep('vehicle_loaded');
    toast.success('Vehicle loaded successfully');
  };

  const handleStartNavigation = () => {
    setStep('navigate_to_dropoff');
  };

  const handleDelivered = () => {
    if (!odometer) {
      toast.error('Please enter odometer reading');
      return;
    }
    setStep('delivered');
  };

  const getStepInfo = () => {
    switch (step) {
      case 'navigate_to_pickup':
        return {
          title: 'Navigate to Pickup',
          description: 'Drive to customer location',
          action: handleArrivedAtPickup,
          actionLabel: 'Arrived at Pickup'
        };
      case 'at_pickup':
        return {
          title: 'At Pickup Location',
          description: 'Load the vehicle',
          action: handleVehicleLoaded,
          actionLabel: 'Vehicle Loaded'
        };
      case 'vehicle_loaded':
        return {
          title: 'Vehicle Loaded',
          description: 'Start navigation to drop-off',
          action: handleStartNavigation,
          actionLabel: 'Start Navigation'
        };
      case 'navigate_to_dropoff':
        return {
          title: 'En Route to Destination',
          description: 'Deliver the vehicle',
          action: handleDelivered,
          actionLabel: 'Mark as Delivered'
        };
      case 'delivered':
        return {
          title: 'Trip Completed',
          description: 'Processing completion...',
          action: () => {},
          actionLabel: 'Completed'
        };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map Section */}
      <div className="flex-1 relative">
        <MapView
          center={step === 'navigate_to_pickup' || step === 'at_pickup' ? pickupLocation : dropoffLocation}
          zoom={14}
          markers={[
            {
              position: pickupLocation,
              popup: 'Pickup Location',
              icon: createPickupIcon()
            },
            {
              position: dropoffLocation,
              popup: 'Drop-off Location',
              icon: createDropoffIcon()
            }
          ]}
          route={[pickupLocation, dropoffLocation]}
          className="w-full h-full"
        />

        {/* Navigation Button */}
        <button className="absolute bottom-6 right-4 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center">
          <Navigation className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Trip Info */}
      <div className="bg-white rounded-t-3xl shadow-2xl">
        {/* Progress Steps */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            {['pickup', 'load', 'transport', 'deliver'].map((s, index) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= ['navigate_to_pickup', 'at_pickup', 'vehicle_loaded', 'navigate_to_dropoff', 'delivered'].indexOf(step)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index < ['navigate_to_pickup', 'at_pickup', 'vehicle_loaded', 'navigate_to_dropoff', 'delivered'].indexOf(step) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                {index < 3 && (
                  <div className={`w-16 h-1 mx-1 ${
                    index < ['navigate_to_pickup', 'at_pickup', 'vehicle_loaded', 'navigate_to_dropoff', 'delivered'].indexOf(step)
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-lg mb-1">{stepInfo.title}</h3>
            <p className="text-sm text-gray-600">{stepInfo.description}</p>
          </div>
        </div>

        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Customer Info */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={customer.photo} alt={customer.name} />
                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4>{customer.name}</h4>
                  <p className="text-sm text-gray-600">{customer.phoneNumber}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </button>
                <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
          </Card>

          {/* Vehicle Info */}
          <Card className="p-4">
            <h4 className="mb-2">Vehicle Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Make/Model:</span>
                <p>{customer.vehicle.make} {customer.vehicle.model}</p>
              </div>
              <div>
                <span className="text-gray-600">Year:</span>
                <p>{customer.vehicle.year}</p>
              </div>
              <div>
                <span className="text-gray-600">Color:</span>
                <p>{customer.vehicle.color}</p>
              </div>
              <div>
                <span className="text-gray-600">License:</span>
                <p>{customer.vehicle.licensePlate}</p>
              </div>
            </div>
          </Card>

          {/* Photo Upload */}
          {step === 'at_pickup' && (
            <Card className="p-4">
              <Label className="mb-2 block">Upload Vehicle Photos</Label>
              <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Take photos before loading</p>
              </button>
            </Card>
          )}

          {/* Odometer Input */}
          {step === 'navigate_to_dropoff' && (
            <Card className="p-4">
              <Label htmlFor="odometer">Odometer Reading (km)</Label>
              <Input
                id="odometer"
                type="number"
                placeholder="Enter current odometer"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="mt-1"
              />
            </Card>
          )}

          {/* Earnings */}
          <Card className="p-4 bg-green-50">
            <div className="flex justify-between items-center">
              <span>Estimated Earnings</span>
              <span className="text-2xl text-green-600">${estimatedEarnings}</span>
            </div>
          </Card>

          {/* Action Button */}
          {step !== 'delivered' && (
            <Button 
              onClick={stepInfo.action}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            >
              {stepInfo.actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
