'use strict';
let moment = require('moment');

let randomHoliday = {
    generate : (options) => {
        let days    = options.days,
            start   = moment(options.startDate),
            end     = moment(options.endDate),
            exclude = options.excludeDates.map(str => moment(str).format('YYYYMMDD'));

        if (end < start) {
            return 'Error: End date is before start date.';
        }

        if (end > moment(start).add(1, 'year')) {
            return 'Error: Date range is over a year.';
        }

        // get all dates between start and end
        let dates   = [];
        let current = moment(start);
        while (current <= end) {
            dates.push(moment(current));
            current.add(1, 'day');
        }

        // remove weekends and excluded dates from the date array
        dates = dates.filter(date => date.isoWeekday() < 6);
        dates = dates.filter(date => exclude.indexOf(date.format('YYYYMMDD')) === -1 );

        if (days > dates.length) {
            return 'Error: Not enough dates for remaining holidays!';
        }

        // randomly select holidays from eligible days
        let finalDates = [];
        for (let i = 0; i < days; i++) {
            let randomIndex = Math.floor(Math.random() * dates.length);
            finalDates.push(dates[randomIndex]);
            dates.splice(randomIndex, 1);
        }

        // sort and format into a readable format
        finalDates = finalDates.sort((date1, date2) => date1 - date2);
        finalDates = finalDates.map(date => date.format('ddd DD MMM YY'));

        return finalDates;
    }
};

let result = randomHoliday.generate({
    days      : 20,
    startDate : '2017-01-01',
    endDate   : '2017-12-31',
    excludeDates : [
        '2017-01-02', // new years day
        '2017-04-14', // good friday
        '2017-04-17', // easter monday
        '2017-05-01', // may day
        '2017-05-29', // spring bank holiday
        '2017-08-28', // summer bank holiday
        '2017-12-25', // christmas day
        '2017-12-26', // boxing day
        '2017-12-27', // office closed
        '2017-12-28', // office closed
        '2017-12-29'  // office closed
    ]
});

console.log(result);