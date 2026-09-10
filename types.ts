export type Course = 'Starter' | 'Main' | 'Dessert';

export const COURSES: Course[] = ['Starter', 'Main', 'Dessert'];

export interface Dish {
  id: string;
  name: string;
  course: Course;
  description: string; // preparation notes
  price: number;
  image?: string; // remote uri
}