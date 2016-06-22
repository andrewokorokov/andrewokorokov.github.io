'use strict';

var slider = {};

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

listener(getId('closer'), 'click', function () {
  getId('sidebar-menu').style.left = '-300px';
  getId('shop-menu').style.left = '-300px';
  trigger = false;
});

listener(getId('sidebar-menu'), 'click', function () {
  event.stopPropagation();
});

listener(document, 'click', function () {
  if (trigger === true) {
    getId('sidebar-menu').style.left = '-300px';
    getId('shop-menu').style.left = '-300px';
    trigger = false;
  }
});

setInterval(function () {
  getId('animate-hover').style.marginLeft = '5px';

  setTimeout(function () {
    getId('animate-hover').style.marginLeft = '0';
  }, 800);
}, 1600);

// var aniHover = {
// 	increment: function () {
// 		getId( 'animate-hover' ).style.marginLeft = '5';
// 		setTimeout( this.decrement(), 8000 );
// 	},
//
// 	decrement: function () {
// 		getId( 'animate-hover' ).style.marginLeft = '0';
// 		setTimeout( this.increment(), 8000 );
// 	}
// }
function animateHover() {
  getId('animate-hover').style.marginLeft = '0';
}

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