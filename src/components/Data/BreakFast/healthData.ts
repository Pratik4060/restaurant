import salad from '../../../assets/salad.svg';
import hero from '../../../assets/hero.png';
import chicken from '../../../assets/chicken.svg';
import fish from '../../../assets/fish.svg';
import type { MenuItem } from './menuTypes';

export const healthItems: MenuItem[] = [
  {
    id: 8,
    name: 'Green Smoothie',
    description: 'Healthy Blend Of Spinach, Apple & Ginger',
    price: 180,
    image: hero,
    category: 'Health',
    subCategory: 'Veg'
  },
  {
    id: 9,
    name: 'Fruit Salad',
    description: 'Seasonal Fruits Mixed With Honey And A Hint Of Lemon',
    price: 199,
    image: salad,
    category: 'Health',
    isBestseller: true,
    subCategory:"Veg"
  },
  {
    id: 10,
    name: 'Grilled Chicken Bowl',
    description: 'Lean Chicken With Fresh Greens And Herbs',
    price: 249,
    image: chicken,
    category: 'Health',
    subCategory: 'Non Veg',
  },
  {
    id: 11,
    name: 'Fish Fillet Salad',
    description: 'Light Fish Fillet With Crisp Vegetables',
    price: 279,
    image: fish,
    category: 'Health',
    subCategory: 'Non Veg',
  },
];
