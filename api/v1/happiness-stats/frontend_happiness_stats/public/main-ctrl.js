/*global angular*/

angular
        .module("HappinessApp")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            console.log("Main Controller initialized.");
            var API = "/api/v1/happiness-stats";
       
            
            
            console.log("Requesting happiness to <"+API+">...");
            $http.get("/api/v1/happiness-stats").then(function(response){
                console.log("Data Received: " + JSON.stringify(response.data, null,2));
                
                $scope.happiness_stats = response.data;
                
                });
                $scope.addHappiness = function(){
                    var newHappiness = $scope.newHappiness;
                    console.log("Nuevo Ranking de felicidad");
                    $http.post(API ,newHappiness).then(function(response){
                        console.log("POST Response: "+ response.status +" "+ response.data);
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                };
                
                $scope.get = function(){
                    $http.get(API).then(function(response){
                        $scope.status = response.status;
                        $scope.data = JSON.stringify(response.data,null,2);
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };
        }]);

