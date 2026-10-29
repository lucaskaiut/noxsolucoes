/**
 * Avaliações do Perfil da Empresa no Google via Places API (New).
 *
 * A API devolve no máximo 5 avaliações ("mais relevantes", escolhidas pelo
 * Google). Pelas políticas do Google Maps Platform, o conteúdo não é salvo:
 * é buscado no servidor com cache curto e exibido com autor, link e atribuição.
 */

export interface GoogleReview {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishedAt?: string;
  reviewUrl?: string;
}

export interface GoogleReviewsSummary {
  rating: number;
  total: number;
  mapsUrl?: string;
  writeReviewUrl: string;
  reviews: GoogleReview[];
}

const PLACES_URL = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount,reviews,googleMapsUri";
const REVALIDATE_SECONDS = 60 * 60 * 24;

type PlaceResponse = {
  rating?: unknown;
  userRatingCount?: unknown;
  googleMapsUri?: unknown;
  reviews?: Array<{
    rating?: unknown;
    text?: { text?: unknown };
    originalText?: { text?: unknown };
    relativePublishTimeDescription?: unknown;
    publishTime?: unknown;
    googleMapsUri?: unknown;
    authorAttribution?: { displayName?: unknown; uri?: unknown; photoUri?: unknown };
  }>;
};

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function httpsUrl(value: unknown): string | undefined {
  const url = str(value);
  return url?.startsWith("https://") ? url : undefined;
}

export function writeReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

/** Converte a resposta da API; sem nota válida, não há o que exibir. */
export function parsePlaceReviews(data: unknown, placeId: string): GoogleReviewsSummary | null {
  if (!data || typeof data !== "object") return null;
  const place = data as PlaceResponse;
  const rating = Number(place.rating);
  const total = Number(place.userRatingCount);
  if (!Number.isFinite(rating) || rating <= 0 || !Number.isFinite(total) || total <= 0) {
    return null;
  }

  const reviews: GoogleReview[] = [];
  for (const review of place.reviews ?? []) {
    const author = str(review.authorAttribution?.displayName);
    const text = str(review.text?.text) ?? str(review.originalText?.text);
    const reviewRating = Number(review.rating);
    if (!author || !text || !Number.isFinite(reviewRating)) continue;
    reviews.push({
      author,
      authorUrl: httpsUrl(review.authorAttribution?.uri),
      authorPhoto: httpsUrl(review.authorAttribution?.photoUri),
      rating: Math.min(Math.max(Math.round(reviewRating), 1), 5),
      text,
      relativeTime: str(review.relativePublishTimeDescription) ?? "",
      publishedAt: str(review.publishTime),
      reviewUrl: httpsUrl(review.googleMapsUri),
    });
  }

  return {
    rating,
    total,
    mapsUrl: httpsUrl(place.googleMapsUri),
    writeReviewUrl: writeReviewUrl(placeId),
    reviews,
  };
}

/** Busca no servidor; qualquer falha resulta em null (a seção não é exibida). */
export async function getGoogleReviews(): Promise<GoogleReviewsSummary | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `${PLACES_URL}/${encodeURIComponent(placeId)}?languageCode=pt-BR`,
      {
        headers: { "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": FIELD_MASK },
        next: { revalidate: REVALIDATE_SECONDS, tags: ["google-reviews"] },
      },
    );
    if (!response.ok) {
      console.warn(`[GoogleReviews] Places API respondeu ${response.status}`);
      return null;
    }
    return parsePlaceReviews(await response.json(), placeId);
  } catch {
    console.warn("[GoogleReviews] Places API indisponível");
    return null;
  }
}
