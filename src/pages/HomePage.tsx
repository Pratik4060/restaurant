import React, { useState, useEffect,useMemo} from "react";
import { Clock3, MessageCircle, Mic, Phone, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../assets/logo1.svg";
import lunch from "../assets/lunch.svg";
import Breakfast from "../assets/Breakfast.svg";
import Dinner1 from "../assets/Dinner1.svg";
import bell from "../assets/bell.svg";
import sandwhich from "../assets/sandwhich.svg"
import bite from "../assets/bite.svg"
import combo from "../assets/combo.svg"
import freeadd from "../assets/freeadd.svg"
import nonevegBreakfast from "../assets/Breakfast/Non-veg/Breakfast.svg"
import Lunch from "../assets/Breakfast/Non-veg/Lunch.svg"
import Dinner from "../assets/Breakfast/Non-veg/Dinner.svg"
import type { FoodType, MealCategory, UserData } from "../types";
import { BreakfastItems } from "../components/Breakfast/Data";
import { LunchItems } from "../components/Lunch/Data";
import ItemDetailPage from "../components/ItemDetailsPage";
import arrow from "../assets/Arrow 1.svg"

type HomeSearchItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  foodType?: "Veg" | "Non Veg";
  source: "Breakfast" | "Lunch";
};

interface HomePageProps {
  user: UserData;
  foodType: FoodType;
  onFoodTypeChange: (type: FoodType) => void;
  onSelect: (cat: MealCategory) => void;
  onMostPopularSelect: (cat: MealCategory) => void;
  onOfferSelect: (target: {
    category: MealCategory;
    focus: "all" | "quick-bites" | "beverages";
  }) => void;
}

const OFFERS = [

  {
    title: "Flat Discount",
    desc: "Get 20% OFF on your total bill. Valid on orders above ₹299",
    img: sandwhich,
    gradient: "linear-gradient(117.14deg, #785641 5.65%, #5F0404 96.69%)",
  },
    {
    title: "Combo Offer",
    desc: "Buy 1 Get 1 Free on Breakfast items. Limited time only.",
    img: combo,
    gradient: "linear-gradient(114.35deg, #2A460D 0.77%, #666666 97.98%)",
  },
{
    title: "Quick Bite Deal",
    desc: "Flat ₹50 OFF on Quick Bites. On orders above ₹199",
    img: bite,
    gradient: "linear-gradient(115.74deg, #970808 4.97%, #053F62 100%)",
  },
{
    title: "Free Add-on",
    desc: "Free Fresh Juice on orders above ₹399. Auto applied at checkout",
    img: freeadd,
    gradient: "linear-gradient(115.68deg, #446B83 1.81%, #116848 100%)",
  },
  ];

  const VEG_MEAL_DATA: {
    category: MealCategory;
    img: string;
    background: string;
  }[] = [
    {
      category: "Breakfast",
      img: Breakfast,
      background:
        "linear-gradient(160.72deg, rgba(184, 194, 177, 0.2) 31.81%, rgba(59, 105, 6, 0.2) 62.84%, rgba(181, 113, 22, 0.2) 95.75%)",
    },
    {
      category: "Lunch",
      img: lunch,
      background: "linear-gradient(147.71deg, #FCD9AB 37.7%, #D7F8CF 96.96%)",
    },
    {
      category: "Dinner",
      img: Dinner1,
      background: "linear-gradient(160.23deg, #FFFFFF 31.02%, #FFB69D 97.96%)",
    },
  ];
const NON_VEG_MEAL_DATA: {
  category: MealCategory;
  img: string;
  background: string;
}[] = [
  {
    category: "Breakfast",
    img: nonevegBreakfast,
background: 'linear-gradient(  160.72deg, rgba(184, 194, 177, 0.2), rgba(255, 255, 255, 1))'
},
  {
    category: "Lunch",
    img: Lunch,
    background: "linear-gradient(147.71deg, #FCD9AB 37.7%, #D7F8CF 96.96%)",
  },
  {
    category: "Dinner",
    img: Dinner,
    background: "linear-gradient(160.23deg, #FFFFFF 31.02%, #FFB69D 97.96%)",
  },
];

