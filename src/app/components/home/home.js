angular.module('programApp.home', [])
  .controller('homeCtrl',['$scope','$mdDialog',function($scope,$mdDialog){
    $scope.finalData = [];
    $scope.program='';
    $scope.selectedMeasure = [];
    $scope.selectedGEO = [];
    $scope.showTable = false;

    $scope.programData = ["P1","P2", "P3", "P4","P5", "P6"];
    $scope.geos = [{'id':1, 'geo':"AMR"},
      {'id':2, 'geo':"PAC"},
      {'id':3, 'geo':"EURO"},
      {'id':4, 'geo':"JPN"}];
    $scope.measures = [
      {
        measure:'Measure A',
        dependent:'depMeasure A'
      },
      {
        measure:'Measure B',
        dependent:'depMeasure B'
      }
    ];

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    $scope.onAdd = function(){
      $scope.showTable = true;
      for(var j= 0; j< $scope.selectedMeasure.length;j++) {
        for(var i=0; i < $scope.selectedGEO.length;i++){
          $scope.finalData.push({'id': Math.random(), 'program':$scope.program,'geo':$scope.selectedGEO[i],'measure':$scope.selectedMeasure[j].measure});
        }
       }
      $scope.program = '';
      $scope.selectedMeasure = '';
      $scope.selectedGEO = '';
    };

    $scope.onDelete = function(ev,ID){
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete this?')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function() {
          var result = $scope.finalData.filter(function( obj ) {
            return obj.id == ID;
          });
          $scope.finalData.splice(result, 1);
        }, function() {
        });
      };

    $scope.onAddNewRow = function (ID) {
      var result = $scope.finalData.filter(function( obj ) {
        return obj.id == ID;
      });
      $scope.program = result[0].program;
      $scope.selectedMeasure = result[0].measure;
      $scope.selectedGEO = result[0].geo.geo;
    };
  }]);