export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'All' | 'Bestseller' | 'Beverages' | 'Health';
  isBestseller?: boolean;
}

export const menuItems: MenuItem[] = [
  // Breakfast Items
  {
    id: 1,
    name: 'Pancake',
    description: 'Fluffy Pancakes Served With Maple Syrup And Butter',
    price: 600,
    image: '/assets/pancake.svg',
    category: 'All',
    isBestseller: true
  },
  {
    id: 2,
    name: 'Idli Sambar',
    description: 'Soft Steamed Idlis Served With Hot Sambar And Coconut Chutney',
    price: 130,
    image: '/assets/idli.svg',
    category: 'All',
    isBestseller: true
  },
  {
    id: 3,
    name: 'Dosa',
    description: 'Crispy Dosa Filled With Spiced Potato Filling',
    price: 130,
    image: '/assets/dosa.svg',
    category: 'All',
    isBestseller: true
  },
  {
    id: 4,
    name: 'Masala Chai',
    description: 'Traditional Indian Spiced Tea With Milk',
    price: 40,
    image: '/assets/chai.svg',
    category: 'Beverages'
  },
  {
    id: 5,
    name: 'Cold Coffee',
    description: 'Chilled Coffee With Ice Cream',
    price: 120,
    image: '/assets/coffee.svg',
    category: 'Beverages'
  },
  {
    id: 6,
    name: 'Green Smoothie',
    description: 'Healthy Blend Of Spinach, Apple & Ginger',
    price: 180,
    image: '/assets/smoothie.svg',
    category: 'Health'
  },
];