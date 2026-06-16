const accessories = "/assets/collection-accessories-CsJsQMgu.jpg";
const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const products = [
  {
    id: "p1",
    slug: "noir-silk-evening-gown",
    name: "Noir Silk Evening Gown",
    tagline: "Maison Atelier — FW Couture",
    price: 2480,
    compareAt: 2950,
    category: "women",
    subcategory: "Dresses",
    colors: [{ name: "Onyx", hex: "#0a0a0a" }, { name: "Champagne", hex: "#d4b78b" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      img("1539109136881-3be0616acf4b"),
      img("1495121605193-b116b5b9c5fe"),
      img("1566174053879-31528523f8ae")
    ],
    description: "A fluid silk-satin gown cut on the bias, finished by hand in our Milan atelier. Sculpted bodice, sweeping floor-length train.",
    details: ["100% mulberry silk", "Hand-finished in Italy", "Dry clean only", "Style ref. LX-W-0241"],
    rating: 4.9,
    reviews: 124,
    isNew: true,
    isBestSeller: true,
    stock: 8
  },
  {
    id: "p2",
    slug: "monogram-cashmere-coat",
    name: "Monogram Cashmere Coat",
    tagline: "Atelier Heritage",
    price: 3950,
    category: "women",
    subcategory: "Outerwear",
    colors: [{ name: "Black", hex: "#0a0a0a" }, { name: "Camel", hex: "#a87b50" }],
    sizes: ["XS", "S", "M", "L"],
    images: [img("1539533018447-63fcce2678e3"), img("1591047139829-d91aecb6caea"), img("1551488831-00ddcb6c6bd3")],
    description: "Double-faced cashmere overcoat with concealed placket and signature gold-tipped horn buttons.",
    details: ["95% cashmere, 5% silk", "Tonal LX monogram lining", "Made in Italy"],
    rating: 4.8,
    reviews: 86,
    isBestSeller: true,
    stock: 12
  },
  {
    id: "p3",
    slug: "midnight-tailored-tuxedo",
    name: "Midnight Tailored Tuxedo",
    tagline: "Sartorial Collection",
    price: 4200,
    category: "men",
    subcategory: "Suits",
    colors: [{ name: "Midnight", hex: "#0c0e1a" }],
    sizes: ["46", "48", "50", "52", "54"],
    images: [img("1594938298603-c8148c4dae35"), img("1507003211169-0a1dd7228f2d"), img("1521572163474-6864f9cf17ab")],
    description: "Single-button peak-lapel tuxedo in midnight virgin wool with grosgrain silk facings.",
    details: ["100% virgin wool", "Hand-stitched lapels", "Bespoke alterations available"],
    rating: 4.9,
    reviews: 67,
    isNew: true,
    stock: 5
  },
  {
    id: "p4",
    slug: "or-noir-leather-tote",
    name: "Or Noir Leather Tote",
    tagline: "Iconic Maroquinerie",
    price: 1890,
    category: "accessories",
    subcategory: "Bags",
    colors: [{ name: "Noir", hex: "#0a0a0a" }, { name: "Bordeaux", hex: "#5b1a1f" }],
    sizes: ["One Size"],
    images: [img("1584917865442-de89df76afd3"), img("1548036328-c9fa89d128fa"), img("1590874103328-eac38a683ce7")],
    description: "Hand-grained calfskin tote with hand-painted gilt edges and our signature LX gold clasp.",
    details: ["Italian calfskin", "Suede interior", "Two interior pockets", "Dust bag included"],
    rating: 4.9,
    reviews: 248,
    isBestSeller: true,
    stock: 16
  },
  {
    id: "p5",
    slug: "constellation-gold-necklace",
    name: "Constellation Gold Necklace",
    tagline: "Haute Joaillerie",
    price: 1240,
    category: "jewelry",
    subcategory: "Necklaces",
    colors: [{ name: "18k Gold", hex: "#d4af37" }],
    sizes: ["One Size"],
    images: [img("1599643478518-a784e5dc4c8f"), img("1611591437281-460bfbe1220a"), img("1602173574767-37ac01994b2a")],
    description: "Hand-set diamonds suspended on an 18k gold chain — inspired by the night sky over Provence.",
    details: ["18k recycled yellow gold", "0.42ct VS diamonds", "Adjustable 40–45cm", "Lifetime craftsmanship guarantee"],
    rating: 5,
    reviews: 41,
    isNew: true,
    stock: 4
  },
  {
    id: "p6",
    slug: "obsidian-stiletto-heels",
    name: "Obsidian Stiletto Heels",
    tagline: "Soirée Edit",
    price: 980,
    category: "women",
    subcategory: "Shoes",
    colors: [{ name: "Obsidian", hex: "#000000" }],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    images: [img("1543163521-1bf539c55dd2"), img("1549298916-b41d501d3772"), img("1606107557195-0e29a4b5b4aa")],
    description: "Patent calfskin pumps with a sculpted 105mm stiletto and signature gold-tipped sole.",
    details: ["Patent leather", "Leather lining", "Made in Tuscany"],
    rating: 4.7,
    reviews: 92,
    stock: 14
  },
  {
    id: "p7",
    slug: "ivory-silk-blouse",
    name: "Ivory Silk Blouse",
    tagline: "Daywear Essentials",
    price: 620,
    category: "women",
    subcategory: "Tops",
    colors: [{ name: "Ivory", hex: "#f4ecd8" }, { name: "Black", hex: "#0a0a0a" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("1485518882345-15568b007407"), img("1581044777550-4cfa60707c03"), img("1564257631407-4deb1f99d992")],
    description: "Effortless silk crêpe de chine blouse with a draped neckline and mother-of-pearl buttons.",
    details: ["100% silk", "Mother-of-pearl buttons", "Made in France"],
    rating: 4.6,
    reviews: 158,
    isBestSeller: true,
    stock: 22
  },
  {
    id: "p8",
    slug: "gentleman-oxford-derby",
    name: "Gentleman Oxford Derby",
    tagline: "Sartorial Footwear",
    price: 850,
    category: "men",
    subcategory: "Shoes",
    colors: [{ name: "Onyx", hex: "#000000" }, { name: "Cognac", hex: "#7a3f17" }],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [img("1614252369475-531eba835eb1"), img("1531310197839-ccf54634509e"), img("1582897085656-c636d006a246")],
    description: "Goodyear-welted derbies in hand-burnished calf leather, finished with leather soles.",
    details: ["Goodyear welt", "Calf leather", "Made in Northampton"],
    rating: 4.8,
    reviews: 73,
    stock: 9
  }
];
const categories = [
  { slug: "women", name: "Women", count: products.filter((p) => p.category === "women").length, image: img("1539109136881-3be0616acf4b") },
  { slug: "men", name: "Men", count: products.filter((p) => p.category === "men").length, image: img("1594938298603-c8148c4dae35") },
  { slug: "accessories", name: "Accessories", count: products.filter((p) => p.category === "accessories").length, image: accessories },
  { slug: "jewelry", name: "Jewelry", count: products.filter((p) => p.category === "jewelry").length, image: img("1599643478518-a784e5dc4c8f") }
];
const testimonials = [
  { name: "Isabella Moreau", role: "Editor-in-Chief, Maison Vogue", quote: "LUXORA is redefining what modern luxury looks like — every piece feels like a museum acquisition." },
  { name: "Adrien Laurent", role: "Creative Director", quote: "The craftsmanship is exceptional. My LUXORA coat has become the cornerstone of my wardrobe." },
  { name: "Lin Wei", role: "Art Collector", quote: "Their attention to detail rivals the great Parisian houses. Truly heirloom quality." }
];
const formatPrice = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
export {
  categories as c,
  formatPrice as f,
  testimonials as t
};
