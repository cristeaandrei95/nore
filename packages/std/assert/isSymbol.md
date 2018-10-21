---
title: isSymbol
collection: assert
tags:
  - assert
  - validate
  - symbol
---

Returns `true` if the variable is [https://goo.gl/vVKjcW](truthy) in any way.

```js
import { isSymbol } from "@nore/std/assert";

isSymbol(Symbol("foo"));
// => true
```
