import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { TrendingUp, DollarSign, Package, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "./shop";
import { ordersQueryOptions } from "./account.orders";
import { useAuth } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — LUXORA" }] }),
  beforeLoad: ({ location }) => {
    const auth = useAuth.getState();
    if (!auth.user || !auth.token) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    if (auth.user.role !== "admin") {
      throw redirect({ to: "/" });
    }
  },
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(productsQueryOptions),
      context.queryClient.ensureQueryData(ordersQueryOptions),
    ]);
  },
  component: Admin,
});

function Admin() {
  const products = useSuspenseQuery(productsQueryOptions).data;
  const orders = useSuspenseQuery(ordersQueryOptions).data;

  const topPieces = useMemo(() => {
    return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  }, [products]);

  const lowStockPieces = useMemo(() => {
    return products.filter((p) => p.stock < 10);
  }, [products]);

  const stats = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const revenue30d = orders
      .filter((o) => new Date(o.createdAt) >= thirtyDaysAgo)
      .reduce((acc, o) => acc + o.financials.total, 0);

    const totalRevenue = orders.reduce((acc, o) => acc + o.financials.total, 0);
    const aov = orders.length > 0 ? totalRevenue / orders.length : 0;
    const uniqueClients = new Set(orders.map((o) => o.customer.email)).size;

    return [
      { label: "Revenue (30d)", value: formatPrice(revenue30d), change: "+12.4%", up: true, icon: DollarSign },
      { label: "Orders", value: orders.length.toString(), change: "+8.2%", up: true, icon: Package },
      { label: "Clients", value: uniqueClients.toString(), change: "+4.1%", up: true, icon: Users },
      { label: "AOV", value: formatPrice(aov), change: "-2.1%", up: false, icon: TrendingUp },
    ];
  }, [orders]);

  const chartData = useMemo(() => {
    const data = Array(12).fill(0);
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      
      const monthOrders = orders.filter((o) => {
        const oDate = new Date(o.createdAt);
        return oDate.getFullYear() === year && oDate.getMonth() === month;
      });
      
      data[i] = monthOrders.reduce((acc, o) => acc + o.financials.total, 0);
    }
    const maxVal = Math.max(...data, 1);
    return data.map((val) => (val / maxVal) * 100);
  }, [orders]);

  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  return (
    <div className="bg-ink text-bone min-h-screen -mb-32">
      <div className="container-luxe py-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="eyebrow !text-gold">Admin</p>
            <h1 className="font-serif text-4xl md:text-5xl mt-3 text-bone">Maison Dashboard</h1>
          </div>
          <Link to="/" className="text-xs link-underline tracking-[0.25em] uppercase text-bone/60">Back to site</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="border border-bone/10 p-6 hover:border-gold/40 transition-colors"
            >
              <div className="flex justify-between items-start">
                <s.icon className="h-4 w-4 text-gold" />
                <span className={`text-xs flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {s.change}
                </span>
              </div>
              <p className="font-serif text-3xl mt-6">{s.value}</p>
              <p className="eyebrow !text-bone/40 mt-2 !text-[10px]">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart + sales */}
        <div className="grid lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2 border border-bone/10 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-serif text-xl">Revenue · Last 12 months</h3>
                <p className="text-xs text-bone/40 mt-1">Updated 4 minutes ago</p>
              </div>
              <MoreHorizontal className="h-4 w-4 text-bone/40" />
            </div>
            <div className="flex items-end gap-2 h-48">
              {chartData.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${v}%` }}
                  transition={{ delay: i * 0.04, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="flex-1 bg-gradient-to-t from-gold to-gold/30 hover:from-gold hover:to-gold/60 cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div className="border border-bone/10 p-8">
            <h3 className="font-serif text-xl">Top Pieces</h3>
            <div className="mt-6 space-y-4">
              {topPieces.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="font-display text-gold text-2xl w-6">{i + 1}</span>
                  <div className="w-10 h-12 bg-bone/5 overflow-hidden flex-shrink-0">
                    <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{p.name}</p>
                    <p className="text-xs text-bone/40">{p.reviews} sold</p>
                  </div>
                  <span className="text-sm text-gold">{formatPrice(p.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders & inventory */}
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="border border-bone/10 p-8">
            <h3 className="font-serif text-xl mb-6">Recent Orders</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-bone/40 uppercase tracking-wider">
                  <th className="pb-3">Order</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bone/10">
                {recentOrders.map((o) => (
                  <tr key={o._id}>
                    <td className="py-4">
                      <p className="text-bone">{o.orderNumber}</p>
                      <p className="text-xs text-bone/40">
                        {new Date(o.createdAt).toLocaleDateString("en-US", { dateStyle: "short" })}
                      </p>
                    </td>
                    <td className="py-4 text-bone/80">
                      {o.customer.firstName} {o.customer.lastName}
                    </td>
                    <td><span className={`text-xs ${o.status === "Delivered" ? "text-emerald-400" : o.status === "In Transit" ? "text-gold" : "text-bone/60"}`}>{o.status}</span></td>
                    <td className="text-right font-serif">{formatPrice(o.financials.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-bone/10 p-8">
            <h3 className="font-serif text-xl mb-6">Inventory Alerts</h3>
            <div className="space-y-3">
              {lowStockPieces.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-3 bg-bone/5 hover:bg-bone/10 transition">
                  <div className="w-10 h-12 bg-ink overflow-hidden flex-shrink-0">
                    <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{p.name}</p>
                    <p className="text-xs text-bone/40">{p.subcategory}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold text-sm">{p.stock} left</p>
                    <button className="text-[10px] text-bone/40 hover:text-bone uppercase tracking-wider">Restock</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}