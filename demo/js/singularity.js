'use strict';

/**
*		Function Get Element
*/

function get(name) {
	var names = name.split(/\s/),
	    target = document;

	names.forEach(function (element) {
		var splitter = element.match(/(^[#.>])([\w-]+)\[*(\d+)*\]*/),
		    type = splitter[1],
		    elementName = splitter[2],
		    index = !splitter[3] ? 0 : splitter[3];

		if (type === '#') {
			target = target.getElementById(elementName);
		}

		if (type === '.') {
			target = target.getElementsByClassName(elementName)[index];
		}

		if (type === '>') {
			target = target.getElementsByTagName(elementName)[index];
		}
	});

	return target;
}

/**
*		Function Create Element
*/

function crt(tag, name, parent) {
	var element = document.createElement(tag),
	    names = name.split(/\s/);

	names.forEach(function (el) {
		var splitter = el.match(/(^[#.])([\w-]+)/),
		    type = splitter[1],
		    elementName = splitter[2];

		if (type === '#') {
			element.setAttribute('id', splitter[2]);
		}

		if (type === '.') {
			element.classList.add(splitter[2]);
		}
	});

	get(parent).appendChild(element);
}

/**
*		Function Range
*/

function range(start, end, step) {
	var result = [];

	start = start || 0;
	step = step || 1;

	if (!end) {
		end = start;
		start = 0;
	}

	for (var x = start; x < end; x += step) {
		result.push(x);
	}

	return result;
}