import React, { useState } from 'react';
import type { MealCategory } from '../types';
import CategoryTabs from '../components/CategoryTabs';
import MenuList from '../components/MenuList';
import BottomNav from '../components/BottomNav';
import type { BeverageTab, HealthTab, MainTab, MenuItem } from '../components/Data/BreakFast';
import bell from '../assets/bell.svg'
import back from "../assets/back.svg"
import search from "../assets/search.svg"
import microphone from "../assets/microphone.svg"

interface Props { 
  category: MealCategory; 
  userName: string;
  onBack: () => void; 
}

const MenuDetails: React.FC<Props> = ({ category, userName, onBack }) => {
  const displayName = userName.trim() || 'Rohit';
  const [activeTab, setActiveTab] = useState<MainTab>('All');
  const [activeBeverageTab, setActiveBeverageTab] = useState<BeverageTab>('All');
  const [activeHealthTab , setActiveHealthTab] = useState<HealthTab>('Veg')
  const beverageTabs: BeverageTab[] = ['All', 'Mocktails', 'Cocktails', 'Spirits', 'Beer', 'Wine', 'Hot Beverages', 'Fresh Juice'];
  const healthTabs:HealthTab[] = ['Veg','Non Veg'];

  const handleAddToOrder = (item: MenuItem) => {
    console.log('Added to order:', item);
    // Add your order logic here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-2 pt-9 pb-2 flex  justify-between">
        <button onClick={onBack} className="text-2xl font-medium">
          <img src={back} alt="" />
        </button>
        <button>
          <img src={bell} className='invert h-8'/>
        </button>
      </div>
<div className="flex justify-center">
  <h1 className="text-[24px] font-bold border-b-4 border-orange-400 pb-1">
  {category}
  </h1>
</div>
      {/* Greeting */}
      <div className="px-5 pt-4">
<h3>
  <span className="font-semibold">Hi, {displayName}</span> Start your day fresh
</h3>        
      </div>

      {/* Search Bar */}
<div className="px-5 py-3">
  <div className="relative w-full">

    {/* Left icon (search) */}
    <span className="absolute left-3 top-1/2 -translate-y-1/2">
      <img src={search} alt="search" className="w-4 h-4" />
    </span>

    {/* Input */}
    <input
      type="text"
      placeholder="Search"
      className="w-full border-b py-2 pl-10 pr-10 text-sm"
    />

    {/* Right icon (microphone) */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2">
      <img src={microphone} alt="microphone" className="w-4 h-4" />
    </span>

  </div>
</div>

      {/* Category Tabs */}
<CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

{activeTab === 'Beverages' && (
  <div className=" montserrat px-7 mt-3 flex gap-10 overflow-x-auto scrollbar-hide">
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
  <div className=" montserrat px-7 mt-3 flex gap-10 overflow-x-auto scrollbar-hide">
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
      
      
      
      {/* Menu List */}

      <div className="flex-1 px-5 py-4 pb-28 overflow-y-auto">
        <MenuList activeTab={activeTab} activeBeverageTab={activeBeverageTab} activeHealthTab={activeHealthTab}
 onAddToOrder={handleAddToOrder} />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default MenuDetails;
