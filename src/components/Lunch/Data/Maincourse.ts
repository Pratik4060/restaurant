import type { LunchItem } from "./LunchTypes";
import paneerButter from "../../../assets/Lunch/Maincourse/PaneerButter.svg"
import vegBiryani from "../../../assets/Lunch/Maincourse/VegBiryani.svg"
import vegThali  from "../../../assets/Lunch/Maincourse/Vegthali.svg"
import MixVegCurry from "../../../assets/Lunch/Maincourse/MixVegCuryy.svg"
import GrilledPaneer from "../../../assets/Lunch/Maincourse/GrilledPaneer.svg"


export const MainCourseItems: LunchItem[] = [
  {
    id: 1,
    name: 'Paneer Butter Masala',
    description: 'Creamy Tomato Gravy With Soft Paneer',
    price: 239,
    image: paneerButter,
    category: 'Main Course',
    isBestseller: true,
  },
  {
    id: 2,
    name: 'Veg Biryani',
    description: 'Aromatic Rice With Mixed Vegetables',
    price: 199,
    image: vegBiryani,
    category: 'Main Course',
    isBestseller: false,
  },
  {
    id: 3,
    name: 'Veg Thali',
    description: 'Complete Meal With Roti, Sabzi, Dal & Rice',
    price: 199,
    image: vegThali,
    category: 'Main Course',
    isBestseller: true,
  },

  {
        id: 4,
    name: 'Mix veg Curry ',
    description: 'Complete Meal With Roti, Sabzi, Dal & Rice',
    price: 199,
    image:MixVegCurry,
    category: 'Main Course',
    isBestseller: true,

  },
  {
        id: 5,
    name: 'Grilled Paneer Salad',
    description: 'Complete Meal With Roti, Sabzi, Dal & Rice',
    price: 199,
    image: GrilledPaneer,
    category: 'Main Course',
    isBestseller: true,

  }

];