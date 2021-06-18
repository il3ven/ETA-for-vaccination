const toFixedDown = (num: number, digits: number) => {
  let re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = num.toString().match(re);
  return m ? parseFloat(m[1]) : num.valueOf();
};

const formatNumToString = (num: number, base: number, suffix: string) => {
  return `${toFixedDown(num / base, 2)} ${suffix}`;
};

export const convertToIndiaUnit = (num: number) => {
  if (num >= 1000000000) return "Infinity";
  if (num / 10000000 > 1) return formatNumToString(num, 10000000, "Cr");
  if (num / 100000 > 1) return formatNumToString(num, 100000, "Lakh");

  return Math.round(num).toLocaleString("en-IN");
};
