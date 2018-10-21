---
title: isPrimitive
collection: assert
tags:
  - assert
  - validate
  - primitive
---

Returns `true` if the variable is [https://goo.gl/vVKjcW](truthy) in any way.

```js
import { isPrimitive } from "@nore/std/assert";

isPrimitive(Symbol("foo"));
// => true
```
