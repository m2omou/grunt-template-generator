'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        generate: {
            options: {
                showPrompt: true,
                includeTest: true,
                wrapInFolder: true,
                templatePathRoot: "example",
                customTemplatesUrl: 'myCustomTemplates',
                dest: {
                    'common': 'example/common',
                    'signup': 'example/signup',
                    'orgManagement': 'example/orgManagement',
                    'reporting': 'example/reporting',
                    'payments': 'example/payments',
                    'scm': 'example/scm',
                    'backend': 'example/backend'
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