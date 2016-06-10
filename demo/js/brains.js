'use strict';

var show = {

	next: function next() {
		if (this.counter < demo.length - 1) {
			this.counter += 1;

			this.animate(this.counter);
			this.activate(get('.prev'));
			this.disactivate(get('.subjects[' + (this.counter - 1) + ']'));
			this.activate(get('.subjects[' + this.counter + ']'));

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
			this.disactivate(get('.subjects[' + (this.counter + 1) + ']'));
			this.activate(get('.subjects[' + this.counter + ']'));

			if (this.counter === 0) {
				this.disactivate(get('.prev'));
			}
		}
	},

	animate: function animate(counter) {
		get('.info').style.opacity = 0;
		get('.shader').style.backgroundColor = 'rgba(0, 0, 0, 1)';

		setTimeout(function () {
			this.draw(counter);
			get('.info').style.opacity = 1;
			get('.shader').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		}.bind(this), 400);
	},

	activate: function activate(element) {
		element.classList.remove('disactivate');
	},

	disactivate: function disactivate(element) {
		element.classList.add('disactivate');
	},

	draw: function draw(counter) {
		get('.subject-title').innerHTML = demo[counter].subject;
		get('.subject-description').innerHTML = demo[counter].desc;

		clearNode(get('.speakers'));

		if (Array.isArray(demo[counter].speaker)) {
			for (var i in range(demo[counter].speaker.length)) {
				crt('div', '.speaker_' + i, '.speakers');
				crt('h2', '.speaker-name', '.speaker_' + i);
				crt('h3', '.speaker-occupation', '.speaker_' + i);
				get('.speaker_' + i + ' .speaker-name').innerHTML = demo[counter].speaker[i].name;
				get('.speaker_' + i + ' .speaker-occupation').innerHTML = demo[counter].speaker[i].occupation;
			}
		} else {
			crt('div', '.speaker_0', '.speakers');
			crt('h2', '.speaker-name', '.speaker_0');
			crt('h3', '.speaker-occupation', '.speaker_0');
			get('.speaker-name').innerHTML = demo[counter].speaker.name;
			get('.speaker-occupation').innerHTML = demo[counter].speaker.occupation;
		}

		get('.background').style.backgroundImage = 'url("./img/00' + counter + '.jpg")';
	},

	switchTo: function switchTo(subjectNumber) {
		this.disactivate(get('.subjects[' + this.counter + ']'));
		this.counter = subjectNumber;
		this.activate(get('.subjects[' + this.counter + ']'));

		if (this.counter === demo.length - 1) {
			this.disactivate(get('.next'));
		} else {
			this.activate(get('.next'));
		}

		if (this.counter === 0) {
			this.disactivate(get('.prev'));
		} else {
			this.activate(get('.prev'));
		}

		this.animate(this.counter);
	},

	defaults: function defaults() {
		show['counter'] = 0;

		this.draw(this.counter);
		this.disactivate(get('.prev'));

		for (var x in range(demo.length)) {
			crt('div', '.subjects .disactivate', '.navigator');
			crt('div', '.point', '.subjects[' + x + ']');
			crt('div', '.subject', '.subjects[' + x + ']');
			get('.subject[' + x + ']').innerHTML = demo[x].subject;
			get('.subject[' + x + ']').setAttribute('onclick', 'show.switchTo(' + x + ')');
		}

		this.activate(get('.subjects[' + this.counter + ']'));
	},

	paralax: function paralax() {
		var x = window.event.pageX,
		    y = window.event.pageY,
		    shiftX = 50 - x * 100 / document.body.clientWidth,
		    shiftY = 50 - y * 100 / document.body.clientHeight,
		    backX = shiftX / 32 - 5,
		    backY = shiftY / 24 - 5;

		get('.background').style.transform = 'translate3d( ' + backX + '%, ' + backY + '%, 0.05px )';
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

document.body.onmousemove = function () {
	show.paralax();
};

document.body.onkeydown = function () {
	show.onkeys();
};

window.onload = function () {
	if (get('.navigator')) {
		show.defaults();
	}
};