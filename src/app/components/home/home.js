angular.module('programApp.home', [])
  .controller('homeCtrl',['$scope','$mdDialog',function($scope,$mdDialog){
    $scope.finalData = [];
    $scope.program = null;
    $scope.showTable = false;

    $scope.programData = ["P1","P2", "P3", "P4","P5", "P6"];
    $scope.geos = [{'id':1, 'geo':"AMR"},
      {'id':2, 'geo':"PAC"},
      {'id':3, 'geo':"EURO"},
      {'id':4, 'geo':"JPN"}];
    $scope.measures = [
      {
        id:'m1',
        measure:'Measure A',
        dependent:'depMeasure A'
      },
      {
        id:'m2',
        measure:'Measure B',
        dependent:'depMeasure B'
      },
      {
        id:'m3',
        measure:'Measure C',
        dependent:'depMeasure C'
      },
      {
        id:'m4',
        measure:'Measure D',
        dependent:'depMeasure '
      },
    ];
    $scope.newSelectedMeasure = {m1: [], m2: [], m3: [], m4: []};

    $scope.finalSelection = [];

    $scope.selectAllMeasures = function(measure) {
      if ($scope.newSelectedMeasure[measure.id].length == $scope.geos.length) {
        $scope.newSelectedMeasure[measure.id] = [];
      } else {
        $scope.newSelectedMeasure[measure.id] = [];
        angular.forEach($scope.geos, function(geoEl) {
          $scope.newSelectedMeasure[measure.id].push(geoEl.geo);
        });
      }
    };

    $scope.checkSelectedMeasure = function(measure, geo) {
      return $scope.newSelectedMeasure[measure.id].indexOf(geo) >= 0;
    };

    $scope.selectGeo = function(measure, geo) {
      index = $scope.newSelectedMeasure[measure.id].indexOf(geo);
      if(index >= 0) {
        $scope.newSelectedMeasure[measure.id].splice(index, 1);
      } else {
        $scope.newSelectedMeasure[measure.id].push(geo);
      }
    };

    $scope.checkAllGeoSelected = function(measure) {
      return $scope.newSelectedMeasure[measure.id].length == $scope.geos.length;
    };

    $scope.onAdd = function(){
      $scope.finalSelection = [];
      angular.forEach($scope.measures, function(measure) {
        if ($scope.newSelectedMeasure[measure.id].length > 0) {
          angular.forEach($scope.newSelectedMeasure[measure.id], function(geo) {
            var dupMeasure = angular.copy(measure);
            dupMeasure.geo = geo;
            dupMeasure.program = $scope.program;
            $scope.finalSelection.push(dupMeasure);
          });
        }
      });

      $scope.program = null;
      $scope.newSelectedMeasure = {m1: [], m2: [], m3: [], m4: []};
      $scope.finalData = $scope.finalSelection;
      $scope.showTable = ($scope.finalData.length > 0) ? true : false;
    };

    $scope.onDelete = function(ev,object){
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete this?')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function() {
          var result = $scope.finalData.indexOf(object);
          $scope.finalData.splice(result, 1);
        }, function() {
        });
      };

    $scope.onAddNewRow = function (result) {
      $scope.program = result.program;
      $scope.newSelectedMeasure = {m1: [], m2: [], m3: [], m4: []};
      $scope.newSelectedMeasure[result.id].push(result.geo);
    };

    $scope.addNewRow = function(){
      angular.forEach($scope.measures, function(measure) {
        if ($scope.newSelectedMeasure[measure.id].length > 0) {
          angular.forEach($scope.newSelectedMeasure[measure.id], function(geo) {
            var dupMeasure = angular.copy(measure);
            dupMeasure.geo = geo;
            dupMeasure.program = $scope.program;
            $scope.finalData.push(dupMeasure);
          });
        }
      });
      $scope.program = null;
      $scope.newSelectedMeasure = {m1: [], m2: [], m3: [], m4: []};
    };
  }]);
