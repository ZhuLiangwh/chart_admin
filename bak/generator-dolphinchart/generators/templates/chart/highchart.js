define([
    'common/utils/date',
    'common/utils/dataConverter',
    'common/utils/chartAdapter'
], function (dateUtil, dataConverter, chartAdapter){
    var diName = '<%= capitalModelName %>ListCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', 'logger', 'ds.<%= camelModelName %>', <%= capitalModelName %>ListCtrl]);
            return mod;
        }
    };

    function <%= capitalModelName %>ListCtrl($scope, logger, DS){
        var apiParams = {}/*,chartTypes =[<% print(_.pluck(charts,'type').map(function(item){ return '"'+ item +'"'}))%>]*/;

        <% _.forEach(charts,function(chart,index){ %>
        $scope['isCollapse<%= index %>'] = false;
        $scope['config<%= index %>'] = <%= JSON.stringify(chart) %>;
        <% }) %>

        <% if( filters &&  (_.indexOf(filters, 'cascade-dropdown') > -1 || _.indexOf(filters, 'multi-dropdown') > -1)){ %>
        $scope.filter = function (node,isInit) {
            _.extend(apiParams, node.selectedValue);
            !isInit && reload();
        };
        <% } %>

        <% if(filters &&  _.indexOf(filters, 'input') > -1){ %>
        $scope.goSearch = function () {
            apiParams.keyword = $scope.search.string;
            reload();
        };
        <% } %>

        <% if(filters &&  _.indexOf(filters, 'datepicker') > -1){ %>
        var _dateFormat = function (date) {
            return dateUtil.format(date, 'YY-MM-dd');
        };
        var onChangeSingleDate = function (newDate, oldDate) {
            if (newDate - oldDate  === 0) {
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

        $scope.openSingleDate = function ($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };
        <% } %>

        <% if(filters &&  _.indexOf(filters, 'datepicker-range') > -1){ %>
        var _dateFormat = function (date) {
            return dateUtil.format(date, 'YY-MM-dd');
        };
        var onChangeDate = function (newDate, oldDate) {
            if (newDate - oldDate  === 0) {
                return;
            }
            apiParams.start = _dateFormat($scope.datePicker.start.dt);
            apiParams.end = _dateFormat($scope.datePicker.end.dt);
            reload()
        };
        $scope.datePicker = {
            start: {
                dt: dateUtil.getRelativeDate(0, new Date())
            },
            end: {
                max: _dateFormat(new Date()),
                dt: dateUtil.getRelativeDate(0, new Date())
            }
        };

        $scope.$watch('datePicker.start.dt', onChangeDate);
        $scope.$watch('datePicker.end.dt', onChangeDate);

        $scope.open = function ($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };
        <% } %>

        var pageInit = true,
            changeApiParams = function(params){
                var re = [],key='',op='',name='';
                for(key in params){
                    if(key && params.hasOwnProperty(key)){
                        op = key === 'start' ? '>=' : key === 'end' ? '<=' :'eq';
                        name = (key === 'start' || key === 'end') ?  'date' : key;
                        re.push({'name':name,'op':op, 'val':params[key]});
                    }
                }
                return re;
            };

        function reload(){
            $scope.isLoading = true;
            DS.getData({'q':{'filters':changeApiParams(apiParams)}})
            .then(function(data){
                var data = data.data.data,
                    items = data.items,
                    filters = data.filters;

                _.each(items, function(item, index){
                    $scope['chartConfig'+index] = chartAdapter($scope['config'+index], item);
                });

                $scope.isLoading = false;

                if(!pageInit) return;
                if(_.isObject(filters['cascade'])){
                    var convertedData = dataConverter.filter(filters['cascade']);
                    $scope.cascadeSelectName = convertedData.selectName;
                    $scope.cascadeSelectOptions = convertedData.selectOptions;
                }
                if(_.isObject(filters['multi'])){
                    $scope.multiSelectOptions = filters['multi'];
                }
                pageInit = false;

            },function(error){
                $scope.isLoading = false;
                logger.error(error.data.msg || 'Get data faild.');
            })
        }

        reload();
    }
});