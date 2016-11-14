'use strict';

var path = require( 'path' );
var _s = require( 'underscore.string' );
var inquirer = require( 'inquirer' );

module.exports = function( grunt ){

  grunt.registerTask( 'generate', 'Generator for user-defined templates', function(){
  

    if( 2 !== this.args.length ){
      grunt.fail.fatal( new Error( 'Generate task requires exactly 2 task arguments, e.g. "generate:controller:Name".' ) );
    }


    var componentType = this.args[0];
    var componentName = this.args[1];
    var absolutePath = path.resolve( 'toto/LoginView.js' );
    






    var destArgs = this.args[1].split( '@' );




    var files = grunt.file.expand([path.join( __dirname, '..', 'templates', 'directive.js' )] );

    if( files.length <= 0 ){
      grunt.fail.fatal( new Error( 'No template files match "' + componentType + '".' ) );
    }








    // generate template
    var processed = grunt.template.process( grunt.file.read( '/Users/mouradsabour/Desktop/new-test/templates/directive.js' ), { data : {
      meta : { className : _s.classify( componentName ) }
    }});







    var done = this.async();


    inquirer.prompt( [
        {
          type    : "confirm",
          message : "Are you sure you want to create '" + componentName + "'?",
          name    : "confirmed",
          default : true
        }
      ], function( answers ){
        if( answers.confirmed ){
          return finalize( processed );
        }else{
          return done( false );
        }
      } );




    function finalize( data ){
      if( !grunt.file.exists( absolutePath ) ) {
        grunt.file.write( absolutePath, data );
        return done( true );
      }
      return grunt.fail.fatal( new Error( 'file already exists: ' + componentName ) );
    }





  } );
};