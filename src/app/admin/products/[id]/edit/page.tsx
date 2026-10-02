import { redirect, notFound } from "next/navigation";
import { serverClient } from "@/lib/supabase";
import { getProductBySlug, updateProduct, getAllProductsAdmin } from "@/lib/products";
import { uploadProductImage } from "@/lib/storage";
import { CATEGORIES, ALL_CATEGORIES } from "@/lib/categories";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "@/components/SubmitButton";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await serverClient();
  
  // getProductBySlug fetches by slug, but here we only have the ID from the URL (or wait, the URL might have the ID, not slug? The route is [id])
  // Let's use getAllProductsAdmin to find it by ID since there is no getProductById
  const products = await getAllProductsAdmin(client);
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  async function updateProductAction(formData: FormData) {
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
    
    // Handle new image uploads if any
    const imageFiles = formData.getAll("images") as File[];
    const newImageUrls: string[] = [];
    
    for (const file of imageFiles) {
      if (file.size > 0) {
        const { url } = await uploadProductImage(client, file, id);
        newImageUrls.push(url);
      }
    }

    const finalImages = [...(product?.images || []), ...newImageUrls];

    await updateProduct(client, id, {
      name,
      description,
      price,
      gender,
      category,
      sizes,
      available: formData.get("available") === "on",
      is_featured: formData.get("is_featured") === "on",
      is_new: formData.get("is_new") === "on",
      ...(newImageUrls.length > 0 ? { images: finalImages } : {})
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    redirect("/admin/products");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl mb-8">Edit Product</h1>
      
      <form action={updateProductAction} className="space-y-6 bg-white p-8 rounded-2xl shadow-soft-sm border border-border">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input name="name" defaultValue={product.name} required className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea name="description" defaultValue={product.description || ""} rows={3} className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (₦)</label>
            <input type="number" name="price" defaultValue={product.price} required min="0" step="100" className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select name="gender" defaultValue={product.gender} required className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all">
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select name="category" defaultValue={product.category} required className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all">
              {ALL_CATEGORIES.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Sizes (Optional, comma separated)</label>
            <p className="text-xs text-muted mb-2">Leave blank if the product has no size variations. You can enter clothing sizes (S, M, L), shoe sizes (38, 39, 40), etc.</p>
            <input name="sizes" defaultValue={product.sizes?.join(", ")} placeholder="e.g. S, M, L, XL or 38, 39, 40" className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Add New Images</label>
            <input type="file" name="images" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="w-full px-4 py-2 rounded-xl border border-border bg-surface" />
            {product.images && product.images.length > 0 && (
              <p className="text-xs text-muted mt-2">Currently has {product.images.length} image(s).</p>
            )}
          </div>

          <div className="col-span-2 flex gap-6">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="available" className="accent-foreground w-4 h-4" defaultChecked={product.available} />
              In Stock
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="is_featured" className="accent-foreground w-4 h-4" defaultChecked={product.is_featured} />
              Featured Product
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="is_new" className="accent-foreground w-4 h-4" defaultChecked={product.is_new} />
              New Arrival
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-border">
          <a href="/admin/products" className="px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-surface transition-colors">
            Cancel
          </a>
          <SubmitButton 
            defaultText="Save Changes" 
            pendingText="Saving..." 
            className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors" 
          />
        </div>
      </form>
    </div>
  );
}
