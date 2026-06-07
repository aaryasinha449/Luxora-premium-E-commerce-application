import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Truck, ShieldCheck, RefreshCw, ChevronDown } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/luxora/ProductCard";
import { toast } from "sonner";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { type BackendProduct, mapBackendProduct } from "@/lib/productMapper";
import { productsQueryOptions } from "./shop";

const productDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async (): Promise<Product> => {
      const res = await fetch(`https://luxora-premium-e-commerce-application.onrender.com/api/products/slug/${slug}`);
      if (res.status === 404) {
        throw notFound();
      }
      if (!res.ok) {
        throw new Error(`Failed to fetch product details for slug ${slug}`);
      }
      const data: BackendProduct = await res.json();
      return mapBackendProduct(data);
    },
  });

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug.replace(/-/g, " ")} — LUXORA` }],
  }),
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(productDetailQueryOptions(params.slug)),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <h1 className="font-serif text-4xl">Piece no longer available</h1>
      <Link to="/shop" className="mt-6 inline-block link-underline eyebrow">
        Return to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const params = Route.useParams();
  const product = useSuspenseQuery(productDetailQueryOptions(params.slug)).data;
  const allProducts = useSuspenseQuery(productsQueryOptions).data;

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const add = useCart((s) => s.add);
  const { has, toggle } = useWishlist();
  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const onAdd = () => {
    add({ product, size, color, qty });
    toast.success("Added to your bag", { description: `${product.name} · ${color} · ${size}` });
  };

  return (
    <div>
      <div className="container-luxe py-6 text-xs text-muted-foreground tracking-wider">
        <Link to="/" className="hover:text-gold">
          Home
        </Link>{" "}
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-gold">
          Shop
        </Link>{" "}
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="container-luxe grid lg:grid-cols-2 gap-8 lg:gap-16 pb-20">
        {/* Gallery */}
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-[3/4] overflow-hidden ${activeImg === i ? "ring-1 ring-gold" : "opacity-60 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative aspect-[3/4] overflow-hidden bg-muted cursor-zoom-in"
            onClick={() => setZoomed(!zoomed)}
          >
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className={`h-full w-full object-cover transition-transform duration-700 ${zoomed ? "scale-150" : "scale-100"}`}
            />
          </motion.div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{product.tagline}</p>
          <h1 className="font-serif text-3xl md:text-5xl mt-3">{product.name}</h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold" : ""}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-serif">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <div className="gold-line my-8" />

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div className="mt-8">
            <p className="eyebrow mb-3">
              Colour —{" "}
              <span className="!text-foreground !tracking-normal !text-sm normal-case font-serif italic">
                {color}
              </span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-gold ring-2 ring-gold/30" : "border-border"}`}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <p className="eyebrow">Size</p>
              <button className="text-xs underline text-muted-foreground">Size guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-3 text-sm border transition ${size === s ? "border-ink bg-ink text-bone" : "border-border hover:border-ink"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex gap-3">
            <div className="flex border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 hover:bg-muted">
                −
              </button>
              <span className="px-4 py-3 min-w-12 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 hover:bg-muted">
                +
              </button>
            </div>
            <button
              onClick={onAdd}
              className="flex-1 bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors flex items-center justify-center gap-3"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Bag
            </button>
            <button
              onClick={() => toggle(product.id)}
              className="border border-border w-14 flex items-center justify-center hover:border-gold transition"
              aria-label="Wishlist"
            >
              <Heart className={`h-4 w-4 ${has(product.id) ? "fill-ink" : ""}`} />
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3 mt-10 text-xs">
            <Trust icon={Truck} label="Complimentary shipping" />
            <Trust icon={RefreshCw} label="30-day returns" />
            <Trust icon={ShieldCheck} label="Lifetime guarantee" />
          </div>

          {/* Accordions */}
          <div className="mt-10 divide-y divide-border border-y border-border">
            <Acc title="The Details">
              <ul className="space-y-2 list-disc pl-4">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Acc>
            <Acc title="Shipping & Returns">
              Complimentary express delivery on orders over $500. Free returns within 30 days. Items
              hand-checked at our Milan distribution centre.
            </Acc>
            <Acc title="Care Instructions">
              We recommend professional dry cleaning. Store in the provided dust bag. Lifetime
              restoration available at any LUXORA boutique.
            </Acc>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-luxe py-20 border-t border-border">
          <p className="eyebrow text-center">Complete the look</p>
          <h2 className="font-serif text-3xl md:text-4xl text-center mt-3 mb-12">
            You may also love
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Trust({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-2 p-4 bg-muted">
      <Icon className="h-4 w-4 text-gold" />
      <span>{label}</span>
    </div>
  );
}

function Acc({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between items-center py-5 text-sm font-medium"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}
