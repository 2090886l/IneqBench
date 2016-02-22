var app = angular.module('IneqBenchControllers',[]);


app.controller('MainController',["$http","$scope",function($http,$scope){

    var url = "http://localhost:8080";
    //System state
    $scope.showSelectSection = false;
    $scope.showDeprivationCriteria = false;
    $scope.showPopulationVariables = false;
    $scope.showOutputType = false;
    $scope.isVisualizing = false;
    $scope.wrapper = {}; // use one popVariable object wrapping all the data
    // used because ng-if creates DOM dynamically and Angular cannot find assigned values
    $scope.wrapper.mode = null;//this is either benchmark or predict
    $scope.wrapper.isBenchmarkingCheckedPopVar = false;
    $scope.wrapper.isPredictingCheckedPopVar = false;
    $scope.wrapper.ageRange=null;
    $scope.isBenchmarkingCheckedIneq = false;
    $scope.isPredictingCheckedIneq = false;
    //System state end
    //Population variables
    $scope.wrapper.numberOfPeople = null;
    $scope.wrapper.region=null;
    $scope.wrapper.gender=null;
    $scope.isAllGenderCheckedIneq = false;
    $scope.isMaleGenderCheckedIneq = false;
    $scope.isFemaleGenderChecked = false;
    //Population variables end
    //Deprivation Criteria
    $scope.wrapper.deprivationCriteria=null;
    //Deprivation Criteria end



    //Output type Section Params
    $scope.visualization=null;
    $scope.isBenchmarkingCheckedOutput = false;
    $scope.isPredictingCheckedOutput = false;
    $scope.isAllGenderCheckedOutPut = false;
    $scope.isMaleGenderCheckedOutPut = false;
    $scope.isFemaleGenderCheckedOutPut = false;
    //Output type Section Params end


    $scope.selectedDeprivations = {};
    $scope.results = {};

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
    function getData(deprivation, numberOfPeople, ageGroup, gender, locality) {
      urlStr = url+ '/' + deprivation + '?numberOfPeople=' + numberOfPeople +
          "&ageGroup=" + ageGroup +
          "&gender=" + gender +
          "&locality=" + locality;
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
    $scope.ranges=[
        {rangeStr:"0-10",rangeInt:[0,10]},
        {rangeStr:"10-20",rangeInt:[10,20]},
        {rangeStr:"20-30",rangeInt:[20,30]},
        {rangeStr:"30-40",rangeInt:[30,40]},
        {rangeStr:"40-50",rangeInt:[40,50]},
        {rangeStr:"50-60",rangeInt:[50,60]},
        {rangeStr:"60-70",rangeInt:[60,70]},
        {rangeStr:"70-80",rangeInt:[70,80]},
        {rangeStr:"80-90",rangeInt:[80,90]},
        {rangeStr:"90-100",rangeInt:[90,100]},
        {rangeStr:"100-110",rangeInt:[100,110]}
    ];
    //Data end

    //Mappings End

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

    function nullifyAllViewShowParams(){
        $scope.ethincityDeprivationViewShow = false;
        $scope.taxBandViewShow = false;
        $scope.unpaidCarersViewShow = false;
        $scope.learningDisabilitiesViewShow = false;
        $scope.educationalAttainmentViewShow = false;
        $scope.transportViewShow = false;
        $scope.unemployedViewShow = false;
        $scope.homelessViewShow = false;
        $scope.lowPayViewShow = false;
        $scope.offendersViewShow = false;
        $scope.mentalHealthAndWellbeingViewShow = false;
        $scope.fuelPovertyViewShow = false;
        $scope.illnessViewShow = false;
    }
    //End Miscellaneous

    //Events

    //if the benchmark button is clicked show/hide the correct sections
    //for more info see parameter names
    $scope.benchmarkClicked = function(){
        $scope.showSelectSection = true;
        $scope.showDeprivationCriteria = false;
        $scope.showPopulationVariables = false;
        $scope.showOutputType = false;
        $scope.showDeprivationCriteria = true;
        $scope.wrapper.isBenchmarkingCheckedPopVar = true;
        $scope.wrapper.mode = "benchmarking"; //needed to set the mode, it is not set automatically from ng-model as checked state
        //set  programmatically
    };

    //if the back button is clicked show/hide the correct sections
    //for more info see parameter names
    $scope.backToTop = function(){
        $scope.showDeprivationCriteria = false;
        $scope.showPopulationVariables = false;
        $scope.showOutputType = false;
        $scope.ethincityDeprivationViewShow = false;
        $scope.taxBandViewShow = false;
        $scope.unpaidCarersViewShow = false;
        $scope.learningDisabilitiesViewShow = false;
        $scope.educationalAttainmentViewShow = false;
        $scope.transportViewShow = false;
        $scope.unemployedViewShow = false;
        $scope.homelessViewShow = false;
        $scope.lowPayViewShow = false;
        $scope.offendersViewShow = false;
        $scope.mentalHealthAndWellbeingViewShow = false;
        $scope.fuelPovertyViewShow = false;
        $scope.illnessViewShow = false;
        $scope.isVisualizing = false;
        $scope.showSelectSection = false;
    };

    //if all fields in the Deprivation View are selected ->
    //proceed with the Population View (hide Deprivation and show Population view)
    $scope.doesProceedDeprivationParameters = function(){
        if ($scope.wrapper.deprivationCriteria!=null && $scope.wrapper.numberOfPeople!=null){
            $scope.showDeprivationCriteria = false;
            $scope.showPopulationVariables = true;

            $scope.wrapper.isBenchmarkingCheckedPopVar = false;
            $scope.wrapper.isPredictingCheckedPopVar = false;
        }
    };

    // Visualize button event -> when button clicked, find which criterion is selected and call the corresponding HTTP GET Restful request
    $scope.visualize = function(){
        $scope.isVisualizing = true;
        for (deprivation in $scope.selectedDeprivations) {
            getData($scope.selectedDeprivations[deprivation]['str'],
                    $scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,
                    $scope.wrapper.gender, $scope.wrapper.region.name
            );
        }
    };

    //Setting params for gender mapping gender selected to gender param
    $scope.genderClicked = function (){
        if ($scope.wrapper.gender=="All People:")
            $scope.isAllGenderCheckedIneq =true;
        if ($scope.wrapper.gender=="Males:")
            $scope.isMaleGenderCheckedIneq=true;
        if ($scope.wrapper.gender=="Females:")
            $scope.isFemaleGenderChecked =true;
        $scope.doesProceedDeprivationParameters();
    };

    // Post request and get request examples

    //$http.post("/api/addCustomer", {name:"alex",age:"21"}).success(function(data) {
    //    $scope.hello = data;
    //    console.log(data);
    //})
    //$http.get('/api/getCustomerById?id=2').success(function(data){
    //    console.log(data);
    //});


}]);
