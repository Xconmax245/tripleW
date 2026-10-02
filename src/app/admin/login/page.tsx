import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function signIn(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const client = await serverClient();
    
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      redirect("/admin/login?error=invalid_credentials");
    }

    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-soft-xl border border-border">
        <h1 className="font-display text-3xl mb-2 text-center">Admin Login</h1>
        <p className="text-sm text-muted mb-8 text-center font-body">
          Sign in to manage Triple W Boutique
        </p>

        {error === "server-misconfigured" && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            Missing Supabase configuration. Please check your .env.local file.
          </div>
        )}
        {error === "invalid_credentials" && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            Invalid email or password.
          </div>
        )}

        <form action={signIn} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-foreground transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-foreground transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-foreground text-background py-3 rounded-xl font-medium hover:bg-foreground/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
