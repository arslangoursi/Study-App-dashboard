const numberDisplay = (number: number | string | undefined) => {
  if (number === undefined || isNaN(+number)) {
    return "N/A";
  }

  const num = +number;
  return num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
};

export default numberDisplay;
