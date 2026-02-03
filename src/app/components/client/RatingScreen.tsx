import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Card } from '@/app/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar';
import { Star } from 'lucide-react';

interface RatingScreenProps {
  onComplete: () => void;
}

export function RatingScreen({ onComplete }: RatingScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const driver = {
    name: 'Michael Rodriguez',
    photo: 'https://i.pravatar.cc/150?img=12'
  };

  const tripTotal = 106.25;
  const tipOptions = [
    { label: '10%', amount: tripTotal * 0.1 },
    { label: '15%', amount: tripTotal * 0.15 },
    { label: '20%', amount: tripTotal * 0.2 },
    { label: 'Custom', amount: 0 }
  ];

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-6 text-center border-b border-gray-200">
        <h2 className="text-2xl mb-2">Trip Completed!</h2>
        <p className="text-gray-600">How was your experience?</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-24">
        {/* Driver Info */}
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-20 h-20 mb-3">
              <AvatarImage src={driver.photo} alt={driver.name} />
              <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg mb-1">{driver.name}</h3>
            <p className="text-sm text-gray-600">Your driver</p>
          </div>
        </Card>

        {/* Rating */}
        <Card className="p-6">
          <h3 className="text-center mb-4">Rate Your Experience</h3>
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    (hoveredRating || rating) >= star
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Write a review (optional)</label>
            <Textarea
              placeholder="Share details of your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </Card>

        {/* Tip Options */}
        <Card className="p-6">
          <h3 className="mb-4">Add a Tip</h3>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {tipOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedTip(index)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTip === index
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <p className="text-sm mb-1">{option.label}</p>
                {option.amount > 0 && (
                  <p className="text-xs text-gray-600">${option.amount.toFixed(2)}</p>
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            100% of your tip goes to your driver
          </p>
        </Card>

        {/* Trip Summary */}
        <Card className="p-4 bg-blue-50">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Trip fare</span>
              <span>${tripTotal.toFixed(2)}</span>
            </div>
            {selectedTip !== null && tipOptions[selectedTip].amount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tip</span>
                <span>${tipOptions[selectedTip].amount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-blue-200 pt-2 flex justify-between">
              <span>Total</span>
              <span className="text-lg">
                ${(tripTotal + (selectedTip !== null ? tipOptions[selectedTip].amount : 0)).toFixed(2)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Rating
        </Button>
      </div>
    </div>
  );
}
