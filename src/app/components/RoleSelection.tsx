import { Truck, User, Shield } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

interface RoleSelectionProps {
  onSelectRole: (role: 'client' | 'driver' | 'admin') => void;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-white rounded-full">
            <Truck className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl text-white mb-2">Dias Towing</h1>
          <p className="text-blue-100">Professional Towing Service Platform</p>
        </div>

        <div className="space-y-4">
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
            onClick={() => onSelectRole('client')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Customer</h3>
                <p className="text-sm text-muted-foreground">Request a tow service</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
            onClick={() => onSelectRole('driver')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Driver</h3>
                <p className="text-sm text-muted-foreground">Provide towing services</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
            onClick={() => onSelectRole('admin')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Admin</h3>
                <p className="text-sm text-muted-foreground">Manage platform operations</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-blue-100 text-sm">
            Select your role to continue
          </p>
        </div>
      </div>
    </div>
  );
}
