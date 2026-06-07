import { type Product } from "./products";
import { slugify } from "./slugify";

export interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  slug?: string;
  tagline?: string;
  compareAt?: number;
  subcategory?: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  images?: string[];
  details?: string[];
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const mapBackendProduct = (p: BackendProduct): Product => {
  const slug = p.slug || slugify(p.name);

  const rawCategory = (p.category || "women").toLowerCase();
  let category: "women" | "men" | "accessories" | "jewelry";
  if (rawCategory === "men") {
    category = "men";
  } else if (rawCategory === "women") {
    category = "women";
  } else if (rawCategory === "accessories" || rawCategory === "footwear") {
    category = "accessories";
  } else if (rawCategory === "jewelry") {
    category = "jewelry";
  } else {
    category = "women";
  }

  return {
    id: p._id,
    slug: slug,
    name: p.name,
    tagline: p.tagline || "Maison Atelier — Collection",
    price: p.price,
    compareAt: p.compareAt || undefined,
    category,
    subcategory: p.subcategory || "Ready-to-wear",
    colors: p.colors || [{ name: "Onyx", hex: "#0a0a0a" }],
    sizes: p.sizes || ["S", "M", "L"],
    images:
      Array.isArray(p.images) && p.images.length > 0
        ? p.images
        : [
            p.image ||
              "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
          ],
    description: p.description || "",
    details: p.details || ["Dry clean only", "Hand-finished in Europe"],
    rating: typeof p.rating === "number" ? p.rating : 4.8,
    reviews: typeof p.reviews === "number" ? p.reviews : 42,
    isNew: typeof p.isNew === "boolean" ? p.isNew : false,
    isBestSeller: typeof p.isBestSeller === "boolean" ? p.isBestSeller : false,
    stock: typeof p.stock === "number" ? p.stock : 0,
  };
};
