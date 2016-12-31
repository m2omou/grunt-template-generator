/**
 * @ngdoc directive
 * @name <%= meta.acronym %>Directives.directive:<%= meta.name %>
 * @description
 * @restrict EA
 * @scope true
 * @requires
 * @param {object} options Configuration options for the directive
 */

angular.module('<%= meta.acronym %>Directives').directive('<%= meta.name %>', [function () {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      options: '='
    },
    templateUrl: "common/app/components/<%= meta.name %>/<%= meta.name %>.tpl.html",
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