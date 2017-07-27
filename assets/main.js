
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
  }*/
/*}*/




// Animating Path Segments
// **************************** Make multiple of these below each other to simulate landscape
function makePath(title) {
  var newPath = new Path({
      name: title,
      strokeColor: 'black',
      strokeWidth: 1,
      strokeCap: 'round'
  });

  return newPath;
}

var amount = 4;
var height = 60;
var path = makePath(1);
var path2 = makePath(2);
var path3 = makePath(3);

/*var group = new Group([path, path2, path3]);
console.log('group', group);*/

for (var i = 0; i <= amount; i++) {
    addSegments(path);
    addSegments(path2);
    addSegments(path3);
}

function onFrame(event) {
    for (var i = 0; i <= amount; i++) {
      animatePaths(event, path, i);
      animatePaths(event, path2, i);
      animatePaths(event, path3, i);
    }

    path.smooth();
    path2.smooth();
    path3.smooth();
}


function addSegments(pathName) {
  return pathName.add(new Point(i / amount, 1) * view.size);
}

function animatePaths(event, pathName, index) {
  var segment = pathName.segments[index];
  var increment = index === 2 || index === 5 ? 1 : 3;
  var sinus = Math.sin(event.time * increment + index);

  return segment.point.y = sinus * height + (pathName.name * 75);
  
}