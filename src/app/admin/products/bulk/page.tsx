import React from "react";
import { ALL_CATEGORIES } from "@/lib/categories";
import Link from "next/link";
import BulkUploadClient from "./BulkUploadClient";
import { bulkUploadAction } from "./actions";

export default async function BulkUploadPage() {

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/products"
          className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted hover:text-foreground transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div>
          <h1 className="font-display text-3xl">Bulk Upload</h1>
          <p className="text-muted mt-1">Upload multiple photos to create multiple Enquire-Only products</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft-sm border border-border p-6 sm:p-8">
        <BulkUploadClient action={bulkUploadAction} categories={ALL_CATEGORIES} />
      </div>
    </div>
  );
}
