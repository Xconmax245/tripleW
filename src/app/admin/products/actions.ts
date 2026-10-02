"use server";

import { updateProduct, deleteProduct } from "@/lib/products";
import { revalidatePath } from "next/cache";

export async function toggleProductField(
  id: string,
  field: "available" | "is_featured" | "is_new",
  value: boolean
) {
  const { serviceClient } = await import("@/lib/supabase");
  const client = serviceClient();
  await updateProduct(client, id, { [field]: value });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function deleteProductAction(id: string) {
  const { serviceClient } = await import("@/lib/supabase");
  const client = serviceClient();
  await deleteProduct(client, id);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}
