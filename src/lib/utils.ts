export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export function buildWhatsAppUrl(
  phone: string,
  productName: string,
  size?: string,
  price?: number
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  let message = `Hi, I'm interested in the ${productName}.`;
  if (size) message += ` Size: ${size}.`;
  if (price) message += ` Price: ${formatPrice(price)}.`;
  
  return `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}
