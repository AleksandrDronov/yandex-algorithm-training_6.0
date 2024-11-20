function stackWithSum(n, arr) {
	const stack = [];
	const res = [];
	const prefix = [0];

	for (let i = 0; i < n; i++) {
		const operation = arr[i][0];
		const num = Number(arr[i].slice(1));

		if (operation === "+") {
			stack.push(num);
			prefix.push(prefix[prefix.length - 1] + num);
		} else if (operation === "-") {
			res.push(stack.pop());
			prefix.pop();
		} else if (operation === "?") {
			const sum = prefix[prefix.length - 1] - prefix[prefix.length - 1 - num];
			res.push(sum);
		}
	}

	return res.join("\n");
}