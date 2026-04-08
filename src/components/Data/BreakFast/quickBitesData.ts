import sandwhichbest from '../../../assets/sandwhichbest.svg';
import bite from '../../../assets/bite.svg';
import type { MenuItem } from './menuTypes';

export const quickBiteItems: MenuItem[] = [
  {
    id: 10,
    name: 'Grilled Veg Sandwich',
    description: 'Toasted Sandwich With Fresh Veggies & Sauces',
    price: 109,
    image: sandwhichbest,
    category: 'Quick Bites',
    isBestseller: true,
  },
  {
    id: 11,
    name: 'Quick Bite Combo',
    description: 'Fast And Filling Snack Combo',
    price: 159,
    image: bite,
    category: 'Quick Bites',
  },
];
