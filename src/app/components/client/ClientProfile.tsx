import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import {
  ArrowLeft,
  User,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  HelpCircle,
  Star,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface ClientProfileProps {
  onBack: () => void;
}

export function ClientProfile({ onBack }: ClientProfileProps) {
  const customer = {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 987-6543',
    photo: 'https://i.pravatar.cc/150?img=68',
    memberSince: '2025',
    totalTrips: 18,
    averageRating: 4.9
  };

  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', badge: null },
        { icon: CreditCard, label: 'Payment Methods', badge: '2 cards' },
        { icon: MapPin, label: 'Saved Addresses', badge: '2 locations' }
      ]
    },
    {
      section: 'Settings',
      items: [
        { icon: Bell, label: 'Notifications', badge: null },
        { icon: Shield, label: 'Privacy & Security', badge: null }
      ]
    },
    {
      section: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', badge: null },
        { icon: Star, label: 'Rate the App', badge: null }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pb-20">
        <div className="p-4">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-3 border-4 border-white">
            <AvatarImage src={customer.photo} alt={customer.name} />
            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl mb-1">{customer.name}</h2>
          <p className="text-blue-100 mb-1">{customer.email}</p>
          <Badge className="bg-white/20 text-white border-0">
            Member since {customer.memberSince}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 -mt-12 mb-6">
        <Card className="p-4 text-center shadow-lg">
          <p className="text-3xl mb-1">{customer.totalTrips}</p>
          <p className="text-sm text-gray-600">Total Trips</p>
        </Card>
        <Card className="p-4 text-center shadow-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-3xl">{customer.averageRating}</span>
          </div>
          <p className="text-sm text-gray-600">Rating</p>
        </Card>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 px-4 space-y-6 pb-24">
        {menuItems.map((section, index) => (
          <div key={index}>
            <h3 className="text-sm text-gray-600 mb-3 px-2">{section.section}</h3>
            <Card className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Button variant="outline" className="w-full h-12 text-red-600 border-red-300 hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        {/* Version Info */}
        <p className="text-center text-sm text-gray-500">
          Dias Towing v1.0.0
        </p>
      </div>
    </div>
  );
}
