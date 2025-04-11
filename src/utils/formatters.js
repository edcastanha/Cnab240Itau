
const formatNumeric = (value, length) => {
  return String(value).padStart(length, '0');
};

const formatAlpha = (value, length) => {
  return String(value).toUpperCase().padEnd(length, ' ');
};

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getFullYear()}`;
};

const formatValue = (value, decimals = 2) => {
  return (value * Math.pow(10, decimals)).toFixed(0).padStart(15, '0');
};

module.exports = {
  formatNumeric,
  formatAlpha,
  formatDate,
  formatValue
};
