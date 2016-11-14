'use strict';

var path = require('path');
var _s = require('underscore.string');
var inquirer = require('inquirer');

module.exports = function (grunt) {
    var processed, componentType, componentName, absolutePath, fileName, successCallback;

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function inputValidations(args) {
        if (2 !== args.length) {
            grunt.fail.fatal(new Error('Generate task requires exactly 2 task arguments, e.g. "generate:controller:Name".'));
        }
    }

    function generateTemplate(file) {
        var absoluteTemplatePath = path.resolve(file);
        // generate template
        processed = grunt.template.process(grunt.file.read(absoluteTemplatePath), {
            data: {
                meta: {className: _s.classify(componentName + componentType)}
            }
        });
    }

    function init(options) {
        componentType = capitalize(options.args[0]);
        componentName = options.args[1];
        fileName = componentName + componentType + '.js';
        absolutePath = path.resolve(fileName);
        successCallback = options.async();
    }

    function finalize(data) {
        if (!grunt.file.exists(absolutePath)) {
            grunt.file.write(absolutePath, data);
            return successCallback(true);
        }
        return grunt.fail.fatal(new Error('file already exists: ' + fileName));
    }

    grunt.registerTask('generate', 'Generator for user-defined templates', function () {
        // validation, must provide 2 params
        inputValidations(this.args);
        // set variables
        init(this);
        // get the component template
        var files = grunt.file.expand([path.join(__dirname, '..', 'templates',  componentType.toLowerCase() + '.js')]);
        // check if the template exist
        if (files.length <= 0) {
            grunt.fail.fatal(new Error('No template files match "' + componentType + '".'));
        }
        // generate template
        generateTemplate(files[0]);

        inquirer.prompt([
            {
                type: "confirm",
                message: "Are you sure you want to create '" + fileName + "'?",
                name: "confirmed",
                default: true
            }
        ], function (answers) {
            if (answers.confirmed) {
                return finalize(processed);
            } else {
                return successCallback(false);
            }
        });
    });
};