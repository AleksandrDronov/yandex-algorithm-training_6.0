function solve(n, arr) {
	const arr2 = arr.map((item) => ({
		value: item,
		index: -1,
	}));

	const stack = [];

	for (let i = 0; i < n; i++) {
		while (stack.length > 0 && arr[i] < stack[stack.length - 1].value) {
			stack.pop().index = i;
		}
		stack.push(arr2[i]);
	}

	return arr2.map((item) => item.index).join(" ");
}

// Используется подход ближайшее меньшее справа