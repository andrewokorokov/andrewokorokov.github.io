'use strict';

var show = {

	next: function next() {
		if (this.counter < demo.length - 1) {
			this.counter += 1;

			this.animate(this.counter);
			this.activate(get('.prev'));

			get('.themes[' + (this.counter - 1) + ']').style.opacity = 0.3;
			get('.themes[' + this.counter + ']').style.opacity = 1;

			if (this.counter === demo.length - 1) {
				this.disactivate(get('.next'));
			}
		}
	},

	prev: function prev() {
		if (this.counter > 0) {
			this.counter -= 1;

			this.animate(this.counter);
			this.activate(get('.next'));

			get('.themes[' + (this.counter + 1) + ']').style.opacity = 0.3;
			get('.themes[' + this.counter + ']').style.opacity = 1;

			if (this.counter === 0) {
				this.disactivate(get('.prev'));
			}
		}
	},

	animate: function animate(counter) {
		get('.info').style.opacity = 0;

		setTimeout(function () {
			this.draw(counter);
			get('.info').style.opacity = 1;
		}.bind(this), 400);
	},

	activate: function activate(element) {
		element.classList.remove('disactivate');
	},

	disactivate: function disactivate(element) {
		element.classList.add('disactivate');
	},

	draw: function draw(counter) {
		get('.theme-title').innerHTML = demo[counter].theme;
		get('.theme-description').innerHTML = demo[counter].desc;
		get('.speaker-name').innerHTML = demo[counter].speaker.name;
		get('.speaker-ocupation').innerHTML = demo[counter].speaker.ocupation;
		// get( '.speaker-pic' ).setAttribute( 'src', demo[counter].speaker.photo )
	},

	defaults: function defaults() {
		show['counter'] = 0;

		this.draw(this.counter);
		this.disactivate(get('.prev'));

		for (var x in range(demo.length)) {
			crt('div', '.themes', '.navigator');
			crt('div', '.point', '.themes[' + x + ']');
			crt('div', '.theme', '.themes[' + x + ']');
			get('.theme[' + x + ']').innerHTML = demo[x].theme;
		}

		get('.themes[' + this.counter + ']').style.opacity = 1;
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

		// get( '.buttons' ).style.transform = 'translate3d(' + infoX + '%, ' + infoY + '%, 1px)'
		// get( '.info' ).style.transform = 'translate3d(' + infoX + '%, ' + infoY + '%, 1px)'
		get('.background').style.transform = 'translate3d(' + backX + '%, ' + backY + '%, 0.05px)';
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
	if (get('.navigator')) show.defaults();
};