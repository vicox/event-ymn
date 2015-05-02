
function generateYmn(events) {
  var ymnTrees = buildYmnTrees(events);

  for (var name in ymnTrees) {
    traverseYmnTree(ymnTrees[name]);
  }
  return events;
}

function buildYmnTrees(events) {
  var ymnTrees = {};

  for (var i = 0; i < events.length; i++) {
    var event = events[i];

    if (typeof event != 'object') { throw new Error('Event ' + i + ' is not an object.'); }
    if (typeof event.name != 'string') { throw new Error('Name of event ' + i + ' is not a string.'); }
    if (!(event.date instanceof Date)) { throw new Error('Date of event ' + i + ' is not a Date object.'); }

    var year = event.date.getFullYear();
    var month = event.date.getMonth();

    if (!(event.name in ymnTrees)) {
      ymnTrees[event.name] = {};
    }
    if (!(year in ymnTrees[event.name])) {
      ymnTrees[event.name][year] = {};
    }
    if (!(month in ymnTrees[event.name][year])) {
      ymnTrees[event.name][year][month] = [];
    }
    ymnTrees[event.name][year][month].push(event);
  }
  return ymnTrees;
}

function traverseYmnTree(subtree, parentNodeInfos) {
  parentNodeInfos = parentNodeInfos || [];
  if ('name' in subtree) {
    var event = subtree;
    addYmn(event, parentNodeInfos)
  } else {
    var siblings = Object.keys(subtree).length;
    var index = 0;
    for (var key in subtree) {
      traverseYmnTree(subtree[key], parentNodeInfos.concat({
        index: index++,
        siblings: siblings
      }));
    }
  }
}

function addYmn(event, parentNodeInfos) {
  event.ymn = [
    !!(parentNodeInfos[2].siblings > 1 || parentNodeInfos[1].siblings > 1 || parentNodeInfos[0].siblings > 1),
    !!(parentNodeInfos[2].siblings > 1 || parentNodeInfos[1].siblings > 1),
    parentNodeInfos[2].siblings > 1 ? parentNodeInfos[2].index + 1 : 0
  ];
}

module.exports = generateYmn;