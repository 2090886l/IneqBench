var app = angular.module('IneqBenchControllers', []);


app.controller('MainController', ["$http", "$scope", "$rootScope", function($http, $scope, $rootScope) {

    var url = "http://localhost:8080";

    $scope.showBenchmarking = false;
    $scope.showVisualizing = true;
    // count for loading indicator
    $rootScope.loadingCount = 0;
    $scope.numberOfPeople = null;
    $scope.totalPopulation = null;
    $scope.ageFrom = null;
    $scope.ageTo = null;
    $scope.region = null;
    $scope.gender = null;

    $scope.selectedDeprivations = {};
    $scope.results = {};

    $scope.downloadAsCSV = function() {
        var array = [['Indicator', 'Total Population','Total Deprived', 'Upper Range', 'Estimate', 'Estimate', 'Total Deprived %', 'Estimte %', 'Lower Range %', 'Upper Range %']]; // headers
        var csvRows = [];


        // for every indicator, push the content into an array
        for (var indicator in $scope.results) {
            console.log(indicator);
            var temp = [];
            temp.push($scope.results[indicator].name);
            console.log($scope.results[indicator].name);
            console.log($scope.results[indicator].data);
            for(var value in $scope.results[indicator].data){
                console.log(value);
                console.log($scope.results[indicator].data[value]);
                temp.push($scope.results[indicator].data[value]);
            }
            console.log(temp);
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
        if ($scope.ageFrom == null && $scope.ageTo == null) {
          $scope.ageFrom = 0;
          $scope.ageTo = 90;
        }
        getData($scope.selectedDeprivations[deprivation]['str'],
                $scope.numberOfPeople, $scope.ageFrom, $scope.ageTo,
                $scope.gender, $scope.region.name
        );
      }
    };

    $scope.clearSearch = function() {
      $scope.results = {};
      $scope.selectedDeprivations = {};
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
      console.log(ageFrom, ageTo);
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
        getEducationalAttainment:"Low Educational Attainment",
        getTransport:"Transport",
        getUnemployed:"Unemployed",
        getLivingInDeprivedArea:"Living in a deprived area",
        getHomeless:"Homeless",
        getLowPay:"Low Pay (Income support)",
        getFuelPoverty:"Fuel Poverty",
        getOffenders:"Offenders",
        getIllness:"Long Term Life-limiting illness",
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
    function setResult(data, deprivation){
      data = roundData(data);
      $scope.totalPopulation = data.totalPopulation;
      $scope.results[deprivation] = {data: data, name: deprivationCriteriasNames[deprivation]};
      console.log($scope.results);
    }
    function roundData(data){
      data.totalPopulation=Math.round(data.totalPopulation);
      data.totalDeprived=Math.round(data.totalDeprived);
      data.upperRange=Math.round(data.upperRange);
      data.lowerRange=Math.round(data.lowerRange);
      data.estimate=Math.round(data.estimate);
      data.totalDeprivedPercentage=Math.round((data.totalDeprived/data.totalPopulation)*100);
      data.estimatePercentage=Math.round((data.estimate/$scope.numberOfPeople)*100);
      data.lowerRangePercentage=Math.round((data.lowerRange/$scope.numberOfPeople)*10000)/100;
      data.upperRangePercentage=Math.round((data.upperRange/$scope.numberOfPeople)*10000)/100;
      return data;
    }
}]);
