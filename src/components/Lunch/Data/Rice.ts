import type { LunchItem } from "./LunchTypes";
import JeeraRice from "../../../assets/Lunch/Rice/JeeraRice.svg"
import Pulao from "../../../assets/Lunch/Rice/Pulao.svg"
import CurdRice from "../../../assets/Lunch/Rice/CurdRice.svg"
import steamRice from "../../../assets/Lunch/Rice/steamRice.svg"
import VegBiryani from "../../../assets/Lunch/Rice/VegBiryani.svg"

export const RiceItems: LunchItem[] = [
  {
    id: 21,
    name: 'Jeera Rice',
    description: 'Cumin Flavored Basmati Rice',
    price: 239,
    image: JeeraRice,
    category: 'Rice',
    isBestseller: true,
  },
  {
    id: 22,
    name: 'Veg Biryani',
    description: 'Spiced Rice With Vegetables',
    price: 199,
    image: VegBiryani,
    category: 'Rice',
    isBestseller: false,
  },
  {
    id: 23,
    name: 'Steam Rice',
    description: 'Plain Soft Cooked Rice',
    price: 199,
    image: steamRice,
    category: 'Rice',
    isBestseller: false,
  },
  {
    id: 24,
    name: 'Pulao',
    description: 'Mildly Spiced Vegetable Rice',
    price: 199,
    image: Pulao,
    category: 'Rice',
    isBestseller: false,
  },
  {
    id: 25,
    name: 'Curd Rice',
    description: 'Rice Mixed With Yogurt',
    price: 199,
    image: CurdRice,
    category: 'Rice',
    isBestseller: false,
  }
];