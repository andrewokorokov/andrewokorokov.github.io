function $ (name) {
	var path = name.split(" "),
		id = ".getElementById",
		classes = ".getElementsByClassName",
		tags = ".getElementsByTagName",
		domNode = "", x, tempName;

	for (x = 0; x < path.length; x++) {
		tempName = path[x];

		if (tempName[0] == "#") {
			domNode += id + "('" + tempName.slice(1) + "')";
		};

		if (tempName[0] == ".") {
			if (tempName.slice(tempName.length - 1) == "]") {
				domNode += classes + "('" + tempName.slice(1).split("[")[0] + "')";
				domNode += "[" + tempName.split("[")[1];

			} else {
				domNode += classes + "('" + tempName.slice(1) + "')";
			};
		};

		if (tempName[0] == ">") {
			if (tempName.slice(tempName.length - 1) == "]") {
				domNode += tags + "('" + tempName.slice(1).split("[")[0] + "')";
				domNode += "[" + tempName.split("[")[1];
				
			} else {
				domNode += tags + "('" + tempName.slice(1) + "')";
			};
		};
	};

	return eval("document" + domNode);
};

function range (start, end, step) {
	var result = [];

	if (start == undefined) {
		return console.log("Error. No arguments added!");
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
