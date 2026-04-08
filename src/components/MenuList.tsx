import React, { useMemo } from 'react';
import MenuCard from './MenuCard';
import { menuItems, type BeverageTab, type HealthTab, type MainTab, type MenuItem } from './Data/BreakFast';

interface Props {
  activeTab: MainTab;
  activeBeverageTab: BeverageTab;
  activeHealthTab: HealthTab;
  onAddToOrder: (item: MenuItem) => void;
}

const MenuList: React.FC<Props> = ({ activeTab, onAddToOrder ,activeBeverageTab ,activeHealthTab}) => {
  const filteredItems = useMemo(() => {
    if (activeTab === 'All') {
      return menuItems;
    }
    if (activeTab === 'Bestseller') {
      return menuItems.filter(item => item.isBestseller);
    }
    if (activeTab === 'Beverages') {
      const beverageItems = menuItems.filter(item => item.category === 'Beverages');

      if (activeBeverageTab === 'All') {
        return beverageItems;
      }

      return beverageItems.filter(item => item.subCategory === activeBeverageTab);
    }

    if (activeTab === 'Health') {
      const healthItems = menuItems.filter(item => item.category === 'Health');
      return healthItems.filter(item => item.subCategory === activeHealthTab);

      }

    


    return menuItems.filter(item => item.category === activeTab);
  }, [activeTab,activeBeverageTab,activeHealthTab]);

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
