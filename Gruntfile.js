'use strict';

module.exports = function( grunt ){

  require( 'time-grunt' )( grunt );
  // Project configuration.
  grunt.initConfig( require( 'load-grunt-configs' )( grunt ) );

  // Actually load this plugin's task(s).
  grunt.loadTasks( 'tasks' );
};