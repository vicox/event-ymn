var expect = require('chai').expect;
var uniqueEventNames = require('../index');

describe('uniqueEventNames', function() {

  it('should return array of same length', function(){
    var events = [];
    events = uniqueEventNames(events);

    expect(events).to.be.instanceof(Array);
    expect(events).to.have.length(0);
  });

  it('should throw error if event is not an object', function(){
    var events = ['test'];

    expect(function() { uniqueEventNames(events); }).to.throw('Event 0 is not an object.');
  });

  it('should throw error if event name is not a string', function(){
    var events = [{}];

    expect(function() { uniqueEventNames(events); }).to.throw('Name of event 0 is not a string.');
  });

  it('should throw error if event date is not a Date object', function(){
    var events = [{
      name: 'test'
    }];

    expect(function() { uniqueEventNames(events); }).to.throw('Date of event 0 is not a Date object.');
  });

});