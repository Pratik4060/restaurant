import React, { useState } from 'react';
import type { MealCategory } from '../types';
import BottomNav from '../components/BottomNav';
import type { LunchItem, LunchTab } from '../components/Lunch/Data';
import type { BeverageTab } from '../components/Breakfast/Data';
import type { BreakfastItem } from '../components/Breakfast/Data';
import bell from '../assets/bell.svg';
import back from '../assets/back.svg';
import search from '../assets/search.svg';
import microphone from '../assets/microphone.svg';
import LunchList from '../components/Lunch/LunchList';

interface Props {
  category: MealCategory;
  userName: string;
  onBack: () => void;
}

const LunchMenuDetails: React.FC<Props> = ({ category, userName, onBack }) => {
  const displayName = userName.trim() || 'Rohit';
  const [activeTab, setActiveTab] = useState<LunchTab>('All');
 const [activeBeverageTab, setActiveBeverageTab] = useState<BeverageTab>('All');
    const beverageTabs: BeverageTab[] = ['All', 'Mocktails', 'Cocktails', 'Spirits', 'Beer', 'Wine', 'Hot Beverages', 'Fresh Juice'];
  

  const tabs: LunchTab[] = ['All', 'Main Course', 'Starters' , 'Rice' ,'Bestseller' , 'Beverages' , 'Dessert'];


  const handleAddToOrder = (item: LunchItem | BreakfastItem) => {
    console.log('Added to order:', item);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-2 pt-9 pb-2 flex justify-between">
        <button onClick={onBack} className="text-2xl font-medium">
          <img src={back} alt="back" />
        </button>
        <button>
          <img src={bell} className="invert h-8" alt="notifications" />
        </button>
      </div>

      <div className="flex justify-center">
        <h1 className="text-[24px] font-bold border-b-4 border-orange-400 pb-1">
          {category}
        </h1>
      </div>

      <div className="px-5 pt-4">
        <h3>
          <span className="font-semibold">Hi {displayName},</span> Time for a delicious lunch
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
            className="w-full border-b py-2 pl-10 pr-10 text-sm outline-none"
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <img src={microphone} alt="microphone" className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="px-5">
        <div className="montserrat bg-[#FFF3D8] px-4 py-2 flex gap-10 overflow-x-auto scrollbar-hide rounded-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[14px] whitespace-nowrap transition-all pb-1 ${
                activeTab === tab
                  ? 'font-semibold border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

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
      

      <div className="flex-1 px-5 py-4 pb-28 overflow-y-auto">
        <LunchList activeTab={activeTab} activeBeverageTab={activeBeverageTab}
 onAddToOrder={handleAddToOrder} />
      </div>

      <BottomNav />
    </div>
  );
};

export default LunchMenuDetails;
