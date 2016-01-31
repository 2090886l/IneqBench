var app = angular.module('IneqBench',[]);

app.controller('TestController',["$http","$scope",function($http,$scope){
    //System state
    $scope.showSelectSection = false;
    $scope.showPopulationVariables = false;
    $scope.showDeprivationCriteriaParams = false;
    $scope.showOutputType = false;
    $scope.isVisualizing = false;
    //Population variables
    $scope.popVariables = {};
    $scope.popVariables.mode = null;//this is either benchmark or predict
    $scope.popVariables.isBenchmarkingCheckedPopVar = false;
    $scope.popVariables.isPredictingCheckedPopVar = false;
    $scope.popVariables.numberOfPeople = null;
    $scope.popVariables.region=null;
    $scope.popVariables.gender=null;
    $scope.popVariables.ageRange=null;
    //Population variables end
    //Deprivation Criteria
    $scope.popVariables.deprivationCriteria=null;
    $scope.popVariables.deprivationCriteria=null;
    //Deprivation Criteria end
    //Ethincity Deprivation
    $scope.ethincityDeprivationViewShow = false;
    $scope.ineqParameters={};
    $scope.isBenchmarkingCheckedIneq = false;
    $scope.isPredictingCheckedIneq = false;
    $scope.isAllGenderCheckedIneq = false;
    $scope.isMaleGenderCheckedIneq = false;
    $scope.isFemaleGenderChecked = false;
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


    //Output type
    $scope.visualization=null;
    $scope.isBenchmarkingCheckedOutput = false;
    $scope.isPredictingCheckedOutput = false;
    //Output type end
    $scope.isAllGenderCheckedOutPut = false;
    $scope.isMaleGenderCheckedOutPut = false;
    $scope.isFemaleGenderCheckedOutPut = false;
    //System state end

    //Deprivation Criterias
    $scope.deprivationCriteriaDisplayedName=null;
    var deprivationCriteriasNames={
        ethicity:"Ethnicity",
        taxBand:"Tax Band",
        unpaidCarers: "Unpaid Carers",
        transport:"Transport"
    };
    //Data
    $scope.regions=[
        {name:'AnnandaleEskdale'},
        {name:'Nithsdale'},
        {name:'Stewartry'},
        {name:'Wigtownshire'},
        {name:'DumfriesGalloway'},
        {name:'Scotland'}
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


    //$http.post("http://localhost:8080/addCustomer", {name:"alex",age:"21"}).success(function(data) {
    //    $scope.hello = data;
    //    console.log(data);
    //})
    //$http.get('http://localhost:8080/getCustomerById?id=2').success(function(data){
    //    console.log(data);
    //});

    //Miscellaneous
    function setResult(data){
        data= roundData(data);
        $scope.deprivationCriteriaDisplayedName = deprivationCriteriasNames[$scope.popVariables.deprivationCriteria];
        $scope.result=data;
    }
    function roundData(data){
        data.totalPopulation=Math.round(data.totalPopulation);
        data.totalDeprived=Math.round(data.totalDeprived);
        data.upperRange=Math.round(data.upperRange);
        data.lowerRange=Math.round(data.lowerRange);
        data.estimate=Math.round(data.estimate);
        data.totalDeprivedPercentage=Math.round((data.totalDeprived/data.totalPopulation)*100);
        data.estimatePercentage=Math.round((data.estimate/$scope.popVariables.numberOfPeople)*100);
        data.lowerRangePercentage=Math.round((data.lowerRange/$scope.popVariables.numberOfPeople)*10000)/100;
        data.upperRangePercentage=Math.round((data.upperRange/$scope.popVariables.numberOfPeople)*10000)/100;
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
    function getEthicityData(numberOfPeople, ageGroup,gender){//numberOfPeople: int ageGroup:list<int>
        //$http.post("http://localhost:8080/getEthnicity",
        //    {numberOfPeople:numberOfPeople,ageGroup:ageGroup,gender:gender}).success(function(data){
        //    console.log(data);
        //})

        $http.get('http://localhost:8080/getEthnicity?numberOfPeople='+numberOfPeople+"&ageGroup="+ageGroup+"&gender="+gender).success(function(data){
            setResult(data);
        });
    }

    function getTaxBandData(numberOfPeople,ageGroup,gender,taxBands){

        $http.get('http://localhost:8080/getTaxBand?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ ageGroup+
            "&gender="+gender
        ).success(function(data){
            setResult(data);
        })
    }

    function getLearningDisabilities(numberOfPeople, ageGroup,gender,learningDisabilities){//numberOfPeople: int ageGroup:list<int>
        $http.get('http://localhost:8080/getLearningDisabilities?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            ///
        ).success(function(data){
            setResult(data);
        });
    }

    ////////
    function getUnpaidCarers(numberOfPeople, ageGroup,gender,unpaidCarers){
        $http.get('http://localhost:8080/getUnpaidCarers?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getEducationalAttainment(numberOfPeople, ageGroup,gender,educationalAttainment){
        $http.get('http://localhost:8080/getEducationalAttainment?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getTransport(numberOfPeople, ageGroup,gender,transport){
        $http.get('http://localhost:8080/getTransport?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getUnemployed(numberOfPeople, ageGroup,gender,unemployed){
        $http.get('http://localhost:8080/getUnemployed?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getLivingInDeprivedArea(numberOfPeople, ageGroup,gender,livingInDeprivatedArea){
        $http.get('http://localhost:8080/getLivingInDeprivedArea?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getHomeless(numberOfPeople, ageGroup,gender,homeless){
        $http.get('http://localhost:8080/getHomeless?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getLowPay(numberOfPeople, ageGroup,gender,lowPay){
        $http.get('http://localhost:8080/getLowPay?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getFuelPoverty(numberOfPeople, ageGroup,gender,fuelPoverty){
        $http.get('http://localhost:8080/getFuelPoverty?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getOffenders(numberOfPeople, ageGroup,gender,offenders){
        $http.get('http://localhost:8080/getOffenders?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getIllness(numberOfPeople, ageGroup,gender,illness){
        $http.get('http://localhost:8080/getIllness?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    function getMentalHealthAndWellbeing(numberOfPeople, ageGroup,gender,mentalHealthAndWellbeing){
        $http.get('http://localhost:8080/getMentalHealthAndWellbeing?numberOfPeople='+numberOfPeople+
            "&ageGroup="+ageGroup+
            "&gender="+gender
            /////
        ).success(function(data){
            setResult(data);
        });
    }
    //HTTP Restful Requests End

    //Events
    $scope.benchmarkClicked = function(){
        $scope.showSelectSection = true;
        $scope.showPopulationVariables = false;
        $scope.showDeprivationCriteriaParams = false;
        $scope.showOutputType = false;
        $scope.showPopulationVariables = true;
        $scope.popVariables.isBenchmarkingCheckedPopVar = true;
        $scope.popVariables.mode = "benchmarking"; //needed to set the mode, it is not set automatically from ng-model as checked state
        //set  programmatically
    }

    $scope.backToTop = function(){
        $scope.showPopulationVariables = false;
        $scope.showDeprivationCriteriaParams = false;
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
    };
    $scope.doesProceedPopulationVariables = function(){
        if ($scope.popVariables.deprivationCriteria!=null && $scope.popVariables.numberOfPeople!=null){
            $scope.showPopulationVariables = false;
            $scope.showDeprivationCriteriaParams = true;

            $scope.popVariables.isBenchmarkingCheckedPopVar = false;
            $scope.popVariables.isPredictingCheckedPopVar = false;
        }
    }

    $scope.doesProceedDeprivationParameters = function(){
        if ($scope.popVariables.region!=null && $scope.popVariables.ageRange!=null && $scope.popVariables.gender!=null && $scope.popVariables.numberOfPeople!=null &&
            $scope.popVariables.deprivationCriteria!=null){//isEmpty($scope.ineqParameters)
            $scope.showDeprivationCriteriaParams = false;
            $scope.showOutputType = true;
            nullifyAllViewShowParams();
            if ($scope.popVariables.deprivationCriteria=="ethicity")
                $scope.ethincityDeprivationViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="taxBand")
                $scope.taxBandViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="unpaidCarers")
                $scope.unpaidCarersViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="learningDisabilities")
                $scope.learningDisabilitiesViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="educationalAttainment")
                $scope.educationalAttainmentViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="transport")
                $scope.transportViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="unemployed")
                $scope.unemployedViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="livingInDeprivedArea")
                $scope.livingInDeprivatedAreaViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="homeless")
                $scope.homelessViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="lowPay")
                $scope.lowPayViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="fuelPoverty")
                $scope.fuelPovertyViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="offenders")
                $scope.offendersViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="illnesses")
                $scope.illnessViewShow = true;
            else if ($scope.popVariables.deprivationCriteria=="mentalHealthAndWellbeing")
                $scope.mentalHealthAndWellbeingViewShow = true;
        }
    }

    // TODO: for Alex - leave it currently not sure if it will be needed
    //$scope.doesProceedOutputType = function(){
    //    if ($scope.popVariables.region!=null && $scope.popVariables.gender!=null && $scope.popVariables.numberOfPeople!=null &&
    //        !isEmpty($scope.ineqParameters)){
    //
    //    }
    //}

    $scope.visualize = function(){
        $scope.isVisualizing=true;
        if ($scope.popVariables.deprivationCriteria=="ethicity")
            getEthicityData($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender);
        else if ($scope.popVariables.deprivationCriteria=="taxBand")
            getTaxBandData($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.taxBand);
        else if ($scope.popVariables.deprivationCriteria=="unpaidCarers")
            getUnpaidCarers($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.unpaidCarers);
        else if ($scope.popVariables.deprivationCriteria=="learningDisabilities")
            getLearningDisabilities($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.learningDisabilities);
        else if ($scope.popVariables.deprivationCriteria=="educationalAttainment")
            getEducationalAttainment($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.educationalAttainment);
        else if ($scope.popVariables.deprivationCriteria=="transport")
            getTransport($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.transport);
        else if ($scope.popVariables.deprivationCriteria=="unemployed")
            getUnemployed($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.unemployed);
        else if ($scope.popVariables.deprivationCriteria=="livingInDeprivedArea")
            getLivingInDeprivedArea($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.livingInDeprivatedArea);
        else if ($scope.popVariables.deprivationCriteria=="homeless")
            getHomeless($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.homeless);
        else if ($scope.popVariables.deprivationCriteria=="lowPay")
            getLowPay($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.lowPay);
        else if ($scope.popVariables.deprivationCriteria=="fuelPoverty")
            getFuelPoverty($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.fuelPoverty);
        else if ($scope.popVariables.deprivationCriteria=="offenders")
            getOffenders($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.offenders);
        else if ($scope.popVariables.deprivationCriteria=="illnesses")
            getIllness($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.illness);
        else if ($scope.popVariables.deprivationCriteria=="mentalHealthAndWellbeing")
            getMentalHealthAndWellbeing($scope.popVariables.numberOfPeople, $scope.popVariables.ageRange.rangeInt,$scope.popVariables.gender,$scope.mentalHealthAndWellbeing);
    }

    //Setting params
    $scope.genderClicked = function (){
        if ($scope.popVariables.gender=="All People:")
            $scope.isAllGenderCheckedIneq =true;
        if ($scope.popVariables.gender=="Males:")
            $scope.isMaleGenderCheckedIneq=true;
        if ($scope.popVariables.gender=="Females:")
            $scope.isFemaleGenderChecked =true;
        $scope.doesProceedPopulationVariables();
    }

    //Utils
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    //Pie Chart

}]);
