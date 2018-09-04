export default () =>
	console.log(`
    Usage: nore [command] [options]

    Commands:
      start             start nore platform
      build             build files for production

    Options:
      -h --help         displays help information
      -d --debug        run in debug mode
      										default: false
      -m --mode         environment mode
                          default: development
      -p --path         absolute path to project folder
                          default: process.cwd()
`);
