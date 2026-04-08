import pancake from '../../../assets/pancake.svg';
import idli from '../../../assets/idli.svg';
import dosa from '../../../assets/dosa.svg';
import type { MenuItem } from './menuTypes';

export const coreItems: MenuItem[] = [
  {
    id: 1,
    name: 'Pancake',
    description: 'Fluffy Pancakes Served With Maple Syrup And Butter',
    price: 600,
    image: pancake,
    category: 'All',
    isBestseller: true,
  },
  {
    id: 2,
    name: 'Idli Sambar',
    description: 'Soft Steamed Idlis Served With Hot Sambar And Coconut Chutney',
    price: 130,
    image: idli,
    category: 'All',
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Dosa',
    description: 'Crispy Dosa Filled With Spiced Potato Filling',
    price: 130,
    image: dosa,
    category: 'All',
    isBestseller: true,
  },
];
