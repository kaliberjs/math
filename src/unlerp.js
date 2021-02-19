import { clamp as _clamp } from './clamp'

export function unlerp({ start, end, input, clamp = false }) {
  const result = (input - start) / (end - start)
  return clamp
    ? _clamp({ min: 0, max: 1, input: result })
    : result
}
