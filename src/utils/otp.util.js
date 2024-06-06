const generateRandomNDigits = (n = 5) => {
  const max = Math.pow(10, n) - 1;
  const randomNum = Math.floor(Math.random() * max);

  // Convert the random number to a string and return n digits
  return randomNum.toString().padStart(n, "0").slice(-n);
};

export default generateRandomNDigits;
