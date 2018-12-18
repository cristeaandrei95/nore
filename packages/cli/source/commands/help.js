const help = `
  Usage: nore [command] [options]

  Commands:
    start [handle]    start nore bundling, optionally provide a handle
                      to target a specific bundle

    build [handle]    build files for production, optionally provide a handle
                      to target a specific bundle

    serve             run node bundles and serve client assets

  Options:
    -h --help         displays help information

    -v --version      displays current version

    -d --debug        run in debug mode
                      (default: false)

    -m --mode         environment mode
                      (default: development)

    -p --path         absolute path to project folder
                      (default: process.cwd())
`;

export default () => console.log(help);
