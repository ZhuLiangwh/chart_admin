define([
    'common/utils/date',
    'common/utils/dataConverter',
    'common/utils/chartAdapter'
], function(dateUtil, dataConverter, chartAdapter) {
    var diName = 'TotalClickRuRuListCtrl';
    return {
        __register__: function(mod) {
            mod.controller(diName, ['$scope', 'logger', 'ds.totalClickRuRu', TotalClickRuRuListCtrl]);
            return mod;
        }
    };

    function TotalClickRuRuListCtrl($scope, logger, DS) {
        var apiParams = {} /*,chartTypes =["line"]*/ ;


        $scope['isCollapse0'] = false;
        $scope['config0'] = {
            "type": "line",
            "title": {
                "text": "Locale total click",
                "x": -20
            },
            "series": [{
                "index": 1,
                "name": "Locale total click"
            }]
        };







        var _dateFormat = function(date) {
            return dateUtil.format(date, 'YY-MM-dd');
        };
        var onChangeSingleDate = function(newDate, oldDate) {
            if(newDate - oldDate === 0) {
                return;
            }
            apiParams.date = _dateFormat(newDate);
            reload();
        };

        $scope.datePickerSingle = {
            max: _dateFormat(new Date()),
            dt: dateUtil.getRelativeDate(-1, new Date())
        };

        $scope.$watch('datePickerSingle.dt', onChangeSingleDate);

        $scope.openSingleDate = function($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };




        var pageInit = true,
            changeApiParams = function(params) {
                var re = [],
                    key = '',
                    op = '',
                    name = '';
                for(key in params) {
                    if(key && params.hasOwnProperty(key)) {
                        op = key === 'start' ? '>=' : key === 'end' ? '<=' : 'eq';
                        name = (key === 'start' || key === 'end') ? 'date' : key;
                        re.push({
                            'name': name,
                            'op': op,
                            'val': params[key]
                        });
                    }
                }
                return re;
            };

        function reload() {
            $scope.isLoading = true;
            DS.getData({
                    'q': {
                        'filters': changeApiParams(apiParams)
                    }
                })
                .then(function(data) {
                    var data = data.data.data,
                        items = data.items,
                        filters = data.filters;

                    _.each(items, function(item, index) {
                        $scope['chartConfig' + index] = chartAdapter($scope['config' + index], item);
                    });

                    $scope.isLoading = false;

                    if(!pageInit) return;
                    if(_.isObject(filters['cascade'])) {
                        var convertedData = dataConverter.filter(filters['cascade']);
                        $scope.cascadeSelectName = convertedData.selectName;
                        $scope.cascadeSelectOptions = convertedData.selectOptions;
                    }
                    if(_.isObject(filters['multi'])) {
                        $scope.multiSelectOptions = filters['multi'];
                    }
                    pageInit = false;

                }, function(error) {
                    $scope.isLoading = false;
                    logger.error(error.data.msg || 'Get data faild.');
                })
        }

        reload();
    }
});
