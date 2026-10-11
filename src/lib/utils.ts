import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  if (num === null || num === undefined) return "";
  const str = typeof num === "number" ? num.toLocaleString("en-US") : num.toString();
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)] || digit);
}

export function getUnitTextBn(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return unit ? `প্রতি ${unit}` : "প্রতি একক";
  }
}

export function getShortUnitBn(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "কেজি";
    case "litre":
    case "liter":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    default:
      return unit || "";
  }
}

const banglaDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const banglaMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function getBengaliDateString(date: Date = new Date()): string {
  const dayName = banglaDays[date.getDay()];
  const day = toBengaliNumber(date.getDate());
  const monthName = banglaMonths[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());
  return `${dayName}, ${day} ${monthName}, ${year}`;
}
