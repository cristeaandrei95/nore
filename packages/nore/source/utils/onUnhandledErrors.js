process.on(`unhandledRejection`, error => {
	// This will exit the process in newer Node anyway so lets be consistent
	// across versions and crash
	console.error(`
    UNHANDLED REJECTION:

    ${error.message}

    ${error.stack}
`);
});

process.on(`uncaughtException`, error => {
	console.error(`
    UNHANDLED EXCEPTION:

    ${error.message}

    ${error.stack}
`);
});
