import React from 'react';
import type { MenuItem } from './Data/BreakFast';
import order from '../assets/order.svg'
import Ruppes from '../assets/Ruppes.svg'
import type { LunchItem } from './Data/Lunch/LunchTypes';



interface Props {
  item: MenuItem |LunchItem;
  onAddToOrder: (item: MenuItem | LunchItem) => void;
}
 

const MenuCard: React.FC<Props> = ({ item, onAddToOrder }) => {
  return (
    <div className=" montserrat flex gap-4  rounded-xl h-38 bg-[#F7F7F7] border border-[#C9C9C9] ">
      <div className='flex items-center'>
      <div className="  w-35 h-35 rounded-xl  overflow-hidden p-3   ">
        <img 
          src={item.image} 
          className="w-full h-full object-cover" 
          alt={item.name} 
        />
      </div>
      </div>
      
<div className="flex flex-col justify-between flex-1 py-2">        <div className='pr-5'>
          <div>
            <h4 className="font-bold mt-2 text-[20px] ">{item.name}</h4>
            
          </div>
          <p className="text-[11px] mt-2 ">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <span className="text-base flex gap-1"> 
            <img src={Ruppes} alt="Ruppes" /> {item.price}</span>
          <button 
            onClick={() => onAddToOrder(item)}
            className="bg-black text-white px-3 py-1.5 rounded-md text-[12px] flex items-center gap-3 mr-6"
          >
            Add To Order <span> 
           <img src={order} alt='order' className='h-[15px] w-[15px]' />

            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
