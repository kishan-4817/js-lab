export const LESSON_NOTES = {
  variables: {
    focus: [
      'Use `let` when a value may change and `const` when the binding should stay fixed.',
      'Block scope matters: variables declared inside `{}` stay inside that block.',
      'A `const` binding does not make the value immutable, it only prevents reassignment.',
    ],
    watchOut: [
      '`var` is function-scoped and hoisted, which makes it easy to misuse in modern code.',
      'Reassigning a `const` will throw immediately.',
    ],
    tryThis: 'Comment out the `PI = 3` line and see how the runtime reacts.',
  },
  datatypes: {
    focus: [
      'JavaScript has primitive types plus objects, and they behave differently in comparisons.',
      '`typeof null` is a famous JavaScript quirk, so do not rely on it as a perfect detector.',
      'Coercion changes values during operations like `+` and `-`.',
    ],
    watchOut: [
      'Loose equality can hide bugs when types do not match.',
      'BigInt is not the same thing as Number.',
    ],
    tryThis: 'Compare `==` and `===` with the same values, then inspect the difference.',
  },
  functions: {
    focus: [
      'Function declarations are hoisted; expressions and arrows are not in the same way.',
      'Arrow functions are concise, but they do not create their own `this` or `arguments`.',
      'Functions are first-class values, so you can pass them around like data.',
    ],
    watchOut: [
      'Choosing arrows everywhere can be a problem when you need `this`.',
      'Nested callbacks get harder to read quickly without clear naming.',
    ],
    tryThis: 'Write `square` and `squareAll`, then use them with an array of numbers.',
  },
  scope: {
    focus: [
      'Scope decides where a variable is visible.',
      'Closures let inner functions remember outer variables even after the outer function returns.',
      'Closures are one of the main tools for private state in JavaScript.',
    ],
    watchOut: [
      'Variables declared inside an inner function are not available outside it.',
      'Shadowing can make code confusing when the same name appears in multiple scopes.',
    ],
    tryThis: 'Build `makeMultiplier(factor)` and return a function that uses the closed-over value.',
  },
  arrays: {
    focus: [
      'Use `map` to transform, `filter` to keep matching items, and `reduce` to condense data.',
      'Chaining array methods lets you express a full data pipeline clearly.',
      '`find` gives you the first match; `forEach` is mainly for side effects.',
    ],
    watchOut: [
      '`reduce` becomes hard to read if you skip the initial value or overpack the callback.',
      'Each chained step should have one job.',
    ],
    tryThis: 'Take a list of numbers, keep the even ones, square them, then sum the result.',
  },
  objects: {
    focus: [
      'Objects are key-value maps and are the backbone of most JavaScript data.',
      'Dot notation is cleaner, but bracket notation is required for dynamic keys.',
      'Spread clones only one level deep, so nested values are still shared.',
    ],
    watchOut: [
      'A shallow copy can surprise you when nested objects change.',
      'Computed properties are powerful, but dynamic keys need careful naming.',
    ],
    tryThis: 'Add a method to an object, then clone it with spread and test what changes leak through.',
  },
  destructuring: {
    focus: [
      'Destructuring lets you pull values out of arrays and objects in one step.',
      'Defaults make destructuring safer when data is missing.',
      'Renaming during destructuring can keep your variables readable.',
    ],
    watchOut: [
      'Nested destructuring must match the structure of the source value.',
      'Spread/rest look similar but do opposite jobs.',
    ],
    tryThis: 'Destructure a nested user object and extract the first score in one statement.',
  },
  callbacks: {
    focus: [
      'Callbacks are how older asynchronous JavaScript APIs hand back results.',
      'Code does not wait for callbacks, so timing matters.',
      'Error-first callbacks are a common Node-style pattern.',
    ],
    watchOut: [
      'Deep nesting quickly becomes callback hell.',
      'Do not assume a callback will run in the same order as your code appears.',
    ],
    tryThis: 'Write a `delay(ms, callback)` helper that calls back after the timer ends.',
  },
  promises: {
    focus: [
      'Promises represent a value that may arrive later.',
      'Chain `.then()`, `.catch()`, and `.finally()` to keep async code readable.',
      '`Promise.all()` is the simplest way to wait for multiple async tasks together.',
    ],
    watchOut: [
      'Always return the next promise in a chain if the next step depends on it.',
      'A rejected promise should be handled explicitly.',
    ],
    tryThis: 'Build `wait(ms)` and chain several waits to make a staged async sequence.',
  },
  asyncawait: {
    focus: [
      '`async` functions always return a promise.',
      '`await` makes promise logic read like synchronous code while keeping it asynchronous.',
      'Use `try/catch` around awaited work so failures are handled in one place.',
    ],
    watchOut: [
      'Await pauses only the current async function, not the whole app.',
      'Parallel work should still use `Promise.all()` when the tasks are independent.',
    ],
    tryThis: 'Write a retry helper that keeps calling an async function until it succeeds or runs out of retries.',
  },
  'dom-basics': {
    focus: [
      'The DOM is the live HTML tree the browser exposes to JavaScript.',
      'Select nodes, change text or styles, and create new elements as needed.',
      'DOM changes are immediate, so every mutation is user-visible.',
    ],
    watchOut: [
      'Always check whether elements exist before mutating them.',
      'Creating lots of nodes one by one can get expensive if you do not batch updates.',
    ],
    tryThis: 'Create a small list in the DOM, then style every other item differently.',
  },
  events: {
    focus: [
      'Events let the page react to user input, scrolling, clicks, and more.',
      'The event object carries useful context like the target, key, or pointer position.',
      'Delegation keeps large lists fast by using fewer listeners.',
    ],
    watchOut: [
      'Bubbling can trigger handlers you did not expect.',
      'Use `preventDefault()` only when you really want to stop the browser behavior.',
    ],
    tryThis: 'Build a button that cycles through three colors each time it is clicked.',
  },
  prototypes: {
    focus: [
      'Objects inherit behavior through the prototype chain.',
      'Classes are cleaner syntax on top of the same mechanism.',
      '`extends` and `super()` connect parent and child behavior.',
    ],
    watchOut: [
      'Do not confuse prototype inheritance with copying.',
      'Static methods belong to the class itself, not the instance.',
    ],
    tryThis: 'Create a base `Shape` class and extend it into `Circle` and `Rectangle`.',
  },
  iterators: {
    focus: [
      'Iterators expose a `next()` method and generators simplify writing them.',
      '`yield` pauses a generator and resumes it later.',
      'Lazy evaluation is useful when you do not want to compute everything up front.',
    ],
    watchOut: [
      'Infinite generators are fine only when consumption is controlled.',
      'Iterator state lives inside the generator and advances each time you call `next()`.',
    ],
    tryThis: 'Write a generator that cycles through an array forever, then sample a few values from it.',
  },
  patterns: {
    focus: [
      'Patterns help you organize repeated solutions in a reusable way.',
      'Module, observer, factory, and singleton are common building blocks.',
      'A pattern should make the code easier to reason about, not just look clever.',
    ],
    watchOut: [
      'Do not use a pattern when a simple function is enough.',
      'Singletons are easy to overuse and can make testing harder.',
    ],
    tryThis: 'Implement a singleton with a `getInstance()` method and verify it always returns the same object.',
  },
  performance: {
    focus: [
      'Debounce waits for quiet input, throttle limits how often work runs, and memoization caches expensive results.',
      'The event loop runs microtasks before macrotasks.',
      'Performance work is usually about removing unnecessary repeated work.',
    ],
    watchOut: [
      'Memoization keys need to be chosen carefully.',
      'A performance helper that is hard to understand may not be worth the tradeoff.',
    ],
    tryThis: 'Make a memoize helper with TTL so cached values expire automatically.',
  },
  todo: {
    focus: [
      'This project combines state, DOM rendering, events, and localStorage persistence.',
      'Render from state rather than mutating the DOM directly in many places.',
      'Use one render function so the UI always reflects the source of truth.',
    ],
    watchOut: [
      'Keep the filter and state updates in sync.',
      'LocalStorage writes should happen after state changes, not before.',
    ],
    tryThis: 'Add a priority field and sort items before rendering them.',
  },
  'fetch-app': {
    focus: [
      'This app is about asynchronous fetch, loading states, and rendering remote data.',
      'Use `Promise.all()` to fetch related data in parallel.',
      'Always handle the unhappy path, not just the success path.',
    ],
    watchOut: [
      'A slow or failed request should show a useful message.',
      'Be careful not to assume every field exists in the API response.',
    ],
    tryThis: 'Add a favorites section using `localStorage` to save picked repos.',
  },
};
