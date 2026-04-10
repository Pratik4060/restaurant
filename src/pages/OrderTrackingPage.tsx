// pages/TrackOrderPage.tsx
import React from 'react';
import { useOrder } from '../contexts/OrderContext';
import BottomNav from '../components/BottomNav';
import { Clock, CheckCircle, Package, ChefHat, Bell, MapPin } from 'lucide-react';
import back from "../assets/back.svg";
import bell from "../assets/bell.svg"
interface TrackOrderPageProps {
  onBack: () => void;
  onViewChange: (view: 'menu' | 'orders' | 'track' | 'bill') => void;
  orderNumber?: string;
  estimatedTime?: string;
}

const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ 
  onBack, 
  orderNumber = "", 
  estimatedTime = "15-20" ,
  onViewChange
}) => {
  const { getTotalItems } = useOrder();
  const [currentStep, setCurrentStep] = React.useState(1); // 0: pending, 1: accepted, 2: preparing, 3: ready
  
  // For demo, you can simulate status updates
  // In real app, this would come from backend

  const steps = [
    { id: 0, label: "Order Placed", icon: Package, status: "completed" },
    { id: 1, label: "Accepted", icon: CheckCircle, status: "current" },
    { id: 2, label: "Preparing", icon: ChefHat, status: "pending" },
    { id: 3, label: "Ready", icon: Bell, status: "pending" }
  ];

const handleNavChange = (view: 'menu' | 'orders' | 'track' | 'bill') => {
  onViewChange(view);
};

if (!orderNumber) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Place your order
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Your tracking screen will appear here after the order is confirmed.
          </p>
        </div>
      </div>

      <BottomNav activeView="track" onViewChange={onViewChange} />
    </div>
  );
}


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-2 pt-9 pb-2 flex justify-between">
        <button onClick={onBack} className="text-2xl font-medium">
          <img src={back} alt="back" />
        </button>
        <div className="flex gap-3">
          <div className="relative">
            <button className="text-xl bg-black ">
                <img src={bell} alt="bell" />
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex justify-center">
        <h1 className=" montserrat text-[24px] font-bold border-b-4 border-orange-400 pb-1">
          Order Status
        </h1>
      </div>

      {/* Content */}
      
      <div className="flex-1 px-5 pt-6 pb-24">
        {/* Notification Message */}
        <div className="text-center mb-8">
          <h2 className="text-lg  text-gray-400 mb-1">
            We'll notify you when your order is ready!
          </h2>
        </div>

        {/* Order Info Card */}
        <div className="bg-white  border border-orange-400 rounded-xl p-4 mb-6 w-[313px]">
          <div className="flex  flex-col  items-center gap-3">
            <div className='text-xl'>Order</div>
            <div className="text-sm font-medium text-gray-700">{getTotalItems()} items</div>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-4">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
                <div 
                  className="absolute top-0 left-0 w-full bg-orange-500 transition-all duration-500"
                  style={{ height: `${(currentStep / 3) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-6">



                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 relative ${
                    currentStep >= 1 ? 'bg-orange-500' : 'bg-gray-200'
                  }`}>
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      Accepted
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 relative ${
                    currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-200'
                  }`}>
                    <ChefHat size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      Preparing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 relative ${
                    currentStep >= 3 ? 'bg-orange-500' : 'bg-gray-200'
                  }`}>
                    <Bell size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Time Card */}
        <div className="bg-orange-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock size={24} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Time</p>
              <p className="text-xl font-bold text-gray-900">{estimatedTime} Mins</p>
            </div>
          </div>
        </div>

        {/* Location Info (Optional) */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
          <MapPin size={14} />
          <span>Track your order in real-time</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeView="track" onViewChange={handleNavChange} />
    </div>
  );
};

export default TrackOrderPage;