import frenchFries from '../../../assets/Breakfast/Quick Bites/crispy frenchfries.svg';
import cheeseBalls from '../../../assets/Breakfast/Quick Bites/cheeseballs.svg';
import crispyCorn from '../../../assets/Breakfast/Quick Bites/crispycom.svg';
import vegSandwich from '../../../assets/Breakfast/Quick Bites/GrilledVeg.svg';
import croissant from '../../../assets/Breakfast/Quick Bites/buttercroissant.svg';
import type { BreakfastItem } from './BreakfastTypes';

export const quickBiteItems: BreakfastItem[] = [
  {
    id: 61,
    name: 'Crispy French Fries',
    description: 'Golden Fried Potato Fries With Light Seasoning',
    price: 99,
    image: frenchFries,
    category: 'Quick Bites',
    isBestseller: true,
  },
  {
    id: 62,
    name: 'Cheese Balls',
    description: 'Crispy Fried Balls Filled With Melted Cheese',
    price: 129,
    image: cheeseBalls,
    category: 'Quick Bites',
    isBestseller: false,
  },
  {
    id: 63,
    name: 'Crispy Corn',
    description: 'Crunchy Corn Tossed With Spices And Herbs',
    price: 119,
    image: crispyCorn,
    category: 'Quick Bites',
    isBestseller: false,
  },
  {
    id: 64,
    name: 'Grilled Veg Sandwich',
    description: 'Toasted Sandwich With Fresh Veggies And Sauces',
    price: 279,
    image: vegSandwich,
    category: 'Quick Bites',
    isBestseller: true,
  },
  {
    id: 65,
    name: 'Butter Croissant',
    description: 'Flaky And Buttery Baked Croissant',
    price: 99,
    image: croissant,
    category: 'Quick Bites',
    isBestseller: true,
  }
];
