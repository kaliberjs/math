# @kaliber/math
A set of useful math functions! 

## Motivation
Some math problems are just way easier to reason about if you have access to some higher level abstractions. This library provides some of these abstractions in a clear, consistent API.

## Installation

```
yarn add @kaliber/math
```

## Reference

1. [`lerp`](#lerp)
2. [`unlerp`](#unlerp)
3. [`clamp`](#clamp)

### `lerp`
`lerp({ start: number, end: number, amount: number, clamp: boolean = false })`

Linearly interpolates between points.

| Argument | Type |  |
| --- | --- | --- |
| `start` | `Number` | Start of the input range. |
| `end` | `Number` | End of the input range. |
| `input` | `Number` | Value indicating where to interpolate. If you want your result to lie between `start` and `end`, you should provide an input between `0` and `1`. |
| `clamp` | `Boolean` (default is `false`) | Whether to clamp the output value between the `start` and `end` values. |

```js
const rotZ = lerp({ start: -45, end: 45, input: 0.5 })
```

### `unlerp`
`unlerp({ start: number, end: number, input: number, clamp: boolean = false })`

Normalizes a number to a value between 0 and 1, given an input range.

| Argument | Type |  |
| --- | --- | --- |
| `start` | `Number` | Start of the input range. |
| `end` | `Number` | End of the input range. |
| `input` | `Number` | The value to normalize. If the given input lies between `start` and `end`, your output value will always be between `0` and `1`.  |
| `clamp` | `Boolean` (default is `false`) | Whether to clamp the output value between `0` and `1`. |

```js
const normalizedMouseX = unlerp({ start: 0, end: window.innerWidth, input: mouseX })
```

### `clamp`
`clamp({ min: number, max: number, input: number })`

Constrain a number between two boundary values. The boundary arguments are called `min` and `max` to make them easy to memorize, but swapping them has no consequences.

| Argument | Type |  |
| --- | --- | --- |
| `min` | `Number` | First boundary value |
| `max` | `Number` | Second boundary value |
| `input` | `Number` | Number to constrain |

```js
const clamped = clamp({ min: 0, max: 1, input: normalizedMouseX })
```

### `pseudoRandom`
`pseudoRandom(seed: string | number)`

Deterministically generate a (seemingly) random number, based on the input `seed`. Will always return the same number, given the same `seed`.

| Argument | Type |  |
| --- | --- | --- |
| `seed` | `String \| Number` | A number |

```js
const seeminglyRandom = pseudoRandom('hello world')
```

## Common usecases

### `lerp` & `unlerp`
`lerp` and `unlerp` are exact opposites. This fact can help you build some intuition around them:

```js
  lerp({ start: 0, end: 10, input: 0.7 }) === 7
unlerp({ start: 0, end: 10, input: 7   }) === 0.7

  lerp({ start: a, end: b, input: c }) === d
unlerp({ start: a, end: b, input: d }) === c
```

They are often applied in tandem to remap values:

```js
// Input
const normalizedMouseX = normalize({ start: 0, end: window.innerWidth, input: mouseX })

// Output
const rotZ = lerp({ start: -20, end: 20, input: normalizedMouseX })

// Apply output
element.style.transform = `rotateZ(${rotZ}deg)`
```

### `lerp`
`lerp` in itself is very useful if you have a library that returns normalized values (values between `0` and `1`). You can use `lerp` to map these values to other useful values. For instance:

```js
const { ref: viewportPositionRef } = useNormalizedPositionInViewport({
  startViewportPercentage: 0,
  endViewportPercentage: 50,
  onChange(n) {
    setSpring({
      opacity: lerp({ start: 0, end: 1, input: n }),
      clip: lerp({ start: 50, end: 100, input: n })
    })
  }
})
      
```

### `pseudoRandom`
Sometimes you want elements to appear random, but they shouldn't really change. In this case, you can use a pseudo random number. Returns a number between `0` and `1`, including `0` but excluding `1`.

```js
<div>
  {items.map(x => <Item rotation={lerp(-10, 10, pseudoRandom(x.id))} />)}
</div>
      
```

-----

![](https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. 

This library is not transpiled.
