---
title: union
collection: array
tags:
  - array
  - union
---

Creates an array of unique values, in order, from all given arrays

`union(...lists)`

```js
import { union } from "@nore/std/array";

union(["a", "b", "e"], ["a", "d"], ["c"]);
// => ['a', 'b', 'c', 'd', 'e']
```
