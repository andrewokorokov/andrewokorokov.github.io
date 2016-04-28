function $ (name) {
	var cName = name.slice(1);

	if (name[0] == '#') {
		return document.getElementById(cName);
	};

	if (name[0] == '.') {
		if (document.getElementsByClassName(cName).length > 1) {
			return document.getElementsByClassName(cName);

		} else {
			return document.getElementsByClassName(cName)[0];
		};
	};

	if (name[0] == '>') {
		if (document.getElementsByTagName(cName).length > 1) {
			return document.getElementsByTagName(cName);

		} else {
			return document.getElementsByTagName(cName)[0];
		};
	};
};

function range (start, end, step) {
	var result = [];

	if (start == undefined) {
		return console.log('Error. No arguments added!');
	};

	if (end == undefined && step == undefined) {
		end = start;
		start = 0;
		step = 1;
	};

	if (step == undefined) {
		step = 1;
	};

	for (start; start <= end; start += step) {
		result.push(start);
	};

	return result;
};

function max (array) {
	var result = array[0];

	for (x in array) {
		result = array[x] > result ? array[x] : result;
	};

	return result;
};

function min (array) {
	var result = array[0];

	for (x in array) {
		result = array[x] < result ? array[x] : result;
	};

	return result;
};
