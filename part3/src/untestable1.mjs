const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(currentDate) {
  currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset());
  const christmasDay = new Date(currentDate.getFullYear(), 12 - 1, 25);
  if (currentDate.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(currentDate.getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - currentDate.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

export function originalDaysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
