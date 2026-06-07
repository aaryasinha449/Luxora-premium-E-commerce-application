import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/luxora/ProductCard";
import { type Product } from "@/lib/products";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { type BackendProduct, mapBackendProduct } from "@/lib/productMapper";

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    const res = await fetch("https://luxora-premium-e-commerce-application.onrender.com/api/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products from backend API");
    }
    const data: BackendProduct[] = await res.json();
    return data.map(mapBackendProduct);
  },
});

type SearchParams = { c?: string; q?: string };

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — LUXORA" },
      {
        name: "description",
        content:
          "Discover the full LUXORA collection — ready-to-wear, accessories and fine jewelry.",
      },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    c: typeof s.c === "string" ? s.c : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: Shop,
});

const SORTS = ["Featured", "Newest", "Price: Low → High", "Price: High → Low"];
const CATS = [
  { slug: undefined, label: "All" },
  { slug: "women", label: "Women" },
  { slug: "men", label: "Men" },
  { slug: "accessories", label: "Accessories" },
  { slug: "jewelry", label: "Jewelry" },
];

function Shop() {
  const products = useSuspenseQuery(productsQueryOptions).data;
  const { c, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState("Featured");
  const [query, setQuery] = useState(q ?? "");
  const [priceMax, setPriceMax] = useState(5000);

  const filtered = useMemo(() => {
    let list = [...products];
    if (c) list = list.filter((p) => p.category === c);
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    list = list.filter((p) => p.price <= priceMax);
    if (sort === "Newest") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === "Price: Low → High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") list.sort((a, b) => b.price - a.price);
    return list;
  }, [c, query, sort, priceMax, products]);

  return (
    <div>
      <section className="bg-ink text-bone py-24 md:py-32">
        <div className="container-luxe text-center">
          <p className="eyebrow !text-gold">The Collection</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4">
            {c ? c.charAt(0).toUpperCase() + c.slice(1) : "Maison"}
          </h1>
          <p className="mt-6 text-bone/60 max-w-xl mx-auto">
            {filtered.length} pieces — every garment hand-finished in Europe.
          </p>
        </div>
      </section>

      <div className="container-luxe py-10 sticky top-20 bg-background/95 backdrop-blur z-30 border-b border-border">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex gap-1 overflow-x-auto">
            {CATS.map((cat) => (
              <button
                key={cat.label}
                onClick={() => navigate({ search: { c: cat.slug, q: query || undefined } })}
                className={`px-4 py-2 text-[11px] tracking-[0.25em] uppercase whitespace-nowrap transition-colors ${
                  (c ?? undefined) === cat.slug ? "bg-ink text-bone" : "hover:text-gold"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the maison"
                className="pl-9 pr-3 py-2 bg-muted text-sm w-48 md:w-64 outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-muted py-2 px-3 text-sm outline-none cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container-luxe py-12 grid lg:grid-cols-[220px_1fr] gap-12">
        <aside className="hidden lg:block">
          <h3 className="eyebrow flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-3 w-3" /> Refine
          </h3>
          <div className="space-y-8 text-sm">
            <div>
              <p className="font-medium mb-3">Price</p>
              <input
                type="range"
                min={200}
                max={5000}
                step={50}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[var(--gold)]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Up to ${priceMax.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="font-medium mb-3">Colour</p>
              <div className="flex flex-wrap gap-2">
                {["#0a0a0a", "#d4af37", "#f4ecd8", "#7a3f17", "#5b1a1f"].map((h) => (
                  <button
                    key={h}
                    className="h-7 w-7 rounded-full border border-border hover:scale-110 transition"
                    style={{ background: h }}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-3">Size</p>
              <div className="grid grid-cols-3 gap-1.5">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    className="border border-border py-1.5 text-xs hover:border-ink transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-serif text-3xl">No pieces match this search.</p>
              <Link to="/shop" className="mt-6 inline-block link-underline eyebrow">
                Reset filters
              </Link>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
