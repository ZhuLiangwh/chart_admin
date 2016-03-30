define(function () {
    var diName = 'dpTablechart';
    return {
        __register__: function (mod) {
            mod.directive(diName, DpTableChart);
        }
    };

    function DpTableChart() {
        return {
            restrict: 'E',
            scope: {
                config: "="
            },
            template:'<table class="table table-bordered">'
                            +'<thead>'
                                +'<tr>'
                                    +'<th ng-repeat="col in data.cols">{{col}}</th>'
                                +'</tr>'
                            +'</thead>'
                            +'<tbody>'
                                +'<tr ng-repeat="row in data.rows">'
                                    +'<td ng-repeat="cell in row  track by $index">{{cell}}</td>'
                                +'</tr>'
                            +'</tbody>'
                        +'</table>',
            link: function ($scope, $element, $attr) {
                $scope.$watch('config', function (newValue, oldValue) {
                    if (newValue) {
                        $scope.data = newValue.data;
                        $scope.config = null;
                    }
                });
            }
        }
    }
});