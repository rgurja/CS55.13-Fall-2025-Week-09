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
      name: randomData.restaurantNames[randomNumberBetween(0, randomData.restaurantNames.length - 1)] + " School",
      city: randomData.restaurantCities[randomNumberBetween(0, randomData.restaurantCities.length - 1)],
      district: districts[randomNumberBetween(0, districts.length - 1)],
      isPublic: randomNumberBetween(0, 1) === 1,
      grades: gradeBands.filter(() => randomNumberBetween(0, 1) === 1) || ["K-5"],
      tuitionBand,
      avgRating,
      numRatings: ratingsData.length,
      sumRating: ratingsData.reduce((acc, cur) => acc + cur.rating, 0),
      photo: `https://storage.googleapis.com/firestorequickstarts.appspot.com/food_${randomNumberBetween(1, 22)}.png`,
      timestamp: schoolTimestamp,
    };

    data.push({ schoolData, ratingsData });
  }
  return data;
}


