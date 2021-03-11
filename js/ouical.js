;(function(exports) {
  var MS_IN_MINUTES = 60 * 1000;

  var formatTime = function(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  var calculateEndTime = function(event) {
    return event.end ?
      formatTime(event.end) :
      formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
  };

  var calendarGenerators = {
    google: function(event) {
      var startTime = formatTime(event.start);
      var endTime = calculateEndTime(event);

      var href = encodeURI([
        'https://www.google.com/calendar/render',
        '?action=TEMPLATE',
        '&text=' + (event.title || ''),
        '&dates=' + (startTime || ''),
        '/' + (endTime || ''),
        '&details=' + (event.description || ''),
        '&sprop=&sprop=name:'
      ].join(''));
      return href;
    },

    ics: function(event) {
      var startTime = formatTime(event.start);
      var endTime = calculateEndTime(event);

      var href = encodeURI(
        'data:text/calendar;charset=utf8,' + [
          'BEGIN:VCALENDAR',
          "PRODID:Calendar",
          'VERSION:2.0',
          'BEGIN:VEVENT',
          "CLASS:PUBLIC",
          'DESCRIPTION:' + (event.description || ''),
          'DTSTART:' + (startTime || ''),
          'DTEND:' + (endTime || ''),
          'SUMMARY:' + (event.title || ''),
          "TRANSP:TRANSPARENT",
          "BEGIN:VALARM",
          "ACTION:DISPLAY",
          'SUMMARY:' + (event.title || ''),
          'DESCRIPTION:' + (event.description || ''),
          "TRIGGER:-PT10M",
          "END:VALARM",
          'END:VEVENT',
          'END:VCALENDAR'].join('\n'));

      return href;
    },
    
    ical: function(event) {
      return this.ics(event);
    },

    outlook: function(event) {
      return this.ics(event);
    }
  };

  var generateCalendars = function(event) {
    return {
      google: calendarGenerators.google(event),
      ical: calendarGenerators.ical(event),
      outlook: calendarGenerators.outlook(event)
    };
  };


  // Make sure we have the necessary event data, such as start time and event duration
  var validParams = function(params) {
    return params.data !== undefined && params.data.start !== undefined &&
      (params.data.end !== undefined || params.data.duration !== undefined);
  };

  exports.createCalendar = function(params) {
    if (!validParams(params)) {
      console.log('Event details missing.');
      return;
    }

    return generateCalendars(params.data);
  };
})(this);
