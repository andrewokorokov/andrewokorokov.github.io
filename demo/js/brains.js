
var show = {
	defaults: function() {
			show['counter'] = 0;
			this.draw(this.counter);
	},

	next: function() {
		if (this.counter < demo.length - 1) {
			this.counter += 1;
			this.draw(this.counter);
		}
	},

	prev: function() {
		if (this.counter > 0) {
			this.counter -= 1;
			this.draw(this.counter);
		}
	},

	draw: function(counter) {
		tag('h1')[0].innerHTML = demo[counter].theme;
		tag('h2')[0].innerHTML = demo[counter].speaker.name;
		tag('h3')[0].innerHTML = demo[counter].speaker.ocupation;
		tag('img')[0].setAttribute('src', demo[counter].speaker.photo);
	}
}

function tag(name) {
	return document.getElementsByTagName(name)
}

window.onload = function() {
  show.defaults();
};
