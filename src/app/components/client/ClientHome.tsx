import { useState } from 'react';
import { MapView, createPickupIcon, createDropoffIcon } from '@/app/components/MapView';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Home, History, User, Menu, Search, MapPin, Navigation, Clock, Star } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ClientHomeProps {
  onRequestTow: () => void;
  onNavigate: (page: string) => void;
}

const truckTypes = [
  {
    id: 'flatbed',
    name: 'Flatbed Tow',
    description: 'Best for AWD and luxury vehicles',
    image: 'https://images.unsplash.com/photo-1742069029207-0aacf8fa4401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGF0YmVkJTIwdG93JTIwdHJ1Y2t8ZW58MXx8fHwxNzcwMTM5Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    basePrice: 75
  },
  {
    id: 'wheel-lift',
    name: 'Wheel-Lift Tow',
    description: 'Quick and efficient',
    image: 'https://images.unsplash.com/photo-1686966933735-305bd8fe0a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3clMjB0cnVjayUyMHNlcnZpY2UlMjB2ZWhpY2xlfGVufDF8fHx8MTc3MDEzOTc5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    basePrice: 65
  },
  {
    id: 'heavy-duty',
    name: 'Heavy-Duty Tow',
    description: 'For trucks and RVs',
    image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMGR1dHklMjB0b3clMjB0cnVja3xlbnwxfHx8fDE3NzAxMzk3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    basePrice: 125
  }
];

export function ClientHome({ onRequestTow, onNavigate }: ClientHomeProps) {
  const [showTruckTypes, setShowTruckTypes] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(truckTypes[0]);
  const [pickupAddress, setPickupAddress] = useState('123 W 44th St, New York, NY');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const userLocation: [number, number] = [40.7580, -73.9855];

  const handleSelectTruck = (truck: typeof truckTypes[0]) => {
    setSelectedTruck(truck);
    setShowTruckTypes(false);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map Section */}
      <div className="flex-1 relative">
        <MapView
          center={userLocation}
          zoom={13}
          markers={[
            {
              position: userLocation,
              popup: 'Your Location',
              icon: createPickupIcon()
            }
          ]}
          className="w-full h-full"
        />
        
        {/* Recenter Button */}
        <button className="absolute bottom-24 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <Navigation className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-2xl p-6 space-y-4">
        {/* Search Inputs */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <Input
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Pickup location"
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <Input
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              placeholder="Where to?"
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Selected Truck Type */}
        <Card 
          className="p-4 cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => setShowTruckTypes(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ImageWithFallback
                src={selectedTruck.image}
                alt={selectedTruck.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-sm mb-1">{selectedTruck.name}</h4>
                <p className="text-xs text-gray-500">{selectedTruck.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-lg">${selectedTruck.basePrice}</p>
            </div>
          </div>
        </Card>

        {/* Request Button */}
        <Button 
          onClick={onRequestTow}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg"
        >
          Request Tow
        </Button>

        {/* Quick Access */}
        <div className="flex space-x-3 pt-2">
          <button className="flex-1 flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-xl">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-sm">Recent</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-xl">
            <Home className="w-5 h-5 text-gray-600" />
            <span className="text-sm">Home</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 safe-area-bottom">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => { setActiveTab('history'); onNavigate('history'); }}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <History className="w-6 h-6" />
            <span className="text-xs">History</span>
          </button>
          <button
            onClick={() => { setActiveTab('profile'); onNavigate('profile'); }}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('more')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'more' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>

      {/* Truck Type Selection Dialog */}
      <Dialog open={showTruckTypes} onOpenChange={setShowTruckTypes}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Tow Truck Type</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {truckTypes.map((truck) => (
              <Card
                key={truck.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedTruck.id === truck.id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'
                }`}
                onClick={() => handleSelectTruck(truck)}
              >
                <div className="flex items-center space-x-4">
                  <ImageWithFallback
                    src={truck.image}
                    alt={truck.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="mb-1">{truck.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{truck.description}</p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">From</p>
                    <p className="text-xl">${truck.basePrice}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
