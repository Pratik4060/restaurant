import React, { useState } from 'react';

const BottomNav: React.FC = () => {
  const [active, setActive] = useState('Menu');
  
  const navItems = [
    { id: 'Menu', icon: '📋', label: 'Menu' },
    { id: 'Orders', icon: '📦', label: 'Orders' },
    { id: 'Track', icon: '🕒', label: 'Track' },
    { id: 'Bill', icon: '📄', label: 'Bill' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] bg-black rounded-full px-6 py-2.5 flex justify-between items-center shadow-xl">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className="flex flex-col items-center"
        >
          <span className={active === item.id ? 'text-orange-400 text-xl' : 'text-gray-500 text-xl'}>
            {item.icon}
          </span>
          <span className={`text-[9px] mt-0.5 ${active === item.id ? 'text-orange-400' : 'text-gray-500'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;