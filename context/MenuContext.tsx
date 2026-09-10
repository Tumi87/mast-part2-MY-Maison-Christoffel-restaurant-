import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, Dish } from '../types';

const SEED_DISHES: Dish[] = [
  {
    id: '1',
    name: 'West Coast Oysters',
    course: 'Starter',
    description:
      'Six freshly harvested oysters served on crushed ice with local citrus vinaigrette.',
    price: 198,
    image: 'https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?w=400',
  },
  {
    id: '2',
    name: 'Beef Carpaccio',
    course: 'Starter',
    description:
      'Thinly sliced prime beef fillet with shaved parmesan, capers, and rocket, finished with truffle oil.',
    price: 165,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
  },
  {
    id: '3',
    name: 'French Onion Soup',
    course: 'Starter',
    description: 'Slow-caramelized onion broth topped with a gruyère crouton. A Christoffel classic.',
    price: 87,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
  },
  {
    id: '4',
    name: 'Smoked Trout Rillettes',
    course: 'Starter',
    description: 'House-smoked Franschhoek trout with crème fraîche, cucumber ribbons, and rye toast.',
    price: 145,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
  },
  {
    id: '5',
    name: 'Karoo Lamb Cutlets',
    course: 'Main',
    description: 'Herb-crusted grass-fed Karoo lamb with rosemary reduction, pomme purée and charred greens.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
  },
  {
    id: '6',
    name: 'Pan-Seared Kingklip',
    course: 'Main',
    description: 'Fresh West Coast kingklip on saffron cauliflower purée with a caper and lemon butter sauce.',
    price: 295,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
  },
  {
    id: '7',
    name: 'Duck Confit',
    course: 'Main',
    description: 'Slow-cooked duck leg with cherry jus, Puy lentil cassoulet, and wilted spinach.',
    price: 385,
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400',
  },
  {
    id: '8',
    name: 'Beef Fillet Wellington',
    course: 'Main',
    description: 'Grass-fed beef fillet wrapped in mushroom duxelles and golden puff pastry, served with jus.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
  },
  {
    id: '9',
    name: 'Cape Brandy Pudding',
    course: 'Dessert',
    description: 'Warm Cape brandy pudding with rich butterscotch sauce, dates, and handmade vanilla ice cream.',
    price: 125,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
  },
  {
    id: '10',
    name: 'Crème Brûlée',
    course: 'Dessert',
    description: 'Classic Madagascan vanilla crème brûlée with a caramelized sugar crust and fresh seasonal berries.',
    price: 115,
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400',
  },
  {
    id: '11',
    name: 'Chocolate Fondant',
    course: 'Dessert',
    description: 'Warm dark chocolate fondant with a molten Valrhona centre, served with salted caramel ice cream.',
    price: 145,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
  },
  {
    id: '12',
    name: 'Malva Pudding',
    course: 'Dessert',
    description: 'Traditional South African malva pudding soaked in sweet cream sauce, served with custard.',
    price: 98,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400',
  },
];

interface MenuContextValue {
  dishes: Dish[];
  addDish: (dish: Omit<Dish, 'id'>) => void;
  updateDish: (id: string, updates: Partial<Omit<Dish, 'id'>>) => void;
  deleteDish: (id: string) => void;
  getDishById: (id: string) => Dish | undefined;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [dishes, setDishes] = useState<Dish[]>(SEED_DISHES);

  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish: Dish = { ...dish, id: Date.now().toString() };
    setDishes((prev: Dish[]) => [...prev, newDish]);
  };

  const updateDish = (id: string, updates: Partial<Omit<Dish, 'id'>>) => {
    setDishes((prev: Dish[]) =>
      prev.map((d: Dish) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const deleteDish = (id: string) => {
    setDishes((prev: Dish[]) => prev.filter((d: Dish) => d.id !== id));
  };

  const getDishById = (id: string) => dishes.find((d: Dish) => d.id === id);

  return (
    <MenuContext.Provider value={{ dishes, addDish, updateDish, deleteDish, getDishById }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return ctx;
}

export function getMenuStats(dishes: Dish[], filter: Course | 'All') {
  const filtered = filter === 'All' ? dishes : dishes.filter((d) => d.course === filter);
  return {
    count: filtered.length,
    dishes: filtered,
    averagePrice:
      filtered.length > 0
        ? Math.round(filtered.reduce((sum, d) => sum + d.price, 0) / filtered.length)
        : 0,
  };
}