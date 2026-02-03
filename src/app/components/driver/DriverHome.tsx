import { useState } from 'react';
import { MapView, createPickupIcon } from '@/app/components/MapView';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Badge } from '@/app/components/ui/badge';
import { Home, History, User, Menu, MapPin, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface DriverHomeProps {
  onAcceptRequest: () => void;
  onNavigate: (page: string) => void;
}

export function DriverHome({ onAcceptRequest, onNavigate }: DriverHomeProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const driverLocation: [number, number] = [40.7489, -73.9680];
  const todayEarnings = 342.50;
  const tripsToday = 8;

  const availableRequests = [
    {
      id: 'R001',
      customerName: 'John Smith',
      pickupAddress: '123 W 44th St, New York, NY 10036',
      pickupLocation: [40.7580, -73.9855] as [number, number],
      distance: 2.3,
      estimatedEarnings: 83,
      vehicleType: 'Flatbed',
      urgency: 'high'
    },
    {
      id: 'R002',
      customerName: 'Sarah Williams',
      pickupAddress: '456 Park Ave, New York, NY 10017',
      pickupLocation: [40.7614, -73.9776] as [number, number],
      distance: 3.1,
      estimatedEarnings: 92,
      vehicleType: 'Wheel-Lift',
      urgency: 'normal'
    }
  ];

  const handleToggleOnline = (checked: boolean) => {
    setIsOnline(checked);
    toast(checked ? 'You are now online' : 'You are now offline');
  };

  const handleAccept = (requestId: string) => {
    toast.success('Request accepted!');
    onAcceptRequest();
  };

  const handleDecline = (requestId: string) => {
    toast.info('Request declined');
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Map Section */}
      <div className="flex-1 relative">
        <MapView
          center={driverLocation}
          zoom={13}
          markers={[
            ...availableRequests.map(req => ({
              position: req.pickupLocation,
              popup: req.customerName,
              icon: createPickupIcon()
            }))
          ]}
          className="w-full h-full"
        />
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-2xl">
        {/* Online Status Toggle */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg mb-1">Driver Status</h3>
              <p className="text-sm text-gray-600">
                {isOnline ? 'Ready to accept requests' : 'Not accepting requests'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
              <Switch
                checked={isOnline}
                onCheckedChange={handleToggleOnline}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="p-4 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-2xl">${todayEarnings}</span>
              </div>
              <p className="text-xs text-gray-600">Today's Earnings</p>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <p className="text-2xl mb-1">{tripsToday}</p>
              <p className="text-xs text-gray-600">Trips Today</p>
            </div>
          </div>
        </div>

        {/* Available Requests */}
        <div className="p-4 max-h-80 overflow-y-auto">
          <h3 className="mb-3">Nearby Requests</h3>
          {!isOnline ? (
            <Card className="p-8 text-center bg-gray-50">
              <p className="text-gray-500">Go online to see available requests</p>
            </Card>
          ) : availableRequests.length > 0 ? (
            <div className="space-y-3">
              {availableRequests.map((request) => (
                <Card key={request.id} className="p-4 border-l-4 border-l-blue-600">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4>{request.customerName}</h4>
                        {request.urgency === 'high' && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{request.vehicleType} needed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Est. earnings</p>
                      <p className="text-xl text-green-600">${request.estimatedEarnings}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <p className="text-sm flex-1">{request.pickupAddress}</p>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{request.distance} km away</span>
                    </div>
                    <span className="text-sm text-gray-600">~{Math.round(request.distance * 3)} min</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAccept(request.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleDecline(request.id)}
                      variant="outline"
                      className="flex-1"
                    >
                      Decline
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-gray-50">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No requests available</p>
              <p className="text-sm text-gray-400 mt-1">New requests will appear here</p>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
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
            onClick={() => { setActiveTab('earnings'); onNavigate('earnings'); }}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'earnings' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <DollarSign className="w-6 h-6" />
            <span className="text-xs">Earnings</span>
          </button>
          <button
            onClick={() => { setActiveTab('profile'); onNavigate('profile'); }}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
