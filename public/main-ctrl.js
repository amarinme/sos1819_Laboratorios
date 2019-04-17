/*global angular*/

angular
        .module("HappinessApp")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            console.log("Main Controller initialized.");
            var API = "/api/v1/happiness-stats";
            /*global refresh*/
            refresh();
            
            
            console.log("Requesting happiness to <"+API+">...");
            $http.get("/api/v1/happiness-stats").then(function(response){
                console.log("Data Received: " + JSON.stringify(response.data, null,2));
                
                $scope.contacts = response.data;
                
                });
                $scope.addContacts = function(){
                    var newContact = $scope.newContact;
                    console.log("Adding a new contacts");
                    
                    $http.post(API ,newContact).then(function(response){
                        console.log("POST Response: "+ response.status +" "+ response.data);
                    });
                };
        }]);

