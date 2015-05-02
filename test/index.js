var expect = require('chai').expect;
var generateYmn = require('../index');

describe('generateYmn', function() {

  it('should return array of same length', function(){
    var events = generateYmn([]);

    expect(events).to.be.instanceof(Array);
    expect(events).to.have.length(0);
  });

  it('should throw error if event is not an object', function(){
    expect(function() {

      generateYmn(['test']);

    }).to.throw('Event 0 is not an object.');
  });

  it('should throw error if event name is not a string', function(){
    expect(function() {

      generateYmn([{}]);

    }).to.throw('Name of event 0 is not a string.');
  });

  it('should throw error if event date is not a Date object', function(){
    expect(function() {

      generateYmn([{ name: 'test' }]);

    }).to.throw('Date of event 0 is not a Date object.');
  });

  it('should generate ymn for one event correctly', function() {
    var events = generateYmn([
      {
        name: 'test',
        date: new Date(2014, 1, 1)
      }
    ]);
    expect(events[0].ymn).to.eql([false, false, 0]);
  });

  it('should generate ymn for two events in different years correctly', function() {
    var events = generateYmn([
      {
        name: 'test',
        date: new Date(2014, 1, 1)
      },
      {
        name: 'test',
        date: new Date(2015, 1, 1)
      }
    ]);
    expect(events[0].ymn).to.eql([true, false, 0]);
    expect(events[1].ymn).to.eql([true, false, 0]);
  });

  it('should generate ymn for two events in the same year and different months correctly', function() {
    var events = generateYmn([
      {
        name: 'test',
        date: new Date(2015, 1, 1)
      },
      {
        name: 'test',
        date: new Date(2015, 2, 1)
      }
    ]);
    expect(events[0].ymn).to.eql([true, true, 0]);
    expect(events[1].ymn).to.eql([true, true, 0]);
  });

  it('should generate ymn for two events in the same year and same month correctly', function() {
    var events = generateYmn([
      {
        name: 'test',
        date: new Date(2015, 1, 1)
      },
      {
        name: 'test',
        date: new Date(2015, 1, 2)
      }
    ]);
    expect(events[0].ymn).to.eql([true, true, 1]);
    expect(events[1].ymn).to.eql([true, true, 2]);
  });

  it('should generate ymn for three events, two in same year, correctly', function() {
    var events = generateYmn([
      {
        name: 'test',
        date: new Date(2014, 1, 1)
      },
      {
        name: 'test',
        date: new Date(2015, 1, 2)
      },
      {
        name: 'test',
        date: new Date(2015, 2, 1)
      }
    ]);
    expect(events[0].ymn).to.eql([true, false, 0]);
    expect(events[1].ymn).to.eql([true, true, 0]);
    expect(events[2].ymn).to.eql([true, true, 0]);
  });

  it('should generate ymn for three events, two in same month, correctly', function() {
    var events = generateYmn([
      {
        name: 'test',
        date: new Date(2015, 1, 1)
      },
      {
        name: 'test',
        date: new Date(2015, 2, 1)
      },
      {
        name: 'test',
        date: new Date(2015, 2, 2)
      }
    ]);
    expect(events[0].ymn).to.eql([true, true, 0]);
    expect(events[1].ymn).to.eql([true, true, 1]);
    expect(events[2].ymn).to.eql([true, true, 2]);
  });

  it('should generate ymn for two different correctly', function() {
    var events = generateYmn([
      {
        name: 'test1',
        date: new Date(2015, 1, 1)
      },
      {
        name: 'test2',
        date: new Date(2015, 1, 1)
      }
    ]);
    expect(events[0].ymn).to.eql([false, false, 0]);
    expect(events[1].ymn).to.eql([false, false, 0]);
  });

});