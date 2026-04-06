import React, { useState } from 'react';
import { ArrowRight,  Mic, Search } from 'lucide-react';
import logo1 from '../assets/logo1.svg';
import lunch from '../assets/lunch.svg'
import sandwhich from '../assets/sandwhich.svg'
import Breakfast from '../assets/Breakfast.svg'
import Dinner1 from '../assets/Dinner1.svg'
import type { MealCategory, UserData } from '../types';
import bell from '../assets/bell.svg'

interface HomePageProps {
  user: UserData;
  onSelect: (cat: MealCategory) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user: _user, onSelect }) => {
  const [foodType, setFoodType] = useState<'Veg' | 'Non Veg'>('Veg');

  const getMealInfo = (): { category: MealCategory; img: string; accent: string } => {
    const hour = new Date().getHours();

    if (hour >= 9 && hour < 12) {
      return {
        category: 'Breakfast',
        img: Breakfast,
        accent: '#ffd57a',
      };
    }

    if (hour >= 12 && hour < 17) {
      return {
        category: 'Lunch',
        img: lunch,
        accent: '#ffd262',
      };
    }

    return {
      category: 'Dinner',
      img: Dinner1,
      accent: '#ffc37d',
    };
  };

  const { category, img, accent } = getMealInfo();

  return (
      <div className="mx-auto max-w-[1100px] overflow-hidden  bg-white shadow-[0_28px_70px_rgba(76,39,18,0.14)]">
        <div className="bg-[linear-gradient(135deg,#6f432d_0%,#7e1f14_58%,#7e0909_100%)] px-6 pb-6 pt-6 text-white">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center ">
              <img src={logo1} alt="Zohnix" className="h-9 w-9 object-contain" />
            </div>
            <button className="">
              < img src = {bell} className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-7 flex items-center rounded-xl bg-white px-4 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
            <Search className="mr-2 h-4 w-4 text-gray-400" />
            <input
              className="w-full bg-transparent text-sm text-[#2a211b] outline-none placeholder:text-gray-400"
              placeholder="Search"
            />
            <button className="rounded-full border border-gray-300 p-1 text-gray-500">
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex  gap-2">
            <div>
              <p className="mb-3 text-[1.45rem] font-medium tracking-tight">Flat Discount</p>
              <p className="max-w-[340px] text-[1rem] leading-7 text-white/92">
                Get 20% OFF on your total bill on orders above ₹299
              </p>
              <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ffba2f] px-5 py-3 text-sm font-semibold text-[#261708] shadow-[0_10px_20px_rgba(255,186,47,0.28)] transition hover:brightness-105">
                Order Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

              <div className="h-[150px] w-[150px]     ">
                <img src={sandwhich} alt='sandwhich' className="h-full w-full " />
              </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffb100]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
          </div>
        </div>

        <div className="bg-[radial-gradient(circle_at_top,#fff2cb_0%,#ffe0b4_30%,#ecf4c7_78%,#d6f7cf_100%)] px-6 py-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setFoodType('Veg')}
                className="flex items-center gap-3 text-sm font-medium text-[#1d1d1d]"
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${foodType === 'Veg' ? 'border-[#6bb56a] bg-white' : 'border-gray-300 bg-white'}`}>
                  <span className={`h-3.5 w-3.5 rounded-full ${foodType === 'Veg' ? 'bg-[#38b34f]' : 'bg-transparent'}`} />
                </span>
                Veg
              </button>

              <button
                type="button"
                onClick={() => setFoodType('Non Veg')}
                className="flex items-center gap-3 text-sm font-medium text-[#1d1d1d]"
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${foodType === 'Non Veg' ? 'border-[#d66767] bg-white' : 'border-gray-300 bg-white'}`}>
                  <span className={`h-3.5 w-3.5 rounded-full ${foodType === 'Non Veg' ? 'bg-[#d66767]' : 'bg-transparent'}`} />
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
              <div
              >

                <div className="h-[290px] w-[290px] ">
                  <img src={img} alt={category} className=" " />
                </div>
              </div>

              <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg">
                Explorer
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
