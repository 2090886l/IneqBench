var app = angular.module('IneqBench',[]);


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
    //Ethincity Deprivation
    $scope.ethincityDeprivationViewShow = false;
    $scope.ethnicityParameters={};
    //Ethincity Deprivation end
    // Tax Band
    $scope.taxBandViewShow = false;
    $scope.taxBand = {};
    // Tax Band end
    // Unpaid carers
    $scope.unpaidCarersViewShow = false;
    $scope.unpaidCarers = {};
    // Unpaid carers end
    // Learning Disabilities
    $scope.learningDisabilitiesViewShow = false;
    $scope.learningDisabilities = {};
    //Learning Disabilities  Disabilities end
    // Educational Attainment
    $scope.educationalAttainmentViewShow = false;
    $scope.educationalAttainment = {};
    // Educational Attainment
    // Transport
    $scope.transportViewShow = false;
    $scope.transport = {};
    $scope.transport.noCar = null;
    $scope.transport.oneCar = null;
    $scope.transport.twoOrMoreCars = null;
    // Transport end
    // Unemployed
    $scope.unemployedViewShow = false;
    $scope.unemployed = {};
    // Unemployed end
    // Living in Deprivated Area
    $scope.livingInDeprivatedAreaViewShow = false;
    $scope.livingInDeprivatedArea = {};
    // Living in Deprivated Area end
    // Homeless
    $scope.homelessViewShow = false;
    $scope.homeless = {};
    // Homeless End
    // Low Pay
    $scope.lowPayViewShow = false;
    $scope.lowPay = {};
    // Low Pay end
    // Fuel Poverty
    $scope.fuelPovertyViewShow = false;
    $scope.fuelPoverty = {};
    // Fuel Poverty
    // Offenders
    $scope.offendersViewShow =false;
    $scope.offenders = {};
    // Offenders end
    // Illnesses
    $scope.illnessViewShow = false;
    $scope.illness = {};
    // Illnesses end
    // Mental Health and Wellbeing
    $scope.mentalHealthAndWellbeingViewShow = false;
    $scope.mentalHealthAndWellbeing = {};
    // Mental Health and Wellbeing end


    //Output type Section Params
    $scope.visualization=null;
    $scope.isBenchmarkingCheckedOutput = false;
    $scope.isPredictingCheckedOutput = false;
    $scope.isAllGenderCheckedOutPut = false;
    $scope.isMaleGenderCheckedOutPut = false;
    $scope.isFemaleGenderCheckedOutPut = false;
    //Output type Section Params end

    //Mappings

    //Deprivation Criterion params to names mapping
    $scope.deprivationCriteriaDisplayedName=null;
    var deprivationCriteriasNames={
        ethnicity:"Ethnicity",
        taxBand:"Tax Band",
        unpaidCarers: "Unpaid Carers",
        learningDisabilities:"Learning Disabilities",
        educationalAttainment:"Educational Attainment",
        transport:"Transport",
        unemployed:"Unemployed",
        livingInDeprivedArea:"Living in a deprived area",
        homeless:"Homeless",
        lowPay:"Low Pay",
        fuelPoverty:"Fuel Poverty",
        offenders:"Offenders",
        illnesses:"Long Term Life-limiting illness",
        mentalHealthAndWellbeing:"Long Term Life-limiting illness Mental Health & Wellbeing"


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
    function setResult(data){
        data= roundData(data);
        $scope.deprivationCriteriaDisplayedName = deprivationCriteriasNames[$scope.wrapper.deprivationCriteria];
        $scope.result=data;
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

    //HTTP Restful Requests
    function getEthnicityData(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getEthnicity?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality
        ).success(function(data){
            setResult(data);
        });
    }

    function getTaxBandData(numberOfPeople,ageGroup,gender,locality){

        $http.get(url+'/getTax?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ ageGroup+
            "&gender="+gender +
            "&locality=" + locality
        ).success(function(data){
            setResult(data);
        })
    }

    function getLearningDisabilities(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getLearningDisabilities?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality
        ).success(function(data){
            setResult(data);
        });
    }


    function getUnpaidCarers(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getUnpaidCarers?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getEducationalAttainment(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getEducationalAttainment?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getTransport(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getTransport?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getUnemployed(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getUnemployed?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getLivingInDeprivedArea(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getLivingInDeprivedArea?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getHomeless(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getHomeless?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getLowPay(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getLowPay?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getFuelPoverty(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getFuelPoverty?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender

        ).success(function(data){
            setResult(data);
        });
    }
    function getOffenders(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getOffenders?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getIllness(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getIllness?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    function getMentalHealthAndWellbeing(numberOfPeople, ageGroup,gender,locality){

        $http.get(url+'/getMentalHealthAndWellbeing?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender+
            "&locality=" + locality

        ).success(function(data){
            setResult(data);
        });
    }
    //HTTP Restful Requests End

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

    //if all fields in the Population View are selected ->
    //proceed with the Output Type View (hide Population and show Output Type view)
    $scope.doesProceedPopulationVariables = function(){
        if ($scope.wrapper.region!=null && $scope.wrapper.ageRange!=null && $scope.wrapper.gender!=null && $scope.wrapper.numberOfPeople!=null &&
            $scope.wrapper.deprivationCriteria!=null){
            $scope.showPopulationVariables = false;
            $scope.showOutputType = true;
            nullifyAllViewShowParams();
            if ($scope.wrapper.deprivationCriteria=="ethnicity")
                $scope.ethincityDeprivationViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="taxBand")
                $scope.taxBandViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="unpaidCarers")
                $scope.unpaidCarersViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="learningDisabilities")
                $scope.learningDisabilitiesViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="educationalAttainment")
                $scope.educationalAttainmentViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="transport")
                $scope.transportViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="unemployed")
                $scope.unemployedViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="livingInDeprivedArea")
                $scope.livingInDeprivatedAreaViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="homeless")
                $scope.homelessViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="lowPay")
                $scope.lowPayViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="fuelPoverty")
                $scope.fuelPovertyViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="offenders")
                $scope.offendersViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="illnesses")
                $scope.illnessViewShow = true;
            else if ($scope.wrapper.deprivationCriteria=="mentalHealthAndWellbeing")
                $scope.mentalHealthAndWellbeingViewShow = true;
        }
    };


    // Visualize button event -> when button clicked, find which criterion is selected and call the corresponding HTTP GET Restful request
    $scope.visualize = function(){
        $scope.isVisualizing=true;
        if ($scope.wrapper.deprivationCriteria=="ethnicity")
            getEthnicityData($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="taxBand")
            getTaxBandData($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="unpaidCarers")
            getUnpaidCarers($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="learningDisabilities")
            getLearningDisabilities($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="educationalAttainment")
            getEducationalAttainment($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="transport")
            getTransport($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="unemployed")
            getUnemployed($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="livingInDeprivedArea")
            getLivingInDeprivedArea($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="homeless")
            getHomeless($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="lowPay")
            getLowPay($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="fuelPoverty")
            getFuelPoverty($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="offenders")
            getOffenders($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="illnesses")
            getIllness($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
        else if ($scope.wrapper.deprivationCriteria=="mentalHealthAndWellbeing")
            getMentalHealthAndWellbeing($scope.wrapper.numberOfPeople, $scope.wrapper.ageRange.rangeInt,$scope.wrapper.gender,$scope.wrapper.region.name);
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
