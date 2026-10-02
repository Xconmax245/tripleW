import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase";
import { getSettings, updateSettings } from "@/lib/settings";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const client = await serverClient();
  const settings = await getSettings(client);

  async function updateSettingsAction(formData: FormData) {
    "use server";
    
    const { serviceClient } = await import("@/lib/supabase");
    const client = serviceClient();
    
    const boutique_name = formData.get("boutique_name") as string;
    const whatsapp_number = formData.get("whatsapp_number") as string;
    const instagram_url = (formData.get("instagram_url") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const email = (formData.get("email") as string) || null;
    const address = (formData.get("address") as string) || null;

    try {
      await updateSettings(client, {
        boutique_name,
        whatsapp_number,
        instagram_url,
        phone,
        email,
        address,
      });
    } catch (e: any) {
      // Basic error handling for whatsapp validation
      console.error(e);
      redirect("/admin/settings?error=" + encodeURIComponent(e.message));
    }

    revalidatePath("/", "layout");
    redirect("/admin/settings?success=1");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl mb-8">Store Settings</h1>
      
      <form action={updateSettingsAction} className="space-y-6 bg-white p-8 rounded-2xl shadow-soft-sm border border-border">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Boutique Name</label>
            <input name="boutique_name" defaultValue={settings?.boutique_name || "Triple W Boutique"} required className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
            <p className="text-xs text-muted mb-2">Digits only, including country code (e.g. 2348000000000)</p>
            <input name="whatsapp_number" defaultValue={settings?.whatsapp_number || ""} required pattern="^\d+$" className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Instagram URL</label>
            <input type="url" name="instagram_url" defaultValue={settings?.instagram_url || ""} className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Phone</label>
            <input type="tel" name="phone" defaultValue={settings?.phone || ""} className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Email</label>
            <input type="email" name="email" defaultValue={settings?.email || ""} className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Physical Address</label>
            <textarea name="address" defaultValue={settings?.address || ""} rows={2} className="w-full px-4 py-2 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-foreground transition-all" />
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-border">
          <button type="submit" className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
