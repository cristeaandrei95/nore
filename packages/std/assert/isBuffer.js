export default function isBuffer(source) {
	return (
		source != null &&
		source.constructor != null &&
		typeof source.constructor.isBuffer === "function" &&
		source.constructor.isBuffer(source)
	);
}
