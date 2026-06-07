import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/luxora/ProductCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "./shop";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — LUXORA" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: Wishlist,
});

function Wishlist() {
  const ids = useWishlist((s) => s.ids);
  const products = useSuspenseQuery(productsQueryOptions).data;
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-luxe py-16">
      <p className="eyebrow">Saved for later</p>
      <h1 className="font-serif text-4xl md:text-5xl mt-3">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="py-32 text-center">
          <Heart className="h-12 w-12 mx-auto text-gold" strokeWidth={1} />
          <p className="mt-6 font-serif text-3xl">Curate your wardrobe</p>
          <p className="mt-3 text-muted-foreground">Tap the heart on any piece to save it here.</p>
          <Link to="/shop" className="mt-8 inline-block link-underline eyebrow">Discover the collection</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mt-12">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}