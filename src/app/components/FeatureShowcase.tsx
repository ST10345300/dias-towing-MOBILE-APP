import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle, Smartphone, Truck, Shield } from 'lucide-react';

export function FeatureShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <Truck className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl text-white mb-4">Dias Towing Platform</h1>
          <p className="text-blue-100 text-lg">Complete Design System Overview</p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl">Client App Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Splash screen & onboarding slides</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Email & phone authentication</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Interactive map with location</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Multiple truck type selection</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Vehicle details & photo upload</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Distance warning (100km limit)</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Price breakdown calculator</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Real-time driver tracking</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">In-app calling & messaging</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">5-star rating system with tips</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Trip history with receipts</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Saved locations (Home/Work)</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl">Driver App Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Online/Offline toggle</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Nearby request notifications</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Accept/Decline requests</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Turn-by-turn navigation</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Trip progress checklist</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Photo documentation</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Odometer tracking</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Real-time earnings display</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Weekly earnings charts</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Performance metrics</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Payout schedule & history</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Bonus/incentive tracker</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl">Admin Dashboard Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Real-time metrics overview</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Live driver location map</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Driver management system</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Application review workflow</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Document verification</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Active trip monitoring</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Revenue analytics & charts</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Driver performance tracking</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Approve/Reject drivers</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Search & filter functions</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Export data functionality</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Document expiry warnings</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-orange-50">
            <h3 className="text-xl mb-4">Design System Highlights</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Badge className="bg-blue-600">Brand Colors</Badge>
                <span className="text-sm">Primary Blue (#2563EB), Accent Orange (#F97316)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-600">Interactive Maps</Badge>
                <span className="text-sm">React Leaflet with custom truck icons</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-orange-600">Responsive</Badge>
                <span className="text-sm">Optimized for mobile devices</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-purple-600">Complete Flows</Badge>
                <span className="text-sm">End-to-end user journeys for all roles</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-blue-100 text-sm">
            Professional towing service platform with modern design and comprehensive features
          </p>
        </div>
      </div>
    </div>
  );
}
