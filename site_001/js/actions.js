var slider = {

  imageUrls: [
    'url(./img/frame_01.jpg)',
    'url(./img/frame_03.jpg)',
    'url(./img/frame_04.jpg)',
    'url(./img/frame_05.jpg)'
  ],
  parentId:'slider',
  slideTimeSeconds: 7,

  frames: [],
  count: 0,
  setDefaults: function(){
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'slider_temp');
    ul.setAttribute(
      'style',
      'position: relative;' +
      'width: 100%;' +
      'height: 100%;' +
      'list-style: none;' +
      'margin: 0;' +
      'padding: 0;'
    );
    id(this.parentId).appendChild(ul);
    var divPoints = document.createElement('div');
    divPoints.setAttribute('id', 'points');
    divPoints.setAttribute(
      'style',
      'display: flex;' +
      'justify-content: center;' +
      'position: absolute;' +
      'left: 50%;' +
      'transform: translate(-50%, -5vw);' +
      'width: ' + (this.imageUrls.length * 8) + 'vw;'
    );
    id(this.parentId).appendChild(divPoints);
    for (var i = 1; i <= this.imageUrls.length; i++){
      var img = document.createElement('li');
        img.setAttribute('id', 'slide_' + i);
        img.setAttribute('class', 'slide');
        img.setAttribute(
          'style',
          'position: absolute;' +
          'width: 100%;' +
          'height: 100%;' +
          'opacity: 0;' +
          'background-size: cover;' +
          'background-image:' + this.imageUrls[i - 1]
        );
        id('slider_temp').appendChild(img);
      var pnt = document.createElement('div');
        pnt.setAttribute('id', 'point_' + i);
        pnt.setAttribute('class', 'point');
        pnt.setAttribute('onClick', 'slider.clearAction('+ i +')');
        pnt.setAttribute(
          'style',
          'opacity: 1;'+
          'background: white;'+
          'border-radius: 50%;'+
          'width: 10px;'+
          'height: 10px;'+
          'margin-right: 1.2vw;'
        );
      id('points').appendChild(pnt);
      this.frames.push(id('slide_' + i));
    };
    id('points').lastChild.style.marginRight = '0';
    document.styleSheets[0].addRule('.point', 'cursor: pointer;');
    this.frames[this.count].style.opacity = 1;
    id('point_' + (this.count + 1)).style.opacity = 0.5;
  },
  animate: function(){
    var that = this;
    this.action = setInterval(function(){
      that.count++;
      if(that.count == that.frames.length) that.count = 0;
      that.frames[that.count].style.backgroundImage = that.imageUrls[that.count];
      that.frames[that.count].style.opacity = 0;
      id('point_' + (that.count + 1)).style.opacity = 1;
      that.fade();
    }, this.slideTimeSeconds * 1000);
  },
  fade: function(){
    var that = this;
    (function fading(){
      this.request = requestAnimationFrame(fading);
      that.frames[that.count].style.opacity = parseFloat(that.frames[that.count].style.opacity) + 0.01;
      id('point_' + (that.count + 1)).style.opacity -= 0.005;
      if (that.count > 0){
        that.frames[that.count - 1].style.opacity -= 0.01;
        id('point_' + that.count).style.opacity = parseFloat(id('point_' + that.count).style.opacity) + 0.005;
      } else {
        that.frames[that.frames.length - 1].style.opacity -= 0.01;
        id('point_' + that.frames.length).style.opacity = parseFloat(id('point_' + that.frames.length).style.opacity) + 0.005;
      };
      if(that.frames[that.count].style.opacity >= 1) cancelAnimationFrame(this.request);
    })();
  },
  clearAction: function(number){
    var that = this;
    clearInterval(this.action);
    cancelAnimationFrame(this.request);
    (function reanimate(){
      this.request = requestAnimationFrame(reanimate);
      that.frames[that.count].style.opacity -= 0.01;
      that.frames[number - 1].style.opacity = parseFloat(that.frames[number - 1].style.opacity) + 0.01;
      id('point_' + number).style.opacity -= 0.005;
      id('point_' + (that.count + 1)).style.opacity = parseFloat(id('point_' + (that.count + 1)).style.opacity) + 0.05;
      if(that.frames[number - 1].style.opacity >= 1){
        cancelAnimationFrame(this.request);
        that.count = number - 1;
        that.animate();
      };
    })();
  }
};

var sidebar = {
  show: function(){
    var that = this;
    var count = -300;
    id('sidebar').style.left = count + 'px';
    (function showSidebar(){
      this.request = requestAnimationFrame(showSidebar);
      count += 10;
      id('sidebar').style.left = count + 'px';
      if (count == 0) cancelAnimationFrame(this.request);
    })();
  },
  hide: function(){
    var that = this;
    var count = 0;
    id('sidebar').style.left = count + 'px';
    (function hideSidebar(){
      this.request = requestAnimationFrame(hideSidebar);
      count -= 10;
      id('sidebar').style.left = count + 'px';
      if (count == -300) cancelAnimationFrame(this.request);
    })();
  }
}

window.onload = function(){
  slider.setDefaults();
  slider.animate();
};
