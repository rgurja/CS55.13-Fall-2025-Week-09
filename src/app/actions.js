"use server";

import { addReviewToRestaurant, addReviewToSchool } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp.js";
import { getFirestore } from "firebase/firestore";


// This is a next.js server action, which is an alpha feature, so
// use with caution.
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
export async function handleReviewFormSubmission(data) {
        const { app } = await getAuthenticatedAppForUser();
        const db = getFirestore(app);

        const schoolId = data.get("schoolId");
        const restaurantId = data.get("restaurantId");
        const review = {
          text: data.get("text"),
          rating: data.get("rating"),
          userId: data.get("userId"),
        };

        if (schoolId) {
          await addReviewToSchool(db, schoolId, review);
        } else {
          await addReviewToRestaurant(db, restaurantId, review);
        }
}