import { clamp as _clamp } from './clamp'

export function lerp({ start, end, input, clamp = false }) {
  const result = start + (end - start) * input
  return clamp
    ? _clamp({ min: start, max: end, input: result })
    : result
}
