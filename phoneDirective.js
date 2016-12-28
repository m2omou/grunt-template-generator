/**
 * @ngdoc directive
 * @name omDirectives.directive:PhoneDirective
 * @description
 * @restrict EA
 * @scope true
 * @requires
 * @param {object} options Configuration options for the directive
 */

angular.module('omDirectives').directive('PhoneDirective', [function () {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      options: '='
    },
    templateUrl: "common/app/components/PhoneDirective/PhoneDirective.tpl.html",
    controller: function ($scope) {
      /***************************************************
       * Exposed for testing
       ***************************************************/

      /***************************************************
       * Scope variables
       ***************************************************/

      /***************************************************
       * Scope functions
       ***************************************************/

      /***************************************************
       * Private variables
       ***************************************************/

      /***************************************************
       * Private functions
       ***************************************************/
    }
  };
}]);