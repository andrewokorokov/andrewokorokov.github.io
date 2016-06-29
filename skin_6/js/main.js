'use strict';

var slider = {
	images: ['url( ../frame_01.jpg )', 'url( ../frame_03.jpg )', 'url( ../frame_04.jpg )'],

	counter: 0,

	interval: 7000,

	animate: function animate() {
		setInterval(function () {
			getId('slide_' + this.counter).style.opacity = '0';

			if (this.counter < this.images.length) {
				this.counter++;
			} else {
				getId('slide_' + this.counter).style.opacity = '0';
				this.counter = 0;
			}

			getId('slide_' + this.counter).style.opacity = '1';
		}.bind(this), this.interval);
	},

	init: function init() {
		getId('slide_' + this.counter).style.opacity = '1';

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

listener(getId('menu-icon'), 'click', function () {
	getId('sidebar-menu').style.left = '0';
	getId('shop-menu').style.left = '0';
	event.stopPropagation();
	trigger = true;
});

listener(getClass('main-menu-item', 8), 'mouseover', function () {
	getId('shop-menu').style.left = '300px';
});

listener(getId('sidebar-menu'), 'mouseover', function () {
	getTag('body').style.cursor = 'default';
});

listener(getId('sidebar-menu'), 'mouseout', function () {
	getTag('body').style.cursor = 'url(./img/close_cursor.png), auto';
});

listener(getId('shop-menu'), 'mouseover', function () {
	getTag('body').style.cursor = 'default';
});

listener(getId('shop-menu'), 'mouseout', function () {
	getTag('body').style.cursor = 'url(./img/close_cursor.png), auto';
});

listener(getId('sidebar-menu'), 'click', function () {
	event.stopPropagation();
});

listener(document, 'click', function () {
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

function listener(element, action, callback) {
	element.addEventListener(action, callback);
}