import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useWishlist } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { has, toggle } = useWishlist();
  const liked = has(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.05, ease: [0.19, 1, 0.22, 1] }}
      className="group"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && <span className="bg-ink text-bone text-[10px] tracking-[0.25em] px-3 py-1.5 uppercase">New</span>}
            {product.compareAt && <span className="bg-gold text-ink text-[10px] tracking-[0.25em] px-3 py-1.5 uppercase">Edit</span>}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label="Add to wishlist"
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-gold transition-colors"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-ink text-ink" : ""}`} />
          </button>
          <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-background text-foreground text-center py-3 text-[11px] tracking-[0.3em] uppercase">
              Quick View
            </div>
          </div>
        </div>
        <div className="pt-5 text-center">
          <p className="eyebrow !text-muted-foreground !text-[10px]">{product.tagline}</p>
          <h3 className="font-serif text-lg mt-2">{product.name}</h3>
          <div className="mt-1 flex items-center justify-center gap-2 text-sm">
            <span>{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-muted-foreground line-through text-xs">{formatPrice(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}