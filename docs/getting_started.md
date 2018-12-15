# Getting started

Nore requires the following:

- [node.js](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/en/docs/install)

## Application example

An example folder structure to bundle an application for both server and client, with configuration for two environments, development and production.

```
┌─ config
│   ├─ client.development.js
│   ├─ server.development.js
│   ├─ client.production.js
│   └─ server.production.js
├─ source
│   ├─ client.js
│   └─ server.js
├─ variables
│   ├─ theme.yaml
│   └─ server.js
├─ project.json
└─ nore.js
```
