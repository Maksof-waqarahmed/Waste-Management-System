import { serialize as cookieSerialize } from "cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serialize(
  name: string,
  value: string,
  options: Record<string, any>
) {
  return cookieSerialize(name, value, options);
}

export function totalRewards(rewards: any[]) {
  return rewards.reduce((acc, reward) => acc + reward.points, 0);
}
