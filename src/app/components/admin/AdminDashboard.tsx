import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/app/components/ui/dialog';
import {
  LayoutDashboard,
  Users,
  Car,
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  UserCheck,
  UserX,
  FileText,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { MapView, createTruckIcon } from '@/app/components/MapView';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 }
];

const drivers = [
  {
    id: 'D001',
    name: 'Michael Rodriguez',
    photo: 'https://i.pravatar.cc/150?img=12',
    status: 'online',
    rating: 4.9,
    trips: 456,
    earnings: 12450,
    vehicle: 'Flatbed TOW-4567',
    documentsExpiring: false
  },
  {
    id: 'D002',
    name: 'Sarah Johnson',
    photo: 'https://i.pravatar.cc/150?img=5',
    status: 'online',
    rating: 4.8,
    trips: 378,
    earnings: 9840,
    vehicle: 'Wheel-Lift TOW-8912',
    documentsExpiring: false
  },
  {
    id: 'D003',
    name: 'James Chen',
    photo: 'https://i.pravatar.cc/150?img=33',
    status: 'busy',
    rating: 4.95,
    trips: 623,
    earnings: 18230,
    vehicle: 'Heavy-Duty TOW-2341',
    documentsExpiring: false
  },
  {
    id: 'D004',
    name: 'Emily Davis',
    photo: 'https://i.pravatar.cc/150?img=47',
    status: 'offline',
    rating: 4.7,
    trips: 198,
    earnings: 5420,
    vehicle: 'Flatbed TOW-5678',
    documentsExpiring: true
  }
];

const pendingApplications = [
  {
    id: 'APP001',
    name: 'David Thompson',
    photo: 'https://i.pravatar.cc/150?img=15',
    appliedDate: '2026-02-01',
    vehicleType: 'Flatbed',
    documents: {
      license: 'submitted',
      insurance: 'submitted',
      registration: 'submitted',
      inspection: 'pending'
    }
  },
  {
    id: 'APP002',
    name: 'Lisa Martinez',
    photo: 'https://i.pravatar.cc/150?img=9',
    appliedDate: '2026-01-30',
    vehicleType: 'Wheel-Lift',
    documents: {
      license: 'submitted',
      insurance: 'submitted',
      registration: 'submitted',
      inspection: 'submitted'
    }
  }
];

