import pancake from '../../../assets/Breakfast/all/pancake.svg';
import idliSambar from '../../../assets/Breakfast/all/idli.svg';
import dosa from '../../../assets/Breakfast/all/dosa.svg';
import fruitSalad from '../../../assets/Breakfast/Health/FruitSalad.svg';
import type { BreakfastItem } from './BreakfastTypes';

export const coreItems: BreakfastItem[] = [
  {
    id: 31,
    name: 'Pancake',
    description: 'Fluffy Pancakes Served With Maple Syrup And Butter',
    price: 600,
    image: pancake,
    category: 'All',
    isBestseller: true,
  },
  {
    id: 32,
    name: 'Idli Sambar',
    description: 'Soft Steamed Idlis Served With Hot Sambar And Coconut Chutney',
    price: 130,
    image: idliSambar,
    category: 'All',
    isBestseller: false,
  },
  {
    id: 33,
    name: 'Dosa',
    description: 'Crispy Dosa Filled With Spiced Potato Filling, Served With Chutney & Sambar',
    price: 130,
    image: dosa,
    category: 'All',
    isBestseller: true,
  },
  {
    id: 34,
    name: 'Fruit Salad',
    description: 'Seasonal Fruits Mixed With Honey And A Hint Of Lemon',
    price: 199,
    image: fruitSalad,
    category: 'All',
    isBestseller: false,
  }
];
