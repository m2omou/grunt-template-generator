/**
 * @ngdoc directive
 * @name <%= meta.acronym %>Directives.directive:<%= meta.nameWithAcronym %>
 * @description
 * @restrict EA
 * @scope true
 * @requires
 * @param {object} options Configuration options for the directive
 */

angular.module('<%= meta.acronym %>Directives').directive('<%= meta.nameWithAcronym %>', [function () {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      options: '='
    },
    templateUrl: "<%= meta.absolutePath %>/<%= meta.name %>.tpl.html",
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