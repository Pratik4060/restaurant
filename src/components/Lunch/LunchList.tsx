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
  searchQuery?: string;
  onAddToOrder: (item: LunchItem | BreakfastItem) => void;
  onItemClick?: (item: LunchItem | BreakfastItem) => void;
}

const LunchList: React.FC<Props> = ({
  activeTab,
  foodType,
  activeBeverageTab,
  searchQuery = "",
  onItemClick,
}) => {
const normalizedQuery = searchQuery.trim().toLowerCase();

const filteredItems = useMemo(() => {
  const lunchMealItems = LunchItems.filter(
    (item) => (item.foodType ?? "Veg") === foodType,
  );

  const searchFilteredItems = normalizedQuery
    ? lunchMealItems.filter((item) => {
        const haystack = `${item.name} ${item.description}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : lunchMealItems;

  if (activeTab === "All") {
    return searchFilteredItems;
  }

  if (activeTab === "Bestseller") {
    return searchFilteredItems.filter((item) => item.isBestseller);
  }

  if (activeTab === "Beverages") {
    const beverageItems = BreakfastItems.filter(
      (item) => item.category === "Beverages",
    );

    if (activeBeverageTab === "All") {
      return normalizedQuery
        ? beverageItems.filter((item) => {
            const haystack = `${item.name} ${item.description}`.toLowerCase();
            return haystack.includes(normalizedQuery);
          })
        : beverageItems;
    }

    return beverageItems.filter(
      (item) =>
        item.subCategory === activeBeverageTab &&
        (!normalizedQuery ||
          `${item.name} ${item.description}`
            .toLowerCase()
            .includes(normalizedQuery)),
    );
  }

  return searchFilteredItems.filter((item) => item.category === activeTab);
}, [activeTab, activeBeverageTab, foodType, normalizedQuery]);

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">
          {normalizedQuery ? "No items match your search" : "No items found in this category"}
        </p>
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
