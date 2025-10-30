"use client";

import React, { useState, useEffect } from "react";
import { getReviewsSnapshotByRestaurantId, getReviewsSnapshotBySchoolId } from "@/src/lib/firebase/firestore.js";
import { Review } from "@/src/components/Reviews/Review";

export default function ReviewsListClient({ initialReviews, restaurantId, schoolId, userId }) {
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    if (schoolId) {
      return getReviewsSnapshotBySchoolId(schoolId, (data) => setReviews(data));
    }
    return getReviewsSnapshotByRestaurantId(restaurantId, (data) => setReviews(data));
  }, [restaurantId, schoolId]);
  return (
    <article>
      <ul className="reviews">
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <Review
                key={review.id}
                rating={review.rating}
                text={review.text}
                timestamp={review.timestamp}
              />
            ))}
          </ul>
        ) : (
          <p>
            This {schoolId ? "school" : "restaurant"} has not been reviewed yet,{" "}
            {!userId ? "first login and then" : ""} add your own review!
          </p>
        )}
      </ul>
    </article>
  );
}
