import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import hero from "@/assets/hero-2.jpg";
import story from "@/assets/story-craft.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "The Maison — LUXORA" }] }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative h-[80vh] min-h-[520px] bg-ink overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-luxe relative h-full flex flex-col justify-end pb-20 text-bone">
          <p className="eyebrow !text-gold">Maison · Est. 1987</p>
          <h1 className="font-display text-5xl md:text-8xl mt-5 max-w-3xl leading-[0.95]">A quiet kind of luxury.</h1>
        </div>
      </section>

      <section className="container-luxe py-28 max-w-4xl">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-3xl md:text-5xl leading-[1.2] italic">
          “Luxury is in each detail — and the absence of every superfluous one.”
        </motion.p>
        <p className="eyebrow mt-8">— Elena Costanza, Founder</p>
      </section>

      <section className="container-luxe py-20 grid lg:grid-cols-2 gap-16 items-center">
        <img src={story} alt="" className="aspect-[4/5] object-cover" loading="lazy" />
        <div>
          <p className="eyebrow">The Atelier</p>
          <h2 className="font-serif text-4xl md:text-5xl mt-3">Eighty-six hands. One signature.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            From the first sketch to the final gilded edge, each LUXORA piece travels through the hands of eighty-six artisans across our Milan, Paris and Florence ateliers. We measure time in hours of craft, not weeks of production.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our leathers are vegetable-tanned over forty days. Our silks are loomed at a single mill in Como. Our gold hardware is cast and hand-polished in the Marais — a process unchanged in three generations.
          </p>
        </div>
      </section>

      <section className="bg-ink text-bone py-24">
        <div className="container-luxe grid md:grid-cols-3 gap-12 text-center">
          {[
            { n: "39", l: "Years of craft" },
            { n: "86", l: "Artisan hands per piece" },
            { n: "12", l: "Boutiques worldwide" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-7xl md:text-8xl text-gold">{s.n}</p>
              <p className="eyebrow !text-bone/60 mt-4">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-28 text-center max-w-2xl">
        <p className="eyebrow">Sustainability</p>
        <h2 className="font-serif text-4xl md:text-5xl mt-4">Slow by design.</h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Every LUXORA garment carries a lifetime craftsmanship guarantee — because beauty that lasts is the only beauty worth making.
        </p>
        <Link to="/shop" className="mt-10 inline-block bg-ink text-bone px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors">
          Discover the Collection
        </Link>
      </section>
    </div>
  );
}