describe('Front end tests', function() {

	beforeEach(module('IneqBench'));

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
			scope.benchmarkClicked();
			expect(scope.wrapper.mode).toEqual("benchmarking");

		});

	});
	describe('http tests', function() {
		beforeEach(inject(function (_$httpBackend_) {
			$httpBackend = _$httpBackend_;


		}));


		// only testing 1 request as they are all identical
		it('should return ethnicity correctly', inject(function ($http) {
			var numberOfPeople = 100;
			var ageGroup = "30-40";
			var gender = "Males:";

			$http.get('http://localhost:8080/getEthnicity?numberOfPeople='+numberOfPeople+
	            "&ageGroup="+ageGroup+
	            "&gender="+gender
	        ).success(function(data){
	            scope.data = data;
	        });

			$httpBackend.whenGET('http://localhost:8080/getEthnicity?numberOfPeople='+numberOfPeople+
	            "&ageGroup="+ageGroup+
	            "&gender="+gender).respond({ 

	        	totalPopulation: 8076, totalDeprived: 41, upperRange: 8.056713981106709, lowerRange: 0.7936575231058619, estimate: 2.53838533927687
	   		});

	        $httpBackend.flush();
			expect(scope.data).not.toBe(null);
			expect(scope.data.totalDeprived).toEqual(41);
		}));			

	});








});
