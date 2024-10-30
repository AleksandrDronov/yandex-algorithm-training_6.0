const figures = {
	11111: "I",
	"01111": "O",
	"01101": "C",
	"00101": "L",
	"00110": "H",
	"01100": "P",
  };
  
  // Функция для анализа табло
  function analyzeBoard(n, line) {
	let matrix = line.map((row) => row.split(""));
  
	// Определение углов для области включенных диодов
	let c_tl = [Infinity, Infinity];
	let c_br = [-Infinity, -Infinity];
  
	// Проходим по всей матрице, чтобы найти границы
	for (let y = 0; y < n; y++) {
	  for (let x = 0; x < n; x++) {
		if (matrix[y][x] === "#") {
		  // Обновляем верхний левый угол (минимальные значения x и y)
		  c_tl[0] = Math.min(c_tl[0], x);
		  c_tl[1] = Math.min(c_tl[1], y);
  
		  // Обновляем нижний правый угол (максимальные значения x и y)
		  c_br[0] = Math.max(c_br[0], x);
		  c_br[1] = Math.max(c_br[1], y);
		}
	  }
	}
  
	// Вычисляем оставшиеся углы на основе найденных координат
	let c_tr = [c_br[0], c_tl[1]]; // верхний правый угол
	let c_bl = [c_tl[0], c_br[1]]; // нижний левый угол
  
	// Если не найдено ни одного включенного диода
	if (c_tl[0] === Infinity) return "X";
  
	// Периметры
	const p_tl_br = Math.abs(c_tl[0] - c_br[0]) + Math.abs(c_tl[1] - c_br[1]);
	const p_tr_bl = Math.abs(c_tr[0] - c_bl[0]) + Math.abs(c_tr[1] - c_bl[1]);
	// Определяем координаты области
	let x_s, x_e, y_s, y_e;
	if (p_tl_br >= p_tr_bl) {
	  x_s = c_tl[0];
	  x_e = c_br[0];
	  y_s = c_tl[1];
	  y_e = c_br[1];
	} else {
	  x_s = c_bl[0];
	  x_e = c_tr[0];
	  y_s = c_tr[1];
	  y_e = c_bl[1];
	}
	// Определяем "пустоты" внутри области
	let emptySpaces = [];
  
	// Проверяем на solidness и определяем "пустоты"
	for (let y = y_s; y <= y_e; y++) {
	  for (let x = x_s; x <= x_e; x++) {
		if (matrix[y][x] === ".") {
		  emptySpaces.push([y, x]); // Сохраняем координаты пустот
		}
	  }
	}
  
	// Формируем шаблон
	const template = generateTemplate(y_s, y_e, x_s, x_e, matrix);
  
	if (template === "01111") {
	  // Проверяем замкнутость пустот
	  const isClosed = checkClosed(emptySpaces, matrix);
	  if (!isClosed) return "X";
  
	  // Проверяем, образуют ли пустоты прямоугольник
	  if (!isRectangularEmpty(emptySpaces, matrix)) {
		return "X"; // Пустоты не образуют прямоугольник
	  }
	}
  
	if (template === "00110") {
	  if (!checkTwoRectangles(emptySpaces, matrix)) {
		return "X"; // Пустоты не образуют прямоугольник
	  }
	}
	
	  if (template === "01100") {
	  
	  // Разделяем пустоты на две группы
	  const firstRectangleSpaces = [];
	  const secondRectangleSpaces = [];
  
	  // Сортируем пустоты по координате Y
	  emptySpaces.sort((a, b) => a[0] - b[0]);
  
	  // Первая группа будет состоять из первых пустот
	  firstRectangleSpaces.push(emptySpaces[0]);
	  let empty = emptySpaces[0][0];
  
	  for (let i = 1; i < emptySpaces.length; i++) {
		const [currY] = emptySpaces[i];
		if (currY - empty > 1) {
		  // Если разница Y больше 1, начинаем новую группу
		  secondRectangleSpaces.push(emptySpaces[i]);
		} else {
		  // Иначе добавляем в первую группу
		  firstRectangleSpaces.push(emptySpaces[i]);
		  if (currY > empty) empty = currY;
		}
	  }
  
	  // Проверяем, образуют ли пустоты прямоугольник
	  if (!isRectangularEmpty(firstRectangleSpaces, matrix)) {
		return "X"; // Пустоты не образуют прямоугольник
	  }
	  
	  if (firstRectangleSpaces[0][1] !== secondRectangleSpaces[0][1]) {
		return "X";
	  }
	}
  
	const figure = figures[template] || "X";
	return figure;
  }
  
  function checkTwoRectangles(emptySpaces, matrix) {
	if (emptySpaces.length < 2) return false; // Если меньше двух пустот, не может быть двух прямоугольников
  
	// Создаем множество для хранения уникальных координат
	const uniqueEmptySpaces = new Set(emptySpaces.map(([y, x]) => `${y},${x}`));
  
	// Функция для проверки, образуют ли координаты прямоугольник
	function isRectangle(coords) {
	  if (coords.length === 0) return false;
  
	  const minX = Math.min(...coords.map(([y, x]) => x));
	  const maxX = Math.max(...coords.map(([y, x]) => x));
	  const minY = Math.min(...coords.map(([y, x]) => y));
	  const maxY = Math.max(...coords.map(([y, x]) => y));
  
	  // Проверяем, что все позиции в прямоугольной области заняты пустыми пространствами
	  for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
		  if (!uniqueEmptySpaces.has(`${y},${x}`)) {
			return false; // Если есть позиция, которая не пустая, не прямоугольник
		  }
		}
	  }
  
	  return true; // Все позиции заполнены, значит это прямоугольник
	}
  
	// Разделяем пустоты на две группы
	const firstRectangleSpaces = [];
	const secondRectangleSpaces = [];
  
	// Сортируем пустоты по координате Y
	emptySpaces.sort((a, b) => a[0] - b[0]);
  
	// Первая группа будет состоять из первых пустот
	firstRectangleSpaces.push(emptySpaces[0]);
	let empty = emptySpaces[0][0];
  
	for (let i = 1; i < emptySpaces.length; i++) {
	  const [currY] = emptySpaces[i];
	  if (currY - empty > 1) {
		// Если разница Y больше 1, начинаем новую группу
		secondRectangleSpaces.push(emptySpaces[i]);
	  } else {
		// Иначе добавляем в первую группу
		firstRectangleSpaces.push(emptySpaces[i]);
		if (currY > empty) empty = currY;
	  }
	}
  
	// Проверяем, образуют ли обе группы прямоугольники
	const isFirstRectangle = isRectangle(firstRectangleSpaces);
	const isSecondRectangle = isRectangle(secondRectangleSpaces);
  
	return (isFirstRectangle && isSecondRectangle) && (firstRectangleSpaces[0][1] === secondRectangleSpaces[0][1]);
  
  }
  
  // Функция для проверки, является ли область прямоугольной
  function isRectangular(c_tl, c_tr, c_bl, c_br, matrix) {
	const expectedCorners = [c_tl, c_tr, c_br, c_bl];
  
	for (const [x, y] of expectedCorners) {
	  if (matrix[y][x] !== "#") {
		return false;
	  }
	}
  
	for (let x = c_tl[0]; x <= c_tr[0]; x++) {
	  if (matrix[c_tl[1]][x] !== "#") return false; // верхняя сторона
	  if (matrix[c_bl[1]][x] !== "#") return false; // нижняя сторона
	}
	for (let y = c_tl[1]; y <= c_bl[1]; y++) {
	  if (matrix[y][c_tl[0]] !== "#") return false; // левая сторона
	  if (matrix[y][c_tr[0]] !== "#") return false; // правая сторона
	}
  
	return true;
  }
  
  // Функция для проверки замкнутости пустот
  function checkClosed(emptySpaces, matrix) {
	if (emptySpaces.length === 0) return true;
  
	const visited = new Set();
	const stack = [emptySpaces[0]];
  
	const directions = [
	  [0, 1],
	  [1, 0],
	  [0, -1],
	  [-1, 0],
	];
  
	while (stack.length > 0) {
	  const [y, x] = stack.pop();
	  if (visited.has(`${y},${x}`)) continue;
	  visited.add(`${y},${x}`);
  
	  for (const [dy, dx] of directions) {
		const ny = y + dy;
		const nx = x + dx;
		if (ny < 0 || ny >= matrix.length || nx < 0 || nx >= matrix[0].length)
		  continue;
		if (matrix[ny][nx] === "." && !visited.has(`${ny},${nx}`)) {
		  stack.push([ny, nx]);
		}
	  }
	}
  
	for (const [y, x] of emptySpaces) {
	  if (!visited.has(`${y},${x}`)) return false;
	}
  
	return true;
  }
  
  // Функция для проверки прямоугольности пустот
  function isRectangularEmpty(emptySpaces, matrix) {
	if (emptySpaces.length === 0) return true;
  
	const minX = Math.min(...emptySpaces.map(([y, x]) => x));
	const maxX = Math.max(...emptySpaces.map(([y, x]) => x));
	const minY = Math.min(...emptySpaces.map(([y, x]) => y));
	const maxY = Math.max(...emptySpaces.map(([y, x]) => y));
  
	for (let y = minY; y <= maxY; y++) {
	  for (let x = minX; x <= maxX; x++) {
		if (matrix[y][x] !== ".") {
		  return false; // Если есть элемент, который не пустой, область не прямоугольная
		}
	  }
	}
  
	return true;
  }
  
  // Генерация шаблона
  function generateTemplate(y_s, y_e, x_s, x_e, matrix) {
	let overall = 1,
	  top = 1,
	  left = 1,
	  right = 1,
	  bottom = 1;
	for (let y = y_s; y <= y_e; y++) {
	  for (let x = x_s; x <= x_e; x++) {
		if (matrix[y][x] === ".") {
		  overall = 0;
		  if (y === y_s) top = 0;
		  if (x === x_s) left = 0;
		  if (x === x_e) right = 0;
		  if (y === y_e) bottom = 0;
		  if (x !== x_e) right = 1;
		}
	  }
	}
  
	return `${overall}${top}${left}${right}${bottom}`;
  }
  