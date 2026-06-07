import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { luxeFetch } from "@/lib/api/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — LUXORA" }] }),
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginSuccess = useAuth((s) => s.loginSuccess);
  const nav = useNavigate();
  const { redirect } = Route.useSearch();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Invalid credentials");
      }
      return res.json();
    },
    onSuccess: (data) => {
      loginSuccess(data.user, data.token);
      toast.success("Welcome back", {
        description: `Successfully signed in as ${data.user.name}.`,
      });
      nav({ to: redirect || "/account" });
    },
    onError: (error: any) => {
      toast.error("Sign In Failed", {
        description: error.message || "Something went wrong. Please check your credentials.",
      });
    },
  });

  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="hidden lg:block bg-ink relative">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80" alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80" />
        <div className="absolute bottom-12 left-12 text-bone">
          <p className="eyebrow !text-gold">Welcome back</p>
          <p className="font-display text-4xl mt-3 max-w-sm">A private door to the maison.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 md:p-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email && password) {
              loginMutation.mutate();
            }
          }}
          className="w-full max-w-sm"
        >
          <p className="eyebrow">Account</p>
          <h1 className="font-serif text-4xl mt-3">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-3">Access your wardrobe, orders and saved pieces.</p>

          <div className="space-y-5 mt-10">
            <Input label="Email" type="email" value={email} onChange={setEmail} />
            <Input label="Password" type="password" value={password} onChange={setPassword} />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-8 w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-50"
          >
            {loginMutation.isPending ? "Signing In..." : "Continue"}
          </button>

          <div className="flex justify-between mt-6 text-xs text-muted-foreground">
            <button type="button" className="link-underline">Forgot password?</button>
            <Link to="/register" search={{ redirect } as any} className="link-underline">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="eyebrow !text-[10px] mb-2 block">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors" required />
    </label>
  );
}