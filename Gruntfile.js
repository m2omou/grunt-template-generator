'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig(require('load-grunt-configs')(grunt));

    grunt.initConfig({
        generate: {
            options: {
                showPrompt: true,
                includeTest: true,
                // templateUrlRoot: "example",
                dest: {
                    'common': 'example/common',
                    'signup': 'example/signup',
                    'orgManagement': 'example/orgManagement',
                    'reporting': 'example/reporting',
                    'payments': 'example/payments',
                    'scm': 'example/scm'
                },
                acronyms: {
                    'common': 'cn',
                    'signup': 'su',
                    'orgManagement': 'om',
                    'reporting': 'rp',
                    'payments': 'pm',
                    'scm': 'sc'
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
};