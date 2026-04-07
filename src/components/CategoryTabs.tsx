import { div } from 'framer-motion/client';
import React from 'react';

type TabType = 'All' | 'Bestseller' | 'Beverages' | 'Health' | 'Quick Bites';

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const CategoryTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const tabs: TabType[] = ['All', 'Bestseller', 'Beverages', 'Health','Quick Bites'];

  return (
   <div className='px-5'>
<div className=" bg-[#FFF4DF] flex gap-8 overflow-x-auto py-2 border-b border-gray-100">{tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`montserrat text-[20px] pb-2 whitespace-nowrap transition-colors ${
            activeTab === tab 
              ? 'text-black-500 font-semibold border-b-2 border-black-500' 
              : 'text-black-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
    </div>
  );
};

export default CategoryTabs;