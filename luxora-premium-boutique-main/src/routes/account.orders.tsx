import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { formatPrice } from "@/lib/products";
import { ChevronRight } from "lucide-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { luxeFetch } from "@/lib/api/client";

export const ordersQueryOptions = queryOptions({
  queryKey: ["orders"],
  queryFn: async (): Promise<any[]> => {
    const res = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/orders");
    if (!res.ok) {
      throw new Error("Failed to fetch orders from backend");
    }
    return res.json();
  },
});

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "Orders — LUXORA" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ordersQueryOptions),
  component: Orders,
});

function Orders() {
  const orders = useSuspenseQuery(ordersQueryOptions).data;
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  // When a child route is active (e.g. /account/orders/$id), render it instead
  // of the list. This is the same pattern used by account.tsx line 63.
  if (pathname !== "/account/orders") {
    return <Outlet />;
  }

  return (
    <div>
      <p className="eyebrow">Order History</p>
      <h1 className="font-serif text-4xl md:text-5xl mt-3">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl">No orders found.</p>
          <Link to="/shop" className="mt-6 inline-block link-underline eyebrow">Begin shopping</Link>
        </div>
      ) : (
        <div className="mt-10 border-y border-border divide-y divide-border">
          {orders.map((o) => {
            const itemsCount = o.items.reduce((acc: number, item: any) => acc + item.qty, 0);
            return (
              <Link
                key={o._id}
                to="/account/orders/$id"
                params={{ id: o._id }}
                className="flex items-center justify-between py-6 hover:bg-muted/40 transition px-2 -mx-2"
              >
                <div>
                  <p className="font-serif text-lg">{o.orderNumber}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(o.createdAt).toLocaleDateString("en-US", { dateStyle: "long" })} · {itemsCount} item{itemsCount > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <span className={`text-xs tracking-[0.25em] uppercase ${o.status === "Delivered" ? "text-gold-deep" : o.status === "In Transit" ? "text-gold" : "text-muted-foreground"}`}>
                    {o.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-serif">{formatPrice(o.financials.total)}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}