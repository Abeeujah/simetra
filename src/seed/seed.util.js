// Helper function to generate random strings
export function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

// Helper function to generate random phone numbers
export function randomPhoneNumber() {
  const prefix = Math.floor(Math.random() * 900) + 100; // Adjust prefix range based on your needs
  const suffix = Math.floor(Math.random() * 9000000) + 1000000;
  return `+1${prefix}-${suffix}`;
}

// Generate random descriptions
export function randomDescription(length) {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Aenean euismod bibendum laoreet.";
  const words = lorem.split(" ");
  let result = "";
  for (let i = 0; i < length; i++) {
    result += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return result.trim();
}
