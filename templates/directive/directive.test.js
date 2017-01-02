describe('Unit: Test <%= meta.nameWithAcronym %> Directive', function () {
    var $compile, $rootScope, scope, element, directiveScope, $httpBackend;

    // load the controller's module
    beforeEach(function () {
        module('<%= meta.acronym %>Directives');
        module('<%= meta.templateUrlRoot %>');

        angular.mock.inject(
            function ($injector, _$compile_, _$rootScope_, _$httpBackend_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
            }
        );
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('# directive', function() {
        it('should handle no config', function (done) {
            scope = $rootScope.$new();
            createDirective(scope);

            expect(element).not.toBe('');
            done();
        });

        it('should handle config', function (done) {
            scope = $rootScope.$new();
            scope.fieldConfigs = getFieldConfig();
            createDirective(scope);

            expect(element).not.toBe('');
            expect(directiveScope.options).not.toBeUndefined();
            done();
        });
    });

    function createDirective(scope) {
        element = angular.element("<<%= meta.dasherizedName %> model='fieldModel' options='fieldConfigs'></<%= meta.dasherizedName %>>");

        // Compile a piece of HTML containing the directive
        // bind the template to scope
        var compiledElement = $compile(element)(scope);
        // run digest to fire watches
        scope.$digest();

        directiveScope = compiledElement.isolateScope();
    }

    function getFieldConfig() {
        return {};
    }
});