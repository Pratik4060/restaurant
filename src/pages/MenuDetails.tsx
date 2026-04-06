import React from 'react';
import type{ MealCategory } from '../types';
import pancake from '../assets/pancake.svg'
interface Props { 
  category: MealCategory; 
  userName: string;
  onBack: () => void; 
}

const MenuDetails: React.FC<Props> = ({ category, userName, onBack }) => {
  const displayName = userName.trim() || 'Guest';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="text-2xl">←</button>
        <h1 className="text-2xl font-bold border-b-4 border-orange-400 pb-1">{category}</h1>
        <button className="p-2 bg-blue-50 rounded-full">🔔</button>
      </div>

      <div className="px-6 py-2">
        <h3 className="text-lg">Hi, <span className="font-bold">{displayName}</span></h3>
        <p className="text-gray-500 text-sm italic">Start your day fresh</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-6 overflow-x-auto py-4">
        <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-bold border border-orange-200">All</span>
        <span className="text-gray-400 px-4 py-1 text-sm font-medium">Bestseller</span>
        <span className="text-gray-400 px-4 py-1 text-sm font-medium">Beverages</span>
      </div>

      {/* Food Cards */}
      <div className="px-6 space-y-4 pb-24">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-4 p-4 rounded-2xl border border-gray-100 shadow-sm bg-white">
            <img src={pancake} className="w-24 h-24 rounded-xl object-cover" alt="food" />
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-bold">Pancake</h4>
                <p className="text-[10px] text-gray-400 leading-tight">Fluffy Pancakes Served With Maple Syrup And Butter</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">₹ 600</span>
                <button className="bg-black text-white px-3 py-1 rounded-lg text-xs flex items-center">
                  Add To Order <span className="ml-1 text-[10px]">🛒</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[390px] bg-black text-white rounded-full p-4 flex justify-around items-center shadow-2xl">
         <div className="flex flex-col items-center text-orange-400"><span className="text-xl">📋</span><span className="text-[8px]">Menu</span></div>
         <div className="flex flex-col items-center text-gray-500"><span className="text-xl">📦</span><span className="text-[8px]">Orders</span></div>
         <div className="flex flex-col items-center text-gray-500"><span className="text-xl">🕒</span><span className="text-[8px]">Track</span></div>
         <div className="flex flex-col items-center text-gray-500"><span className="text-xl">📄</span><span className="text-[8px]">Bill</span></div>
      </div>
    </div>
  );
};

export default MenuDetails;
