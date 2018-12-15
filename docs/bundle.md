# Bundle

Requirements

- the bundle config must overwrite platform / default configurations
- can use services from core
- can use services from extensions

| Options   | Description                                              | Default                      |
| --------- | -------------------------------------------------------- | ---------------------------- |
| `handle`  | an unique identifier for the bundle                      | \*                           |
| `target`  | environment target: `web` or `node`                      | `web`                        |
| `source`  | the base folder of the source code                       | `source/[handle]`            |
| `webpack` | a `.js` file that will extend the default webpack config | `source/webpack.[handle].js` |
| `output`  | the folder where the bundled files will be written       | `.builds/[handle]`           |

Configuration order loading example:

1. `nore.bundle(options, config)` ← the initial configuration (defaults)
2. `./config/[handle].development.toml` ← extending the default configuration
3. `bundle.config = merge(defaults, [bundle].development.toml)`
