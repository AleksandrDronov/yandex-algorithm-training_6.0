function maxLengthWithRoughness(n, c, s) {
	let l = 0;
	let roughness = 0;
	let maxLength = 0;
	let countA = 0;
	let countB = 0;

	for (let r = 0; r < n; r++) {
		if (s[r] === "a") {
			countA += 1;
		} else if (s[r] === "b") {
			countB += 1;
			roughness += countA;
		}

		while (l < r && roughness > c) {
			if (s[l] === "a") {
				roughness -= countB;
				countA -= 1;
			}
			if (s[l] === "b") {
				countB -= 1;
			}
			l += 1;
		}


		maxLength = Math.max(maxLength, r - l + 1);
	}

	return maxLength;
}