const activeTrips = [
  {
    id: 'T101',
    driver: 'Michael Rodriguez',
    customer: 'John Smith',
    status: 'in_tow',
    pickup: '123 W 44th St, NY',
    dropoff: '500 E 149th St, NY',
    earnings: 106
  },
  {
    id: 'T102',
    driver: 'James Chen',
    customer: 'Sarah Williams',
    status: 'driver_enroute',
    pickup: '456 Park Ave, NY',
    dropoff: '789 Broadway, NY',
    earnings: 92
  }
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDriver, setSelectedDriver] = useState<typeof drivers[0] | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<typeof pendingApplications[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Stats
  const totalDrivers = drivers.length;
  const onlineDrivers = drivers.filter(d => d.status === 'online' || d.status === 'busy').length;
  const pendingApps = pendingApplications.length;
  const todayRevenue = 12450;
  const activeTripsCount = activeTrips.length;
  const customerSatisfaction = 4.8;

  const handleApproveDriver = (appId: string) => {
    alert(`Driver ${appId} approved!`);
    setSelectedApplication(null);
  };

  const handleRejectDriver = (appId: string) => {
    alert(`Driver ${appId} rejected`);
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">Dias Towing Admin</h1>
              <p className="text-sm text-gray-600">Platform Management</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b border-gray-200 px-4">
          <TabsList className="w-full justify-start bg-transparent border-0">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="drivers" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              <Users className="w-4 h-4 mr-2" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              <FileText className="w-4 h-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="trips" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
              <Car className="w-4 h-4 mr-2" />
              Trips
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="p-4 space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Car className="w-5 h-5 text-blue-600" />
                <Badge variant="secondary">{activeTripsCount}</Badge>
              </div>
              <p className="text-2xl mb-1">{activeTripsCount}</p>
              <p className="text-xs text-gray-600">Active Trips</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <Badge variant="secondary">{onlineDrivers}/{totalDrivers}</Badge>
              </div>
              <p className="text-2xl mb-1">{onlineDrivers}</p>
              <p className="text-xs text-gray-600">Drivers Online</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <Badge variant="secondary">{pendingApps}</Badge>
              </div>
              <p className="text-2xl mb-1">{pendingApps}</p>
              <p className="text-xs text-gray-600">Pending Apps</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl mb-1">${todayRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Today's Revenue</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-2xl mb-1">{customerSatisfaction}</p>
              <p className="text-xs text-gray-600">Satisfaction</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl mb-1">98%</p>
              <p className="text-xs text-gray-600">Success Rate</p>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="p-6">
            <h3 className="mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Live Map */}
          <Card className="p-4">
            <h3 className="mb-4">Live Driver Locations</h3>
            <div className="h-80">
              <MapView
                center={[40.7580, -73.9855]}
                zoom={12}
                markers={drivers
                  .filter(d => d.status === 'online' || d.status === 'busy')
                  .map(() => ({
                    position: [40.7580 + (Math.random() - 0.5) * 0.1, -73.9855 + (Math.random() - 0.5) * 0.1] as [number, number],
                    icon: createTruckIcon()
                  }))}
                className="w-full h-full rounded-lg"
              />
            </div>
          </Card>
        </TabsContent>

        {/* Drivers Tab */}
        <TabsContent value="drivers" className="p-4 space-y-4">
          {/* Search and Filter */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Drivers List */}
          <div className="space-y-3">
            {drivers.map((driver) => (
              <Card key={driver.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={driver.photo} alt={driver.name} />
                      <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4>{driver.name}</h4>
                        <Badge variant={driver.status === 'online' ? 'default' : driver.status === 'busy' ? 'secondary' : 'outline'}>
                          {driver.status}
                        </Badge>
                        {driver.documentsExpiring && (
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{driver.vehicle}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDriver(driver)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{driver.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm mb-1">{driver.trips}</p>
                    <p className="text-xs text-gray-600">Trips</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm mb-1">${driver.earnings.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Earnings</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3>Pending Applications ({pendingApps})</h3>
            <Badge>{pendingApps} Pending</Badge>
          </div>

          <div className="space-y-3">
            {pendingApplications.map((app) => (
              <Card key={app.id} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={app.photo} alt={app.name} />
                      <AvatarFallback>{app.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="mb-1">{app.name}</h4>
                      <p className="text-sm text-gray-600">{app.vehicleType}</p>
                      <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>License</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Insurance</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Registration</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    {app.documents.inspection === 'submitted' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-orange-600" />
                    )}
                    <span>Inspection</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setSelectedApplication(app)}
                    className="flex-1"
                    variant="outline"
                  >
                    Review
                  </Button>
                  <Button
                    onClick={() => handleApproveDriver(app.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleRejectDriver(app.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trips Tab */}
        <TabsContent value="trips" className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3>Active Trips ({activeTripsCount})</h3>
            <Badge>{activeTripsCount} In Progress</Badge>
          </div>

          <div className="space-y-3">
            {activeTrips.map((trip) => (
              <Card key={trip.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={trip.status === 'in_tow' ? 'default' : 'secondary'}>
                    {trip.status.replace('_', ' ')}
                  </Badge>
                  <span className="text-sm text-gray-600">Trip #{trip.id}</span>
                </div>

                <div className="space-y-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Driver</p>
                    <p className="text-sm">{trip.driver}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Customer</p>
                    <p className="text-sm">{trip.customer}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3 pt-3 border-t border-gray-200">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Pickup</p>
                      <p className="text-sm">{trip.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Drop-off</p>
                      <p className="text-sm">{trip.dropoff}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Estimated Earnings</p>
                    <p className="text-lg text-green-600">${trip.earnings}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Monitor
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Driver Detail Dialog */}
      {selectedDriver && (
        <Dialog open={!!selectedDriver} onOpenChange={() => setSelectedDriver(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Driver Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedDriver.photo} alt={selectedDriver.name} />
                  <AvatarFallback>{selectedDriver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl mb-1">{selectedDriver.name}</h3>
                  <Badge>{selectedDriver.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Rating</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl">{selectedDriver.rating}</span>
                  </div>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Trips</p>
                  <p className="text-2xl">{selectedDriver.trips}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-2xl">${selectedDriver.earnings.toLocaleString()}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                  <p className="text-sm">{selectedDriver.vehicle}</p>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedDriver(null)}>Close</Button>
              <Button variant="destructive">Suspend Driver</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
