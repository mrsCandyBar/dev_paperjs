
var amount = 5;
var height = 20;
var pathAmount = 5;
var pathHolder = [];

function createPath(index) {
  var path = new Path({
      name: index,
      strokeColor: '#efefef',
      strokeWidth: 1,
      opacity: index / 4
  });

  return applyGradient(path);
}

function applyGradient(pathObj) {
  var topLeft     = new Point(0, 1) * view.size;
  var bottomRight = new Point(1, 1) * view.size;

  pathObj.fillColor = {
    gradient: {
        stops: [
          ['#0066b3',0],
          ['#f392b8',0.5],
          ['#efefef',0.95]
        ]
    },
    origin: topLeft,
    destination: bottomRight
  }

  return pathObj;
}

function setSegments(wavePath) {
  for (var i = 0; i <= amount; i++) {
      wavePath.add(new Point(i / amount, 0.5) * view.size);
      wavePath.segments[i].point.y = wavePath.segments[i].point.y / 2;
  }

  wavePath.add(new Point(1, 1) * view.size);
  wavePath.add(new Point(0, 1) * view.size);
  wavePath.closed = true;
  return wavePath;
}

function resetSegments(wavePath) {
  for (var i = 0; i <= amount; i++) {
      console.log('path >>', wavePath.segments[i]);
      wavePath.segments[i].point.x = i / amount * view.size.width;
      wavePath.segments[i].point.y = wavePath.segments[i].point.y / 2;
  }

  wavePath.segments[amount + 1].point.x = (1 * view.size.width);
  wavePath.segments[amount + 1].point.y = (1 * view.size.height);

  wavePath.segments[amount + 2].point.x = (0 * view.size.width);
  wavePath.segments[amount + 2].point.y = (1 * view.size.height);
  return wavePath;
}

function createWaves() {
  if (pathHolder.length > 0) {
    for (var i = 0; i < pathHolder.length; i++) {
      pathHolder[i] = resetSegments(pathHolder[i]);
      pathHolder[i] = applyGradient(pathHolder[i]);
    }

  } else {
    for (var i = 0; i < pathAmount; i++) {
      var newPath = createPath(i + 1);
          newPath = setSegments(newPath);
      pathHolder[i] = newPath;
    }
  }
}

function onFrame(event) {
    for (var i = 0; i <= amount; i++) {
      animatePaths(event, pathHolder, i);
    }
}

function animatePaths(event, pathObj, index) {
  for (var i = 0; i < pathObj.length; i++) {
    var obj = pathObj[i]
    var segment = obj.segments[index];
    var increment

    var increment = index % 3 ? 2 : 3;
    var sinus = Math.sin(event.time * increment + index);
    sinus *= height;

    var stepHeight = (pathObj.length - i) * ((10 + i) * 5);
    segment.point.y = (sinus + (view.size.height / 1.5) - stepHeight);
  }
}

createWaves();

function onResize(event) {
    createWaves();
}