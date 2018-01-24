(function() {
  'use strict';
  angular.module('myApp').directive('mdTimepicker', mdTimepicker);

  function mdTimepicker() {
    return {
      restrict: 'E',
      require: 'ngModel',
      replace: true,
      link: function(scope, element, attrs) {
        scope.time = moment().second(0).milliseconds(0).toDate();
      },
      templateUrl: './md-timepicker/md-timepicker.html'
    };
  }

})();
