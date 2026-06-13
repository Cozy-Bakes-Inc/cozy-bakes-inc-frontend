const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatOrdinalDay(day: number) {
  if (day >= 11 && day <= 13) return `${day}th`;

  const lastDigit = day % 10;

  if (lastDigit === 1) return `${day}st`;
  if (lastDigit === 2) return `${day}nd`;
  if (lastDigit === 3) return `${day}rd`;

  return `${day}th`;
}

export function formatMarketDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) return date;

  const monthName = MONTH_NAMES[month - 1];

  if (!monthName) return date;

  return `${monthName} ${formatOrdinalDay(day)}`;
}

export function formatMarketDays(day?: string[] | null) {
  if (!day?.length) return "";
  if (day.length <= 2) return day.join(" and ");

  return `${day.slice(0, -1).join(", ")}, and ${day[day.length - 1]}`;
}

export function formatMarketDateRange(startDate: string, endDate?: string) {
  const formattedStartDate = formatMarketDate(startDate);

  if (!endDate || endDate === startDate) return formattedStartDate;

  return `${formattedStartDate} - ${formatMarketDate(endDate)}`;
}

export function formatMarketTimeRange(startTime: string, endTime?: string) {
  return endTime ? `${startTime} - ${endTime}` : startTime;
}

export function formatMarketSchedule({
  day,
  date,
  endDate,
  time,
  endTime,
}: {
  day?: string[] | null;
  date: string;
  endDate?: string;
  time: string;
  endTime?: string;
}) {
  const days = formatMarketDays(day);
  const dateRange = formatMarketDateRange(date, endDate);
  const timeRange = formatMarketTimeRange(time, endTime);

  return [days, dateRange, timeRange].filter(Boolean).join(" - ");
}
