export type MainTab = 'All' | 'Bestseller' | 'Beverages' | 'Health' | 'Quick Bites';
export type BeverageTab =
  | 'All'
  | 'Mocktails'
  | 'Cocktails'
  | 'Spirits'
  | 'Beer'
  | 'Wine'
  | 'Hot Beverages'
  | 'Fresh Juice';

  export type HealthTab = 'Veg'| 'Non Veg'
export type SubCategory = BeverageTab | HealthTab;

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MainTab;
  subCategory?: SubCategory;
  isBestseller?: boolean;
}
