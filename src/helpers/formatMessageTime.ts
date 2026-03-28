import { format } from "date-fns";

export function formatMessageTime(createdAt: string | Date): string {
  if (!createdAt) {
    return "";
  }

  try {
    // Convert to Date object and format to 12-hour time with AM/PM
    return format(new Date(createdAt), "h:mm a");
  } catch (error) {
    console.error("Invalid date:", createdAt);
    return "";
  }
}
