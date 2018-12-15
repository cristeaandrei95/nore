## JavaScript API

```js
import Nore from "@nore/nore";

const nore = new Nore({
	mode: "development",
	path: "/my/project",
});
```

| Option    | Description                         | Deafult         |
| --------- | ----------------------------------- | --------------- |
| `path`    | absolute path to the project folder | `process.cwd()` |
| `mode`    | framework runtime mode              | `development`   |
| `isDebug` | run the framework in debugging mode | `false`         |
| `plugins` | an array with nore plugins          | `[]`            |
| `bundles` | an array with nore bundles          | `[]`            |

### `async .load(request)`

A helper to easily load files based on project path. It supports loading: `.js`, `.json`, `.yaml`, `.toml`.

```js
const config = await nore.load("source/config.yaml");
```

### `.plug(namespace, api)`

- `namespace` — a string handle that will be added on the `nore` object.
- `api` — an object containing the plugin’s API

```js
const config = await nore.load("source/config.yaml");
```

### `.log`

An instance of [`pino`](http://getpino.io) logger. Read the [documentation for more details](http://getpino.io/#/docs/api?id=logger).

| method | description                            |
| ------ | -------------------------------------- |
| debug  | developer annotation                   |
| info   | informational messages                 |
| warn   | used for expected errors               |
| error  | used for unexpected errors             |
| fatal  | critical errors that crash the process |

```js
nore.log.debug("Here be dragons!");

nore.log.info({
	service: "bundler",
	bundle: { handle: "client" },
});
```

Debug logs will be displayed when the platform is ran in debug mode:

```sh
nore start --debug
```
