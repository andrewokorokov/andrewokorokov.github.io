'use strict';

var show = {
	next: function next() {
		if (this.counter < demo.length - 1) {
			this.counter += 1;

			this.animate(this.counter);
			this.activate(elm('.prev'));

			elm('.themes[' + (this.counter - 1) + ']').style.opacity = 0.3;
			elm('.themes[' + this.counter + ']').style.opacity = 1;

			if (this.counter === demo.length - 1) this.disactivate(elm('.next'));
		}
	},

	prev: function prev() {
		if (this.counter > 0) {
			this.counter -= 1;

			this.animate(this.counter);
			this.activate(elm('.next'));

			elm('.themes[' + (this.counter + 1) + ']').style.opacity = 0.3;
			elm('.themes[' + this.counter + ']').style.opacity = 1;

			if (this.counter === 0) this.disactivate(elm('.prev'));
		}
	},

	animate: function animate(counter) {
		elm('.info').style.opacity = 0;

		setTimeout(function () {
			this.draw(counter);
			elm('.info').style.opacity = 1;
		}.bind(this), 400);
	},

	activate: function activate(element) {
		element.classList.remove('disactivate');
	},

	disactivate: function disactivate(element) {
		element.classList.add('disactivate');
	},

	draw: function draw(counter) {
		elm('.theme-title').innerHTML = demo[counter].theme;
		elm('.speaker-name').innerHTML = demo[counter].speaker.name;
		elm('.speaker-ocupation').innerHTML = demo[counter].speaker.ocupation;
		elm('.speaker-pic').setAttribute('src', demo[counter].speaker.photo);
	},

	defaults: function defaults() {
		show['counter'] = 0;

		this.draw(this.counter);
		this.disactivate(elm('.prev'));

		for (var x in range(demo.length)) {
			crt('div', '.themes', '.navigator');
			crt('div', '.point', '.themes[' + x + ']');
			crt('div', '.theme', '.themes[' + x + ']');
			elm('.theme[' + x + ']').innerHTML = demo[x].theme;
		}

		elm('.themes[' + this.counter + ']').style.opacity = 1;
	},

	paralax: function paralax() {
		var x = window.event.pageX,
		    y = window.event.pageY,
		    shiftX = 50 - x * 100 / document.body.clientWidth,
		    shiftY = 50 - y * 100 / document.body.clientHeight,
		    infoX = shiftX / 64,
		    infoY = shiftY / 48,
		    backX = shiftX / 32 - 5,
		    backY = shiftY / 24 - 5;

		// elm( '.buttons' ).style.transform = 'translate3d(' + infoX + '%, ' + infoY + '%, 1px)'
		// elm( '.info' ).style.transform = 'translate3d(' + infoX + '%, ' + infoY + '%, 1px)'
		elm('.background').style.transform = 'translate3d(' + backX + '%, ' + backY + '%, 0.05px)';
	},

	onkeys: function onkeys() {
		if (event.keyCode === 37) this.prev();
		if (event.keyCode === 39) this.next();
	}
};

document.body.onmousemove = function () {
	show.paralax();
};

document.body.onkeydown = function () {
	show.onkeys();
};

window.onload = function () {
	if (elm('.navigator')) show.defaults();
};