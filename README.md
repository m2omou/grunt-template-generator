## Grunt-template-generator


[![npm version](https://badge.fury.io/js/grunt-template-generator.svg)](https://badge.fury.io/js/grunt-template-generator)

Grunt task that help generate template files (angular, nodejs, backbone, java...)

## Prerequisites

This project has a dependencie that require Grunt to be installed. For help to install Grunt, go to: 

http://gruntjs.com/installing-grunt

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)
```bash
npm install grunt-template-generator
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of code:

```javascript
grunt.loadNpmTasks('grunt-template-generator');
```

## Overview

```javascript
 grunt.initConfig({
        generate: {
            options: {
                showPrompt: true,
                includeTest: true,
                wrapInFolder: false,
                templatePathRoot: "modules",
                dest: {
                    // The destination where the files will be stored. 
                    'common': 'modules/common/app/components',
                    'signup': 'modules/signup/app/components',
                    'reporting': 'modules/reporting/app/components',
                    'payments': 'modules/payments/app/components',
                    'backend': '../../src/main/java/com/api/resources/v1'
                },
                acronyms: {
                    // Acronyms are used to prefix a component name
                    'common': 'cn',
                    'signup': 'su',
                    'reporting': 'rp',
                    'payments': 'pm'
                }
            }
        }
    });
```

## Usage

```bash
grunt generate:module:component:name
```

### Options



Scaffold               | Type      | Usage
---                    |---        | ---
showPrompt             | `boolean` | Show a prompt confirmation message before creating files. Default set to true.
includeTest            | `boolean` | Will generate unit test. Defaut set to true.
wrapInFolder           | `boolean` | The generated files will wrap inside a folder. Default set to true.
templatePathRoot       | `string`  | Set file template path root. e.g (`modules/reporting/components/app`), the path should start from `reporting/..`
dest                   | `object`  | The destination where the files will be stored.
acronyms               | `object`  | Acronyms are used to prefix a component name [ac]Name e.g (rpTimeLine) where `rp` stand for reporting.



## License

MIT
