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

function range() {
	var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	var end = arguments[1];
	var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	var result = [];

	if (!end) {
		end = start;
		start = 0;
	}

	for (var x = start; x < end; x += step) {
		result.push(x);
	}

	return result;
}