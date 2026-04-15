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
import BillPage from "./BillPage";

interface Props {
  category: MealCategory;
  userName: string;
  foodType: "Veg" | "Non Veg";
  tableNumber:string;
  initialFocus?: "default" | "bestseller" | "all" | "quick-bites" | "beverages";
  onBack: () => void;
}

const BreakfastDetails: React.FC<Props> = ({ category, userName, onBack,foodType,tableNumber, initialFocus = "default" }) => {
const { orderPlaced, orderNumber, placeOrder } = useOrder();
  const [activeTab, setActiveTab] = useState<BreakfastTab>(() => {
    if (initialFocus === "bestseller") return "Bestseller";
    if (initialFocus === "quick-bites") return "Quick Bites";
    if (initialFocus === "beverages") return "Beverages";
    return "All";
  });
  const [activeBeverageTab, setActiveBeverageTab] = useState<BeverageTab>('All');
  const [activeHealthTab, setActiveHealthTab] = useState<HealthTab>('Veg');
  const [currentView, setCurrentView] = useState<"menu" | "orders" | "track" | "bill">('menu');
  const [trackResetSignal, setTrackResetSignal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<BreakfastItem | null>(null);

  
  const displayName = userName.trim() || 'Rohit';
  const beverageTabs: BeverageTab[] = ['All', 'Mocktails', 'Cocktails', 'Spirits', 'Beer', 'Wine', 'Hot Beverages', 'Fresh Juice'];
  const healthTabs: HealthTab[] = ['Veg', 'Non Veg'];

  const handleItemClick = (item: BreakfastItem) => {
    setSelectedItem(item);
  };

const handleNavChange = (view: "menu" | "orders" | "track" | "bill") => {
  if (view === 'track' && !orderPlaced) {
    setCurrentView('track');
    return;
  }
  if (view === "track") {
    setTrackResetSignal((prev) => prev + 1);
  }
  setCurrentView(view);
  setSelectedItem(null);
};

const handleConfirmOrder = () => {
  placeOrder({ tableNumber });
  setTrackResetSignal((prev) => prev + 1);
  setCurrentView("track");
};

const handleTrackingFromDetail = () => {
  placeOrder({ tableNumber });
  setSelectedItem(null);
  setTrackResetSignal((prev) => prev + 1);
  setCurrentView("track");
};

  // Show Item Detail Page when an item is selected
  if (selectedItem) {
    return (
      <ItemDetailPage
        item={{
          id: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          rating: 4.5,
          description: selectedItem.description || "Delicious item prepared with fresh ingredients.",
          time: "15-20 Min",
          image: selectedItem.image,
          isVeg: foodType === "Veg"
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
if (currentView === "track") {
  return (
    <TrackOrderPage
      key={trackResetSignal}
      onBack={() => setCurrentView("menu")}
      onViewChange={handleNavChange}
      orderPlaced={orderPlaced}
      orderNumber={orderNumber}
      estimatedTime="15-20"
      onReadyComplete={() => setCurrentView("bill")}
    />
  );
  }


if (currentView === "bill") {
  return (
    <BillPage
      onBack={() => setCurrentView("menu")}
      onViewChange={handleNavChange}
      orderPlaced={orderPlaced}
      tableNumber={tableNumber}
      orderNumber={orderNumber || "1234"}
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
          <button>
            <img src={bell} className="invert h-8" alt="bell" />
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
          <span className="font-semibold">Hi, {displayName}</span> Start your
          day fresh
        </h3>
      </div>

      <div className="px-5 py-3">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <img src={search} alt="search" className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes"
            className="w-full border-b py-2 pl-10 pr-10 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <img src={microphone} alt="microphone" className="w-4 h-4" />
          </span>
        </div>
      </div>

      <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Beverages" && (
        <div className="montserrat px-7 mt-3 flex gap-10 overflow-x-auto scrollbar-hide">
          {beverageTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveBeverageTab(tab as BeverageTab)}
              className={`pb-1 whitespace-nowrap ${
                activeBeverageTab === tab
                  ? "font-semibold border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {activeTab === "Health" && (
        <div className="montserrat px-7 mt-3 flex gap-10 overflow-x-auto scrollbar-hide">
          {healthTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveHealthTab(tab as HealthTab)}
              className={`pb-1 whitespace-nowrap ${
                activeHealthTab === tab
                  ? "font-semibold border-b-2 border-black text-black"
                  : "text-gray-500"
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
          foodType={foodType}
          searchQuery={searchQuery}
          onItemClick={handleItemClick}
        />
      </div>

      <BottomNav activeView={currentView} onViewChange={handleNavChange} />
    </div>
  );
};

export default BreakfastDetails;
