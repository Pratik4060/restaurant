// components/Breakfast/BreakfastList.tsx
import React, { useMemo } from 'react';
import { BreakfastItems, type BeverageTab, type HealthTab, type BreakfastTab, type BreakfastItem } from './Data';
import MenuCard from '../MenuCard';

interface Props {
  activeTab: BreakfastTab;
  activeBeverageTab: BeverageTab;
  activeHealthTab: HealthTab;
  onItemClick?: (item: BreakfastItem) => void;
}

const MenuList: React.FC<Props> = ({ 
  activeTab, 
  activeBeverageTab, 
  activeHealthTab,
  onItemClick
}) => {
  const filteredItems = useMemo(() => {
    if (activeTab === 'All') {
      return BreakfastItems;
    }
    if (activeTab === 'Bestseller') {
      return BreakfastItems.filter(item => item.isBestseller);
    }
    if (activeTab === 'Beverages') {
      const beverageItems = BreakfastItems.filter(item => item.category === 'Beverages');

      if (activeBeverageTab === 'All') {
        return beverageItems;
      }

      return beverageItems.filter(item => item.subCategory === activeBeverageTab);
    }

    if (activeTab === 'Health') {
      const healthItems = BreakfastItems.filter(item => item.category === 'Health');
      return healthItems.filter(item => item.subCategory === activeHealthTab);
    }

    return BreakfastItems.filter(item => item.category === activeTab);
  }, [activeTab, activeBeverageTab, activeHealthTab]);

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
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default MenuList;