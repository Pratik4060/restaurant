import tea from '../../../assets/tea.svg';
import maska from '../../../assets/maska.svg';
import food from '../../../assets/food.svg';
import pizza from '../../../assets/pizza.svg';
import chicken from '../../../assets/chicken.svg';
import fish from '../../../assets/fish.svg';
import freeadd from '../../../assets/freeadd.svg';
import sandwhich from '../../../assets/sandwhich.svg';
import type { MenuItem } from './menuTypes.ts';

export const beverageItems: MenuItem[] = [
  {
    id: 4,
    name: 'Masala Chai',
    description: 'Traditional Indian Spiced Tea With Milk',
    price: 40,
    image: tea,
    category: 'Beverages',
    subCategory: 'Hot Beverages',
  },
  {
    id: 5,
    name: 'Virgin Mojito',
    description: 'Minty And Refreshing Lime Cooler',
    price: 120,
    image: maska,
    category: 'Beverages',
    subCategory: 'Mocktails',
  },
  {
    id: 6,
    name: 'Margarita',
    description: 'Tangy And Classic Citrus Cocktail',
    price: 149,
    image: food,
    category: 'Beverages',
    subCategory: 'Cocktails',
  },
  {
    id: 7,
    name: 'Whiskey',
    description: 'Strong And Smooth Aged Spirit',
    price: 179,
    image: pizza,
    category: 'Beverages',
    subCategory: 'Spirits',
  },
  {
    id: 8,
    name: 'Craft Beer',
    description: 'Chilled Amber Beer With Smooth Finish',
    price: 199,
    image: chicken,
    category: 'Beverages',
    subCategory: 'Beer',
  },
  {
    id: 9,
    name: 'Red Wine',
    description: 'Rich And Fruity Full-Bodied Wine',
    price: 249,
    image: fish,
    category: 'Beverages',
    subCategory: 'Wine',
  },
  {
    id: 10,
    name: 'Fresh Lime Juice',
    description: 'Freshly Squeezed Citrus Juice',
    price: 89,
    image: freeadd,
    category: 'Beverages',
    subCategory: 'Fresh Juice',
  },
  {
    id: 11,
    name: 'Cold Coffee',
    description: 'Chilled Coffee With Ice Cream',
    price: 129,
    image: sandwhich,
    category: 'Beverages',
    subCategory: 'Hot Beverages',
  },

  
];
