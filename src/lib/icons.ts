import type { ComponentType } from "svelte";
import { ChefHat, Soup, Salad, Cake, Dessert, CookingPot, Sandwich, CakeSlice, EggFried, Coffee } from "lucide-svelte";

export const icons: Record<string, ComponentType> = {
  "chef-hat": ChefHat,
  "soup": Soup,
  "salad": Salad,
  "cake": Cake,
  "dessert": Dessert,
  "cooking-pot": CookingPot,
  "sandwich": Sandwich,
  "cake-slice": CakeSlice,
  "egg-fried": EggFried,
  "coffee": Coffee
};

export function getIcon(name?: string): ComponentType | null {
  return name ? icons[name] ?? null : null;
}
