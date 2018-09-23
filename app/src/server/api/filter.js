import { isArray } from 'lodash';
import { getListings } from './helper';

export function filterRange(range, value) {
  if (!isArray(range) || range.length !== 2) {
    return true;
  }

  const from = parseFloat(range[0]);
  const to = parseFloat(range[1]);

  return from <= value && value <= to;
}

export async function getFilteredListings(formData = {}) {
  const data = await getListings();

  const filtered = data.filter(listing => {
    if (formData.ethnicity && listing.ethnicity !== formData.ethnicity) return false;
    if (!filterRange(formData.ageRange, listing.age)) return false;
    if (!filterRange(formData.weightRange, listing.weight)) return false;
    if (!filterRange(formData.sleepRange, listing.sleep)) return false;
    if (!filterRange(formData.activityRange, listing.activity)) return false;

    return true;
  });

  return filtered;
}
