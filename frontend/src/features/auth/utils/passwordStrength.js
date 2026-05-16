const LETTER = /[a-zA-Z]/;
const SPECIAL = /[^a-zA-Z0-9]/;

/**
 * @param {string} password
 * @returns {null | { level: string; widthPct: number; barClass: string; emoji: string; message: string }}
 */
export function getPasswordStrength(password) {
  if (!password) return null;

  const hasLen = password.length >= 8;
  const hasLetter = LETTER.test(password);
  const hasSpecial = SPECIAL.test(password);

  if (!hasLen) {
    return {
      level: "weak",
      widthPct: 25,
      barClass: "bg-rose-400 dark:bg-rose-500",
      emoji: "😠",
      message: "Weak. Must contain at least 8 characters",
    };
  }
  if (!hasLetter) {
    return {
      level: "soso",
      widthPct: 50,
      barClass: "bg-amber-400 dark:bg-amber-500",
      emoji: "😐",
      message: "So-so. Must contain at least 1 letter",
    };
  }
  if (!hasSpecial) {
    return {
      level: "almost",
      widthPct: 75,
      barClass: "bg-sky-400 dark:bg-sky-500",
      emoji: "😏",
      message: "Almost. Must contain special symbol",
    };
  }
  return {
    level: "awesome",
    widthPct: 100,
    barClass: "bg-emerald-500 dark:bg-emerald-500",
    emoji: "😎",
    message: "Awesome! You have a secure password",
  };
}

export function isPasswordStrongEnough(password) {
  const s = getPasswordStrength(password);
  return Boolean(s && s.level === "awesome");
}
