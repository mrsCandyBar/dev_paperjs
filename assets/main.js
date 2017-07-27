
/*// Line and directional pointer*/
/*var path = new Path();
    path.strokeColor = 'white';

var start = new Point(100, 100);
    path.moveTo(start);
    path.lineTo(start + [ 100, -0]);*/


/*// Drawing a circle and positioning it center*/
/*var path = new Path.Circle({
      center: view.center,
      radius: 100,
      strokeWidth: 60,
      strokeColor: 'black',
      fillColor: 'blue' 
});

console.log('path >>>', path);

function onResize(event) {
    path.position = view.center;
}*/


/*
// Introducting Paper Script into the Global Scope
// Include this script to the html page
// To use this way within the script tags remove the call to window.onload
paper.install(window);
window.onload = function() {
  paper.setup('myCanvas');

  var path = new Path();
      path.strokeColor = 'black';

  var start = new Point(100, 100);
      path.moveTo(start);
      path.lineTo(start.add([ 200, -50 ]));

  view.draw();
}*/


/*
// Installing event handlers
paper.install(window);
window.onload = function() {
  paper.setup('myCanvas');

  var path = new Path.Rectangle([75,75], [50,100]);
      path.strokeColor = 'black';

  view.onFrame = function(event) {
      path.rotate(3);
  };
}*/


/*
// Working with Tools
paper.install(window);
window.onload = function() {
  paper.setup('myCanvas');

  var tool = new Tool();
  var path;

  tool.onMouseDown = function(event) {
      path = new Path();
      path.strokeColor = 'black';
      path.add(event.point);
  }

  tool.onMouseDrag = function(event) {
      path.add(event.point);
  }
}*/


/*
// Multiple Tools
// place this above the script file in the global scope
<script>
      var tool1,tool2;
    </script>
paper.install(window);
window.onload = function() {
  paper.setup('myCanvas');

  var path;
  function onMouseDown(event) {
      path = new Path();
      path.strokeColor = 'black';
      path.add(event.point);
  }

  tool1 = new Tool();
  tool1.onMouseDown = onMouseDown;
  tool1.onMouseDrag = function(event) {
    path.add(event.point);
  }

  tool2 = new Tool();
  tool2.minDistance = 20;
  tool2.onMouseDown = onMouseDown;
  tool2.onMouseDrag = function(event) {
      path.arcTo(event.point);
  }
}*/


/*
// Animating an object
// Rotating square
var path = new Path.Rectangle({
    point: [75,75],
    size: [75,75],
    strokeColor: 'black'
})

function onFrame(event) {
  path.rotate(3);
}*/


/*
// color changing circle
var path = new Path.Circle({
    center: view.center,
    radius: 70,
    fillColor: 'red'
});

function onFrame(event) {
    path.fillColor.hue += 1;
}*/


/*
// Moving an item
var text = new PointText({
    point: view.center,
    justification: 'center',
    fontSize: 30,
    fillColor: 'white'
});

var destination = Point.random() * view.size;

function onFrame(event) {
  var vector = destination - text.position;
  text.position += vector / 30;
  text.content = Math.round(vector.length);

  if (vector.length < 5) {
    destination = Point.random() * view.size;
  }
}*/


/*
// Moving multiple items
// ****************************** make moving landscape
var count = 300;

var path = new Path.Circle({
    center: [0,0],
    radius: 3,
    fillColor: 'white',
    strokeColor: 'black'
});

var symbol = new Symbol(path);

for (var i = 0; i < count; i++) {
    var center = Point.random() * view.size;
    var placedSymbol = symbol.place(center);
    placedSymbol.scale(i / count);
}

function onFrame(event) {
  // Snow
  for (var i = 0; i < count; i++) {
    var item = project.activeLayer.children[i];
    item.position.y += item.bounds.height / 5;

    if (item.bounds.bottom > view.size.height) {
      item.position.y = -item.bounds.height;
    }
  }

  // horizontal
  /*for (var i = 0; i < count; i++) {
    var item = project.activeLayer.children[i];
    item.position.x += item.bounds.width / 5;

    if (item.bounds.left > view.size.width) {
      item.position.x = -item.bounds.width;
    }
  }*/

  //Random
  /*for (var i = 0; i < count; i++) {
    var item = project.activeLayer.children[i];
    item.position.x += item.bounds.width / 5;

    if (item.bounds.left > view.size.width) {
      if (i % 20 === 0) {
        item.position.y = Point.random().y * view.size.height;
      }
      item.position.x = -item.bounds.width;
    }
  }
}*/



