import Link from "next/link";
import { serverClient } from "@/lib/supabase";
import { getAllProductsAdmin } from "@/lib/products";
import ProductRow from "./ProductRow";

export default async function ProductsAdminPage() {
  const client = await serverClient();
  const products = await getAllProductsAdmin(client);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl">Products</h1>
          <p className="text-muted mt-1">Manage your catalog</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/products/bulk"
            className="bg-surface text-foreground border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors"
          >
            Bulk Upload
          </Link>
          <Link 
            href="/admin/products/new"
            className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface/50 border-b border-border/50 text-xs uppercase tracking-widest text-muted">
                <th className="py-4 px-4 font-medium">Product</th>
                <th className="py-4 px-4 font-medium w-24">Price</th>
                <th className="py-4 px-4 font-medium w-24">Category</th>
                <th className="py-4 px-4 font-medium w-28">Status</th>
                <th className="py-4 px-4 font-medium w-20">New</th>
                <th className="py-4 px-4 font-medium w-20">Featured</th>
                <th className="py-4 px-4 font-medium w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted">
                    No products found. Add your first product to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
