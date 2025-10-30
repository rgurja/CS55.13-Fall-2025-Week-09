// This component shows school metadata, and offers actions like uploading a new image and adding a review.

import React from "react";
import renderStars from "@/src/components/Stars.jsx";

const SchoolDetails = ({
  school,
  userId,
  handleSchoolImage,
  setIsOpen,
  isOpen,
  children,
}) => {
  return (
    <section className="img__section">
      <img src={school.photo} alt={school.name} />

      <div className="actions">
        {userId && (
          <img
            alt="review"
            className="review"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            src="/review.svg"
          />
        )}
        <label
          onChange={(event) => handleSchoolImage(event.target)}
          htmlFor="upload-image"
          className="add"
        >
          <input
            name=""
            type="file"
            id="upload-image"
            className="file-input hidden w-full h-full"
          />

          <img className="add-image" src="/add.svg" alt="Add image" />
        </label>
      </div>

      <div className="details__container">
        <div className="details">
          <h2>{school.name}</h2>

          <div className="restaurant__rating">
            <ul>{renderStars(school.avgRating)}</ul>
            <span>({school.numRatings})</span>
          </div>

          <p>
            {school.city}{school.district ? ` | ${school.district}` : ""}
          </p>
          <p>{"$".repeat(school.tuitionBand || 0)}</p>
          {children}
        </div>
      </div>
    </section>
  );
};

export default SchoolDetails;


