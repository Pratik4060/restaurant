// BottomNav.tsx
import React from 'react';
import menu from "../assets/menu.svg";
import orderfood1 from "../assets/orderfood1.svg";
import track from "../assets/clock.svg";
import bill from "../assets/bill.svg";

interface BottomNavProps {
  activeView: 'menu' | 'orders' | 'track' | 'bill';
  onViewChange: (view: 'menu' | 'orders' | 'track' | 'bill') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'menu', img: menu, label: 'Menu' },
    { id: 'orders', img: orderfood1, label: 'Orders' },
    { id: 'track', img: track, label: 'Track' },
    { id: 'bill', img: bill, label: 'Bill' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black px-6 py-2.5 flex justify-between items-center">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id as any)}
          className="flex flex-col items-center"
        >
          <span className={activeView === item.id ? 'text-orange-400' : 'text-gray-500'}>
            <img src={item.img} alt={item.label} className="w-6 h-6" />
          </span>
          <span className={`text-[9px] mt-0.5 ${activeView === item.id ? 'text-orange-400' : 'text-gray-500'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;