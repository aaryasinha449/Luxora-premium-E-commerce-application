import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Bag — LUXORA" }] }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const total = subtotal();
  const shipping = total > 500 || total === 0 ? 0 : 25;

  if (items.length === 0) {
    return (
      <div className="container-luxe py-32 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto text-gold" strokeWidth={1} />
        <h1 className="font-serif text-5xl mt-8">Your bag awaits</h1>
        <p className="mt-4 text-muted-foreground">Discover hand-finished pieces from the new collection.</p>
        <Link to="/shop" className="mt-10 inline-block bg-ink text-bone px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors">
          Begin shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-luxe py-16">
      <p className="eyebrow">Bag — {items.length} {items.length === 1 ? "piece" : "pieces"}</p>
      <h1 className="font-serif text-4xl md:text-5xl mt-3">Your Selection</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12 mt-12">
        <div className="divide-y divide-border border-y border-border">
          {items.map((it) => (
            <div key={`${it.product.id}-${it.size}-${it.color}`} className="py-8 flex gap-6">
              <Link to="/product/$slug" params={{ slug: it.product.slug }} className="w-28 md:w-40 aspect-[3/4] bg-muted overflow-hidden flex-shrink-0">
                <img src={it.product.images[0]} alt={it.product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="eyebrow !text-muted-foreground !text-[10px]">{it.product.tagline}</p>
                    <h3 className="font-serif text-xl mt-1">{it.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{it.color} · Size {it.size}</p>
                  </div>
                  <button onClick={() => remove(it.product.id, it.size, it.color)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex justify-between items-end mt-auto pt-4">
                  <div className="flex border border-border">
                    <button onClick={() => setQty(it.product.id, it.size, it.color, it.qty - 1)} className="px-3 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                    <span className="px-4 py-2 text-sm min-w-10 text-center">{it.qty}</span>
                    <button onClick={() => setQty(it.product.id, it.size, it.color, it.qty + 1)} className="px-3 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                  </div>
                  <span className="font-serif text-lg">{formatPrice(it.product.price * it.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-muted p-8 self-start sticky top-28">
          <h3 className="eyebrow mb-6">Order Summary</h3>
          <Row label="Subtotal" value={formatPrice(total)} />
          <Row label="Shipping" value={shipping === 0 ? "Complimentary" : formatPrice(shipping)} />
          <Row label="Estimated tax" value="At checkout" />
          <div className="gold-line my-6" />
          <Row label="Total" value={formatPrice(total + shipping)} large />
          <Link to="/checkout" className="mt-8 block text-center bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors">
            Proceed to Checkout
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-[11px] tracking-[0.3em] uppercase link-underline">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className={`flex justify-between mb-3 ${large ? "text-xl font-serif" : "text-sm"}`}>
      <span className={large ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}