process.on(`unhandledRejection`, error => {
	// This will exit the process in newer Node anyway so lets be consistent
	// across versions and crash
	throw Error(`
    UNHANDLED REJECTION: ${error}
  `);
});

process.on(`uncaughtException`, error => {
	throw Error(`
    UNHANDLED EXCEPTION: ${error}
  `);
});
