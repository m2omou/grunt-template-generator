'use strict';

var path = require('path');
var _s = require('underscore.string');
var inquirer = require('inquirer');

module.exports = function (grunt) {
    var moduleName, modulesDst, acronyms, processed, componentType, componentName, fileName,
        successCallback, showPrompt, includeTest, config = grunt.config.get('generate');

    grunt.registerTask('generate', 'Generator for user-defined templates', function () {
        // validation, must provide 2 params
        inputValidations(this.args);
        // set variables
        init(this);
        // get the component template
        var matchedSrcPath = includeTest ? "*" : "!(*test.js)";
        var files = grunt.file.expand([path.join(__dirname, '..', 'templates/' + componentType.toLowerCase(), matchedSrcPath)]);
        // check if the template exist
        if (files.length <= 0) {
            grunt.fail.fatal(new Error('No template files match "' + componentType + '".'));
        }
        // generate templates
        for (var i = 0; i < files.length; i++) {
            generateTemplate(files[i]);
        }

        if (showPrompt) {
            inquirer.prompt([{
                type: "confirm",
                message: "Are you sure you want to create '" + fileName + "'?",
                name: "confirmed",
                default: true
            }], function (answers) {
                if (answers.confirmed) {
                    return finalize();
                } else {
                    return successCallback(false);
                }
            });
        } else {
            return finalize();
        }
    });

    /**
     * @name inputValidations
     * @description check input validations
     * @param {array} args
     */
    function inputValidations(args) {
        if (3 !== args.length) {
            grunt.fail.fatal(new Error('Generate task requires 3 arguments generate:module:component:name (e.g. "generate:reporting:directive:phone)".'));
        }
    }

    /**
     * @name generateTemplate
     * @description generate file template
     * @param {file} template
     */
    function generateTemplate(templatePath) {
        var absoluteTemplatePath = path.resolve(templatePath);
        var acronym = acronyms[moduleName] ? acronyms[moduleName] : "";
        var extension = templatePath.match(/\.(.*)/)[0];  // e.g '.test.js', '.tpl.html'
        var dest = fileName; // will create a folder using the component name

        // check if the file need a specific location
        if (modulesDst && modulesDst[moduleName]) {
            dest = modulesDst[moduleName] + "/" + dest;
        }
        // set template path root. e.g (modules/reporting/components/app), the path should start from /reporting/..
        var templatePathRoot = dest.replace(config.options.templatePathRoot + "/", "");

        // for test files, move them to a test folder
        if (extension.indexOf("test") !== -1) {
            dest += "/test";
        }
        processed.push({
            absolutePath: dest + "/" + fileName + extension,
            file: grunt.template.process(grunt.file.read(absoluteTemplatePath), {
                data: {
                    meta: {
                        name: componentName + componentType,
                        nameWithAcronym: acronym + _s.classify(componentName),
                        dasherizedName: _s.dasherize(acronym + _s.classify(componentName)),
                        acronym: acronym,
                        templatePathRoot: templatePathRoot
                    }
                }
            })
        });
    }
    /**
     * @name init
     * @description set the options, file name, etc
     * @param {object} options
     */
    function init(options) {
        processed = [];
        // grunt config options
        if (config && config.options) {
            acronyms = config.options.acronyms;
            modulesDst = config.options.dest;
            includeTest = config.options.includeTest !== undefined ? config.options.includeTest : true;
            showPrompt = config.options.showPrompt !== undefined ? config.options.showPrompt : true;
        }
        // grunt arguments
        moduleName = options.args[0];
        componentType = _s.capitalize(options.args[1]);
        componentName = options.args[2];
        fileName = componentName + componentType;
        successCallback = options.async();
    }
    /**
     * @name finalize
     * @description will check if the file already exist and will create it
     * @param {file} template
     */
    function finalize() {
        for (var i = 0; i < processed.length; i++) {
            if (grunt.file.exists(processed[i].absolutePath)) {
                return grunt.fail.fatal(new Error('file already exists: ' + processed[i].absolutePath));
            }
            console.log("Created " + processed[i].absolutePath);
            grunt.file.write(processed[i].absolutePath, processed[i].file);
        }
        return successCallback(true);
    }
};