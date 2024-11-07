function minTransfers(n, employees) {
	const totalEmployees = employees.reduce((sum, count) => sum + count, 0);
	const medianPosition = Math.floor((totalEmployees + 1) / 2);

	let left = 0;
	let leftSum = employees[left];
	let totalMoves = 0;

	let cumulativeEmployees = 0;
	let openSpace = -1;

	while (left < n) {
		if (cumulativeEmployees + leftSum < medianPosition) {
			cumulativeEmployees += leftSum;
			left++;
			leftSum = employees[left];
		} else {
			openSpace = left;
			break;
		}
	}

	for (let i = 0; i < n; i++) {
		totalMoves += employees[i] * Math.abs(i - openSpace);
	}

	return totalMoves;
}