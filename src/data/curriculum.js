export const CURRICULUM = [
  {
    id: "basics",
    title: "The Foundation",
    icon: "⚡",
    color: "#00ff88",
    xp: 100,
    lessons: [
      {
        id: "variables",
        title: "Variables: Boxes in Memory",
        subtitle: "See exactly how JS stores data",
        xp: 15,
        type: "visualizer",
        theory: `Variables are named containers in memory. Think of RAM as a huge grid of lockers — each variable gets a locker with a label.

- **var** → old, function-scoped, hoisted (avoid)
- **let** → block-scoped, can be reassigned
- **const** → block-scoped, cannot be reassigned`,
        starterCode: `// Click "Run" and watch the memory visualizer!
let name = "Alex";
let age = 25;
let isOnline = true;
const PI = 3.14159;

// Try reassigning
name = "Jordan";
// PI = 3; // ← Uncomment this and see what happens!

console.log(name, age, isOnline, PI);`,
        memoryVars: ["name", "age", "isOnline", "PI"],
        challenge: {
          prompt: "Create 3 variables: your name (string), your birth year (number), and whether you like JS (boolean). Then log all three.",
          tests: [
            { check: code => /let|const/.test(code) && /=/.test(code), msg: "Declare at least one variable" },
            { check: code => /console\.log/.test(code), msg: "Use console.log to output values" },
          ]
        }
      },
      {
        id: "datatypes",
        title: "Data Types: The 7 Primitives",
        subtitle: "What kinds of things can JS hold?",
        xp: 15,
        type: "explorer",
        theory: `JS has 7 primitive types + Objects. Each type has different behaviors — especially around equality checks and type coercion.`,
        starterCode: `// Explore every type
let text = "Hello";          // string
let num = 42;                // number
let float = 3.14;            // also number!
let big = 9007199254740993n; // bigint
let flag = true;             // boolean
let nothing = null;          // null (intentional empty)
let undef = undefined;       // undefined (not set)
let sym = Symbol("unique");  // symbol

// Type checking
console.log(typeof text);    // "string"
console.log(typeof num);     // "number"
console.log(typeof flag);    // "boolean"
console.log(typeof nothing); // "object" ← FAMOUS BUG in JS!
console.log(typeof undef);   // "undefined"

// Quirky JS behavior
console.log("5" + 3);   // "53" (string wins)
console.log("5" - 3);   // 2   (math forces number)
console.log(null == undefined);  // true (loose)
console.log(null === undefined); // false (strict)`,
        challenge: {
          prompt: "Write code that demonstrates type coercion: add a string and number, then subtract them. Log both results.",
          tests: [
            { check: code => /\+/.test(code) && /-/.test(code), msg: "Use both + and -" },
            { check: code => /console\.log/.test(code), msg: "Log the results" },
          ]
        }
      },
      {
        id: "functions",
        title: "Functions: Reusable Machines",
        subtitle: "Build your own commands",
        xp: 20,
        type: "visualizer",
        theory: `Functions are reusable blocks of code. JS has multiple ways to write them — each with subtle differences in how \`this\` and \`arguments\` work.`,
        starterCode: `// 3 ways to write a function

// 1. Function Declaration (hoisted!)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// 2. Function Expression
const greet2 = function(name) {
  return \`Hey there, \${name}!\`;
};

// 3. Arrow Function (modern, no own 'this')
const greet3 = (name) => \`Sup, \${name}!\`;

// Call them
console.log(greet("Alice"));
console.log(greet2("Bob"));
console.log(greet3("Carol"));

// Functions are first-class! Pass them around
function applyTwice(fn, value) {
  return fn(fn(value));
}

const double = x => x * 2;
console.log(applyTwice(double, 3)); // 12`,
        challenge: {
          prompt: "Write an arrow function called 'square' that takes a number and returns it squared. Then write a function 'squareAll' that takes an array and squares every element.",
          tests: [
            { check: code => /const square\s*=.*=>/.test(code), msg: "Create an arrow function called square" },
            { check: code => /squareAll/.test(code), msg: "Create the squareAll function" },
          ]
        }
      },
      {
        id: "scope",
        title: "Scope & Closures: The Invisible Fence",
        subtitle: "Where can variables be seen?",
        xp: 25,
        type: "visualizer",
        theory: `Scope determines which variables are accessible where. Closures are functions that "remember" their outer scope even after that scope is gone — one of JS's most powerful features.`,
        starterCode: `// SCOPE: Variables live in bubbles

let globalVar = "I'm everywhere";

function outer() {
  let outerVar = "I'm in outer";
  
  function inner() {
    let innerVar = "I'm in inner";
    console.log(globalVar); // ✅ accessible
    console.log(outerVar);  // ✅ accessible (closure!)
    console.log(innerVar);  // ✅ accessible
  }
  
  inner();
  // console.log(innerVar); // ❌ Would crash!
}

outer();

// CLOSURE: The counter example
function makeCounter() {
  let count = 0; // private!
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 3
// count variable is locked away, can't access directly`,
        challenge: {
          prompt: "Build a 'makeMultiplier(factor)' closure that returns a function which multiplies any number by that factor.",
          tests: [
            { check: code => /makeMultiplier/.test(code), msg: "Create makeMultiplier function" },
            { check: code => /return.*=>|return function/.test(code), msg: "Return a function from it" },
          ]
        }
      }
    ]
  },
  {
    id: "arrays-objects",
    title: "Arrays & Objects",
    icon: "🗃️",
    color: "#00d4ff",
    xp: 150,
    lessons: [
      {
        id: "arrays",
        title: "Arrays: Ordered Lists",
        subtitle: "The most used data structure",
        xp: 20,
        type: "visualizer",
        theory: `Arrays store ordered collections. Master these methods and you'll handle 80% of data manipulation tasks.`,
        starterCode: `const fruits = ["apple", "banana", "cherry", "date"];

// THE BIG 5 ARRAY METHODS
// 1. map — transform every element
const upper = fruits.map(f => f.toUpperCase());
console.log("map:", upper);

// 2. filter — keep elements that pass a test
const longFruits = fruits.filter(f => f.length > 5);
console.log("filter:", longFruits);

// 3. reduce — collapse to single value
const totalLength = fruits.reduce((acc, f) => acc + f.length, 0);
console.log("reduce:", totalLength);

// 4. find — first match
const found = fruits.find(f => f.startsWith("c"));
console.log("find:", found);

// 5. forEach — loop (no return value)
fruits.forEach((f, i) => console.log(\`\${i}: \${f}\`));

// Chaining — the real power
const result = [1,2,3,4,5,6,7,8,9,10]
  .filter(n => n % 2 === 0)  // keep evens
  .map(n => n * n)           // square them
  .reduce((a, b) => a + b);  // sum them

console.log("chain result:", result); // 220`,
        challenge: {
          prompt: "Given `const nums = [3, 1, 4, 1, 5, 9, 2, 6]`, use chaining to: filter numbers > 3, double each, then sum them all.",
          tests: [
            { check: code => /filter/.test(code), msg: "Use .filter()" },
            { check: code => /map/.test(code), msg: "Use .map()" },
            { check: code => /reduce/.test(code), msg: "Use .reduce()" },
          ]
        }
      },
      {
        id: "objects",
        title: "Objects: Key-Value Maps",
        subtitle: "The building block of everything",
        xp: 20,
        type: "explorer",
        theory: `Objects store named collections of data. Nearly everything in JS is an object — arrays, functions, DOM elements, even null (sort of).`,
        starterCode: `// Object creation
const person = {
  name: "Alice",
  age: 30,
  skills: ["JS", "React", "CSS"],
  address: { city: "NYC", country: "US" }  // nested!
};

// Access
console.log(person.name);           // dot notation
console.log(person["age"]);         // bracket notation
console.log(person.address.city);   // nested access

// Destructuring (modern & clean)
const { name, age, skills } = person;
console.log(name, age);

// Spread operator
const updatedPerson = { ...person, age: 31, job: "Dev" };
console.log(updatedPerson);

// Object methods
console.log(Object.keys(person));    // ["name","age","skills","address"]
console.log(Object.values(person));  // [values...]
console.log(Object.entries(person)); // [[key,val],...]

// Computed property names
const key = "dynamicProp";
const obj = { [key]: "Hello!" };
console.log(obj.dynamicProp); // "Hello!"`,
        challenge: {
          prompt: "Create a `car` object with make, model, year, and an `isVintage()` method that returns true if year < 1990. Test it.",
          tests: [
            { check: code => /const car\s*=\s*{/.test(code), msg: "Create a car object" },
            { check: code => /isVintage/.test(code), msg: "Add isVintage method" },
          ]
        }
      },
      {
        id: "destructuring",
        title: "Destructuring & Spread",
        subtitle: "Unpack data elegantly",
        xp: 20,
        type: "explorer",
        theory: `Destructuring lets you extract values into variables in one line. Spread/rest (...) lets you expand or collect values.`,
        starterCode: `// ARRAY DESTRUCTURING
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first, second, rest); // 10 20 [30,40,50]

// Swap variables!
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

// OBJECT DESTRUCTURING
const { name: firstName, age = 25, job = "Dev" } = { name: "Sam", age: 30 };
console.log(firstName, age, job); // Sam 30 Dev

// Nested destructuring
const { address: { city, zip = "00000" } } = { address: { city: "LA" } };
console.log(city, zip); // LA 00000

// SPREAD
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);

// Cloning objects (shallow)
const original = { x: 1, y: { z: 2 } };
const clone = { ...original };
clone.x = 99; // doesn't affect original
clone.y.z = 99; // DOES affect original! (shallow copy)
console.log(original); // { x: 1, y: { z: 99 } }`,
        challenge: {
          prompt: "Destructure this: `const data = { user: { name: 'Kim', scores: [95, 87, 92] } }`. Extract name and first score in one destructuring statement.",
          tests: [
            { check: code => /const\s*\{/.test(code), msg: "Use object destructuring" },
            { check: code => /scores/.test(code), msg: "Access the scores array" },
          ]
        }
      }
    ]
  },
  {
    id: "async",
    title: "Async JS",
    icon: "⏳",
    color: "#ff6b35",
    xp: 200,
    lessons: [
      {
        id: "callbacks",
        title: "Callbacks: The Old Way",
        subtitle: "Understand callback hell first",
        xp: 20,
        type: "timeline",
        theory: `JavaScript is single-threaded but non-blocking. Callbacks were the first solution — functions passed to run "when ready". But they led to "callback hell" with deeply nested code.`,
        starterCode: `// Simulating async operations
function fetchUser(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: "Alice", teamId: 42 });
  }, 500);
}

function fetchTeam(teamId, callback) {
  setTimeout(() => {
    callback(null, { id: teamId, name: "Frontend Team" });
  }, 300);
}

// CALLBACK HELL — each depends on the previous
fetchUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log("Got user:", user.name);
  
  fetchTeam(user.teamId, (err, team) => {
    if (err) return console.error(err);
    console.log("Their team:", team.name);
    
    // Imagine more nesting here... 😱
    // fetchProjects(team.id, (err, projects) => {
    //   fetchTasks(projects[0].id, (err, tasks) => {
    //     // ... this is callback hell
    //   });
    // });
  });
});

console.log("This runs IMMEDIATELY (before the callbacks!)");`,
        challenge: {
          prompt: "Write a function `delay(ms, callback)` that calls the callback after ms milliseconds, passing the elapsed time as an argument.",
          tests: [
            { check: code => /setTimeout/.test(code), msg: "Use setTimeout" },
            { check: code => /callback/.test(code), msg: "Call the callback" },
          ]
        }
      },
      {
        id: "promises",
        title: "Promises: A Better Contract",
        subtitle: "Pending → Fulfilled | Rejected",
        xp: 25,
        type: "timeline",
        theory: `Promises represent a value that may not exist yet. They have 3 states: pending, fulfilled, or rejected. They allow chaining with .then() to avoid callback hell.`,
        starterCode: `// Creating a Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Alice", teamId: 42 });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 500);
  });
}

function fetchTeam(teamId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: teamId, name: "Frontend Team" }), 300);
  });
}

// Chaining — much cleaner!
fetchUser(1)
  .then(user => {
    console.log("User:", user.name);
    return fetchTeam(user.teamId); // return next promise
  })
  .then(team => {
    console.log("Team:", team.name);
  })
  .catch(err => {
    console.error("Error:", err.message);
  })
  .finally(() => {
    console.log("Done! (always runs)");
  });

// Promise.all — run multiple at once
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .then(users => console.log("All users:", users.map(u => u.name)));`,
        challenge: {
          prompt: "Create a `wait(ms)` function that returns a Promise resolving after ms milliseconds. Then chain 3 wait calls to create a 3-step sequence.",
          tests: [
            { check: code => /new Promise/.test(code), msg: "Return a new Promise" },
            { check: code => /\.then/.test(code), msg: "Chain with .then()" },
          ]
        }
      },
      {
        id: "asyncawait",
        title: "Async/Await: Write Async Like Sync",
        subtitle: "The modern way",
        xp: 30,
        type: "timeline",
        theory: `async/await is syntactic sugar over Promises. It makes async code look and behave like synchronous code — much easier to read, debug, and reason about.`,
        starterCode: `// Same functions from before (return promises)
const wait = (ms) => new Promise(res => setTimeout(res, ms));

const fetchUser = async (id) => {
  await wait(300);
  if (id <= 0) throw new Error("Bad ID");
  return { id, name: "Alice", teamId: 42 };
};

const fetchTeam = async (teamId) => {
  await wait(200);
  return { id: teamId, name: "Frontend Team" };
};

// async/await — reads like synchronous code!
async function loadUserData(userId) {
  try {
    console.log("Starting...");
    
    const user = await fetchUser(userId);
    console.log("✅ Got user:", user.name);
    
    const team = await fetchTeam(user.teamId);
    console.log("✅ Got team:", team.name);
    
    return { user, team };
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    console.log("🏁 Always runs");
  }
}

// Parallel with async/await
async function loadAll() {
  const [u1, u2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.log("Parallel:", u1.name, u2.name);
}

loadUserData(1);
loadAll();`,
        challenge: {
          prompt: "Write an async function `retryFetch(fn, retries)` that calls fn(), and if it throws, retries up to `retries` times before giving up.",
          tests: [
            { check: code => /async function|async \(/.test(code), msg: "Create an async function" },
            { check: code => /try.*catch|await/.test(code), msg: "Use try/catch with await" },
          ]
        }
      }
    ]
  },
  {
    id: "dom",
    title: "DOM & Events",
    icon: "🌐",
    color: "#bf5af2",
    xp: 200,
    lessons: [
      {
        id: "dom-basics",
        title: "DOM: The Living Document",
        subtitle: "JS meets HTML",
        xp: 20,
        type: "dom-lab",
        theory: `The DOM (Document Object Model) is a tree of nodes representing your HTML. JS can read and modify it in real time — this is what makes web pages interactive.`,
        starterCode: `// Selecting elements
const title = document.querySelector('h1');
const items = document.querySelectorAll('.item');
const byId = document.getElementById('myId');

// Reading & Writing
// title.textContent = "New Title";
// title.innerHTML = "<em>Italic Title</em>";
// title.style.color = "red";

// Creating elements
const newDiv = document.createElement('div');
newDiv.className = 'new-element';
newDiv.textContent = 'I was created by JS!';
// document.body.appendChild(newDiv);

// Attributes
// title.setAttribute('data-custom', 'value');
// console.log(title.getAttribute('data-custom'));

// Classes
// title.classList.add('active');
// title.classList.remove('active');
// title.classList.toggle('active');

// Traversal
// const parent = title.parentElement;
// const children = parent.children;
// const sibling = title.nextElementSibling;

console.log("DOM is ready!");
console.log("Body children:", document.body.children.length);`,
        challenge: {
          prompt: "Write code that creates a `<ul>` with 5 `<li>` items (numbered 1-5), appends it to the body, and colors every other item red.",
          tests: [
            { check: code => /createElement/.test(code), msg: "Use createElement" },
            { check: code => /appendChild|append/.test(code), msg: "Append elements to DOM" },
            { check: code => /for|forEach|map/.test(code), msg: "Use a loop" },
          ]
        }
      },
      {
        id: "events",
        title: "Events: Reacting to the User",
        subtitle: "Click, type, scroll, and more",
        xp: 25,
        type: "dom-lab",
        theory: `Events let your code respond to user actions. The event object carries information about what happened. Event delegation is a key performance pattern.`,
        starterCode: `// Basic event listener
// document.querySelector('button')
//   .addEventListener('click', (event) => {
//     console.log('Clicked!', event.target);
//   });

// The event object has lots of info
document.addEventListener('mousemove', (e) => {
  // e.clientX, e.clientY — mouse position
  // e.target — element that fired the event
  // e.preventDefault() — stop default behavior
  // e.stopPropagation() — stop bubbling
});

// EVENT BUBBLING: events bubble up the DOM
// Child fires → Parent fires → Grandparent fires

// EVENT DELEGATION: one listener for many children
// Instead of adding listener to each <li>:
// document.querySelector('ul').addEventListener('click', (e) => {
//   if (e.target.tagName === 'LI') {
//     console.log('Clicked item:', e.target.textContent);
//   }
// });

// Remove listeners
// const handler = () => console.log('hi');
// btn.addEventListener('click', handler);
// btn.removeEventListener('click', handler);

// One-time listener
// btn.addEventListener('click', handler, { once: true });

console.log("Try clicking and typing on the preview!");`,
        challenge: {
          prompt: "Create a button that, when clicked, cycles through 3 background colors (red → blue → green → red...). Each click changes to the next color.",
          tests: [
            { check: code => /addEventListener/.test(code), msg: "Use addEventListener" },
            { check: code => /style|classList/.test(code), msg: "Change the style" },
          ]
        }
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Concepts",
    icon: "🚀",
    color: "#f0c929",
    xp: 300,
    lessons: [
      {
        id: "prototypes",
        title: "Prototypes & Classes",
        subtitle: "How inheritance really works",
        xp: 30,
        type: "visualizer",
        theory: `Every object in JS has a hidden \`__proto__\` link to another object (its prototype). This chain is how inheritance works. Classes are syntactic sugar over this.`,
        starterCode: `// The prototype chain in action
const animal = {
  breathe() { console.log(\`\${this.name} breathes\`); }
};

const dog = Object.create(animal); // dog's proto = animal
dog.name = "Rex";
dog.bark = function() { console.log("Woof!"); };

dog.breathe(); // ✅ Found on prototype!
dog.bark();    // ✅ Own method

// CLASS syntax (same thing, prettier)
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  
  speak() {
    return \`\${this.name} says \${this.sound}\`;
  }
  
  static create(name, sound) { // factory method
    return new Animal(name, sound);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof"); // call parent constructor
  }
  
  fetch() {
    return \`\${this.name} fetches the ball!\`;
  }
}

const rex = new Dog("Rex");
console.log(rex.speak());  // inherited
console.log(rex.fetch());  // own method
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true (chain!)

// Checking prototype chain
console.log(Object.getPrototypeOf(rex) === Dog.prototype); // true`,
        challenge: {
          prompt: "Create a `Shape` class with an `area()` method, then extend it with `Circle` and `Rectangle` classes that implement their own `area()` calculations.",
          tests: [
            { check: code => /class Shape/.test(code), msg: "Create Shape class" },
            { check: code => /extends Shape/.test(code), msg: "Extend Shape" },
            { check: code => /area\(\)/.test(code), msg: "Implement area()" },
          ]
        }
      },
      {
        id: "iterators",
        title: "Iterators & Generators",
        subtitle: "Lazy evaluation & custom loops",
        xp: 35,
        type: "explorer",
        theory: `Iterators are objects with a \`next()\` method. Generators are functions that pause with \`yield\`. Together they enable lazy evaluation — computing values only when needed.`,
        starterCode: `// Custom iterator
function range(start, end, step = 1) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            const value = current;
            current += step;
            return { value, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}

// Now it works with for...of!
for (const n of range(1, 10, 2)) {
  process.stdout ? process.stdout.write(n + " ") : console.log(n);
}
console.log(); // newline

// GENERATORS — pause with yield!
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {  // infinite, but lazy!
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
console.log("Fibonacci:", first10);

// Generator with return value
function* steps() {
  console.log("Step 1");
  yield "after step 1";
  console.log("Step 2");
  yield "after step 2";
  console.log("Step 3");
  return "done!";
}

const gen = steps();
console.log(gen.next()); // {value: "after step 1", done: false}
console.log(gen.next()); // {value: "after step 2", done: false}
console.log(gen.next()); // {value: "done!", done: true}`,
        challenge: {
          prompt: "Write a generator function `cycle(arr)` that endlessly cycles through an array. Test it by pulling 7 values from `cycle([1, 2, 3])`.",
          tests: [
            { check: code => /function\*/.test(code), msg: "Use a generator function" },
            { check: code => /yield/.test(code), msg: "Use yield" },
            { check: code => /while/.test(code), msg: "Use a loop to cycle" },
          ]
        }
      },
      {
        id: "patterns",
        title: "Design Patterns",
        subtitle: "The code that pros write",
        xp: 40,
        type: "explorer",
        theory: `Design patterns are reusable solutions to common problems. Master these and your code quality will immediately level up.`,
        starterCode: `// 1. MODULE PATTERN (IIFE)
const BankAccount = (() => {
  let balance = 0; // private
  return {
    deposit: amount => balance += amount,
    withdraw: amount => {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
    },
    getBalance: () => balance
  };
})();

BankAccount.deposit(100);
BankAccount.withdraw(30);
console.log(BankAccount.getBalance()); // 70

// 2. OBSERVER PATTERN (like event systems)
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, listener) {
    (this.events[event] ??= []).push(listener);
  }
  emit(event, ...args) {
    this.events[event]?.forEach(l => l(...args));
  }
  off(event, listener) {
    this.events[event] = this.events[event]?.filter(l => l !== listener);
  }
}

const emitter = new EventEmitter();
emitter.on('data', data => console.log("Received:", data));
emitter.emit('data', { user: "Alice" }); // triggers listener

// 3. FACTORY PATTERN
const createUser = (name, role = "user") => ({
  id: Math.random().toString(36).slice(2),
  name,
  role,
  createdAt: new Date().toISOString(),
  hasPermission: (perm) => role === "admin" || perm === "read"
});

const admin = createUser("Bob", "admin");
const user = createUser("Alice");
console.log(admin.hasPermission("delete")); // true
console.log(user.hasPermission("delete"));  // false`,
        challenge: {
          prompt: "Implement a simple `Singleton` class that ensures only one instance is ever created. Calling `Singleton.getInstance()` multiple times should return the same object.",
          tests: [
            { check: code => /Singleton/.test(code), msg: "Create a Singleton" },
            { check: code => /getInstance/.test(code), msg: "Implement getInstance()" },
          ]
        }
      },
      {
        id: "performance",
        title: "Performance Patterns",
        subtitle: "Write fast code that scales",
        xp: 40,
        type: "explorer",
        theory: `Performance matters at scale. Debouncing, throttling, memoization, and understanding the event loop are key to building fast apps.`,
        starterCode: `// 1. DEBOUNCE — wait until user stops typing
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 2. THROTTLE — max once per interval
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

// 3. MEMOIZE — cache expensive results
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("⚡ Cache hit!");
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
const slowFib = (n) => n <= 1 ? n : slowFib(n-1) + slowFib(n-2);
const fastFib = memoize(slowFib);

console.time("first call");
console.log(fastFib(35));
console.timeEnd("first call");

console.time("second call (cached)");
console.log(fastFib(35));
console.timeEnd("second call (cached)");

// 4. THE EVENT LOOP
console.log("1 - sync");
setTimeout(() => console.log("3 - macrotask"), 0);
Promise.resolve().then(() => console.log("2 - microtask"));
console.log("Still 1 - sync");`,
        challenge: {
          prompt: "Write a `memoize` function that also accepts a `ttl` (time-to-live in ms) parameter, so cached results expire after that time.",
          tests: [
            { check: code => /memoize/.test(code), msg: "Create memoize function" },
            { check: code => /ttl|expire|Date\.now/.test(code), msg: "Implement TTL expiration" },
            { check: code => /Map|cache/.test(code), msg: "Use a cache" },
          ]
        }
      }
    ]
  },
  {
    id: "projects",
    title: "Mini Projects",
    icon: "🏗️",
    color: "#ff4757",
    xp: 500,
    lessons: [
      {
        id: "todo",
        title: "Project: Todo App",
        subtitle: "DOM + Events + Array methods",
        xp: 80,
        type: "project",
        theory: `Build a complete Todo app using vanilla JS. This combines DOM manipulation, events, array methods, and localStorage persistence.`,
        starterCode: `// MINI PROJECT: Todo App
// Goal: fully working todo list in the browser

// State
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

// Create the UI
document.body.innerHTML = \`
  <div class="todo-app">
    <h1>📝 Todo List</h1>
    <div class="input-row">
      <input id="input" placeholder="Add a task..." />
      <button id="add">Add</button>
    </div>
    <div id="filters">
      <button class="filter active" data-filter="all">All</button>
      <button class="filter" data-filter="active">Active</button>
      <button class="filter" data-filter="done">Done</button>
    </div>
    <ul id="list"></ul>
    <div id="stats"></div>
  </div>
\`;

// Render function — pure function, always rebuilds from state
function render(filter = 'all') {
  const list = document.getElementById('list');
  const filtered = todos.filter(t => 
    filter === 'all' ? true : 
    filter === 'done' ? t.done : !t.done
  );
  
  list.innerHTML = filtered.map(todo => \`
    <li class="\${todo.done ? 'done' : ''}" data-id="\${todo.id}">
      <input type="checkbox" \${todo.done ? 'checked' : ''} />
      <span>\${todo.text}</span>
      <button class="delete">✕</button>
    </li>
  \`).join('');
  
  const done = todos.filter(t => t.done).length;
  document.getElementById('stats').textContent = 
    \`\${done}/\${todos.length} completed\`;
  
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Actions
function addTodo() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: nextId++, text, done: false });
  input.value = '';
  render();
}

// Event listeners (delegation!)
document.getElementById('add').addEventListener('click', addTodo);
document.getElementById('input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

document.getElementById('list').addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = parseInt(li.dataset.id);
  
  if (e.target.tagName === 'INPUT') {
    todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  } else if (e.target.classList.contains('delete')) {
    todos = todos.filter(t => t.id !== id);
  }
  render();
});

document.getElementById('filters').addEventListener('click', e => {
  if (!e.target.dataset.filter) return;
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  render(e.target.dataset.filter);
});

// Initial render
render();`,
        challenge: {
          prompt: "Extend the Todo app: add a priority level (low/medium/high) to each todo, and sort them by priority in the list.",
          tests: [
            { check: code => /priority/.test(code), msg: "Add priority field" },
            { check: code => /sort/.test(code), msg: "Sort by priority" },
          ]
        }
      },
      {
        id: "fetch-app",
        title: "Project: Fetch & Display Data",
        subtitle: "Async/Await + DOM + Error handling",
        xp: 100,
        type: "project",
        theory: `Fetch real data from a public API, handle loading/error states, and render it dynamically. This is the pattern you'll use in every real app.`,
        starterCode: `// MINI PROJECT: GitHub User Search
// Uses: async/await, fetch API, DOM, error handling

const API = 'https://api.github.com/users/';

async function searchUser(username) {
  const output = document.getElementById('output');
  output.innerHTML = '<p class="loading">⏳ Loading...</p>';
  
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(\`\${API}\${username}\`),
      fetch(\`\${API}\${username}/repos?sort=stars&per_page=5\`)
    ]);
    
    if (!userRes.ok) throw new Error("User not found");
    
    const user = await userRes.json();
    const repos = await reposRes.json();
    
    output.innerHTML = \`
      <div class="profile">
        <img src="\${user.avatar_url}" width="80" style="border-radius:50%"/>
        <div>
          <h2>\${user.name || user.login}</h2>
          <p>\${user.bio || 'No bio'}</p>
          <p>⭐ \${user.public_repos} repos | 👥 \${user.followers} followers</p>
        </div>
      </div>
      <h3>Top Repos:</h3>
      <ul>
        \${repos.map(r => \`
          <li>
            <a href="\${r.html_url}" target="_blank">\${r.name}</a>
            ⭐\${r.stargazers_count} — \${r.description || 'No description'}
          </li>
        \`).join('')}
      </ul>
    \`;
  } catch (err) {
    output.innerHTML = \`<p class="error">❌ \${err.message}</p>\`;
  }
}

// Build the UI
document.body.innerHTML = \`
  <div class="search-app">
    <h1>🔍 GitHub User Search</h1>
    <div class="row">
      <input id="search" placeholder="GitHub username..." value="torvalds"/>
      <button id="btn">Search</button>
    </div>
    <div id="output"></div>
  </div>
\`;

document.getElementById('btn').addEventListener('click', () => {
  const val = document.getElementById('search').value.trim();
  if (val) searchUser(val);
});

document.getElementById('search').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn').click();
});

// Load initial
searchUser('torvalds');`,
        challenge: {
          prompt: "Add a 'favorites' feature: clicking a star button on a repo saves it to localStorage. Show favorites in a separate section.",
          tests: [
            { check: code => /localStorage/.test(code), msg: "Use localStorage for persistence" },
            { check: code => /favorite|star/.test(code), msg: "Implement favorites feature" },
          ]
        }
      }
    ]
  }
];

export const TOTAL_XP = CURRICULUM.reduce((sum, section) => 
  sum + section.lessons.reduce((s, l) => s + l.xp, 0), 0
);
