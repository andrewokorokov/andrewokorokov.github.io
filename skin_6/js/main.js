'use strict';

/*
 *		Slider actions
 */

var slider = {
	images: ['url( ../frame_01.jpg )', 'url( ../frame_03.jpg )', 'url( ../frame_04.jpg )'],

	interval: 7000,

	animate: function animate() {
		setInterval(function () {
			getId('slide_' + this.counter).style.opacity = '0';
			getClass('trigger-points-item', this.counter).style.opacity = '1';

			if (this.counter < this.images.length - 1) {
				this.counter++;
			} else {
				this.counter = 0;
			}

			getId('slide_' + this.counter).style.opacity = '1';
			getClass('trigger-points-item', this.counter).style.opacity = '.3';
		}.bind(this), this.interval);
	},

	init: function init() {
		this['counter'] = 0;

		var slides = document.createElement('ul');
		var points = document.createElement('ul');
		slides.classList.add('slides');
		points.classList.add('trigger-points');

		for (var x = 0; x < this.images.length; x++) {
			createNode({
				node: 'li',
				classes: 'slides-item',
				id: 'slide_' + x,
				parent: slides
			});

			createNode({
				node: 'li',
				classes: 'trigger-points-item',
				parent: points
			});
		}

		getClass('points').insertAdjacentElement('beforeEnd', points);
		getClass('slider').insertAdjacentElement('afterBegin', slides);

		getId('slide_' + this.counter).style.opacity = '1';
		getClass('trigger-points-item', this.counter).style.opacity = '.3';
		setTimeout(this.animate(), this.interval);
	}
};

window.onload = function () {
	slider.init();
};

/*
 *	Sidebar actions
 */

var trigger = false;

catchClick(getId('menu-icon'), function () {
	getId('sidebar-menu').style.left = '0';
	getId('shop-menu').style.left = '0';
	event.stopPropagation();
	trigger = true;
});

catchMouseOver(getClass('main-menu-item', 8), function () {
	getId('shop-menu').style.left = '300px';
});

catchMouseOver(getId('sidebar-menu'), function () {
	getTag('body').style.cursor = 'default';
});

catchMouseOut(getId('sidebar-menu'), function () {
	getTag('body').style.cursor = 'url(./img/close_cursor.png), auto';
});

catchMouseOver(getId('shop-menu'), function () {
	getTag('body').style.cursor = 'default';
});

catchMouseOut(getId('shop-menu'), function () {
	getTag('body').style.cursor = 'url(./img/close_cursor.png), auto';
});

catchClick(getId('sidebar-menu'), function () {
	event.stopPropagation();
});

catchClick(document, function () {
	if (trigger === true) {
		getId('sidebar-menu').style.left = '-300px';
		getId('shop-menu').style.left = '-300px';
		getTag('body').style.cursor = 'default';
		trigger = false;
	}
});

setInterval(function () {
	getId('animate-hover').style.marginLeft = '5px';

	setTimeout(function () {
		getId('animate-hover').style.marginLeft = '0';
	}, 800);
}, 1600);

/*
 *	Wrapper functions
 */

function getId(element) {
	return document.getElementById(element);
}

function getClass(element, index) {
	index = index || 0;
	return document.getElementsByClassName(element)[index];
}

function getTag(element, index) {
	index = index || 0;
	return document.getElementsByTagName(element)[index];
}

function catchClick(element, callback) {
	element.addEventListener('click', callback);
}

function catchMouseOver(element, callback) {
	element.addEventListener('mouseover', callback);
}

function catchMouseOut(element, callback) {
	element.addEventListener('mouseout', callback);
}

function createNode(element) {
	element.node = element.node;
	element.id = element.id || undefined;
	element.classes = element.classes || undefined;
	element.parent = element.parent || undefined;

	var node = document.createElement(element.node);

	if (element.id) {
		node.setAttribute('id', element.id);
	}

	if (element.classes) {
		if (Array.isArray(element.classes)) {
			element.classes.forEach(function (name) {
				node.classList.add(name);
			});
		} else {
			node.classList.add(element.classes);
		}
	}

	if (element.parent) {
		element.parent.appendChild(node);
	}
}