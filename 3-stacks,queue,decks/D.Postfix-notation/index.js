function solve(arr) {
	const stack = [];

	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] === "number") {
			stack.push(arr[i]);
		} else if (arr[i] === "+" || arr[i] === "-" || arr[i] === "*") {
			const a = stack.pop();
			const b = stack.pop();

			if (arr[i] === "+") {
				stack.push(a + b);
			} else if (arr[i] === "-") {
				stack.push(b - a);
			} else {
				stack.push(a * b);
			}
		} else {
			return "error";
		}
	}

	return stack[0] + '';
}