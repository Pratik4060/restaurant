// BreakfastDetails.tsx (Complete updated version)
import React, { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import CategoryTabs from '../components/CategoryTabs';
import MenuList from '../components/Breakfast/BreakfastList';
import BottomNav from '../components/BottomNav';
import OrderPage from './OrdersPage';
import ItemDetailPage from '../components/ItemDetailsPage';
import TrackOrderPage from './OrderTrackingPage';
import type { BeverageTab, HealthTab, BreakfastTab, BreakfastItem } from '../components/Breakfast/Data';
import bell from '../assets/bell.svg'
import back from "../assets/back.svg"
import search from "../assets/search.svg"
import microphone from "../assets/microphone.svg"
import type { MealCategory } from '../types';

interface Props { 
  category: MealCategory; 
  userName: string;
  onBack: () => void; 
}

const BreakfastDetails: React.FC<Props> = ({ category, userName, onBack }) => {
  const { getTotalItems, addToOrder, clearOrder } = useOrder();
  const [activeTab, setActiveTab] = useState<BreakfastTab>('All');
  const [activeBeverageTab, setActiveBeverageTab] = useState<BeverageTab>('All');
  const [activeHealthTab, setActiveHealthTab] = useState<HealthTab>('Veg');
  const [currentView, setCurrentView] = useState<"menu" | "orders" | "track" | "bill">('menu');
  const [selectedItem, setSelectedItem] = useState<BreakfastItem | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  
  const displayName = userName.trim() || 'Rohit';
  const beverageTabs: BeverageTab[] = ['All', 'Mocktails', 'Cocktails', 'Spirits', 'Beer', 'Wine', 'Hot Beverages', 'Fresh Juice'];
  const healthTabs: HealthTab[] = ['Veg', 'Non Veg'];

  const handleAddToOrder = (item: BreakfastItem) => {
    const orderItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || ''
    };
    addToOrder(orderItem);
    console.log('Added to order:', orderItem);
  };
 
  const handleItemClick = (item: BreakfastItem) => {
    setSelectedItem(item);
  };

const handleNavChange = (view: "menu" | "orders" | "track" | "bill") => {
  if (view === 'track' && !orderPlaced) {
    setCurrentView('track');
    return;
  }
  setCurrentView(view);
  setSelectedItem(null);
};

const handleConfirmOrder = () => {
  const newOrderNumber = Math.floor(Math.random() * 1000).toString();
  setOrderNumber(newOrderNumber);
  setOrderPlaced(true);
  setCurrentView('track');
};

  const handleTrackingFromDetail = () => {
    // Generate order number and navigate to tracking from detail page
    const newOrderNumber = Math.floor(Math.random() * 1000).toString();
    setOrderNumber(newOrderNumber);
    setSelectedItem(null);
    setCurrentView('track');
  };

  // Show Item Detail Page when an item is selected
  if (selectedItem) {
    return (
      <ItemDetailPage
        item={{
          id: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          rating: selectedItem.rating || 4.5,
          description: selectedItem.description || "Delicious item prepared with fresh ingredients.",
          time: selectedItem.time || "15-20 Min",
          image: selectedItem.image,
          isVeg: selectedItem.isVeg
        }}
        onBack={() => setSelectedItem(null)}
        onNavigateToMenu={() => {
          setSelectedItem(null);
          setCurrentView('menu');
        }}
        onNavigateToOrders={() => {
          setSelectedItem(null);
          setCurrentView('orders');
        }}
        onNavigateToTracking={handleTrackingFromDetail}
      />
    );
  }

  // Show Order Page when 'orders' is active
  if (currentView === 'orders') {
    return (
<OrderPage 
  onBack={() => setCurrentView('menu')}
  onConfirmOrder={handleConfirmOrder}
  onViewChange={handleNavChange}
/>
    );
  }

  // Show Track Order Page when 'track' is active
  if (currentView === 'track') {
    return (
<TrackOrderPage 
  onBack={() => {
    clearOrder();
    setCurrentView('menu');
  }}
  onViewChange={handleNavChange}
  orderNumber={orderNumber}
  estimatedTime="15-20"
/>
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
            <button className="text-xl">🛒</button>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </div>
          <button>
            <img src={bell} className='invert h-8' alt="bell" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <h1 className="text-[24px] font-bold border-b-4 border-orange-400 pb-1">
          {category}
        </h1>
      </div>

      <div className="px-5 pt-4">
        <h3>
          <span className="font-semibold">Hi, {displayName}</span> Start your day fresh
        </h3>        
      </div>

      <div className="px-5 py-3">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <img src={search} alt="search" className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full border-b py-2 pl-10 pr-10 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <img src={microphone} alt="microphone" className="w-4 h-4" />
          </span>
        </div>
      </div>

      <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'Beverages' && (
        <div className="montserrat px-7 mt-3 flex gap-10 overflow-x-auto scrollbar-hide">
          {beverageTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveBeverageTab(tab as BeverageTab)}
              className={`pb-1 whitespace-nowrap ${
                activeBeverageTab === tab
                  ? 'font-semibold border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'Health' && (
        <div className="montserrat px-7 mt-3 flex gap-10 overflow-x-auto scrollbar-hide">
          {healthTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveHealthTab(tab as HealthTab)}
              className={`pb-1 whitespace-nowrap ${
                activeHealthTab === tab
                  ? 'font-semibold border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      
      <div className="flex-1 px-5 py-4 pb-28 overflow-y-auto">
        <MenuList 
          activeTab={activeTab} 
          activeBeverageTab={activeBeverageTab} 
          activeHealthTab={activeHealthTab}
          onAddToOrder={handleAddToOrder}
          onItemClick={handleItemClick}
        />
      </div>

      <BottomNav activeView={currentView} onViewChange={handleNavChange} />
    </div>
  );
};

export default BreakfastDetails;