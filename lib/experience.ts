/** Syed counts his professional experience from his first AWS role. */
const EXPERIENCE_START = { year: 2022, month: 1, day: 1 } as const;
const TIME_ZONE = "Australia/Melbourne";

function calendarParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

/** Whole years and months elapsed since the start date, in the Melbourne calendar. */
export function getExperienceDuration(now: Date = new Date()) {
  const { year, month, day } = calendarParts(now);
  let months = (year - EXPERIENCE_START.year) * 12 + (month - EXPERIENCE_START.month);
  if (day < EXPERIENCE_START.day) months -= 1;
  months = Math.max(months, 0);
  return { years: Math.floor(months / 12), months: months % 12 };
}

const plural = (count: number, unit: string) => `${count} ${unit}${count === 1 ? "" : "s"}`;

/** Exact experience text, for example "4 years and 10 months", "5 years" or "1 year and 1 month". */
export function formatExperience(now: Date = new Date()): string {
  const { years, months } = getExperienceDuration(now);
  if (years === 0) return plural(months, "month");
  if (months === 0) return plural(years, "year");
  return `${plural(years, "year")} and ${plural(months, "month")}`;
}
