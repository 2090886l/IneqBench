var app = angular.module('IneqBenchControllers', []);


app.controller('MainController', ["$http", "$scope", "$rootScope", function($http, $scope, $rootScope) {

    var url = "/api/";

    // initialise tooltips
    $(document).ready(function() {
        //$('[data-toggle="tooltip"]').tooltip(); 
    });

    // system state variables
    $scope.showBenchmarking = false;
    $scope.showVisualizing = false;
    // count for loading indicator
    $rootScope.loadingCount = 0;
    // populdation variables
    $scope.numberOfPeople = null;
    $scope.totalPopulation = null;
    $scope.ageFrom = null;
    $scope.ageTo = null;
    $scope.region = null;
    $scope.gender = "All People:";
    // results variables
    $scope.selectedDeprivations = {};
    $scope.numberOfSelectedDeprivations = 0;
    $scope.results = {};

    // function which allows you to download the results as a .csv file
    $scope.downloadAsCSV = function() {
        var currentdate = new Date();
        var datetime =  currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
        // array which holds all the rows of the csv
        var array = [['Generated on: ', datetime],['Indicator', 'Total Population','Total Deprived', 'Upper Range', 'Lower Range', 'Estimate', 'Total Deprived %', 'Estimate %', 'Lower Range %', 'Upper Range %']]; // headers
        var csvRows = [];


        // for every indicator, push the results content into the array
        for (var indicator in $scope.results) {
          var temp = [];
          temp.push($scope.results[indicator].name);
          for(var value in $scope.results[indicator].data){
            temp.push($scope.results[indicator].data[value]);
        }
        array.push(temp);
        }

        // joins all the rows with commas to indicate it's a new row in the csv
        for(var i=0, l=array.length; i<l; ++i){
          csvRows.push(array[i].join(','));
        };

        // create a fake button and click it programatically to initiate download
        var csvString = csvRows.join("\r\n");
        var a         = document.createElement('a');
        a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
        a.target      = '_blank';
        a.download    = 'myFile.csv';

        document.body.appendChild(a);
        a.click();

    }

    // set the system state to benchmarking
    $scope.benchmark = function() {
        if (!$scope.showBenchmarking)
          $scope.showBenchmarking = true;
    };

    // Visualize button event -> when button clicked, find which criterion is selected and call the corresponding HTTP GET Restful request
    $scope.visualize = function() {
        $scope.showVisualizing = true;
        if ($scope.ageFrom == null && $scope.ageTo == null) {
          $scope.ageFrom = 0;
          $scope.ageTo = 90;
        }
        for (deprivation in $scope.selectedDeprivations) {
          $scope.getData($scope.selectedDeprivations[deprivation]['str'],
            $scope.numberOfPeople, $scope.ageFrom, $scope.ageTo,
            $scope.gender, $scope.region.name
            );
        }
    };

    // reset all the variables to initial state to allow for new search
    $scope.clearSearch = function() {
        $scope.results = {};
        $scope.selectedDeprivations = {};
        $scope.numberOfSelectedDeprivations = 0;
        $scope.ageFrom = null;
        $scope.ageTo = null;
        $scope.numberOfPeople = null;
        $scope.region = null;
        $scope.gender = "All People:";
        $scope.showVisualizing = false;
    };

    // Add/remove a deprivation from the list of selected deprivations.
    $scope.updateSelectedDeprivations = function(deprivation) {
        if (!(deprivation in $scope.selectedDeprivations)) {
          $scope.selectedDeprivations[deprivation] = {str: deprivation, displayPars: true, subPars: {"all":"all"}};
          $scope.numberOfSelectedDeprivations++;
        } else {
          delete $scope.selectedDeprivations[deprivation];
          $scope.numberOfSelectedDeprivations--;
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
    $scope.getData = function getData(deprivation, numberOfPeople, ageFrom, ageTo, gender, locality) {
        urlStr = url+ '/' + deprivation + '/' + numberOfPeople +
        "/" + ageFrom +
        "/" + ageTo +
        "/" + gender +
        "/" + locality;
        $http.get(urlStr).success(function(data){
          $scope.setResult(data, deprivation);
        });
    };

    /* Mappings */

    // Deprivation Criterion params to names mapping
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

    // Regions
    $scope.regions=[
        {name:'Annandale & Eskdale'},
        {name:'Nithsdale'},
        {name:'Stewartry'},
        {name:'Wigtownshire'},
        {name:'Dumfries & Galloway'}
    ];


    /* Miscellaneous */
    
    $scope.setResult = function setResult(data, deprivation){
        data = $scope.roundData(data);
        $scope.totalPopulation = data.totalPopulation;
        $scope.results[deprivation] = {data: data, name: deprivationCriteriasNames[deprivation]};
    }

    // Rounds data and transforms some of it to percentages and returns the result of the backend response 
    $scope.roundData = function roundData(data){
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
