.directive('<%= meta.className %>', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
    },
    templateUrl: '<%= meta.className %>.html'
  };
  });