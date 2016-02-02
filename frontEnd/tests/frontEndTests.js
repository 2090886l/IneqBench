describe('Hello World example', function() {

	beforeEach(module('IneqBench'));

	var HelloWorldController,
	scope;

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		HelloWorldController = $controller('TestController', {
			$scope: scope
		});
	}));

	it('works!', function () {
		expect(scope.showSelectSection).toBeFalsy();
	});

});
