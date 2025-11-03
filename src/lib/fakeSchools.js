import {
  randomNumberBetween,
  getRandomDateAfter,
  getRandomDateBefore,
} from "@/src/lib/utils.js";
import { randomData } from "@/src/lib/randomData.js";
import { Timestamp } from "firebase/firestore";

const districts = [
  "North District",
  "South District",
  "East District",
  "West District",
  "Central District",
];

const gradeBands = ["K-5", "6-8", "9-12"];

// School building images from Unsplash (free to use)
const schoolImages = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop", // Modern school building
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop", // School exterior
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop", // School campus
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop", // Elementary school
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop", // School building
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop", // Modern school
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop", // School entrance
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop", // High school building
  "https://images.unsplash.com/photo-1568605117039-69e8a41e3bcf?w=800&h=600&fit=crop", // School architecture
  "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&h=600&fit=crop", // School exterior view
  "https://images.unsplash.com/photo-1563453392212-0fe94e3c6c9a?w=800&h=600&fit=crop", // Modern campus
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop", // Educational building
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", // School building facade
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop", // Classic school
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop", // Contemporary school
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop", // School campus view
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop", // School building entrance
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop", // Educational facility
  "https://images.unsplash.com/photo-1568605117039-69e8a41e3bcf?w=800&h=600&fit=crop", // Modern educational building
  "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&h=600&fit=crop", // School campus aerial
  "https://images.unsplash.com/photo-1563453392212-0fe94e3c6c9a?w=800&h=600&fit=crop", // University/school building
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop", // Academic building
];

export async function generateFakeSchoolsAndReviews() {
  const schoolsToAdd = 5;
  const data = [];

  for (let i = 0; i < schoolsToAdd; i++) {
    const schoolTimestamp = Timestamp.fromDate(getRandomDateBefore());

    const ratingsData = [];
    for (let j = 0; j < randomNumberBetween(0, 5); j++) {
      const ratingTimestamp = Timestamp.fromDate(
        getRandomDateAfter(schoolTimestamp.toDate())
      );
      const pick = randomNumberBetween(0, randomData.restaurantReviews.length - 1);
      const ratingData = {
        rating: randomData.restaurantReviews[pick].rating,
        text: randomData.restaurantReviews[pick].text,
        userId: `User #${randomNumberBetween()}`,
        timestamp: ratingTimestamp,
      };
      ratingsData.push(ratingData);
    }

    const avgRating = ratingsData.length
      ? ratingsData.reduce((acc, cur) => acc + cur.rating, 0) / ratingsData.length
      : 0;

    const tuitionBand = randomNumberBetween(1, 4);
    const schoolData = {
      name: randomData.restaurantNames[randomNumberBetween(0, randomData.restaurantNames.length - 1)],
      city: randomData.restaurantCities[randomNumberBetween(0, randomData.restaurantCities.length - 1)],
      district: districts[randomNumberBetween(0, districts.length - 1)],
      isPublic: randomNumberBetween(0, 1) === 1,
      grades: gradeBands.filter(() => randomNumberBetween(0, 1) === 1) || ["K-5"],
      tuitionBand,
      avgRating,
      numRatings: ratingsData.length,
      sumRating: ratingsData.reduce((acc, cur) => acc + cur.rating, 0),
      photo: schoolImages[randomNumberBetween(0, schoolImages.length - 1)],
      timestamp: schoolTimestamp,
    };

    data.push({ schoolData, ratingsData });
  }
  return data;
}


