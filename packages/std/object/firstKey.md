---
title: firstKey
collection: object
tags:
  - firstKey
  - first
---

Returns the first element of an object.

`firstKey(source)`

- `source` — the source object

```js
import { firstKey } from "@nore/std/object";

const person = {
	fistName: "John",
	lastName: "Doe",
	age: "30",
};

firstKey(person);
// -> "firstName"
```
