import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card } from '@/app/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/app/components/ui/dialog';
import { ArrowLeft, Camera, MapPin, AlertCircle } from 'lucide-react';
import { MapView, createPickupIcon, createDropoffIcon } from '@/app/components/MapView';

interface RequestTowProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function RequestTow({ onBack, onConfirm }: RequestTowProps) {
  const [step, setStep] = useState<'details' | 'locations' | 'review'>('details');
  const [showDistanceWarning, setShowDistanceWarning] = useState(false);
  
  // Vehicle details
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Locations
  const [pickupLocation] = useState({ lat: 40.7580, lng: -73.9855, address: '123 W 44th St, New York, NY 10036' });
  const [dropoffLocation] = useState({ lat: 40.8580, lng: -73.8855, address: '500 E 149th St, Bronx, NY 10455' });
  
  // Pricing
  const distance = 12.5; // km
  const baseFare = 75;
  const perKmRate = 2.5;
  const isLongDistance = distance > 100;
  const extraCharge = isLongDistance ? (distance - 100) * 50 : 0;
  const totalPrice = baseFare + (distance * perKmRate) + extraCharge;

  const handleContinueToLocations = () => {
    setStep('locations');
  };

  const handleContinueToReview = () => {
    if (distance > 100) {
      setShowDistanceWarning(true);
    } else {
      setStep('review');
    }
  };

  const handleConfirmLongDistance = () => {
    setShowDistanceWarning(false);
    setStep('review');
  };

  const handleConfirmRequest = () => {
    onConfirm();
  };

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg">Vehicle Details</h2>
              <p className="text-sm text-gray-500">Step 1 of 3</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  placeholder="Honda"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="Civic"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  placeholder="2019"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="Silver"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <Label htmlFor="license">License Plate</Label>
            <Input
              id="license"
              placeholder="ABC123"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="mt-1"
            />
          </Card>

          <Card className="p-4">
            <Label htmlFor="instructions">Special Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any damage or special handling instructions..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="mt-1 min-h-[80px]"
            />
          </Card>

          <Card className="p-4">
            <Label className="mb-2 block">Upload Vehicle Photos (Optional)</Label>
            <button className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
              <Camera className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Tap to upload photos</p>
            </button>
          </Card>
        </div>

        {/* Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <Button onClick={handleContinueToLocations} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
            Continue to Locations
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'locations') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => setStep('details')}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg">Select Locations</h2>
              <p className="text-sm text-gray-500">Step 2 of 3</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            center={[pickupLocation.lat, pickupLocation.lng]}
            zoom={12}
            markers={[
              {
                position: [pickupLocation.lat, pickupLocation.lng],
                popup: 'Pickup Location',
                icon: createPickupIcon()
              },
              {
                position: [dropoffLocation.lat, dropoffLocation.lng],
                popup: 'Drop-off Location',
                icon: createDropoffIcon()
              }
            ]}
            route={[
              [pickupLocation.lat, pickupLocation.lng],
              [dropoffLocation.lat, dropoffLocation.lng]
            ]}
            className="w-full h-full"
          />
        </div>

        {/* Location Details */}
        <div className="bg-white p-4 space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
            <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-orange-800 mb-1">Pickup</p>
              <p className="text-sm">{pickupLocation.address}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-blue-800 mb-1">Drop-off</p>
              <p className="text-sm">{dropoffLocation.address}</p>
            </div>
          </div>

          <Card className="p-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Distance</span>
              <span className="text-lg">{distance} km</span>
            </div>
          </Card>

          <Button onClick={handleContinueToReview} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
            Continue to Review
          </Button>
        </div>

        {/* Distance Warning Dialog */}
        <Dialog open={showDistanceWarning} onOpenChange={setShowDistanceWarning}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
              <DialogTitle className="text-center">Long Distance Trip</DialogTitle>
              <DialogDescription className="text-center">
                Your destination exceeds the 100km travel limit. An additional charge of $50/km will apply for the extra distance.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Standard distance (100km)</span>
                  <span>${baseFare + (100 * perKmRate)}</span>
                </div>
                <div className="flex justify-between text-sm text-orange-600">
                  <span>Extra {(distance - 100).toFixed(1)} km @ $50/km</span>
                  <span>${extraCharge.toFixed(2)}</span>
                </div>
                <div className="border-t border-orange-200 pt-2 flex justify-between">
                  <span>New Total</span>
                  <span className="text-lg">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col space-y-2">
              <Button onClick={handleConfirmLongDistance} className="w-full bg-blue-600 hover:bg-blue-700">
                Continue with Extra Charge
              </Button>
              <Button variant="outline" onClick={() => setShowDistanceWarning(false)} className="w-full">
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Review step
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button onClick={() => setStep('locations')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg">Review & Confirm</h2>
            <p className="text-sm text-gray-500">Step 3 of 3</p>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
        <Card className="p-4">
          <h3 className="mb-3">Vehicle Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle</span>
              <span>{vehicleMake} {vehicleModel} ({vehicleYear})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Color</span>
              <span>{vehicleColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">License Plate</span>
              <span>{licensePlate}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="mb-3">Trip Details</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600">Pickup</p>
                <p className="text-sm">{pickupLocation.address}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600">Drop-off</p>
                <p className="text-sm">{dropoffLocation.address}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="mb-3">Price Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base fare</span>
              <span>${baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance ({distance} km @ ${perKmRate}/km)</span>
              <span>${(distance * perKmRate).toFixed(2)}</span>
            </div>
            {isLongDistance && (
              <div className="flex justify-between text-orange-600">
                <span>Extra charge (over 100km)</span>
                <span>${extraCharge.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 flex justify-between">
              <span>Total</span>
              <span className="text-lg">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {specialInstructions && (
          <Card className="p-4">
            <h3 className="mb-2">Special Instructions</h3>
            <p className="text-sm text-gray-600">{specialInstructions}</p>
          </Card>
        )}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Button onClick={handleConfirmRequest} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
          Confirm & Request Tow
        </Button>
      </div>
    </div>
  );
}
