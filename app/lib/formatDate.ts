export function formatDate(dateStr: string): string {
  if (dateStr === "Present") return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
