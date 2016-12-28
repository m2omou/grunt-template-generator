'use strict';

var path = require('path');
var _s = require('underscore.string');
var inquirer = require('inquirer');

module.exports = function (grunt) {
    var moduleName, processed, componentType, componentName, absolutePath, fileName, successCallback;

    var mapAcronym = {
        'common': 'cm',
        'signup': 'su',
        'orgManagement': 'om',
        'reporting': 'rp',
        'payments': 'pm',
        'scm': 'sc'
    };

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

        inquirer.prompt([{
                type: "confirm",
                message: "Are you sure you want to create '" + fileName + "'?",
                name: "confirmed",
                default: true
            }], function (answers) {
                if (answers.confirmed) {
                    return finalize(processed);
                } else {
                    return successCallback(false);
                }
            });
    });

    /**
     * @name capitalize
     * @description capitalize string
     * @param {string}
     */
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * @name inputValidations
     * @description check input validations
     * @param {array} args
     */
    function inputValidations(args) {
        if (3 !== args.length) {
            grunt.fail.fatal(new Error('Generate task requires exactly 3 task arguments, e.g. "generate:reporting:controller:Name".'));
        }
    }

    /**
     * @name generateTemplate
     * @description generate file template
     * @param {file} template
     */
    function generateTemplate(file) {
        var absoluteTemplatePath = path.resolve(file);
        // generate template
        processed = grunt.template.process(grunt.file.read(absoluteTemplatePath), {
            data: {
                meta: {
                    className: _s.classify(componentName + componentType),
                    acronym: mapAcronym[moduleName] ? mapAcronym[moduleName] : ""
                }
            }
        });
    }
    /**
     * @name init
     * @description set the options, file name, etc
     * @param {object} options
     */
    function init(options) {
        moduleName = options.args[0];
        componentType = capitalize(options.args[1]);
        componentName = options.args[2];
        fileName = componentName + componentType + '.js';
        absolutePath = path.resolve(fileName);
        successCallback = options.async();
    }
    /**
     * @name finalize
     * @description will check if the file already exist and will create it
     * @param {file} template
     */
    function finalize(data) {
        if (!grunt.file.exists(absolutePath)) {
            grunt.file.write(absolutePath, data);
            return successCallback(true);
        }
        return grunt.fail.fatal(new Error('file already exists: ' + fileName));
    }
};