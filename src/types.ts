export type AppStep = 'scanner' | 'loading' | 'form' | 'home' | 'menu';

export interface UserData {
  name: string;
  mobile: string;
  guests: string;
  table: string;
}

export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner';