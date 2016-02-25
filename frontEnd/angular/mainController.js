var app = angular.module('IneqBenchControllers', []);


app.controller('MainController', ["$http", "$scope", "$rootScope", function($http, $scope, $rootScope) {

    var url = "http://localhost:8080";

    $scope.showBenchmarking = false;
    $scope.showVisualizing = false;
    // count for loading indicator
    $rootScope.loadingCount = 0;
    $scope.numberOfPeople = null;
    $scope.ageFrom = null;
    $scope.ageTo = null;
    $scope.region = null;
    $scope.gender = null;

    $scope.selectedDeprivations = {};
    $scope.results = {};


    $scope.downloadAsCSV = function() {
        // test data
        // $scope.result = [{
        //     totalPopulation: 8076, totalDeprived: 41, upperRange: 8.056713981106709, lowerRange: 0.7936575231058619, estimate: 2.53838533927687
        //     }, {
        //     totalPopulation: 3513, totalDeprived: 46, upperRange: 12.056713981106709, lowerRange: 34.7936575231058619, estimate: 5.53838533927687
        //     }]

        var array = [['Total Population','Total Deprived', 'Upper Range', 'Lower Range', 'Estimate']]; // headers
        var csvRows = [];


        // for every indicator, push the content into an array
        for (var indicator in $scope.result) {
            console.log($scope.result);
            var temp = [];
            for(var value in $scope.result[indicator]){
                temp.push($scope.result[indicator][value]);
            }
            array.push(temp);
        }


        for(var i=0, l=array.length; i<l; ++i){
            csvRows.push(array[i].join(','));
        };

        // create a fake button and click it to initiate download
        var csvString = csvRows.join("\r\n");
        var a         = document.createElement('a');
        a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
        a.target      = '_blank';
        a.download    = 'myFile.csv';

        document.body.appendChild(a);
        a.click();

    }
    $scope.benchmark = function() {
      if (!$scope.showBenchmarking)
        $scope.showBenchmarking = true;
    };

    // Visualize button event -> when button clicked, find which criterion is selected and call the corresponding HTTP GET Restful request
    $scope.visualize = function() {
      $scope.showVisualizing = true;
      for (deprivation in $scope.selectedDeprivations) {
        getData($scope.selectedDeprivations[deprivation]['str'],
                $scope.numberOfPeople, $scope.ageFrom, $scope.ageTo,
                $scope.gender, $scope.region.name
        );
      }
    };

    $scope.clearSearch = function() {
      $scope.results = null;
      $scope.selectedDeprivations = null;
      $scope.ageFrom = null;
      $scope.ageTo = null;
      $scope.numberOfPeople = null;
      $scope.region = null;
      $scope.gender = null;
      $scope.showVisualizing = false;
    };

    // Add/remove a deprivation from the list of selected deprivations.
    $scope.updateSelectedDeprivations = function(deprivation) {
      if (!(deprivation in $scope.selectedDeprivations)) {
        $scope.selectedDeprivations[deprivation] = {str: deprivation, displayPars: true, subPars: {"all":"all"}};
      } else {
        delete $scope.selectedDeprivations[deprivation];
      }
    };

    // Add/remove a sub-parameter for a certain deprivation criterion.
    $scope.updateSelectedSubPars = function(deprivation, subPar) {
      if (!(subPar in $scope.selectedDeprivations[deprivation]["subPars"])) {
        if (subPar == "all") {
          $scope.selectedDeprivations[deprivation]["subPars"] = {"all":"all"};
        } else {
          delete $scope.selectedDeprivations[deprivation]["subPars"]["all"];
          $scope.selectedDeprivations[deprivation]["subPars"][subPar] = subPar;
        }
      } else {
        delete $scope.selectedDeprivations[deprivation]["subPars"][subPar];
      }
    };

    // Send a http request to the api and retrieve the data.
    function getData(deprivation, numberOfPeople, ageFrom, ageTo, gender, locality) {
      urlStr = url+ '/' + deprivation + '/' + numberOfPeople +
          "/" + ageFrom +
          "/" + ageTo +
          "/" + gender +
          "/" + locality;
      $http.get(urlStr).success(function(data){
        setResult(data, deprivation);
      });
    };

    //Mappings
    //Deprivation Criterion params to names mapping
    $scope.deprivationCriteriaDisplayedName=null;
    var deprivationCriteriasNames={
        getEthnicity:"Ethnicity",
        getTax:"Tax Band",
        getUnpaidCarers: "Unpaid Carers",
        getLearningDisabilities:"Learning Disabilities",
        getEducationalAttainment:"Educational Attainment",
        getTransport:"Transport",
        getUnemployed:"Unemployed",
        getLivingInDeprivedArea:"Living in a deprived area",
        getHomeless:"Homeless",
        getLowPay:"Low Pay",
        getFuelPoverty:"Fuel Poverty",
        getOffenders:"Offenders",
        getIllness:"Long Term Life-limiting illness",
        getMentalHealthAndWellbeing:"Long Term Life-limiting illness Mental Health & Wellbeing"
    };

    //Regions
    $scope.regions=[
        {name:'Annandale & Eskdale'},
        {name:'Nithsdale'},
        {name:'Stewartry'},
        {name:'Wigtownshire'},
        {name:'Dumfries & Galloway'}
    ];

    //Miscellaneous
    function setResult(data, daprivation){
      data = roundData(data);
      $scope.results[deprivation] = {data: data, name: deprivationCriteriasNames[deprivation]};
    }
    function roundData(data){
      data.totalPopulation=Math.round(data.totalPopulation);
      data.totalDeprived=Math.round(data.totalDeprived);
      data.upperRange=Math.round(data.upperRange);
      data.lowerRange=Math.round(data.lowerRange);
      data.estimate=Math.round(data.estimate);
      data.totalDeprivedPercentage=Math.round((data.totalDeprived/data.totalPopulation)*100);
      data.estimatePercentage=Math.round((data.estimate/$scope.wrapper.numberOfPeople)*100);
      data.lowerRangePercentage=Math.round((data.lowerRange/$scope.wrapper.numberOfPeople)*10000)/100;
      data.upperRangePercentage=Math.round((data.upperRange/$scope.wrapper.numberOfPeople)*10000)/100;
      return data;
    }
}]);
