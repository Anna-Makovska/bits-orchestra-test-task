
export type Wish = {
  id: number;
  title: string;
  description: string;
  price: number;
  date: string;
  image: string;
};
export type NewWish = Omit<Wish, 'id'>;
export type SortOrder = "newest" | "oldest";
export type PriceOrder = "high" | "low";
export type Filters = { dateOrder: SortOrder; priceOrder: PriceOrder };
