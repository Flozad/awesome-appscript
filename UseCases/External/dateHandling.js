// modify date formats

function fromUnixEpoch(epochInSeconds) {
  return new Date(epochInSeconds * 1000);
}

function toUnixEpoch(date) {
  return Math.floor(date.getTime() / 1000);
}

function formatDate(date, format) {
  // Example format: "YYYY-MM-DD HH:mm:ss"
  format = format.replace("YYYY", date.getFullYear());
  format = format.replace("MM", String(date.getMonth() + 1).padStart(2, "0"));
  format = format.replace("DD", String(date.getDate()).padStart(2, "0"));
  format = format.replace("HH", String(date.getHours()).padStart(2, "0"));
  format = format.replace("mm", String(date.getMinutes()).padStart(2, "0"));
  format = format.replace("ss", String(date.getSeconds()).padStart(2, "0"));
  return format;
}

function addDaysToDate(date, days) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function getMonthBounds(date) {
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { firstDay: firstDay, lastDay: lastDay };
}

function getISOWeekNumber(date) {
  var startDate = new Date(date.getFullYear(), 0, 1);
  var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)) + 1;
  return Math.ceil(days / 7);
}

function adjustToTimeZone(date, timeZoneOffset) {
  var utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * timeZoneOffset);
}
