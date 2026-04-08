import lunch from '../../../assets/lunch.svg';
import chicken from '../../../assets/chicken.svg';
import fish from '../../../assets/fish.svg';
import pizza from '../../../assets/pizza.svg';
import sandwhichbest from '../../../assets/sandwhichbest.svg';
import type { LunchItem } from "./LunchTypes";

export const lunchItems: LunchItem[] = [
  {
    id: 1,
    name: 'Fresh Orange Juice',
    description: 'Freshly Squeezed Orange Juice Served Chilled',
    price: 149,
    image: lunch,
    category: 'Beverages',
    isBestseller: true,
  },
  {
    id: 2,
    name: 'Alphonso Mango Juice',
    description: 'Fresh Mango Blend With Buttery Croissant',
    price: 179,
    image: chicken,
    category: 'Beverages',
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Berry Blast Smoothie',
    description: 'Blend Of Fresh Berries With Yogurt For A Refreshing Taste',
    price: 199,
    image: fish,
    category: 'Beverages',
  },
  {
    id: 4,
    name: 'Chicken Rice Bowl',
    description: 'Spiced Chicken Served With Steamed Rice',
    price: 249,
    image: pizza,
    category: 'Main Course',
    isBestseller: true,
  },
  {
    id: 5,
    name: 'Paneer Starter',
    description: 'Crispy Paneer Tossed In Light Spices',
    price: 189,
    image: sandwhichbest,
    category: 'Starters',
  },
  {
    id: 6,
    name: 'Veg Rice Plate',
    description: 'Rice With Seasonal Veg Curry And Salad',
    price: 219,
    image: lunch,
    category: 'Rice',
  },
];
