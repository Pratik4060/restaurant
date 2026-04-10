// components/Breakfast/BreakfastList.tsx
import React, { useMemo } from 'react';
import { BreakfastItems, type BeverageTab, type HealthTab, type BreakfastTab, type BreakfastItem } from './Data';
import MenuCard from '../MenuCard';
import type {FoodType} from "../../types"
interface Props {
  activeTab: BreakfastTab;
  activeBeverageTab: BeverageTab;
  activeHealthTab: HealthTab;
  foodType: FoodType;
  onItemClick?: (item: BreakfastItem) => void;
}

const MenuList: React.FC<Props> = ({ 
  activeTab, 
  activeBeverageTab, 
  activeHealthTab,
  foodType,
  onItemClick
}) => {
const filteredItems = useMemo(() => {
  const baseItems = BreakfastItems.filter((item) => {
    if (item.category === "Beverages") return true;
    if (item.foodType) return item.foodType === foodType;
    if (item.category === "Health") return item.subCategory === foodType;
    return foodType === "Veg";
  });

  if (activeTab === "All") {
    return baseItems;
  }

  if (activeTab === "Bestseller") {
    return baseItems.filter((item) => item.isBestseller);
  }

  if (activeTab === "Beverages") {
    const beverageItems = BreakfastItems.filter(
      (item) => item.category === "Beverages",
    );

    if (activeBeverageTab === "All") {
      return beverageItems;
    }

    return beverageItems.filter(
      (item) => item.subCategory === activeBeverageTab,
    );
  }

  if (activeTab === "Health") {
    const healthItems = baseItems.filter((item) => item.category === "Health");
    return healthItems.filter((item) => item.subCategory === activeHealthTab);
  }

  return baseItems.filter((item) => item.category === activeTab);
}, [activeTab, activeBeverageTab, activeHealthTab, foodType]);

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
