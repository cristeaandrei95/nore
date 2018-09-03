export default () =>
	console.log(`
    Usage: nore [command] [options]

    Commands:
      start             start nore platform
      build             build files for production

    Options:
      -h --help         displays help information
      -m --mode         environment mode
                          default: development
      -p --path         absolute path to project folder
                          default: process.cwd()
      -c --config       configuration folder
                          default: ./config
      -v --variables    variables folder
                          default: ./variables
`);
