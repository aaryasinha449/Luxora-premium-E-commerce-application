import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { luxeFetch } from "@/lib/api/client";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — LUXORA" }] }),
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: Register,
});

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const loginSuccess = useAuth((s) => s.loginSuccess);
  const nav = useNavigate();
  const { redirect } = Route.useSearch();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await luxeFetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Registration failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      loginSuccess(data.user, data.token);
      toast.success("Welcome to Luxora Maison", {
        description: `Account created successfully for ${data.user.name}.`,
      });
      nav({ to: redirect || "/account" });
    },
    onError: (error: any) => {
      toast.error("Registration Failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });

  return (
    <div className="container-luxe py-16 max-w-md">
      <p className="eyebrow">Join the maison</p>
      <h1 className="font-serif text-4xl mt-3">Create your account</h1>
      <p className="text-sm text-muted-foreground mt-3">Le Cercle Privé — early access to collections, private events, complimentary alterations.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (form.name && form.email && form.password) {
            registerMutation.mutate();
          }
        }}
        className="mt-10 space-y-5"
      >
        <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="mt-4 w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-50"
        >
          {registerMutation.isPending ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          Already a client? <Link to="/login" search={{ redirect } as any} className="link-underline text-foreground">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="eyebrow !text-[10px] mb-2 block">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors" required />
    </label>
  );
}