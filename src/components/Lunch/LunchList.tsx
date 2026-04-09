import React, { useMemo } from 'react';
import MenuCard from "../MenuCard";
import { BreakfastItems, type BeverageTab, type BreakfastTab, type BreakfastItem } from '../Breakfast/Data';
import { LunchItems, type LunchItem, type LunchTab } from './Data';
interface Props {
  activeTab: LunchTab | BreakfastTab;
  activeBeverageTab: BeverageTab;
  onAddToOrder: (item: LunchItem | BreakfastItem) => void;
}

const LunchList: React.FC<Props> = ({ activeTab, onAddToOrder ,activeBeverageTab}) => {
  const filteredItems = useMemo(() => {
    if (activeTab === 'All') {
      return LunchItems;
    }
    if (activeTab === 'Bestseller') {
      return LunchItems.filter(item => item.isBestseller);
    }
    if (activeTab === 'Beverages') {
      const beverageItems = BreakfastItems.filter((item) => item.category === 'Beverages');

      if (activeBeverageTab === 'All') {
        return beverageItems;
      }

      return beverageItems.filter((item) => item.subCategory === activeBeverageTab);
    }

     return LunchItems.filter(item => item.category === activeTab);
  }, [activeTab,activeBeverageTab]);

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

export default LunchList;
