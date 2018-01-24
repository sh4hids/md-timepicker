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
