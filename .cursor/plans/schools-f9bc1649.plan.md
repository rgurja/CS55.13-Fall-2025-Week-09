<!-- f9bc1649-5a88-4dbf-b925-f658c65a7df6 322a1faf-a0c0-4038-8339-4ecd1909ff00 -->
# Schools Reviews Conversion Plan

## Scope

- Rename domain: restaurants → schools; reviews remain analogous
- Keep minimal model changes, adding only fields needed for filters/search: `isPublic`, `grades`, `district`, `tuitionBand`
- Update UI text, routes, icons; preserve app structure and styling

## Data Model and Collections

- Firestore collections: `schools`, `reviews`
- School doc fields (superset of current): `name`, `city`, `avgRating`, `numRatings`, `photo`, `tuitionBand`, `isPublic`, `grades` (array), `district`
- Review doc fields unchanged: `rating`, `text`, `userId`, `userName`, `photoUrl`, `timestamp`, `schoolId`

## Files to Update

- Routing and pages
  - Rename route `src/app/restaurant/[id]/page.jsx` → `src/app/school/[id]/page.jsx`
  - Update `src/app/page.js` to list schools
  - Ensure `src/app/restaurant/[id]/error.jsx` is mirrored for `school`
- Components
  - Rename and adapt components:
    - `src/components/Restaurant.jsx` → `School.jsx`
    - `src/components/RestaurantDetails.jsx` → `SchoolDetails.jsx`
    - `src/components/RestaurantListings.jsx` → `SchoolListings.jsx`
  - Update `src/components/Filters.jsx` to support:
    - Search by city and district (text inputs/selects)
    - Filters: `isPublic` (toggle), `grades` (multi-select K-5/6-8/9-12), `tuitionBand` (reuse price band UI)
  - Keep `Reviews/*` and `Stars.jsx` with copy changes
- Lib and data
  - Update Firestore helpers in `src/lib/firebase/firestore.js`:
    - Point queries to `schools` and `reviews`
    - Add optional query constraints for new filters
  - Replace `src/lib/fakeRestaurants.js` with `fakeSchools.js` generating the new fields
  - Adjust `src/lib/randomData.js` helpers if used by seeding
- Auth and utils
  - Leave `firebase/*` and `getUser.js` unchanged
- Assets and copy
  - Replace restaurant icons in `public/` as needed; reuse where possible
  - Update labels/strings in `Header.jsx`, `Filters.jsx`, details cards

## Firestore Rules

- Update `firestore.rules` to allow read on `schools` and `reviews`, and authenticated create for `reviews` tied to `schoolId`

## Query and UI Behavior

- Home page lists schools with sorting retained (rating, price→tuition)
- Filters compose client-side state and feed server/client queries
- Detail page shows school info, review summary, and reviews list; add review dialog unchanged

## Essential Snippets (illustrative)

- Query constraints pattern to combine filters:
```javascript
const constraints = [orderBy('avgRating', 'desc')];
if (city) constraints.push(where('city', '==', city));
if (district) constraints.push(where('district', '==', district));
if (typeof isPublic === 'boolean') constraints.push(where('isPublic', '==', isPublic));
if (grades?.length) constraints.push(where('grades', 'array-contains-any', grades));
if (tuitionBand) constraints.push(where('tuitionBand', '==', tuitionBand));
```


## Testing

- Verify listing with combinations of filters
- Verify search by city and district
- Verify review creation and visibility

## Rollout

- Rename files, update imports, run linter, fix broken imports
- Smoke test local build
- Deploy via existing Firebase Hosting config

### To-dos

- [ ] Rename restaurant route to school and update references
- [ ] Rename Restaurant* components to School* with copy updates
- [ ] Enhance Filters for city, district, public/private, grades, tuition band
- [ ] Point queries to schools/reviews and add constraints for new filters
- [ ] Create fakeSchools data and update data generators
- [ ] Update firestore.rules for schools and reviews access
- [ ] Update icons and user-facing strings from restaurant to school
- [ ] Smoke test filters, details, reviews, and build/deploy