import React, { useState } from 'react';
import menu from"../assets/menu.svg";
import orderfood1 from "../assets/orderfood1.svg"
import track from "../assets/clock.svg"
import bill from "../assets/bill.svg"

const BottomNav: React.FC = () => {
  const [active, setActive] = useState('Menu');
  
  const navItems = [
    { id: 'Menu', img: menu, label: 'Menu' },
    { id: 'Orders', img: orderfood1, label: 'Orders' },
    { id: 'Track', img: track, label: 'Track' },
    { id: 'Bill', img: bill, label: 'Bill' },
  ];

  return (
    <div className="fixed bottom-[0] border border-black w-full bg-black px-6 py-2.5 flex justify-between items-center">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className="flex flex-col items-center"
        >
          <span className={active === item.id ? 'text-orange-400 text-xl' : 'text-gray-500 text-xl'}>
            <img src={item.img}/>
          </span>
          <span className={` text-[9px] mt-0.5 ${active === item.id ? 'text-orange-400' : 'text-gray-500'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;