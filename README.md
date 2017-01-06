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
customTemplatesUrl     | `object`  | Specify the directory for custom templates

### Templating

The grunt task, comes with some predefined templates such as angular directives, etc ... But you can also custom your own templates using the `customTemplatesUrl` option.


### Meta data

The meta data helps customize your templates, here are some options:


Name               | Description     
---                |---       
name               | The fullname including the componentName and the componentType. E.g (productDirective)
componentName      | The component name. E.g (product)
componentType      | The component type. E.g (directive)
nameWithAcronym    | The fullname including the acronym is speficied. E.g (rpProductDirective)
dasherizedName     | The fullname seperated with dashes. E.g "rpProductDirective" will become "rp-product-directive". Usefull for calling directives in angular for example. 
acronym            | If specified will return the acronym otherwise this will be empty
templatePathRoot   | The absolute path of the file

### Example

For the example, lets use the following custom template for an angular directive:


```javascript
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
    templateUrl: "<%= meta.templatePathRoot %>/<%= meta.name %>.tpl.html",
    controller: function ($scope) {
      /***************************************************
       * Exposed for testing
       ***************************************************/

      /***************************************************
       * Scope variables, functions
       ***************************************************/

      /***************************************************
       * Private variables, functions
       ***************************************************/
    }
  };
}]);
```

Now that we got our template defined lets run the grunt task:

```bash
grunt generate:common:directive:product
```

This will generate the following template:

```javascript
/**
 * @ngdoc directive
 * @name cnDirectives.directive:cnProduct
 * @description
 * @restrict EA
 * @scope true
 * @requires
 * @param {object} options Configuration options for the directive
 */

angular.module('cnDirectives').directive('cnProduct', [function () {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      options: '='
    },
    templateUrl: "common/productDirective/productDirective.tpl.html",
    controller: function ($scope) {
      /***************************************************
       * Exposed for testing
       ***************************************************/

      /***************************************************
       * Scope variables, functions
       ***************************************************/

      /***************************************************
       * Private variables, functions
       ***************************************************/
    }
  };
}]);
```


## License

MIT
