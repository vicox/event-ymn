
module.exports = function(events) {

  for (var i = 0; i < events.length; i++) {
    if (typeof events[i] != 'object') { throw new Error('Event ' + i + ' is not an object.'); }
    if (typeof events[i].name != 'string') { throw new Error('Name of event ' + i + ' is not a string.'); }
    if (!(events[i].date instanceof Date)) { throw new Error('Date of event ' + i + ' is not a Date object.'); }
  }

  return events;

};