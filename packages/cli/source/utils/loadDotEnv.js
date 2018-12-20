import { readFile, itExists } from "@nore/std/fs";

export default async function loadEnv(path) {
  const file = `${path}/.env`;

  if (await itExists(file)) {
    const source = await readFile(file);
    const config = parse(source);

    setProcessEnv(config);

    return config;
  } else {
    return {};
  }
}

function parse(source) {
  const config = {};

  for (const line of source.split("\n")) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const matched = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);

    if (matched == null) continue;

    const key = matched[1];
    const value = fmtValue(matched[2]);

    config[key] = value;
  }

  return config;
}

function fmtValue(value) {
  // remove any surrounding quotes and extra spaces
  return value == null ? "" : value.replace(/(^['"]|['"]$)/g, "").trim();
}

function setProcessEnv(config) {
  for (const key in config) {
    if (process.env[key] === undefined) {
      process.env[key] = config[key];
    }
  }
}

