export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export function getCleanWhatsAppNumber(phone: string | null | undefined): string {
  const defaultPhone = "2348026240235";
  const rawPhone = phone || defaultPhone;
  let cleanPhone = rawPhone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
    cleanPhone = "234" + cleanPhone.substring(1);
  }
  return cleanPhone;
}

export function buildWhatsAppUrl(
  phone: string,
  productName: string,
  size?: string,
  price?: number
): string {
  const cleanPhone = getCleanWhatsAppNumber(phone);
  
  let message = `Hi, I'm interested in the ${productName}.`;
  if (size) message += ` Size: ${size}.`;
  if (price) message += ` Price: ${formatPrice(price)}.`;
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
