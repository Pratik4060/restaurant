import React from 'react';
import type { MenuItem } from './Data/menudata';

interface Props {
  item: MenuItem;
  onAddToOrder: (item: MenuItem) => void;
}

const MenuCard: React.FC<Props> = ({ item, onAddToOrder }) => {
  return (
    <div className="flex gap-4 border">
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <img 
          src={item.image} 
          className="w-full h-full object-cover" 
          alt={item.name} 
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-base">{item.name}</h4>
            
          </div>
          <p className="text-[11px] text-gray-400 leading-tight mt-0.5 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-base">₹ {item.price}</span>
          <button 
            onClick={() => onAddToOrder(item)}
            className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1"
          >
            Add To Order <span className="text-[11px]">🛒</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;