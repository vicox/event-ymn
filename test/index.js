var expect = require('chai').expect;
var uniqueEventNames = require('../index');

describe('uniqueEventNames', function() {

  it('should return array of same length', function(){
    var events = [];
    events = uniqueEventNames(events);

    expect(events).to.be.instanceof(Array);
    expect(events).to.have.length(0);
  });

});