'use strict';

var show = {

	next: function next() {
		if (this.counter < demo.length - 1) {
			this.counter += 1;

			this.animate(this.counter);
			this.activate($('prev')[0]);

			$('themes')[this.counter - 1].style.opacity = 0.3;
			$('themes')[this.counter].style.opacity = 1;

			if (this.counter === demo.length - 1) {
				this.disactivate($('next')[0]);
			}
		}
	},

	prev: function prev() {
		if (this.counter > 0) {
			this.counter -= 1;

			this.animate(this.counter);
			this.activate($('next')[0]);

			$('themes')[this.counter + 1].style.opacity = 0.3;
			$('themes')[this.counter].style.opacity = 1;

			if (this.counter === 0) {
				this.disactivate($('prev')[0]);
			}
		}
	},

	animate: function animate(counter) {
		$('info')[0].style.opacity = 0;

		setTimeout(function () {
			this.draw(counter);
			$('info')[0].style.opacity = 1;
		}.bind(this), 400);
	},

	activate: function activate(element) {
		element.classList.remove('disactivate');
	},

	disactivate: function disactivate(element) {
		element.classList.add('disactivate');
	},

	draw: function draw(counter) {
		$('theme-title')[0].innerHTML = demo[counter].theme;
		$('speaker-name')[0].innerHTML = demo[counter].speaker.name;
		$('speaker-ocupation')[0].innerHTML = demo[counter].speaker.ocupation;
		$('speaker-pic')[0].setAttribute('src', demo[counter].speaker.photo);
	},

	defaults: function defaults() {
		show['counter'] = 0;

		this.draw(this.counter);
		this.disactivate($('prev')[0]);

		for (var i = 0; i < demo.length; i++) {
			var element = document.createElement('div');
			element.classList.add('themes');
			$('navigator')[0].appendChild(element);
		}

		for (var i = 0; i < demo.length; i++) {
			element = document.createElement('div');
			element.classList.add('point');
			$('themes')[i].appendChild(element);
		}

		for (var i = 0; i < demo.length; i++) {
			element = document.createElement('div');
			element.classList.add('theme');
			$('themes')[i].appendChild(element);
		}

		for (var i = 0; i < demo.length; i++) {
			$('theme')[i].innerHTML = demo[i].theme;
		}

		$('themes')[this.counter].style.opacity = 1;
	},

	paralax: function paralax() {
		var x = window.event.pageX;
		var y = window.event.pageY;

		var shiftX = 50 - x * 100 / document.body.clientWidth;
		var shiftY = 50 - y * 100 / document.body.clientHeight;

		var infoX = shiftX / 64;
		var infoY = shiftY / 48;
		var backX = shiftX / 32 - 5;
		var backY = shiftY / 24 - 5;

		// $( 'buttons' )[0].style.transform = 'translate3d(' + infoX + '%, ' + infoY + '%, 1px)'
		// $( 'info' )[0].style.transform = 'translate3d(' + infoX + '%, ' + infoY + '%, 1px)'
		$('background')[0].style.transform = 'translate3d(' + backX + '%, ' + backY + '%, 0.05px)';
	},

	onkeys: function onkeys() {
		if (event.keyCode === 37) {
			this.prev();
		}

		if (event.keyCode === 39) {
			this.next();
		}
	}

};

function $(name) {
	return document.getElementsByClassName(name);
}

// function classes( name, id ) {
// 	if ( id ) {
// 		return get document.getElementsByClassName( name )[id]
// 	} else {
// 		return get document.getElementsByClassName( name )[0]
// 	}
// }

document.body.onmousemove = function () {
	show.paralax();
};

document.body.onkeydown = function () {
	show.onkeys();
};

window.onload = function () {
	show.defaults();
};