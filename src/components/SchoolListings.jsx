"use client";

import Link from "next/link";
import { React, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import renderStars from "@/src/components/Stars.jsx";
import { getSchoolsSnapshot } from "@/src/lib/firebase/firestore.js";
import SchoolFilters from "@/src/components/Filters.jsx";

const SchoolItem = ({ school }) => (
  <li key={school.id}>
    <Link href={`/school/${school.id}`}>
      <ActiveSchool school={school} />
    </Link>
  </li>
);

const ActiveSchool = ({ school }) => (
  <div>
    <ImageCover photo={school.photo} name={school.name} />
    <SchoolCard school={school} />
  </div>
);

const ImageCover = ({ photo, name }) => (
  <div className="image-cover">
    <img src={photo} alt={name} />
  </div>
);

const SchoolCard = ({ school }) => (
  <div className="restaurant__details">
    <h2>{school.name}</h2>
    <SchoolRating school={school} />
    <SchoolMetadata school={school} />
  </div>
);

const SchoolRating = ({ school }) => (
  <div className="restaurant__rating">
    <ul>{renderStars(school.avgRating)}</ul>
    <span>({school.numRatings})</span>
  </div>
);

const SchoolMetadata = ({ school }) => (
  <div className="restaurant__meta">
    <p>
      {school.city}
      {school.district ? ` | ${school.district}` : ""}
    </p>
    <p>{"$".repeat(school.tuitionBand || 0)}</p>
  </div>
);

export default function SchoolListings({ initialSchools, searchParams }) {
  const router = useRouter();

  const initialFilters = {
    city: searchParams.city || "",
    district: searchParams.district || "",
    isPublic: searchParams.isPublic === undefined ? "" : searchParams.isPublic,
    grades: searchParams.grades ? searchParams.grades.split(",") : [],
    tuitionBand: searchParams.tuitionBand || "",
    sort: searchParams.sort || "",
  };

  const [schools, setSchools] = useState(initialSchools);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    routerWithFilters(router, filters);
  }, [router, filters]);

  useEffect(() => {
    return getSchoolsSnapshot((data) => {
      setSchools(data);
    }, normalizeFiltersForQuery(filters));
  }, [filters]);

  return (
    <article>
      <SchoolFilters filters={filters} setFilters={setFilters} />
      <ul className="restaurants">
        {schools.map((school) => (
          <SchoolItem key={school.id} school={school} />
        ))}
      </ul>
    </article>
  );
}

function routerWithFilters(router, filters) {
  const queryParams = new URLSearchParams();

  const serializable = {
    ...filters,
    grades: Array.isArray(filters.grades) ? filters.grades.join(",") : filters.grades,
  };

  for (const [key, value] of Object.entries(serializable)) {
    if (value === undefined || value === "" || value === null) continue;
    queryParams.append(key, value);
  }

  const queryString = queryParams.toString();
  router.push(`?${queryString}`);
}

function normalizeFiltersForQuery(filters) {
  const normalized = { ...filters };
  if (normalized.tuitionBand && typeof normalized.tuitionBand === "string") {
    normalized.tuitionBand = normalized.tuitionBand;
  }
  if (normalized.isPublic === "true") normalized.isPublic = true;
  else if (normalized.isPublic === "false") normalized.isPublic = false;
  else if (normalized.isPublic === "") normalized.isPublic = undefined;
  return normalized;
}


