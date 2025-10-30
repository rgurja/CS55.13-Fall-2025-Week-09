// This component handles the list of reviews for a given restaurant

import React from "react";
import { getReviewsByRestaurantId, getReviewsBySchoolId } from "@/src/lib/firebase/firestore.js";
import ReviewsListClient from "@/src/components/Reviews/ReviewsListClient";
import { ReviewSkeleton } from "@/src/components/Reviews/Review";
import { getFirestore } from "firebase/firestore";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp";

export default async function ReviewsList({ restaurantId, schoolId, userId }) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);
  const targetId = schoolId || restaurantId;
  const reviews = schoolId
    ? await getReviewsBySchoolId(db, targetId)
    : await getReviewsByRestaurantId(db, targetId);

  return (
    <ReviewsListClient
      initialReviews={reviews}
      restaurantId={restaurantId}
      schoolId={schoolId}
      userId={userId}
    />
  );
}

export function ReviewsListSkeleton({ numReviews }) {
  return (
    <article>
      <ul className="reviews">
        <ul>
          {Array(numReviews)
            .fill(0)
            .map((value, index) => (
              <ReviewSkeleton key={`loading-review-${index}`} />
            ))}
        </ul>
      </ul>
    </article>
  );
}
