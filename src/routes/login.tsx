import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api } from "@/data/api";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in | Drawvax Infotech" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UserLoginPage,
});

function UserLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "sign-up") {
        const result = await api.signUp(email, password);
        toast.success(result.needsConfirmation ? "Check your email to confirm your account." : "Account created.");
        if (!result.needsConfirmation) await navigate({ to: "/" });
      } else {
        await api.signIn(email, password);
        const isAdmin = await api.checkAdmin();
        toast.success(isAdmin ? "Signed in to the admin dashboard." : "Signed in.");
        await navigate({ to: isAdmin ? "/admin" : "/" });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-4 pt-28 pb-16 sm:px-6">
      <motion.form
        onSubmit={(event) => void submit(event)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="glass w-full max-w-md rounded-2xl p-5 sm:p-8"
      >
        <h1 className="font-display text-2xl font-bold">{mode === "sign-in" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Administrator accounts open the dashboard after sign in.</p>
        <div className="mt-6 space-y-3">
          <label className="block text-sm">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="mt-1.5 w-full rounded-lg bg-input/60 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              minLength={8}
              required
              className="mt-1.5 w-full rounded-lg bg-input/60 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="gradient-accent w-full rounded-lg py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {submitting ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
          className="mt-4 min-h-11 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {mode === "sign-in" ? "Create a user account" : "Already have an account? Sign in"}
        </button>
        <div className="mt-5 border-t border-border pt-4 text-sm">
          <Link to="/admin/login" className="text-primary hover:underline">
            Administrator sign in
          </Link>
        </div>
      </motion.form>
    </div>
  );
}