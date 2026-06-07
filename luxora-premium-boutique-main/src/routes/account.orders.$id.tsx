import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Package, Truck, Home } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { luxeFetch } from "@/lib/api/client";

export const orderDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["order", id],
    queryFn: async (): Promise<any> => {
      const res = await luxeFetch(`https://luxora-premium-e-commerce-application.onrender.com/api/orders/${id}`);
      if (res.status === 404) {
        throw notFound();
      }
      if (!res.ok) {
        throw new Error(`Failed to fetch order details for id ${id}`);
      }
      return res.json();
    },
  });

export const Route = createFileRoute("/account/orders/$id")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.id} — LUXORA` }] }),
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(orderDetailQueryOptions(params.id)),
  component: OrderDetail,
  notFoundComponent: () => (
    <div className="py-20 text-center"><p className="font-serif text-2xl">Order not found.</p></div>
  ),
});

const STEPS = [
  { icon: Check, label: "Confirmed" },
  { icon: Package, label: "Prepared" },
  { icon: Truck, label: "Shipped" },
  { icon: Home, label: "Delivered" },
];

function OrderDetail() {
  const params = Route.useParams();
  const order = useSuspenseQuery(orderDetailQueryOptions(params.id)).data;

  const statusMap: Record<string, number> = {
    "Confirmed": 0,
    "Prepared": 1,
    "Shipped": 2,
    "Delivered": 3,
  };
  const activeIdx = statusMap[order.tracking.status] ?? 0;
  const items = order.items;

  return (
    <div>
      <Link to="/account/orders" className="eyebrow link-underline">← All orders</Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-4">Order {order.orderNumber}</h1>
      <p className="text-sm text-muted-foreground mt-2">
        {new Date(order.createdAt).toLocaleDateString("en-US", { dateStyle: "long" })} · {formatPrice(order.financials.total)}
      </p>

      {/* Tracking */}
      <div className="bg-muted p-8 mt-10">
        <p className="eyebrow !text-gold mb-6">Tracking</p>
        <div className="flex justify-between relative">
          <div className="absolute left-0 right-0 top-5 h-px bg-border" />
          <div className="absolute left-0 top-5 h-px bg-gold transition-all" style={{ width: `${(activeIdx / 3) * 100}%` }} />
          {STEPS.map((s, i) => (
            <div key={s.label} className="relative flex flex-col items-center gap-2 z-10 flex-1">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${i <= activeIdx ? "bg-gold text-ink" : "bg-background border border-border text-muted-foreground"}`}>
                <s.icon className="h-4 w-4" />
              </div>
              <p className="text-xs tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-center mt-6 text-muted-foreground italic">{order.tracking.message}</p>
      </div>

      <h2 className="eyebrow mt-12 mb-4">Items in this order</h2>
      <div className="divide-y divide-border border-y border-border">
        {items.map((p: any) => (
          <div key={`${p.product}-${p.size}-${p.color}`} className="py-5 flex gap-5 items-center">
            <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-serif text-lg">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.color} · Size {p.size} · ×{p.qty}</p>
            </div>
            <span className="font-serif">{formatPrice(p.price * p.qty)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}