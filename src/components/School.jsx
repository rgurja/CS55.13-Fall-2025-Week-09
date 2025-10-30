"use client";

import { React, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@/src/lib/getUser";
import SchoolDetails from "@/src/components/SchoolDetails.jsx";
import { updateSchoolImage } from "@/src/lib/firebase/storage.js";

export default function School({ id, initialSchool, initialUserId, children }) {
  const [schoolDetails, setSchoolDetails] = useState(initialSchool);
  const [isOpen, setIsOpen] = useState(false);

  const userId = useUser()?.uid || initialUserId;
  const [review, setReview] = useState({ rating: 0, text: "" });

  const onChange = (value, name) => {
    setReview({ ...review, [name]: value });
  };

  async function handleSchoolImage(target) {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }
    const imageURL = await updateSchoolImage(id, image);
    setSchoolDetails({ ...schoolDetails, photo: imageURL });
  }

  const handleClose = () => {
    setIsOpen(false);
    setReview({ rating: 0, text: "" });
  };

  // Note: getSchoolSnapshotById is not implemented server-side in this starter. Keep initial data.
  useEffect(() => {
    setSchoolDetails(initialSchool);
  }, [id, initialSchool]);

  const ReviewDialog = dynamic(() => import("@/src/components/ReviewDialog.jsx"));

  return (
    <>
      <SchoolDetails
        school={schoolDetails}
        userId={userId}
        handleSchoolImage={handleSchoolImage}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        {children}
      </SchoolDetails>
      {userId && (
        <Suspense fallback={<p>Loading...</p>}>
          <ReviewDialog
            isOpen={isOpen}
            handleClose={handleClose}
            review={review}
            onChange={onChange}
            userId={userId}
            id={id}
            isSchool
          />
        </Suspense>
      )}
    </>
  );
}


