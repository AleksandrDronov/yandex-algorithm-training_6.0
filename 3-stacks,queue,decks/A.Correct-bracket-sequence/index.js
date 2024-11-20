function psp(arr) {
	const stack = [];

	const brackets = {
		')': '(',
		']': '[',
		'}': '{'
	}

	for (let i = 0; i < arr.length; i++) {
		if ([')', ']', '}'].includes(arr[i]) && brackets[arr[i]] === stack[stack.length - 1]) {
			stack.pop();
		} else {
			stack.push(arr[i]);
		}
	}

	return !stack.length ? 'yes' : 'no';
}