---
title: endsWith
collection: string
tags:
  - string
  - includes
---

Determine whether or not a string ends with another string. This method is case-sensitive.

`endsWith(source, search)`

- `source` – the string to search in
- `search` – the characters to be searched for at the end of this string

```js
import { endsWith } from "@nore/std/string";

endsWith("/path/to/file.js", ".js");
// => true
```
