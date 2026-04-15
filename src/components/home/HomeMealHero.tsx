import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import arrow from "../../assets/Arrow 1.svg";
import type { FoodType, MealCategory } from "../../types";

type MealVisual = {
  category: MealCategory;
  img: string;
  background: string;
};

interface HomeMealHeroProps {
  foodType: FoodType;
  currentMeal: MealVisual;
  onFoodTypeChange: (type: FoodType) => void;
  onMostPopularSelect: (cat: MealCategory) => void;
  onSelect: (cat: MealCategory) => void;
}

const HomeMealHero: React.FC<HomeMealHeroProps> = ({
  foodType,
  currentMeal,
  onFoodTypeChange,
  onMostPopularSelect,
  onSelect,
}) => {
  return (
    <motion.div
      animate={{ background: currentMeal.background }}
      transition={{ duration: 1.2, ease: "linear" }}
      className="min-h-[550px] px-6 py-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => onFoodTypeChange("Veg")}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                foodType === "Veg" ? "border-green-500" : "border-gray-300"
              }`}
            >
              {foodType === "Veg" && (
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              )}
            </div>
            Veg
          </button>
          <button
            type="button"
            onClick={() => onFoodTypeChange("Non Veg")}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white ${
                foodType === "Non Veg" ? "border-red-500" : "border-gray-300"
              }`}
            >
              {foodType === "Non Veg" && (
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              )}
            </div>
            Non Veg
          </button>
        </div>
        <button
          type="button"
          onClick={() => onMostPopularSelect(currentMeal.category)}
          className="rounded-full bg-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition-transform hover:scale-105"
        >
          Most Popular
        </button>
      </div>

      <div className="relative flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMeal.category}
            initial={{ x: -60, y: 60, opacity: 0, rotate: -45 }}
            animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            exit={{ x: 60, y: 60, opacity: 0, rotate: 45 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              x: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              y: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            }}
            className="flex w-full flex-col items-center"
          >
            <h2 className="playfair mb-6 text-[2.5rem] tracking-tight">
              {currentMeal.category}
            </h2>

            <div className="relative mb-10 flex h-[280px] w-[280px] items-center justify-center">
              <motion.img
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                src={currentMeal.img}
                alt={currentMeal.category}
                className="max-h-full max-w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => onSelect(currentMeal.category)}
          className="group flex items-center gap-3 rounded-full bg-black px-6 py-2 text-white shadow-2xl transition-transform hover:scale-105"
        >
          <span className="mb-1 text-md font-bold">Explore</span>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
    </motion.div>
  );
};

export default HomeMealHero;
