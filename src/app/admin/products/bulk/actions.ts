"use server";

import { serviceClient } from "@/lib/supabase";
import { createProduct, updateProduct } from "@/lib/products";
import { uploadProductImage } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function bulkUploadAction(formData: FormData) {
  const client = serviceClient();
  
  const gender = formData.get("gender") as string;
  const category = formData.get("category") as string;
  const imageFiles = formData.getAll("images") as File[];
  
  if (!imageFiles || imageFiles.length === 0) {
    return false;
  }

  for (const file of imageFiles) {
    if (file.size > 0) {
      const customName = formData.get("name") as string;
      const rawName = file.name.replace(/\.[^/.]+$/, "");
      const name = customName || rawName.replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "New Arrival";

      // Create product without images first to get the ID
      const product = await createProduct(client, {
        name,
        description: null,
        price: 0,
        gender,
        category,
        sizes: null,
        available: true,
        is_featured: false,
        is_new: true,
        enquire_only: true,
      });

      // Handle image upload
      const { url } = await uploadProductImage(client, file, product.id);
      await updateProduct(client, product.id, { images: [url] });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
  
  return true;
}

