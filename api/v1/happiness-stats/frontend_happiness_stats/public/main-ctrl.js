/*global angular*/

angular
        .module("HappinessApp")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            console.log("Main Controller initialized.");
            var API = "/api/v1/happiness-stats";
       
            refresh();
            
            function refresh(){
                
                $http.get(API).then(function(response) {
                        
                        console.log("GET Request revived to " + "<" + API + ">");
                        console.log("Data Received: " + JSON.stringify(response.data, null,2));
                        $scope.happiness_stats = response.data;
                        
                    }
                );
                
            }
            
            $scope.addHappiness = function(){
                    var newHappiness = $scope.newHappiness;
                    console.log("Nuevo Ranking de felicidad");
                    $http.post(API ,newHappiness).then(function(response){
                        console.log("POST Response: "+ response.status +" "+ response.data);
                        refresh();
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

            $scope.deleteAll = function() {
                $http.delete(API).then(function(response) {
                    console.log("Response : " + response.status + response.data);
                    refresh();
                }, function(error) {
                    $scope.status = error.status;
                    $scope.data = "";
                });
            };
            
            $scope.deleteOne = function(country, year) {
                $http.delete(API +"/" +country + "/"+year).then(function(response) {
                    console.log("Borrando: " + country + " - " + year);
                    console.log("Response : " + response.status + response.data);
                    refresh();
                }, function(error) {
                    $scope.status = error.status;
                    $scope.data = "";
                });
            };
            
            $scope.loadInitialData = function() {
                $http.get(API + "/loadInitialData").then(function(response) {
                console.log("Respuesta : " + response.status + response.data);
                refresh();
            }).catch(function(response) {
                $scope.status = response.status;
                $scope.statusInfo = JSON.stringify(response.status, null, 2);
                });
            };
              
            
        }]);

