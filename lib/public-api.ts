import type { Competition, EventItem, GalleryItem, Product } from "@/lib/admin-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function publicFetch<T>(path: string, fallback: T, revalidate = 60): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, { next: { revalidate } });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export function getProducts(type?: "wine" | "drink" | "gaming_package" | "service"): Promise<Product[]> {
  return publicFetch<Product[]>(type ? `/products?type=${type}` : "/products", []);
}

export function getEvents(): Promise<EventItem[]> {
  return publicFetch<EventItem[]>("/events", []);
}

export function getCompetitions(): Promise<Competition[]> {
  return publicFetch<Competition[]>("/competitions", []);
}

export function getGallery(): Promise<GalleryItem[]> {
  return publicFetch<GalleryItem[]>("/gallery", []);
}
