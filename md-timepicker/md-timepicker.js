(function () {
  'use strict';
  angular.module('myApp').directive('mdTimepicker', [mdTimepicker]);

  function mdTimepicker() {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        dropdownClass: '@',
        ngModel: '='
      },
      link: function (scope, element, attrs) {
        if(!scope.ngModel || !isValidTime(scope.ngModel)){
          scope.ngModel = moment().second(0).milliseconds(0).toDate();
        } else {
          scope.ngModel = moment(scope.ngModel).second(0).milliseconds(0).toDate();;
        }

        function isValidTime(val){
          return moment(val,"YYYY-MM-DD LT", true).isValid();
        }

        if (!scope.timings) {
          scope.timings = [];
          scope.generateTimings = (function (timeDiff) {
            var periods = ['AM', 'PM'],
              hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              min = null;
            for (var i = 0; i < periods.length; i++) {
              for (var j = 0; j < hours.length; j++) {
                for (min = 0; min < 60; min += timeDiff) {
                  var strTime = ('0' + hours[j]).slice(-2) + ':' + ('0' +
                    min).slice(-2) + ' ' + periods[i];
                  scope.timings.push(moment(strTime, 'hh:mm a').second(
                    0).milliseconds(0).toDate());
                }
              }
            }
            return scope.timings;
          })(60);
        }
      },
      template: '<span class="md-timepicker">' +
      '<md-input-container class="time-keyboard">' +
      '<input type="time" name="input" ng-model="ngModel"/>' +
      '</md-input-container>' +
      '<md-input-container class="time-dropdown">' +
      '<md-select ng-model="ngModel" md-container-class="time-list {{dropdownClass}}">' +
      '<span class="md-timepicker-input-mask">' +
      '<i class="material-icons">schedule</i> <p>Time ' +
      '<span>{{ ngModel | date: "hh:mm a" }}</span> </p></span>' +
      '<md-option ng-value="time" ng-repeat="time in timings">' +
      '{{ time | date: "hh:mm a"}}</md-option>' +
      '</md-select>' + '</md-input-container>' +
      '</span>'
    };
  }
  angular.module('myApp').directive('ngModel', function ($filter) {
    return {
      require: '?ngModel',
      link: function (scope, elem, attr, ngModel) {
        if (!ngModel) {
          return;
        }
        if (attr.type !== 'time') {
          return;
        }
        ngModel.$formatters.unshift(function (value) {
          return value.replace(/:00\.000$/, '');
        });
      }
    };
  });
})();
