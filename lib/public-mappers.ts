import { formatNaira, type EventItem, type GalleryItem, type Product } from "@/lib/admin-types";

export function toWineCardProps(product: Product) {
  const availability =
    product.status === "reserve_only"
      ? "Reserve Only"
      : product.is_stocked && product.stock_quantity !== null && product.stock_quantity <= product.low_stock_threshold
        ? "Limited Stock"
        : "Available";

  return {
    id: product.id,
    name: product.name,
    category: product.category ?? "Wine",
    description: product.description ?? "",
    size: product.size ?? "750ml",
    availability,
    price: formatNaira(product.price),
    rawPrice: product.price,
    imageUrl: product.image_url ?? undefined,
    isPurchasable: product.status === "active",
    stockQuantity: product.is_stocked ? product.stock_quantity : null,
  };
}

export function formatPackagePrice(product: Product): string {
  return `From ${formatNaira(product.price)}`;
}

const EVENT_ICONS = ["music", "controller", "wine", "cake", "trophy"] as const;
type EventIcon = (typeof EVENT_ICONS)[number];

export function toEventCardProps(event: EventItem) {
  const icon = (EVENT_ICONS as readonly string[]).includes(event.icon ?? "") ? (event.icon as EventIcon) : "trophy";

  return {
    title: event.title,
    date: event.date,
    frequency: event.frequency,
    description: event.description ?? "",
    icon,
    imageUrl: event.image_url ?? "/logo-crop.jpeg",
    imagePosition: event.image_position ?? undefined,
  };
}

export function toGalleryItemProps(item: GalleryItem) {
  return {
    title: item.title,
    category: item.category,
    type: item.type,
    src: item.src,
    poster: item.poster ?? undefined,
  };
}
