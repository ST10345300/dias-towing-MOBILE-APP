import { useState, useEffect } from 'react';
import { MapView, createTruckIcon, createPickupIcon, createDropoffIcon } from '@/app/components/MapView';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar';
import { Phone, MessageCircle, Star, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface TrackingScreenProps {
  onComplete: () => void;
}

export function TrackingScreen({ onComplete }: TrackingScreenProps) {
  const [status, setStatus] = useState<'driver_enroute' | 'arrived' | 'in_tow' | 'completed'>('driver_enroute');
  const [eta, setEta] = useState(12);
  const [driverLocation, setDriverLocation] = useState<[number, number]>([40.7489, -73.9680]);

  const driver = {
    id: 'D001',
    name: 'Michael Rodriguez',
    photo: 'https://i.pravatar.cc/150?img=12',
    rating: 4.9,
    reviewCount: 342,
    vehicleType: 'Flatbed Tow',
    licensePlate: 'TOW-4567',
    phoneNumber: '+1 (555) 123-4567'
  };

  const pickupLocation: [number, number] = [40.7580, -73.9855];
  const dropoffLocation: [number, number] = [40.8580, -73.8855];

  useEffect(() => {
    // Simulate driver approaching
    const interval = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => setStatus('arrived'), 1000);
          return 0;
        }
        return prev - 1;
      });

      // Simulate driver moving towards pickup
      setDriverLocation(([lat, lng]) => [
        lat + (pickupLocation[0] - lat) * 0.1,
        lng + (pickupLocation[1] - lng) * 0.1
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (status === 'arrived') {
      setTimeout(() => setStatus('in_tow'), 5000);
    } else if (status === 'in_tow') {
      setTimeout(() => setStatus('completed'), 8000);
    } else if (status === 'completed') {
      setTimeout(onComplete, 1000);
    }
  }, [status, onComplete]);

  const getStatusInfo = () => {
    switch (status) {
      case 'driver_enroute':
        return {
          title: 'Driver En Route',
          description: `Arriving in ${eta} minutes`,
          color: 'bg-blue-600'
        };
      case 'arrived':
        return {
          title: 'Driver Arrived',
          description: 'Your driver is at the pickup location',
          color: 'bg-green-600'
        };
      case 'in_tow':
        return {
          title: 'In Progress',
          description: 'Your vehicle is being towed',
          color: 'bg-orange-600'
        };
      case 'completed':
        return {
          title: 'Trip Completed',
          description: 'You have arrived at your destination',
          color: 'bg-green-600'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map Section */}
      <div className="flex-1 relative">
        <MapView
          center={driverLocation}
          zoom={13}
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
            },
            {
              position: driverLocation,
              popup: driver.name,
              icon: createTruckIcon()
            }
          ]}
          route={status === 'driver_enroute' ? [driverLocation, pickupLocation] : [pickupLocation, dropoffLocation]}
          className="w-full h-full"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 right-4">
          <Card className={`${statusInfo.color} text-white p-4`}>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <div>
                <h3 className="text-lg">{statusInfo.title}</h3>
                <p className="text-sm text-white/90">{statusInfo.description}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Driver Info Card */}
      <div className="bg-white rounded-t-3xl shadow-2xl p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={driver.photo} alt={driver.name} />
            <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg mb-1">{driver.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{driver.rating}</span>
              <span>•</span>
              <span>{driver.reviewCount} trips</span>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="mb-1">{driver.licensePlate}</Badge>
            <p className="text-xs text-gray-500">{driver.vehicleType}</p>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <Phone className="w-5 h-5 mr-2" />
            Call Driver
          </Button>
          <Button variant="outline" className="h-12">
            <MessageCircle className="w-5 h-5 mr-2" />
            Message
          </Button>
        </div>

        {/* Trip Details */}
        <Card className="p-4 bg-gray-50">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-orange-600 mt-1" />
              <div className="flex-1">
                <p className="text-xs text-gray-600">Pickup</p>
                <p className="text-sm">123 W 44th St, New York, NY 10036</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-xs text-gray-600">Drop-off</p>
                <p className="text-sm">500 E 149th St, Bronx, NY 10455</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Share Trip */}
        <Button variant="ghost" className="w-full">
          Share Trip Status
        </Button>
      </div>
    </div>
  );
}
