export type LunchTab = 'All'| 'Main Course'| 'Starters' | 'Rice' |'Bestseller' | 'Beverages' | 'Dessert';
export type BeverageTab =
  | 'All'
  | 'Mocktails'
  | 'Cocktails'
  | 'Spirits'
  | 'Beer'
  | 'Wine'
  | 'Hot Beverages'
  | 'Fresh Juice';

export type SubCategory = BeverageTab ;

export interface LunchItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: LunchTab;
  subCategory?: SubCategory;
  isBestseller?: boolean;
}
