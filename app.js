(function () {
  'use strict';
  var myApp = angular.module('myApp', ['ngMaterial']);

  myApp.controller('myAppController', ['$scope', function ($scope) {
    var vm = this;
    vm.timings = [];
    vm.generateTimings = function (timeDiff) {
      var times = [],
      periods = ['AM', 'PM'],
      hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      prop = null,
      hour = null,
      min = null;

      for (prop in periods) {
        for (hour in hours) {
          for (min = 0; min < 60; min += timeDiff) {
            var strTime = ('0' + hours[hour]).slice(-2) + ':' + ('0' + min).slice(-2) + " " + periods[prop];
            vm.timings.push(moment(strTime, 'hh:mm a').second(0).milliseconds(0).toDate());
          }
        }
      }
      return vm.timings;
    }
  }]);
})();
