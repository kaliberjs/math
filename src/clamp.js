export function clamp({ min, max, input }) {
  if (min > max) { [min, max] = [max, min] }
  return Math.min(max, Math.max(min, input))
}
