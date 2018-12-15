const fmtError = (type, error) => `
  UNHANDLED ${type}:

  ${error.message}

  ${error.stack}
`;

process.on(`unhandledRejection`, error => {
  // This will exit the process in newer Node anyway
  // so lets be consistent across versions and crash
  console.error(fmtError("REJECTION", error));
  process.exit(1);
});

process.on(`uncaughtException`, error => {
  console.error(fmtError("EXCEPTION", error));
  process.exit(1);
});
