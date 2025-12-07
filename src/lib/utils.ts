import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(amount);
}

export function calculateQuote(people: number, pricePerPerson: number = 99000) {
  const total = people * pricePerPerson;
  const deposit = Math.round(total * 0.3);
  return { total, deposit };
}
