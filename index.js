/**
 * Generates the ymn for each event in form of [Boolean, Boolean, Number].
 * ymn[0] indicates whether the year should be used.
 * ymn[1] indicates whether the month should be used.
 * ymn[2] contains the number or zero if it should not be used.
 *
 * @param events the list of events with 'name' and 'date'
 * @returns the list of events with 'ymn' added
 */
function generateYmn(events) {
  var ymnTrees = buildYmnTrees(events);

  for (var name in ymnTrees) {
    traverseYmnTree(ymnTrees[name], [], addYmn);
  }
  return events;
}

/**
 * Builds an ymn-tree for each event name.
 *
 * @param events the list of events with 'name' and 'date'
 * @returns the ymn trees by event name
 */
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

/**
 * Recursive function that traverses an ymn-tree and calls
 * the given callback for each event with information about
 * it's parent nodes.
 *
 * @param subtree the current subtree
 * @param parentNodeInfos the current information about the parent nodes
 * @param callback the callback to call on an event
 */
function traverseYmnTree(subtree, parentNodeInfos, callback) {
  parentNodeInfos = parentNodeInfos || [];
  if ('name' in subtree) {
    var event = subtree;
    callback(event, parentNodeInfos);
  } else {
    var siblings = Object.keys(subtree).length;
    var index = 0;
    for (var key in subtree) {
      traverseYmnTree(subtree[key], parentNodeInfos.concat({
        index: index++,
        siblings: siblings
      }), callback);
    }
  }
}

/**
 * Determines the ymn form the parent node information
 * and adds it to the event.
 *
 * @param event the event
 * @param parentNodeInfos the parent node information
 */
function addYmn(event, parentNodeInfos) {
  event.ymn = [
    !!(parentNodeInfos[2].siblings > 1 || parentNodeInfos[1].siblings > 1 || parentNodeInfos[0].siblings > 1),
    !!(parentNodeInfos[2].siblings > 1 || parentNodeInfos[1].siblings > 1),
    parentNodeInfos[2].siblings > 1 ? parentNodeInfos[2].index + 1 : 0
  ];
}

module.exports = generateYmn;