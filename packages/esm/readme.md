# @nore/esm

A set of tools for JS module development

## Installation

```
  $ npm install @nore/esm
```

## API

#### `@nore/esm/register`

Convert ES Modules to CommonJS on runtime:

`read.js`

```
import { readFile } from 'fs'

export default (path, handler) => {
  readFile(path, 'utf8', handler)
}
```

`index.js`

```js
require("@nore/esm/register");

const read = require("./read.js");
```

#### `es`

Run ES Modules files:

`passwords.js`

```
import { readFileSync } from 'fs'

console.log(readFileSync('/etc/passwd', 'utf8'))
```

```
 ▸ es passwords.js
```

---

> License [ISC](https://github.com/nore/esm/blob/master/license) &nbsp;&middot;&nbsp;
> GitHub [@navaru](https://github.com/navaru) &nbsp;&middot;&nbsp;
> Twitter [@navaru](https://twitter.com/navaru)
