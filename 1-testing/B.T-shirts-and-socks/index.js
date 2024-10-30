function greedySelection(a, b, c, d) {
	const ans = [];
  
	if (a > 0 && c > 0) {
	  ans.push([b + 1, d + 1]);
	}
	if (b > 0 && d > 0) {
	  ans.push([a + 1, c + 1]);
	}
	if (a > 0 && b > 0) {
	  ans.push([Math.max(a, b) + 1, 1]);
	}
	if (c > 0 && d > 0) {
	  ans.push([1, Math.max(c, d) + 1]);
	}
  
	if (ans.length > 0) {
	  const m = ans.reduce((prev, curr) =>
		prev[0] + prev[1] < curr[0] + curr[1] ? prev : curr
	  );
	  return `${m[0]} ${m[1]}`;
	} else {
	  return null;
	}
  }