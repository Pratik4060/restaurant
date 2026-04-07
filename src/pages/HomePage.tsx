import React, { useState, useEffect } from "react";
import { ArrowRight, Mic, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../assets/logo1.svg";
import lunch from "../assets/lunch.svg";
import Breakfast from "../assets/Breakfast.svg";
import Dinner1 from "../assets/Dinner1.svg";
import bell from "../assets/bell.svg";
import type { MealCategory, UserData } from "../types";

interface HomePageProps {
  user: UserData;
  onSelect: (cat: MealCategory) => void;
}

const OFFERS = [
  {
    title: "Free Add-on",
    desc: "Free Fresh Juice on orders above ₹399. Auto applied at checkout",
    img: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png",
    gradient: "linear-gradient(135deg, #134e4a 0%, #065f46 58%, #064e3b 100%)",
  },
  {
    title: "Flat Discount",
    desc: "Get 20% OFF on your total bill. Valid on orders above ₹299",
    img: "https://cdn-icons-png.flaticon.com/512/3480/3480618.png",
    gradient: "linear-gradient(135deg, #6f432d 0%, #7e1f14 58%, #7e0909 100%)",
  },
  {
    title: "Combo Offer",
    desc: "Buy 1 Get 1 Free on Breakfast items. Limited time only.",
    img: "https://cdn-icons-png.flaticon.com/512/6556/6556219.png",
    gradient: "linear-gradient(135deg, #3f4c38 0%, #2c3e2d 58%, #1a2e1d 100%)",
  },
  {
    title: "Quick Bite Deal",
    desc: "Flat ₹50 OFF on Quick Bites. On orders above ₹199",
    img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #831843 58%, #701a75 100%)",
  },
];

const HomePage: React.FC<HomePageProps> = ({ user: _user, onSelect }) => {
  const [foodType, setFoodType] = useState<"Veg" | "Non Veg">("Veg");
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getMealInfo = (): {
    category: MealCategory;
    img: string;
    accent: string;
  } => {
    const hour = new Date().getHours();
    if (hour >= 9 && hour < 12) {
      return { category: "Breakfast", img: Breakfast, accent: "#ffd57a" };
    }
    if (hour >= 12 && hour < 17) {
      return { category: "Lunch", img: lunch, accent: "#ffd262" };
    }
    return { category: "Dinner", img: Dinner1, accent: "#ffc37d" };
  };

  const { category, img } = getMealInfo();

    return (
      <div className="mx-auto max-w-[1100px] overflow-hidden  ">
        {/* CHANGE 1: Add AnimatePresence and motion.div here */}
        <div className="mx-auto max-w-[1100px] overflow-hidden">
          {/* 
       FIX 1: Remove AnimatePresence and 'key' from here. 
       Animate the background property directly. 
    */}
          <motion.div
            animate={{ background: OFFERS[currentOffer].gradient }}
            transition={{ duration: 0.8, ease: "linear" }}
            className="px-6 pb-6 pt-6 text-white"
          >
            {/* Header (Logo & Bell) stays static */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center">
                <img
                  src={logo1}
                  alt="Zohnix"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <button>
                <img src={bell} className="h-6 w-6" alt="notifications" />
              </button>
            </div>

            {/* Search Bar stays static */}
            <div className="mb-7 flex items-center rounded-xl bg-white px-4 py-3 shadow-lg">
              <Search className="mr-2 h-4 w-4 text-gray-400" />
              <input
                className="w-full bg-transparent text-sm text-[#2a211b] outline-none"
                placeholder="Search"
              />
              <Mic className="h-3.5 w-3.5 text-gray-400" />
            </div>

            {/* 
         FIX 2: Place AnimatePresence here so only 
         the text and images slide, while background stays solid. 
      */}
            <div className="relative h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOffer} // Key stays here to trigger content swap
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-between"
                >
                  <div className="flex-1 pr-4">
                    <p className="mb-2 text-[1.45rem] font-bold tracking-tight">
                      {OFFERS[currentOffer].title}
                    </p>
                    <p className="max-w-[240px] text-sm leading-relaxed text-white/90">
                      {OFFERS[currentOffer].desc}
                    </p>
                    <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ffba2f] px-5 py-2.5 text-sm font-bold text-[#261708] shadow-lg">
                      Order Now <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <motion.div
                    initial={{ scale: 0.8, rotate: 5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="flex h-[140px] w-[140px] items-center justify-center"
                  >
                    <img
                      src={OFFERS[currentOffer].img}
                      className="h-full w-full object-contain drop-shadow-2xl"
                      alt="food"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* PAGINATION DOTS - Animated for "Pill" effect */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {OFFERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentOffer(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === currentOffer ? "bg-[#ffb100]" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom section - NO CHANGES NEEDED HERE */}
          <div className="bg-[radial-gradient(circle_at_top,#fff2cb_0%,#ffe0b4_30%,#ecf4c7_78%,#d6f7cf_100%)] px-6 py-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setFoodType("Veg")}
                  className="flex items-center gap-3 text-sm font-medium text-[#1d1d1d]"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      foodType === "Veg"
                        ? "border-[#6bb56a] bg-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${
                        foodType === "Veg" ? "bg-[#38b34f]" : "bg-transparent"
                      }`}
                    />
                  </span>
                  Veg
                </button>

                <button
                  type="button"
                  onClick={() => setFoodType("Non Veg")}
                  className="flex items-center gap-3 text-sm font-medium text-[#1d1d1d]"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      foodType === "Non Veg"
                        ? "border-[#d66767] bg-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${
                        foodType === "Non Veg"
                          ? "bg-[#d66767]"
                          : "bg-transparent"
                      }`}
                    />
                  </span>
                  Non Veg
                </button>
              </div>

              <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-md">
                Most Popular
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <h2 className="mb-8 text-[2rem] font-medium tracking-tight text-[#25160e]">
                {category}
              </h2>

              <button
                type="button"
                onClick={() => onSelect(category)}
                className="group flex flex-col items-center"
              >
                <div className="h-[290px] w-[290px]">
                  <img src={img} alt={category} className="" />
                </div>
                <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg">
                  Explorer
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};


export default HomePage;
