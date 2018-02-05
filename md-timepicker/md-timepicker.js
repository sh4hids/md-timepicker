(function() {
  'use strict';
  angular.module('myApp').directive('mdTimepicker', mdTimepicker);

  function mdTimepicker($filter) {
    return {
      restrict: 'E',
      require: 'ngModel',
      replace: true,
      link: function(scope, element, attrs, ngModel) {
        scope.time = moment().second(0).milliseconds(0).toDate();
        if (!scope.timings) {
          scope.timings = [],
          scope.generateTimings = function (timeDiff) {
            console.log("Hello");
            var periods = ['AM', 'PM'],
            hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            prop = null,
            hour = null,
            min = null;

            for (prop in periods) {
              for (hour in hours) {
                for (min = 0; min < 60; min += timeDiff) {
                  var strTime = ('0' + hours[hour]).slice(-2) + ':' + ('0' + min).slice(-2) + " " + periods[prop];
                  scope.timings.push(moment(strTime, 'hh:mm a').second(0).milliseconds(0).toDate());
                }
              }
            }
            return scope.timings;
          }
          scope.generateTimings(60);
        }
      },
      templateUrl: './md-timepicker/md-timepicker.html'
    };
  }

  angular.module('myApp').directive('ngModel', function($filter) {
    return {
      require: '?ngModel',
      link: function(scope, elem, attr, ngModel) {
        if (!ngModel)
          return;
        if (attr.type !== 'time')
          return;

        ngModel.$formatters.unshift(function(value) {
          return value.replace(/:00\.000$/, '')
        });
      }
    }
  });

})();