/*
// Animating Path Segments
// **************************** Make multiple of these below each other to simulate landscape
var amount = 5;
var height = 60;
var path = new Path({
    // 80% black:
    strokeColor: [0.8],
    strokeWidth: 30,
    strokeCap: 'square'
});

// var path2 = path.clone();

for (var i = 0; i <= amount; i++) {
    path.add(new Point(i / amount, 1) * view.size);
}

path.selected = true;

function onFrame(event) {
    for (var i = 0; i <= amount; i++) {
      var segment = path.segments[i];
      var increment = i === 2 || i === 5 ? 1 : 3;
      var sinus = Math.sin(event.time * increment + i);

      segment.point.y = sinus * height + 100;
    }

    path.smooth();
}*/


/*
// Smoothing
var path = new Path({
  segments: [[30,75], [30, 25], [80,25], [80,75]],
  strokeColor: 'black',
  closed: true
});

path.fullySelected = true;

var copy = path.clone();
copy.fullySelected = true;
copy.position.x += 100;
copy.smooth();*/


/*
// Simplifying paths
var path;
var myStyle = {
  strokeColor: 'black',
  strokeWidth: 5,
}

var textItem = new PointText(new Point(20, 30));
textItem.fillColor = 'black';
textItem.content = 'Click and drag to draw a line';
var tool = new Tool();

tool.onMouseDown = function(event) {
  if (path) {
    path.selected = false;
  }

  path = new Path();
  path.style = myStyle;
  path.fullySelected = true;
}

tool.onMouseDrag = function(event) {
  path.add(event.point);
  textItem.content = 'Segment count: ' + path.segments.length;
}

tool.onMouseUp = function(event) {
  var segmentCount = path.segments.length;
  path.simplify(50);
  path.fullySelected = true;

  var newSegmentCount = path.segments.length;
  var difference = segmentCount - newSegmentCount;
  var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
  textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}*/


/*
// Flattening Paths
var path = new Path.Circle({
  center: [80, 50],
  radius: 35
});

path.selected = true;
var copy = path.clone();
copy.position.x += 150;
copy.flatten(4);*/


/*
// Mouse click
var myPath = new Path();
myPath.strokeColor = 'black';

var tool = new Tool();
tool.onMouseDown = function(event) {
  myPath.add(event.point);
}*/


/*
// Mouse click and drag event (version 1)
var myPath;
var tool = new Tool();
tool.onMouseDown = function(event) {
  myPath = new Path();
  myPath.strokeColor = 'black';
  myPath.add(event.point);
}

tool.onMouseUp = function(event) {
  myPath.add(event.point);
}*/


/*
// Mouse click and drag using only mouseUp (version 2)
var tool = new Tool();
tool.onMouseUp = function(event) {
  var myPath = new Path();
  myPath.strokeColor = 'black';
  myPath.add(event.downPoint);
  myPath.add(event.point);
}*/


/*
// Path with end point indicator
var myPath;
var tool = new Tool();

tool.onMouseDown = function(event) {
  myPath = new Path();
  myPath.strokeColor = 'black';
}

tool.onMouseDrag = function(event) {
  myPath.add(event.point);
}

tool.onMouseUp = function(event) {
  var myCircle = new Path.Circle({
    center: event.point,
    radius: 10
  });

  myCircle.strokeColor = 'black';
  myCircle.fillColor = 'white';
}*/


/*
// Using the distance the mouse has moved to draw a circle
var tool = new Tool();
tool.onMouseUp = function(event) {
  var circle = new Path.Circle({
    center: event.middlePoint,
    radius: event.delta.length / 2
  });

  circle.strokeColor = 'black';
  circle.fillColor = 'white';
}*/


/*
// Using mindistance to draw a circle
// Using maxDistance to draw circles
// Usind fixedDistance to draw a circle
var tool = new Tool();
tool.minDistance = 100;
tool.maxDistance = 10;
tool.fixedDistance = 30;

tool.onMouseDrag = function(event) {
  var circle = new Path.Circle({
    center: event.middlePoint,
    radius: event.delta.length / 2
  });

  circle.fillColor = 'black';
}*/


