import School from "@/src/components/School.jsx";
import { Suspense } from "react";
import { getSchoolById } from "@/src/lib/firebase/firestore.js";
import {
  getAuthenticatedAppForUser,
  getAuthenticatedAppForUser as getUser,
} from "@/src/lib/firebase/serverApp.js";
import ReviewsList, {
  ReviewsListSkeleton,
} from "@/src/components/Reviews/ReviewsList";
import {
  GeminiSummary,
  GeminiSummarySkeleton,
} from "@/src/components/Reviews/ReviewSummary";
import { getFirestore } from "firebase/firestore";

export default async function SchoolPage(props) {
  const params = await props.params;
  const { currentUser } = await getUser();
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const school = await getSchoolById(getFirestore(firebaseServerApp), params.id);

  return (
    <main className="main__restaurant">
      <School id={params.id} initialSchool={school} initialUserId={currentUser?.uid || ""}>
        <Suspense fallback={<GeminiSummarySkeleton />}>
          <GeminiSummary schoolId={params.id} />
        </Suspense>
      </School>
      <Suspense fallback={<ReviewsListSkeleton numReviews={school.numRatings} />}>
        <ReviewsList schoolId={params.id} userId={currentUser?.uid || ""} />
      </Suspense>
    </main>
  );
}


