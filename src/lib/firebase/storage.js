import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "@/src/lib/firebase/clientApp";

import { updateRestaurantImageReference, updateSchoolImageReference } from "@/src/lib/firebase/firestore";

export async function updateRestaurantImage(restaurantId, image) {
  try {
    if (!restaurantId) {
      throw new Error("No restaurant ID has been provided.");
    }

    if (!image || !image.name) {
      throw new Error("A valid image has not been provided.");
    }

    const publicImageUrl = await uploadImage(restaurantId, image);
    await updateRestaurantImageReference(restaurantId, publicImageUrl);

    return publicImageUrl;
  } catch (error) {
    console.error("Error processing request:", error);
  }
}

export async function updateSchoolImage(schoolId, image) {
  try {
    if (!schoolId) {
      throw new Error("No school ID has been provided.");
    }

    if (!image || !image.name) {
      throw new Error("A valid image has not been provided.");
    }

    const publicImageUrl = await uploadImage(schoolId, image);
    await updateSchoolImageReference(schoolId, publicImageUrl);

    return publicImageUrl;
  } catch (error) {
    console.error("Error processing request:", error);
  }
}

async function uploadImage(entityId, image) {
  const filePath = `images/${entityId}/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);

  return await getDownloadURL(newImageRef);
}
