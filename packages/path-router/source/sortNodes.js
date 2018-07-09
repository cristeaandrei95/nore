/*
  Sort nodes in array to prioritize matching:

  1. literal
  2. {key}  - param
  3. {key*} - wildcard
  4. {key?} - optional
*/
export default (A, B) => {
	const AFirst = -1;
	const BFirst = 1;

	// one is a literal, or both
	if (!A.key || !B.key) {
		return !A.key ? AFirst : BFirst;
	}

	// both wildcards? can't do
	if (A.wildcard && B.wildcard) {
		throw new Error(`Route conflict wildcards: ${A.segment} ${B.segment}`);
	}

	// one is a wildcard
	if (A.wildcard || B.wildcard) {
		return A.wildcard ? BFirst : AFirst;
	}
};