/*
// Drawing train tracks using delta
var tool = new Tool();
tool.minDistance = 20;

tool.onMouseDrag = function(event) {
  var path = new Path();
  path.strokeColor = 'black';
  var vector = event.delta;

  vector.angle += 90;
  vector.length = 5;

  path.add(event.middlePoint + vector);
  path.add(event.middlePoint - vector);
}*/


/*
// Drawing traintracks of varying widths depending on delta
var tool = new Tool();
tool.minDistance = 10;
tool.maxDistance = 45;

var path;

tool.onMouseDown = function(event) {
  path = new Path();
  path.strokeColor = 'black';
  path.selected = true;
  //path.fillColor = {
  //  hue: Math.random() * 360,
  //  saturation: 1,
  //  brightness: 1
  //}

  path.add(event.point);
}

tool.onMouseDrag = function(event) {
  var step = event.delta;
  step.angle += 90;

  var top = event.middlePoint + step;
  var bottom = event.middlePoint - step;

  var line = new Path();
  line.strokeColor = 'black';
  line.add(top);
  line.add(bottom);

  path.add(top);
  path.insert(0, bottom);
  path.smooth();
}

tool.onMouseUp = function(event) {
  path.add(event.point);
  path.closed = true;
  path.smooth();
}*/


/*
// Making brush strokes
var tool = new Tool();
tool.fixedDistance = 30;

var path;
var strokeEnds = 6;

tool.onMouseDown = function(event) {
  path = new Path();
  path.fillColor = {
    hue: Math.random() * 360,
    saturation: 1,
    brightness: 1
  };
}

var lastPoint;
tool.onMouseDrag = function(event) {

  if (event.count === 0) {
    addStrokes(event.middlePoint, event.delta * -1);

  } else {
    var step = event.delta / 2;
    step.angle += 90;

    var top = event.middlePoint + step;
    var bottom = event.middlePoint - step;

    path.add(top);
    path.insert(0, bottom);
  }
  path.smooth();

  lastPoint = event.middlePoint;
}

tool.onMouseUp = function(event) {
  var delta = event.point - lastPoint;
  addStrokes(event.point, delta);
  path.closed = true;
  path.smooth();
}

function addStrokes(point, delta) {
  var step = delta.rotate(90);
  var strokePoints = strokeEnds * 2 + 1;
  point -= step / 2;
  step /= strokePoints - 1;

  for (var i = 0; i < strokePoints; i++) {
    var strokePoint = point + step * i;
    var offset = delta * (Math.random() * 0.3 + 0.1);

    if (i % 2) {
      offset *= -1;
    }

    strokePoint += offset;
    path.insert(0, strokePoint);
  }
}*/


/*
// Keyboard character selection
var tool = new Tool();a
var text = new PointText({
  point: view.center,
  content: 'click here to focus and then press some keys',
  justification: 'center',
  fontSize: 15
});

tool.onKeyDown = function(event) {
  text.content = 'The ' + event.key + ' key was pressed!';
}

tool.onKeyUp = function(event) {
  text.content = 'The ' + event.key + ' key was released!';
}*/


/*
// Is key being pressed?
var tool = new Tool();
var path;

tool.onMouseDown = function(event) {
  path = new Path();
  path.strokeColor = 'black';
  path.add(event.point);
}

tool.onMouseDrag = function(event) {
  // Note all modifiers : capsLock, command, control, option, shift
  if(event.modifiers.shift) {
  //if (Key.isDown('a')) {
    path.lastSegment.point = event.point;

  } else {
    path.add(event.point);
  }
}*/


// using WASD keys to create paths
var tool = new Tool();
var position = new Point(100,100);
var step = 10;

var path = new Path();
path.strokeColor = 'black';
path.add(position);

tool.onKeyDown = function(event) {
  if (event.key == 'a') {
    position.x -= step;
  }

  if (event.key == 'd') {
    position.x += step;
  }

  if (event.key == 's') {
    position.y += step;
  }

  if (event.key == 'w') {
    position.y -= step;
  }

  path.add(position);
}