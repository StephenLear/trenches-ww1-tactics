/**
 * WWI Tactical Game - Period Dates
 * Dates for newspapers and letters, anchored to the mission's historical date
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Parse a mission date like "February 1916" or "August 23, 1914".
 * Returns null if the string doesn't match.
 */
const parseMissionDate = (missionDate) => {
  const match = /^([A-Za-z]+)(?:\s+(\d{1,2}))?,?\s+(\d{4})$/.exec((missionDate || '').trim());
  if (!match) return null;

  const month = MONTHS.indexOf(match[1]);
  if (month === -1) return null;

  // Month-only dates pick a day within the month
  const day = match[2] ? parseInt(match[2], 10) : 1 + Math.floor(Math.random() * 25);
  return new Date(parseInt(match[3], 10), month, day);
};

/**
 * A date shortly after the mission (1 to maxDaysAfter days later).
 * Falls back to a random wartime date if the mission date is missing.
 */
export const dateAfterMission = (missionDate, maxDaysAfter = 3) => {
  const date = parseMissionDate(missionDate);
  if (!date) {
    return new Date(1914 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28));
  }
  date.setDate(date.getDate() + 1 + Math.floor(Math.random() * maxDaysAfter));
  return date;
};
