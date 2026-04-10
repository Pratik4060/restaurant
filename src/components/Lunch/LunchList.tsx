import React, { useMemo } from "react";
import MenuCard from "../MenuCard";
import {
  BreakfastItems,
  type BeverageTab,
  type BreakfastTab,
  type BreakfastItem,
} from "../Breakfast/Data";
import { LunchItems, type LunchItem, type LunchTab } from "./Data";
import type { FoodType } from "../../types";

interface Props {
  activeTab: LunchTab | BreakfastTab;
  activeBeverageTab: BeverageTab;
  foodType: FoodType
  onAddToOrder: (item: LunchItem | BreakfastItem) => void;
  onItemClick?: (item: LunchItem | BreakfastItem) => void;
}

const LunchList: React.FC<Props> = ({
  activeTab,
  foodType,
  
  activeBeverageTab,
  onItemClick,
}) => {
const filteredItems = useMemo(() => {
  const lunchMealItems = LunchItems.filter(
    (item) => (item.foodType ?? "Veg") === foodType,
  );

  if (activeTab === "All") {
    return lunchMealItems;
  }

  if (activeTab === "Bestseller") {
    return lunchMealItems.filter((item) => item.isBestseller);
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

  return lunchMealItems.filter((item) => item.category === activeTab);
}, [activeTab, activeBeverageTab, foodType]);

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

export default LunchList;
