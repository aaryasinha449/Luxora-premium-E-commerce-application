import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-bone mt-32">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display tracking-[0.4em] text-2xl">LUXORA</div>
          <p className="mt-4 text-sm text-bone/60 max-w-xs leading-relaxed">
            A modern maison dedicated to timeless craftsmanship, hand-finished in our European ateliers since 1987.
          </p>
          <div className="flex gap-3 mt-6 text-bone/60">
            <a href="#" className="hover:text-gold transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>

        <FooterColumn title="Maison" links={[
          { to: "/about", label: "Our Story" },
          { to: "/about", label: "Craftsmanship" },
          { to: "/about", label: "Sustainability" },
          { to: "/contact", label: "Press & Media" },
        ]} />

        <FooterColumn title="Client Services" links={[
          { to: "/contact", label: "Contact Concierge" },
          { to: "/faq", label: "FAQ" },
          { to: "/account/orders", label: "Orders & Shipping" },
          { to: "/faq", label: "Returns & Repairs" },
        ]} />

        <div>
          <h4 className="eyebrow mb-5">Le Journal</h4>
          <p className="text-sm text-bone/60 mb-4">Private previews, atelier stories, invitations.</p>
          <form className="flex border-b border-bone/30 pb-2 gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-bone/40"
            />
            <button className="text-gold tracking-[0.2em] text-xs uppercase">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-bone/40">
          <p>© {new Date().getFullYear()} LUXORA Maison. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/faq" className="hover:text-gold">Privacy</Link>
            <Link to="/faq" className="hover:text-gold">Terms</Link>
            <Link to="/faq" className="hover:text-gold">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="eyebrow mb-5">{title}</h4>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-bone/70 hover:text-gold transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}