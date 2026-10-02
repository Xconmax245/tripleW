import Link from "next/link";
import { serverClient } from "@/lib/supabase";
import { getAllProductsAdmin } from "@/lib/products";

export default async function AdminDashboard() {
  const client = await serverClient();
  const products = await getAllProductsAdmin(client);
  
  const activeProducts = products.filter(p => p.available).length;
  const newProducts = products.filter(p => p.is_new).length;
  const soldOutProducts = products.filter(p => !p.available).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="text-muted mt-1">Overview of your store</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-soft-sm border border-border">
          <p className="text-sm text-muted mb-2">Total Products</p>
          <p className="text-3xl font-display">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-soft-sm border border-border">
          <p className="text-sm text-muted mb-2">Active</p>
          <p className="text-3xl font-display text-whatsapp">{activeProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-soft-sm border border-border">
          <p className="text-sm text-muted mb-2">New Arrivals</p>
          <p className="text-3xl font-display">{newProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-soft-sm border border-border">
          <p className="text-sm text-muted mb-2">Sold Out</p>
          <p className="text-3xl font-display text-red-500">{soldOutProducts}</p>
        </div>
      </div>

      <h2 className="font-display text-2xl mb-4">Quick Links</h2>
      <div className="flex gap-4">
        <Link 
          href="/admin/products"
          className="flex items-center justify-between w-64 bg-white p-4 rounded-xl shadow-soft-sm border border-border hover:shadow-soft-md transition-all group"
        >
          <span className="font-medium">Manage Products</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link 
          href="/admin/settings"
          className="flex items-center justify-between w-64 bg-white p-4 rounded-xl shadow-soft-sm border border-border hover:shadow-soft-md transition-all group"
        >
          <span className="font-medium">Store Settings</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
