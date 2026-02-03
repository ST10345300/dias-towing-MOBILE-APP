export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

export interface Driver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  completedTrips: number;
  yearsExperience: number;
  vehicleType: string;
  licensePlate: string;
  location: Location;
  isOnline: boolean;
  phoneNumber: string;
}

export interface Customer {
  id: string;
  name: string;
  photo: string;
  phoneNumber: string;
  email: string;
}

export interface Trip {
  id: string;
  customerId: string;
  driverId?: string;
  status: 'pending' | 'accepted' | 'driver_enroute' | 'arrived' | 'in_tow' | 'completed' | 'cancelled';
  pickupLocation: Location;
  dropoffLocation: Location;
  vehicle: Vehicle;
  distance: number;
  baseFare: number;
  perKmRate: number;
  extraCharge: number;
  totalPrice: number;
  specialInstructions?: string;
  createdAt: Date;
  completedAt?: Date;
  rating?: number;
  review?: string;
  tip?: number;
}

export interface TruckType {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
}

export const truckTypes: TruckType[] = [
  {
    id: 'flatbed',
    name: 'Flatbed Tow',
    description: 'Best for all-wheel drive and luxury vehicles',
    image: 'flatbed tow truck',
    basePrice: 75
  },
  {
    id: 'wheel-lift',
    name: 'Wheel-Lift Tow',
    description: 'Quick and efficient for most vehicles',
    image: 'wheel lift tow truck',
    basePrice: 65
  },
  {
    id: 'heavy-duty',
    name: 'Heavy-Duty Tow',
    description: 'For trucks, RVs, and large vehicles',
    image: 'heavy duty tow truck',
    basePrice: 125
  }
];

export const mockDrivers: Driver[] = [
  {
    id: 'D001',
    name: 'Michael Rodriguez',
    photo: 'https://i.pravatar.cc/150?img=12',
    rating: 4.9,
    reviewCount: 342,
    completedTrips: 456,
    yearsExperience: 8,
    vehicleType: 'Flatbed Tow',
    licensePlate: 'TOW-4567',
    location: { lat: 40.7580, lng: -73.9855, address: '123 Main St, New York, NY' },
    isOnline: true,
    phoneNumber: '+1 (555) 123-4567'
  },
  {
    id: 'D002',
    name: 'Sarah Johnson',
    photo: 'https://i.pravatar.cc/150?img=5',
    rating: 4.8,
    reviewCount: 289,
    completedTrips: 378,
    yearsExperience: 6,
    vehicleType: 'Wheel-Lift Tow',
    licensePlate: 'TOW-8912',
    location: { lat: 40.7614, lng: -73.9776, address: '456 Park Ave, New York, NY' },
    isOnline: true,
    phoneNumber: '+1 (555) 234-5678'
  },
  {
    id: 'D003',
    name: 'James Chen',
    photo: 'https://i.pravatar.cc/150?img=33',
    rating: 4.95,
    reviewCount: 512,
    completedTrips: 623,
    yearsExperience: 12,
    vehicleType: 'Heavy-Duty Tow',
    licensePlate: 'TOW-2341',
    location: { lat: 40.7489, lng: -73.9680, address: '789 Broadway, New York, NY' },
    isOnline: true,
    phoneNumber: '+1 (555) 345-6789'
  },
  {
    id: 'D004',
    name: 'Emily Davis',
    photo: 'https://i.pravatar.cc/150?img=47',
    rating: 4.7,
    reviewCount: 156,
    completedTrips: 198,
    yearsExperience: 4,
    vehicleType: 'Flatbed Tow',
    licensePlate: 'TOW-5678',
    location: { lat: 40.7589, lng: -73.9851, address: '321 5th Ave, New York, NY' },
    isOnline: false,
    phoneNumber: '+1 (555) 456-7890'
  }
];

export const mockCustomer: Customer = {
  id: 'C001',
  name: 'John Smith',
  photo: 'https://i.pravatar.cc/150?img=68',
  phoneNumber: '+1 (555) 987-6543',
  email: 'john.smith@email.com'
};

export const mockTrips: Trip[] = [
  {
    id: 'T001',
    customerId: 'C001',
    driverId: 'D001',
    status: 'completed',
    pickupLocation: { lat: 40.7580, lng: -73.9855, address: '123 W 44th St, New York, NY 10036' },
    dropoffLocation: { lat: 40.7489, lng: -73.9680, address: '250 E 39th St, New York, NY 10016' },
    vehicle: { make: 'Honda', model: 'Civic', year: 2019, color: 'Silver', licensePlate: 'ABC123' },
    distance: 3.2,
    baseFare: 75,
    perKmRate: 2.5,
    extraCharge: 0,
    totalPrice: 83,
    createdAt: new Date('2026-02-01T14:30:00'),
    completedAt: new Date('2026-02-01T15:15:00'),
    rating: 5,
    review: 'Excellent service! Very professional and careful with my car.',
    tip: 10
  },
  {
    id: 'T002',
    customerId: 'C001',
    driverId: 'D002',
    status: 'completed',
    pickupLocation: { lat: 40.7614, lng: -73.9776, address: '100 Park Ave, New York, NY 10017' },
    dropoffLocation: { lat: 40.7128, lng: -74.0060, address: '285 Fulton St, New York, NY 10007' },
    vehicle: { make: 'Toyota', model: 'Camry', year: 2020, color: 'Black', licensePlate: 'XYZ789' },
    distance: 6.8,
    baseFare: 65,
    perKmRate: 2.5,
    extraCharge: 0,
    totalPrice: 82,
    createdAt: new Date('2026-01-28T09:00:00'),
    completedAt: new Date('2026-01-28T09:45:00'),
    rating: 4,
    review: 'Good service, arrived on time.'
  },
  {
    id: 'T003',
    customerId: 'C001',
    status: 'pending',
    pickupLocation: { lat: 40.7580, lng: -73.9855, address: 'Current Location' },
    dropoffLocation: { lat: 40.8580, lng: -73.8855, address: '500 E 149th St, Bronx, NY 10455' },
    vehicle: { make: 'Ford', model: 'F-150', year: 2021, color: 'Blue', licensePlate: 'DEF456' },
    distance: 12.5,
    baseFare: 75,
    perKmRate: 2.5,
    extraCharge: 0,
    totalPrice: 106.25,
    createdAt: new Date('2026-02-03T10:00:00')
  }
];

export const savedLocations = [
  { id: '1', name: 'Home', address: '123 W 44th St, New York, NY 10036', lat: 40.7580, lng: -73.9855 },
  { id: '2', name: 'Work', address: '100 Park Ave, New York, NY 10017', lat: 40.7614, lng: -73.9776 }
];
