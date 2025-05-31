# LIVE SCOREBOARD LIBRARY

A simple, in-memory, test-driven TypeScript library for managing live football match scores — designed as part of a technical coding assessment. Supports live updates, summary listing by score and recency, and ensures clean OOP design with SOLID principles.

---

## Task Summary

You are building a **Live Scoreboard** library that supports:

1. Starting a new match (`0–0` by default)
2. Updating match scores (absolute values)
3. Finishing/removing a match from the scoreboard
4. Retrieving a **sorted** summary:
   - First by **total score (high → low)**
   - Then by **start time (most recent first)**

### 📋 Example Output Summary
If the following matches and scores exist:

```

Mexico 0 - Canada 5
Spain 10 - Brazil 2
Germany 2 - France 2
Uruguay 6 - Italy 6
Argentina 3 - Australia 1

```

Then the sorted summary should return:

1. Uruguay 6 - Italy 6  
2. Spain 10 - Brazil 2  
3. Mexico 0 - Canada 5  
4. Argentina 3 - Australia 1  
5. Germany 2 - France 2  

---

## Tech Stack

- [Vite](https://vitejs.dev/) – lightweight bundler for rapid development
- TypeScript – type-safe logic
- [Vitest](https://vitest.dev/) – fast test runner (Jest alternative)
- [uuid](https://www.npmjs.com/package/uuid) – unique match IDs

---

## Features

- Prevents duplicate team matches
- Throws errors on invalid or negative scores
- Maintains internal `Map<string, Match>` for fast access
- `getSummary()` is auto-sorted by score and timestamp
- Easy-to-use and fully test-covered core API

---

## Getting Started

### Install dependencies

```bash
npm install
````

### Start development server

```bash
npm run dev
```

### Run tests

```bash
npm run test
```