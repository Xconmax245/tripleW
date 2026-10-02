import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase";
import { createProduct, updateProduct } from "@/lib/products";
import { uploadProductImage } from "@/lib/storage";
import { CATEGORIES, ALL_CATEGORIES } from "@/lib/categories";
import { revalidatePath } from "next/cache";

export default async function NewProductPage() {
  async function createProductAction(formData: FormData) {
    "use server";
    
    const { serviceClient } = await import("@/lib/supabase");
    const client = serviceClient();
    
    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || null;
    const price = parseFloat(formData.get("price") as string);
    const gender = formData.get("gender") as string;
    const category = formData.get("category") as string;
    const sizesString = formData.get("sizes") as string;
    const sizes = sizesString ? sizesString.split(",").map(s => s.trim()).filter(Boolean) : null;
    
    // Create product without images first to get the ID
    const product = await createProduct(client, {
      name,
      description,
      price,
      gender,
      category,
      sizes,
      available: true,
      is_featured: formData.get("is_featured") === "on",
      is_new: formData.get("is_new") === "on",
    });

    // Handle image uploads
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];
    
    for (const file of imageFiles) {
      if (file.size > 0) {
        const { url } = await uploadProductImage(client, file, product.id);
        imageUrls.push(url);
      }
    }

    if (imageUrls.length > 0) {
      await updateProduct(client, product.id, { images: imageUrls });
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    redirect("/admin/products");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl mb-8">Add New Product</h1>
      
      <form action={createProductAction} className="space-y-6 bg-white p-8 rounded-2xl shadow-soft-sm border border-border">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input name="name" required className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea name="description" rows={3} className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (₦)</label>
            <input type="number" name="price" required min="0" step="100" className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select name="gender" required className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all">
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select name="category" required className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all">
              {ALL_CATEGORIES.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sizes (comma separated)</label>
            <input name="sizes" placeholder="e.g. S, M, L, XL" className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Images (First is cover)</label>
            <input type="file" name="images" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="w-full px-4 py-2 rounded-xl border border-border bg-surface" />
          </div>

          <div className="col-span-2 flex gap-6">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="is_featured" className="accent-foreground w-4 h-4" />
              Featured Product
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="is_new" className="accent-foreground w-4 h-4" defaultChecked />
              New Arrival
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-border">
          <a href="/admin/products" className="px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-surface transition-colors">
            Cancel
          </a>
          <button type="submit" className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}
