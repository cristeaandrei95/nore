process.on(`unhandledRejection`, error => {
	// This will exit the process in newer Node anyway so lets be consistent
	// across versions and crash
	throw Error(`\n    UNHANDLED REJECTION: \n\n${error}\n`);
});

process.on(`uncaughtException`, error => {
	throw Error(`\n    UNHANDLED EXCEPTION: \n\n${error}\n`);
});
