import Link from "next/link";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  
  if (pathname.startsWith("/admin/login")) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="border-b border-border bg-surface px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-6xl mx-auto">
          <Link href="/admin" className="font-display text-xl tracking-tight">
            Triple W Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            <Link href="/admin/products" className="hover:text-muted transition-colors">
              Products
            </Link>
            <Link href="/admin/settings" className="hover:text-muted transition-colors">
              Settings
            </Link>
            <form action="/admin/login" method="POST">
              <button type="submit" formAction="/admin/login" className="text-muted hover:text-foreground">
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="p-6 sm:p-10 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
