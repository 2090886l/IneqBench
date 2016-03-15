/* Jasmine test suite for IneqBench */
/* Code is mostly self-documented */


describe('Front end tests', function() {

	beforeEach(module('IneqBenchControllers'));

	var MainController,
	scope;

	beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
		scope = $rootScope.$new();
		MainController = $controller('MainController', {
			$scope: scope
		});
		$httpBackend = _$httpBackend_;
	}));

	describe('functionallity tests', function () {

		it('should round numbers to the decimal point', function() {
			scope.data = {totalPopulation: 8076, totalDeprived: 41, upperRange: 8.056713981106709, lowerRange: 0.7936575231058619, estimate: 2.53838533927687};
			scope.data = scope.roundData(scope.data);

			expect(scope.data.upperRange).toEqual(8);
			expect(scope.data.lowerRange).toEqual(1);
		});

		it('should set mode to benchmarking', function() {
			scope.benchmark();

			expect(scope.showBenchmarking).toBe(true);
		});

		// Regression test added since sometimes the age was not being set properly
		it('should set age correctly', function() {
			scope.ageFrom = null;
			scope.ageTo = null;
			scope.visualize();
			
			expect(scope.ageFrom).toEqual(0);
			expect(scope.ageTo).toEqual(90);
		});

		// Regression test to ensure that app does not crash if information is not filled out
		it('should not allow you to click visualise unless all the information is filled out', function() {
			expect(scope.numberOfSelectedDeprivations > 0 && scope.region != null && scope.numberOfPeople != null && scope.gender != null).toBe(false);
			scope.numberOfSelectedDeprivations = 1;
			scope.region = "Dumfries & Galloway";
			scope.numberOfPeople = 100;
			scope.gender = "Males:";

			expect(scope.numberOfSelectedDeprivations > 0 && scope.region != null && scope.numberOfPeople != null && scope.gender != null).toBe(true);
		})

	});

	describe('http tests', function() {
		// only testing 1 request as they are all identical
		it('should return ethnicity correctly', inject(function ($http) {
			var numberOfPeople = 100;
			var ageGroup = "30-40";
			var gender = "Males:";

			$http.get('http://localhost:8080/getEthnicity?numberOfPeople='+numberOfPeople+
	            "&ageGroup="+ageGroup+
	            "&gender="+gender)
	        .success(function(data){
	            scope.data = data;
	        });

			$httpBackend.whenGET('http://localhost:8080/getEthnicity?numberOfPeople='+numberOfPeople+
	            "&ageGroup="+ageGroup+
	            "&gender="+gender)
			.respond({ 
	        	totalPopulation: 8076, totalDeprived: 41, upperRange: 8.056713981106709, lowerRange: 0.7936575231058619, estimate: 2.53838533927687
	   		});
	        $httpBackend.flush();

			expect(scope.data).not.toBe(null);
			expect(scope.data.totalDeprived).toEqual(41);
		}));			

	});

});
