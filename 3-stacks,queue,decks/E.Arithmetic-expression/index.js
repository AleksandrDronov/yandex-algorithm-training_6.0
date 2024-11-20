function solve(str) {
	try {
		return eval(str);
	} catch (error) {
		return "WRONG";
	}
}