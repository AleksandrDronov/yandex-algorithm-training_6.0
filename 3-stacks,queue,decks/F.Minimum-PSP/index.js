function minimalPSP(n, w, s) {
	const stack = [];
	const res = [...s];

	const map = { "(": ")", "[": "]" };

	for (let char of s) {
		if (char === "(" || char === "[") {
			stack.push(char);
		} else if (
			(char === ")" && stack[stack.length - 1] === "(") ||
			(char === "]" && stack[stack.length - 1] === "[")
		) {
			stack.pop();
		}
	}

	const map2 = { "(": 0, "[": 0 };
	const map3 = {};

	for (let char of s) {
		if (char in map2) {
			map2[char]++;
		}
	}

	for (let i = 0; i < 4; i++) {
		map3[w[i]] = i;
	}

	while (res.length <= n) {
		if (map2["("] + map2["["] === n / 2) {
			let bracet = stack.pop();
			if (bracet === ")" || bracet === "]") {
				bracet = stack.pop();
				continue;
			}
			res.push(map[bracet]);
		} else if (
			map3[map[stack[stack.length - 1]]] < map3["("] &&
			map3[map[stack[stack.length - 1]]] < map3["["]
		) {
			const bracet = stack.pop();
			res.push(map[bracet]);
		} else {
			if (map3["["] < map3["("]) {
				stack.push("[");
				res.push("[");
				map2["["]++;
			} else {
				stack.push("(");
				res.push("(");
				map2["("]++;
			}
		}
	}

	return res.join("");
}