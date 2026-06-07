import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import storyImg from "@/assets/story-craft.jpg";
import { ProductCard } from "@/components/luxora/ProductCard";
import { categories, testimonials } from "@/lib/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "./shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUXORA — Modern Luxury Fashion Maison" },
      { name: "description", content: "Hand-finished couture, leather goods and fine jewelry from the LUXORA maison." },
      { property: "og:title", content: "LUXORA — Modern Luxury Fashion Maison" },
      { property: "og:description", content: "Discover the new LUXORA collection." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: Home,
});

function Home() {
  const products = useSuspenseQuery(productsQueryOptions).data;

  const bestSellers = useMemo(() => {
    const filtered = products.filter((p) => p.isBestSeller);
    if (filtered.length > 0) return filtered;
    return [...products].sort((a, b) => b.price - a.price).slice(0, 4);
  }, [products]);

  const newArrivals = useMemo(() => {
    const filtered = products.filter((p) => p.isNew);
    if (filtered.length > 0) return filtered;
    return products.slice(0, 4);
  }, [products]);

  const dynamicCategories = useMemo(() => {
    return categories.map((c) => ({
      ...c,
      count: products.filter((p) => p.category === c.slug).length,
    }));
  }, [products]);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-ink">
        <motion.img
          src={hero1}
          alt="LUXORA — Fall Couture"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/20" />
        <div className="relative container-luxe h-full flex flex-col justify-end pb-24 text-bone">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="eyebrow !text-gold"
          >
            The Fall Collection — Chapter I
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1 }}
            className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] mt-5 max-w-4xl"
          >
            Crafted in shadow,<br />finished in gold.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 bg-bone text-ink px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold transition-colors"
            >
              Discover Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-bone/40 text-bone px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-colors"
            >
              The Maison
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-bone/60 text-[10px] tracking-[0.4em] uppercase animate-pulse">
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border py-5">
        <div className="flex gap-12 whitespace-nowrap font-display tracking-[0.3em] text-2xl md:text-4xl animate-[marquee_40s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12 text-muted-foreground">
              MILAN · PARIS · NEW YORK · TOKYO · DUBAI ·
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* CATEGORIES */}
      <Section
        eyebrow="The Universe"
        title="A Maison without borders"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {dynamicCategories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <Link to="/shop" search={{ c: c.slug } as never} className="group block relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-bone">
                  <p className="eyebrow !text-gold !text-[9px]">{c.count} pieces</p>
                  <h3 className="font-serif text-2xl md:text-3xl mt-1">{c.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section eyebrow="Iconic" title="Bestowed favourites" link={{ to: "/shop", label: "View all" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* EDITORIAL SPLIT */}
      <section className="container-luxe my-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img src={storyImg} alt="Atelier craftsmanship" loading="lazy" className="h-full w-full object-cover" />
        </motion.div>
        <div>
          <p className="eyebrow">Heritage — Est. 1987</p>
          <h2 className="font-serif text-4xl md:text-6xl mt-5 leading-[1.05]">
            Four decades of <em className="text-gold not-italic">slow</em> craftsmanship.
          </h2>
          <p className="mt-7 text-muted-foreground leading-relaxed max-w-md">
            From a single Milanese atelier to a quietly global maison — every LUXORA piece is shaped by the same uncompromising hands. Eighty-six steps. Forty hours. One signature.
          </p>
          <Link to="/about" className="mt-10 inline-flex items-center gap-3 link-underline text-[11px] tracking-[0.3em] uppercase">
            Read the journal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <Section eyebrow="Just Arrived" title="New for the season">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <section className="bg-ink text-bone py-24 mt-32">
        <div className="container-luxe">
          <p className="eyebrow !text-gold text-center">Press</p>
          <h2 className="font-serif text-3xl md:text-5xl text-center mt-4 mb-16 max-w-3xl mx-auto">
            The maison in their own words.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="border-l border-bone/20 pl-6"
              >
                <p className="font-serif text-xl italic text-bone/90 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6">
                  <p className="text-sm">{t.name}</p>
                  <p className="text-xs text-bone/50 mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-luxe py-28 text-center">
        <p className="eyebrow">Le Cercle Privé</p>
        <h2 className="font-serif text-4xl md:text-6xl mt-5 max-w-2xl mx-auto leading-[1.05]">
          Invitations to private previews.
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="mt-10 max-w-md mx-auto flex border-b border-foreground/30 pb-3">
          <input type="email" placeholder="Your email address" className="flex-1 bg-transparent outline-none text-sm" />
          <button className="text-[11px] tracking-[0.3em] uppercase text-gold-deep hover:text-gold">Join</button>
        </form>
      </section>

      <img src={hero2} alt="" aria-hidden className="hidden" />
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
  link,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  link?: { to: string; label: string };
}) {
  return (
    <section className="container-luxe py-24 md:py-28">
      <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mt-3">{title}</h2>
        </div>
        {link && (
          <Link to={link.to} className="link-underline text-[11px] tracking-[0.3em] uppercase">
            {link.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
