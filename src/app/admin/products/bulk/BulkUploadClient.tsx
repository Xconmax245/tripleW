"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BulkUploadClientProps {
  action: (formData: FormData) => Promise<boolean>;
  categories: readonly string[];
}

export default function BulkUploadClient({ action, categories }: BulkUploadClientProps) {
  const [isPending, setIsPending] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [customNames, setCustomNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
      
      // Clean up old previews
      previews.forEach(p => URL.revokeObjectURL(p));
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);

      const defaultNames = filesArray.map(file => 
        file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase())
      );
      setCustomNames(defaultNames);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;
    
    setIsPending(true);
    
    const baseFormData = new FormData(e.currentTarget);
    const gender = baseFormData.get("gender") as string;
    const category = baseFormData.get("category") as string;

    try {
      // Send each file individually to bypass Next.js dropping cookies on huge payloads
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const batchFormData = new FormData();
        batchFormData.append("gender", gender);
        batchFormData.append("category", category);
        batchFormData.append("images", file);
        batchFormData.append("name", customNames[i]);
        
        await action(batchFormData);
      }
      
      // Success! Redirect.
      window.location.href = "/admin/products";
    } catch (error) {
      console.error(error);
      alert("Failed to upload some products. Please check the dashboard and try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
          <select 
            name="gender" 
            id="gender" 
            required
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <select 
            name="category" 
            id="category" 
            required
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Images</label>
        <div className="relative border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-surface/50 transition-colors">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            required
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Click or drag multiple photos</span>
            <span className="text-xs text-muted">JPEG, PNG, WebP up to 5MB each</span>
          </div>
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {previews.map((preview, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border">
                  <Image src={preview} alt={`Preview ${i}`} fill className="object-cover" />
                </div>
                <input
                  type="text"
                  value={customNames[i] || ""}
                  onChange={(e) => {
                    const newNames = [...customNames];
                    newNames[i] = e.target.value;
                    setCustomNames(newNames);
                  }}
                  placeholder="Product Name"
                  className="w-full text-xs px-3 py-2 bg-surface border border-border rounded focus:outline-none focus:ring-1 focus:ring-foreground/30"
                  required
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-border">
        <button
          type="submit"
          disabled={isPending || selectedFiles.length === 0}
          className="w-full bg-foreground text-background py-3.5 rounded-xl text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Uploading {selectedFiles.length} Product{selectedFiles.length !== 1 ? 's' : ''}...
            </>
          ) : (
            `Create ${selectedFiles.length} Product${selectedFiles.length !== 1 ? 's' : ''}`
          )}
        </button>
      </div>
    </form>
  );
}
