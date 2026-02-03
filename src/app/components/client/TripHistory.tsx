import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, MapPin, Star, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface TripHistoryProps {
  onBack: () => void;
}

const trips = [
  {
    id: 'T001',
    date: new Date('2026-02-01'),
    pickupAddress: '123 W 44th St, New York, NY 10036',
    dropoffAddress: '250 E 39th St, New York, NY 10016',
    driverName: 'Michael Rodriguez',
    distance: 3.2,
    totalPrice: 83,
    rating: 5,
    status: 'completed'
  },
  {
    id: 'T002',
    date: new Date('2026-01-28'),
    pickupAddress: '100 Park Ave, New York, NY 10017',
    dropoffAddress: '285 Fulton St, New York, NY 10007',
    driverName: 'Sarah Johnson',
    distance: 6.8,
    totalPrice: 82,
    rating: 4,
    status: 'completed'
  },
  {
    id: 'T003',
    date: new Date('2026-01-15'),
    pickupAddress: '789 Broadway, New York, NY 10003',
    dropoffAddress: '456 Madison Ave, New York, NY 10022',
    driverName: 'James Chen',
    distance: 2.5,
    totalPrice: 71.25,
    rating: 5,
    status: 'completed'
  }
];

export function TripHistory({ onBack }: TripHistoryProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg">Trip History</h2>
        </div>
      </div>

      {/* Trip List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {trips.map((trip) => (
          <Card key={trip.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {format(trip.date, 'MMM dd, yyyy')}
                </span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {trip.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                <p className="text-sm flex-1">{trip.pickupAddress}</p>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-sm flex-1">{trip.dropoffAddress}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-600">Driver</p>
                <p className="text-sm">{trip.driverName}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Distance</p>
                <p className="text-sm">{trip.distance} km</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Total</p>
                <p className="text-sm">${trip.totalPrice}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < trip.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="sm">
                View Receipt
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
