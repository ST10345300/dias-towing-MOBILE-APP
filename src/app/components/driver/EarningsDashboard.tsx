import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsDashboardProps {
  onBack: () => void;
}

const weeklyData = [
  { day: 'Mon', earnings: 285 },
  { day: 'Tue', earnings: 412 },
  { day: 'Wed', earnings: 358 },
  { day: 'Thu', earnings: 445 },
  { day: 'Fri', earnings: 502 },
  { day: 'Sat', earnings: 380 },
  { day: 'Sun', earnings: 298 }
];

const payouts = [
  { date: 'Feb 1, 2026', amount: 1250.50, status: 'Completed' },
  { date: 'Jan 25, 2026', amount: 1450.75, status: 'Completed' },
  { date: 'Jan 18, 2026', amount: 1380.25, status: 'Completed' }
];

export function EarningsDashboard({ onBack }: EarningsDashboardProps) {
  const todayEarnings = 342.50;
  const weeklyEarnings = 2680;
  const monthlyEarnings = 11240;
  const totalTrips = 156;
  const averageRating = 4.9;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl mb-2">Earnings</h2>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-8 h-8" />
          <span className="text-4xl">${todayEarnings}</span>
        </div>
        <p className="text-blue-100 mt-1">Today's earnings</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 p-4 -mt-6">
        <Card className="p-4 text-center shadow-lg">
          <p className="text-2xl mb-1">${weeklyEarnings}</p>
          <p className="text-xs text-gray-600">This Week</p>
        </Card>
        <Card className="p-4 text-center shadow-lg">
          <p className="text-2xl mb-1">${monthlyEarnings}</p>
          <p className="text-xs text-gray-600">This Month</p>
        </Card>
        <Card className="p-4 text-center shadow-lg">
          <p className="text-2xl mb-1">{totalTrips}</p>
          <p className="text-xs text-gray-600">Total Trips</p>
        </Card>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Weekly Chart */}
            <Card className="p-4">
              <h3 className="mb-4">Weekly Earnings</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="earnings" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Performance */}
            <Card className="p-4">
              <h3 className="mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm">Average Rating</p>
                      <p className="text-2xl">{averageRating}</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600">+0.2</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">Trips Completed</p>
                      <p className="text-2xl">{totalTrips}</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600">+12</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm">Avg. per Trip</p>
                      <p className="text-2xl">${(monthlyEarnings / totalTrips).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bonuses */}
            <Card className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <h3 className="mb-2">Bonus Progress</h3>
              <p className="text-sm mb-3 text-orange-100">Complete 10 more trips to earn $100 bonus</p>
              <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '70%' }} />
              </div>
              <p className="text-sm mt-2 text-orange-100">7/10 trips completed</p>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-3">
            <Card className="p-4 bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-600">Next Payout</p>
                  <p className="text-2xl">$1,240.50</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Friday, Feb 7, 2026</p>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3>Payout History</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {payouts.map((payout, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">${payout.amount}</p>
                      <p className="text-sm text-gray-600">{payout.date}</p>
                    </div>
                    <span className="text-sm text-green-600">{payout.status}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
