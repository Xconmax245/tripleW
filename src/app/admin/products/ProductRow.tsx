"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useTransition } from "react";
import { toggleProductField, deleteProductAction } from "./actions";

export default function ProductRow({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (field: "available" | "is_featured" | "is_new") => {
    startTransition(() => {
      toggleProductField(product.id, field, !product[field]);
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      startTransition(() => {
        deleteProductAction(product.id);
      });
    }
  };

  return (
    <tr className={`border-b border-border/50 hover:bg-surface/50 transition-colors ${isPending ? 'opacity-50' : ''}`}>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-surface flex-shrink-0">
            {product.images?.[0] && (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
            )}
          </div>
          <div>
            <p className="font-medium text-sm">{product.name}</p>
            <p className="text-xs text-muted">/{product.slug}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">{formatPrice(product.price)}</td>
      <td className="py-3 px-4 text-sm capitalize">{product.category}</td>
      <td className="py-3 px-4">
        <button 
          onClick={() => handleToggle("available")}
          className={`text-xs px-2 py-1 rounded-full border ${product.available ? 'bg-whatsapp/10 text-whatsapp border-whatsapp/20' : 'bg-surface text-muted border-border'}`}
        >
          {product.available ? "In Stock" : "Sold Out"}
        </button>
      </td>
      <td className="py-3 px-4">
        <input 
          type="checkbox" 
          checked={product.is_new} 
          onChange={() => handleToggle("is_new")}
          className="accent-foreground"
        />
      </td>
      <td className="py-3 px-4">
        <input 
          type="checkbox" 
          checked={product.is_featured} 
          onChange={() => handleToggle("is_featured")}
          className="accent-foreground"
        />
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-3 text-sm">
          <Link href={`/admin/products/${product.id}/edit`} className="text-muted hover:text-foreground">
            Edit
          </Link>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
