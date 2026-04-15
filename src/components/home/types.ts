export type HomeSearchItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  foodType?: "Veg" | "Non Veg";
  source: "Breakfast" | "Lunch";
  category?: string;
  subCategory?: string;
};

export type HomeOffer = {
  title: string;
  desc: string;
  img: string;
  gradient: string;
};
