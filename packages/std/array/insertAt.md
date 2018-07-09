---
title: insertAt
collection: array
tags:
  - array
  - insertAt
---

Inserts a number of items into an array starting from the supplied index.

`insertAt(list, index, items)`

- `list` — the target array
- `index` — the index where to start inserting the items
- `items` — an array containing the items which will be inserted

```js
import { insertAt } from "@nore/std/array";

insertAt(["a", "b", "e"], 2, ["c", "d"]);
// => ['a', 'b', 'c', 'd', 'e']
```
