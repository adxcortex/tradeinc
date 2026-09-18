// Categorical color follows the entity (user), assigned once at seed time,
// never re-cycled — see app/globals.css for the light/dark values.
export function seriesVar(slot: number) {
  const safeSlot = Math.min(Math.max(Math.round(slot) || 1, 1), 4);
  return `var(--series-${safeSlot})`;
}
