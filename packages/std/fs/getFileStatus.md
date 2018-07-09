---
name: getFileStatus
collection: fs
tags:
  - file system
  - status
  - stat
  - lstat
  - symlink
---

Returns an object providing information about a file's ([https://goo.gl/cksxGd](status)).

`await getFileStatus(path)`

- `path` — a string containing an absolute file path
- `options` – (optional object), see below

Options:

- `symlink` – (boolean) if true, [`lstat`]() is used and if `file` is a symbolic link, then the link itself is stat-ed, not the file that it refers to

```js
import { getFileStatus } from "@nore/std/fs"

const status = await getFileStatus("/path/to/file")

status.isDirectory() // => false
```