const HomePage: React.FC<HomePageProps> = ({
  user: _user,
  foodType,
  onFoodTypeChange,
  onSelect,
  onMostPopularSelect,
  onOfferSelect,
}) => {
  const [currentOffer, setCurrentOffer] = useState(0);
const [searchQuery, setSearchQuery] = useState("");
const [selectedSearchItem, setSelectedSearchItem] = useState<HomeSearchItem | null>(null);
const [showInfoModal, setShowInfoModal] = useState(false);

const allSearchItems = useMemo<HomeSearchItem[]>(() => {
  return [
    ...BreakfastItems.map((item) => ({
      ...item,
      source: "Breakfast" as const,
    })),
    ...LunchItems.map((item) => ({
      ...item,
      source: "Lunch" as const,
    })),
  ];
}, []);

const searchResults = useMemo(() => {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return [];

  return allSearchItems.filter((item) => {
    const text = `${item.name} ${item.description}`.toLowerCase();
    return text.includes(q);
  });
}, [allSearchItems, searchQuery]);

const vegResults = searchResults.filter(
  (item) => (item.foodType ?? "Veg") === "Veg",
);

const nonVegResults = searchResults.filter(
  (item) => item.foodType === "Non Veg",
);

  const getInitialMealIndex = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 0; // Breakfast
    if (hour >= 12 && hour < 17) return 1; // Lunch
    return 2; // Dinner
  };

    const [currentMealIdx, setCurrentMealIdx] = useState(getInitialMealIndex());

    const activeMealData =
      foodType === "Veg" ? VEG_MEAL_DATA : NON_VEG_MEAL_DATA;
    const currentMeal = activeMealData[currentMealIdx];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentMealIdx((prev) => (prev + 1) % activeMealData.length);
  }, 5000);

  return () => clearInterval(timer);
}, [activeMealData.length]);

  useEffect(() => {
    setCurrentMealIdx(0);
  }, [foodType]);

  useEffect(() => {
    if (!showInfoModal) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowInfoModal(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showInfoModal]);

if (selectedSearchItem) {
  return (
    <ItemDetailPage
      item={{
        id: selectedSearchItem.id,
        name: selectedSearchItem.name,
        price: selectedSearchItem.price,
        description: selectedSearchItem.description,
        image: selectedSearchItem.image,
        rating: 4.5,
        time: "15-20 Min",
        isVeg: selectedSearchItem.foodType !== "Non Veg",
        category: selectedSearchItem.source,
      }}
      onBack={() => setSelectedSearchItem(null)}
      onNavigateToMenu={() => setSelectedSearchItem(null)}
      onNavigateToOrders={() => setSelectedSearchItem(null)}
    />
  );
}

const handleOfferOrderNow = () => {
  const offerTitle = OFFERS[currentOffer].title;

  if (offerTitle === "Flat Discount") {
    onOfferSelect({ category: currentMeal.category, focus: "all" });
    return;
  }

  if (offerTitle === "Combo Offer") {
    onOfferSelect({ category: "Breakfast", focus: "all" });
    return;
  }

  if (offerTitle === "Quick Bite Deal") {
    onOfferSelect({ category: "Breakfast", focus: "quick-bites" });
    return;
  }

  onOfferSelect({ category: currentMeal.category, focus: "beverages" });
};




    return (
      <div className="mx-auto max-w-[1100px] overflow-hidden  ">
        {showInfoModal && (
          <div
            className="fixed inset-0 z-50 bg-black/35"
            onClick={() => setShowInfoModal(false)}
          >
            <div
              className="ml-4 mt-16 h-[78vh] w-[calc(100vw-2.5rem)] max-w-[335px] overflow-y-auto rounded-xl border border-[#d3d8f2] bg-[#f5f5f5] p-5 text-[#2a2a2a] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              

              <div className="space-y-6 text-[#2f2f2f]">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Clock3 className="h-5 w-5" />
                    <p className="playfair text-[1.75rem] leading-none">Restaurant Timing</p>
                  </div>
                  <div className="mb-3 border-b border-gray-300" />
                  <ul className="space-y-3 text-[1.3rem] leading-tight">
                    <li>- Opening Time: 7:00 AM</li>
                    <li>- Closing Time: 11:30 PM</li>
                    <li>- Breakfast: 7:00 AM - 11:00 AM</li>
                    <li>- Lunch: 12:00 PM - 4:00 PM</li>
                    <li>- Dinner: 7:00 PM - 11:30 PM</li>
                  </ul>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <p className="playfair text-[1.75rem] leading-none">Social Media Handles</p>
                  </div>
                  <div className="mb-3 border-b border-gray-300" />
                  <ul className="space-y-3 text-[1.3rem] leading-tight">
                    <li>
                      Instagram: <span className="text-[#5aa3d8]">@zhonixkitchen</span>
                    </li>
                    <li>
                      Facebook: <span className="text-[#5aa3d8]">Zhonix Kitchen Official</span>
                    </li>
                    <li>
                      WhatsApp: <span className="text-[#5aa3d8]">+91 98765 43210</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <p className="playfair text-[1.75rem] leading-none">Contact Info</p>
                  </div>
                  <div className="mb-3 border-b border-gray-300" />
                  <ul className="space-y-3 text-[1.3rem] leading-tight">
                    <li>- Location: Pune, Maharashtra</li>
                    <li>- Phone: +91 98765 43210</li>
                    <li>- Email: support@zhonixkitchen.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
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
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowInfoModal(true)}
                className="flex h-14 w-14 items-center justify-center"
              >
                <img
                  src={logo1}
                  alt="Zohnix"
                  className="h-19 w-19 object-contain"
                />
              </button>
              <button>
                <img src={bell} className="h-8 w-8" alt="notifications" />
              </button>
            </div>

            {/* Search Bar stays static */}
<div className="mb-7 rounded-xl bg-white px-4 py-3">
  <div className="flex items-center ">
    <Search className="mr-2 h-4 w-4 text-gray-400 " />
    <input
      className="w-full bg-transparent text-sm text-[#2a211b] outline-none"
      placeholder="Search veg and non-veg dishes"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <Mic className="h-3.5 w-3.5 text-gray-400" />
  </div>

  {searchQuery.trim() && (
    <div className="mt-4 max-h-80 overflow-y-auto rounded-2xl border border-gray-100 bg-[#fffaf3] p-3">
      {searchResults.length === 0 ? (
        <p className="py-4 text-center text-sm text-gray-400">
          No veg or non-veg items found
        </p>
      ) : (
        <div className="space-y-4">
          {vegResults.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-green-600">
                Veg
              </p>
              <div className="space-y-2">
                {vegResults.map((item) => (
<button
  key={`${item.source}-${item.id}`}
  onClick={() => setSelectedSearchItem(item)}
  className="w-full rounded-xl bg-white px-3 py-2 text-left shadow-sm"
>
  <div className="flex items-center gap-3">
    <img
      src={item.image}
      alt={item.name}
      className="h-14 w-14 rounded-xl object-cover bg-gray-100"
    />

    <div className="flex flex-1 items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
        <p className="text-xs text-gray-500 line-clamp-2">
          {item.description}
        </p>
        <p className="mt-1 text-sm font-semibold text-orange-500">
          ₹{item.price}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
          (item.foodType ?? "Veg") === "Veg"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {item.source}
      </span>
    </div>
  </div>
</button>

                ))}
                {nonVegResults.map((item) => (
  <button
    key={`${item.source}-${item.id}`}
    onClick={() => setSelectedSearchItem(item)}
    className="w-full rounded-xl bg-white px-3 py-2 text-left shadow-sm"
  >
    <div className="flex items-center gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-14 w-14 rounded-xl object-cover bg-gray-100"
      />

      <div className="flex flex-1 items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500 line-clamp-2">
            {item.description}
          </p>
          <p className="mt-1 text-sm font-semibold text-orange-500">
            ₹{item.price}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700">
          {item.source}
        </span>
      </div>
    </div>
  </button>
))}

              </div>

            </div>
          )}


        </div>
      )}
    </div>
  )}
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
                    <p className="mb-2 text-[1.45rem] playfair font-bold tracking-tight">
                      {OFFERS[currentOffer].title}
                    </p>
                    <p className="max-w-[240px] text-sm leading-relaxed text-white/90">
                      {OFFERS[currentOffer].desc}
                    </p>
                    <button
                      type="button"
                      onClick={handleOfferOrderNow}
                      className="mt-5 flex items-center gap-3 rounded-xl bg-[linear-gradient(90deg,#BC9F76_0%,#64471E_100%)] px-5 py-2 text-md  text-white "
                    >
                         <span className="mb-1">Order Now </span> 
                      <img  src = {arrow} alt= "arrow" className="h-4 w-6 object-contain mt-" />
                    </button> 
                  </div>

                  <div
                    className="flex h-[140px] w-[140px] items-center justify-center"
                  >
                    <img
                      src={OFFERS[currentOffer].img}
                      className="h-full w-full object-contain drop-shadow-2xl"
                      alt="food"
                    />
                  </div>
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
      <motion.div 
        animate={{ background: currentMeal.background }}
        transition={{ duration: 1.2, ease: "linear" }}
        className="px-6 py-8 min-h-[550px]"
      >
        {/* Toggle Controls */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-6">
            <button onClick={() => onFoodTypeChange("Veg")} className="flex items-center gap-2 text-sm font-medium ">
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${foodType === 'Veg' ? 'border-green-500' : 'border-gray-300'}`}>
                {foodType === 'Veg' && <div className="h-2.5 w-2.5 rounded-full bg-green-500" />}
              </div> Veg
            </button>
            <button onClick={() => onFoodTypeChange("Non Veg")} className="flex items-center gap-2 text-sm font-medium">
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center bg-white ${foodType === 'Non Veg' ? 'border-red-500' : 'border-gray-300'}`}>
                {foodType === 'Non Veg' && <div className="h-2.5 w-2.5 rounded-full bg-red-500" />}
              </div> Non Veg
            </button>
          </div>
          <button
            type="button"
            onClick={() => onMostPopularSelect(currentMeal.category)}
            className="rounded-full bg-black px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider transition-transform hover:scale-105"
          >
            Most Popular
          </button>
        </div>

        {/* Rolling Content Area */}
        <div className="relative flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMeal.category}
              // ANIMATION SETTINGS:
              initial={{ x:-60 ,y: 60, opacity: 0 ,rotate:-45}}   // Start from bottom
              animate={{ x: 0,y:0, opacity: 1 ,rotate:0}}    // Move to center
              exit={{ x: 60,y:60, opacity: 0 ,rotate:45}}     // Exit to top
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1],        x: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        y: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
 }} // Smooth "Video" timing
              className="flex flex-col items-center w-full"
            >
              {/* Category Title */}
              <h2 className="mb-6 text-[2.5rem]  playfair tracking-tight">
                {currentMeal.category}
              </h2>

              {/* Food Plate Image */}
              <div className="relative h-[280px] w-[280px] mb-10 flex items-center justify-center">
                <motion.img 
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8 }}
                  src={currentMeal.img} 
                  alt={currentMeal.category} 
                  className="max-h-full max-w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Explorer Button */}

            </motion.div>
          </AnimatePresence>
                        <button
                type="button"
                onClick={() => onSelect(currentMeal.category)}
                className="group flex items-center gap-3 rounded-full bg-black px-6 py-2 text-white shadow-2xl hover:scale-105 transition-transform"
              >
                <span className="text-md font-bold mb-1">Explore</span>
                <img  src = {arrow} alt="arrow" className="" />
              </button>
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default HomePage;

