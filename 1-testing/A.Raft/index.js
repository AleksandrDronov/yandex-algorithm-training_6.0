function closestSideOrCorner(x1, y1, x2, y2, x, y) {
	if (y < y1) {
	  if (x < x1) {
		return "SW";
	  } else if (x > x2) {
		return "SE";
	  } else {
		return "S";
	  }
	} else if (y > y2) {
	  if (x < x1) {
		return "NW";
	  } else if (x > x2) {
		return "NE";
	  } else {
		return "N";
	  }
	} else {
	  if (x < x1) {
		return "W";
	  } else if (x > x2) {
		return "E";
	  }
	}
	return null;
  }