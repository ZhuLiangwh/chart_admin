define(function () {
    var defaultConfig = {
        pie: {
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.2f}%'
                    }
                }
            }
        }
    };
    var handleData = {
        'pie':processDataToPie,
        'line':processDataToLine,
        'bar':processDataToLine,
        'table':processDataToTable
    };
    return function (config, chartData) {
        if (!config || !chartData) return;
        var processData = handleData[config.type](chartData);

        if(config.type === 'table'){
            config.data = processData;
            return config;
        }

        // generate xAxisData for highchart xAxis
        config.xAxis = config.xAxis || {};
        if (!config.xAxis.minTickInterval && config.xAxis.type == "datetime") {
            config.xAxis.minTickInterval = 24 * 3600 * 1000;
        }

        if (config.type !== 'pie') {
            config.xAxis.categories = _.pluck(chartData, 'x_val');
        }else{
            config.tooltip = defaultConfig.pie.tooltip;
            config.plotOptions = defaultConfig.pie.plotOptions;
        }

        _.each(config.series, function (serie, index) {
            serie.name = _.keys(processData[index])[0];
            serie.data = _.values(processData[index])[0];
            serie.type = serie.type || config.type;
        });
        //console.log(config);
        return config;
    };

    function processDataToPie(chartData) {
        var datas = _.values(chartData),
            keys = _.keys(chartData),
            names = _.keys(datas[0]),
            re = [];

        _.each(names, function (name) {
            var tempObj = {};
            tempObj[name] = _.zip(keys, _.pluck(datas, name));
            re.push(tempObj);
        });

        return re;
    }

    function processDataToLine(chartData) {
        var datas = [], names = [], re = [];
        _.each(chartData, function (chart) {
            datas.push(chart['y_val']);
        });

        names = _.keys(datas[0]);

        _.each(names, function (name) {
            var tempObj = {};
            tempObj[name] = _.pluck(datas, name);
            re.push(tempObj);
        });

        return re;
    }

    function processDataToTable(chartData){
        var cols = _.keys(chartData[0]),rows = [];
        chartData.forEach(function(data){
            rows.push(_.values(data));
        });
        return {
            cols:cols,
            rows:rows
        };
    }
});