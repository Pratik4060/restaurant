import React, { useState, useMemo } from 'react';
import MenuCard from './MenuCard';
import  { menuItems, type MenuItem } from './Data/menudata';

type TabType = 'All' | 'Bestseller' | 'Beverages' | 'Health';

interface Props {
  activeTab: TabType;
  onAddToOrder: (item: MenuItem) => void;
}

const MenuList: React.FC<Props> = ({ activeTab, onAddToOrder }) => {
  const filteredItems = useMemo(() => {
    if (activeTab === 'All') {
      return menuItems;
    }
    if (activeTab === 'Bestseller') {
      return menuItems.filter(item => item.isBestseller);
    }
    return menuItems.filter(item => item.category === activeTab);
  }, [activeTab]);

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No items found in this category</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <MenuCard 
          key={item.id} 
          item={item} 
          onAddToOrder={onAddToOrder} 
        />
      ))}
    </div>
  );
};

export default MenuList;