import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


{/* extra file for shadcn management */}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
