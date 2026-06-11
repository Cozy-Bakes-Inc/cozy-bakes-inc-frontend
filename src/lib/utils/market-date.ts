export function formatMarketDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) return date;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatMarketDateRange(startDate: string, endDate?: string) {
  const formattedStartDate = formatMarketDate(startDate);

  if (!endDate) return formattedStartDate;

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
  day: string;
  date: string;
  endDate?: string;
  time: string;
  endTime?: string;
}) {
  return `${day} - ${formatMarketDateRange(date, endDate)} - ${formatMarketTimeRange(
    time,
    endTime
  )}`;
}
