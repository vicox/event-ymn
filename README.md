# Event YMN

Helps to create unique event names by adding the year, the month or a number.
It adds an array ymn to each event in the form of [Boolean, Boolean, Number].

    * ymn[0] indicates whether the year should be used.
    * ymn[1] indicates whether the month should be used.
    * ymn[2] contains the number or zero if it should not be used.

Example:

    var generateYmn = require('event-ymn');

    var events = generateYmn([
          {
            name: 'Skiing',
            date: new Date(2015, 1, 1)
          },
          {
            name: 'Skiing',
            date: new Date(2015, 2, 1)
          },
          {
            name: 'Skiing',
            date: new Date(2015, 2, 2)
          }
        ]);

    console.log(events);

    /* returns:
    [ { name: 'Skiing',
        date: Sat Feb 01 2014 00:00:00 GMT+0100 (CET),
        ymn: [ true, false, 0 ] },
      { name: 'Skiing',
        date: Mon Feb 02 2015 00:00:00 GMT+0100 (CET),
        ymn: [ true, true, 0 ] },
      { name: 'Skiing',
        date: Sun Mar 01 2015 00:00:00 GMT+0100 (CET),
        ymn: [ true, true, 1 ] },
      { name: 'Skiing',
        date: Mon Mar 02 2015 00:00:00 GMT+0100 (CET),
        ymn: [ true, true, 2 ] } ]
    */

The event names can now be named like this:

1. Skiing 2014
2. Skiing February 2015
3. Skiing March 2015 (1)
4. Skiing March 2015 (2)