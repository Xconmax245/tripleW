export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export function getCleanWhatsAppNumber(phone: string | null | undefined): string {
  if (!phone) return "";
  let cleanPhone = phone.replace(/\D/g, "");
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
  
  return `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}
