---
title: isAsyncFunction
collection: assert
tags:
  - assert
  - validate
  - function
  - async
  - generator
---

Returns `true` if the _source_ is an [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function%2A).

```js
import { isAsyncFunction } from "@nore/std/assert";

isAsyncFunction(function*() {});
// => true
```
