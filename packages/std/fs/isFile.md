---
title: isFile
collection: fs
tags:
  - file system
  - file
  - assert
---

Checks if the path exists and is a file.

`await isFile(path)`

- `path` — a string containing an absolute file path

```js
import { isFile } from "@nore/std/fs"

await isFile("/path/to/file.ext") // => true
```
