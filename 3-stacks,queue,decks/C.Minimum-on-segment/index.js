function solve(n, k, arr) {
	const deck = [];
	const res = [];

	for (let i = 0; i < n; i++) {
		while (deck.length > 0 && arr[i] < deck[deck.length - 1]) {
			deck.pop();
		}
		deck.push(arr[i]);
		if (deck.length > 0 && i >= k - 1) {
			res.push(deck[0]);
		}
		if (deck[0] === arr[i - (k - 1)]) {
			deck.shift();
		}
	}

	return res.join("\n");
}