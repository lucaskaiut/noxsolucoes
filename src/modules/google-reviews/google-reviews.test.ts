import assert from "node:assert/strict";
import { test } from "node:test";
import { parsePlaceReviews, writeReviewUrl } from "./google-reviews.ts";

const PLACE_ID = "ChIJt7DLIEn13JQRuCSvy9q8eLA";

const apiResponse = {
  rating: 5,
  userRatingCount: 1,
  googleMapsUri: "https://maps.google.com/?cid=123",
  reviews: [
    {
      rating: 5,
      text: { text: "Preço justo e muito rápido.", languageCode: "pt" },
      originalText: { text: "Preço justo e muito rápido.", languageCode: "pt" },
      relativePublishTimeDescription: "2 semanas atrás",
      publishTime: "2026-10-10T12:00:00Z",
      googleMapsUri: "https://www.google.com/maps/reviews/data=abc",
      authorAttribution: {
        displayName: "Andrielly Ayres",
        uri: "https://www.google.com/maps/contrib/1",
        photoUri: "https://lh3.googleusercontent.com/a/foto",
      },
    },
  ],
};

test("parsePlaceReviews normaliza nota, total, links e avaliações", () => {
  assert.deepEqual(parsePlaceReviews(apiResponse, PLACE_ID), {
    rating: 5,
    total: 1,
    mapsUrl: "https://maps.google.com/?cid=123",
    writeReviewUrl: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
    reviews: [
      {
        author: "Andrielly Ayres",
        authorUrl: "https://www.google.com/maps/contrib/1",
        authorPhoto: "https://lh3.googleusercontent.com/a/foto",
        rating: 5,
        text: "Preço justo e muito rápido.",
        relativeTime: "2 semanas atrás",
        publishedAt: "2026-10-10T12:00:00Z",
        reviewUrl: "https://www.google.com/maps/reviews/data=abc",
      },
    ],
  });
});

test("parsePlaceReviews retorna null sem nota ou sem avaliações", () => {
  assert.equal(parsePlaceReviews({}, PLACE_ID), null);
  assert.equal(parsePlaceReviews({ rating: 0, userRatingCount: 0 }, PLACE_ID), null);
  assert.equal(parsePlaceReviews(null, PLACE_ID), null);
  assert.equal(parsePlaceReviews({ error: { code: 403 } }, PLACE_ID), null);
});

test("parsePlaceReviews descarta avaliações incompletas e links não https", () => {
  const result = parsePlaceReviews(
    {
      rating: 4.6,
      userRatingCount: 12,
      reviews: [
        { rating: 5, authorAttribution: { displayName: "Sem texto" } },
        { rating: 4, text: { text: "Bom" }, authorAttribution: {} },
        {
          rating: 9,
          text: { text: "Ótimo atendimento" },
          authorAttribution: { displayName: "Ana", photoUri: "javascript:alert(1)" },
        },
      ],
    },
    PLACE_ID,
  );
  assert.equal(result?.reviews.length, 1);
  assert.equal(result?.reviews[0].rating, 5);
  assert.equal(result?.reviews[0].authorPhoto, undefined);
  assert.equal(result?.mapsUrl, undefined);
});

test("writeReviewUrl codifica o Place ID", () => {
  assert.equal(writeReviewUrl("a b"), "https://search.google.com/local/writereview?placeid=a%20b");
});
