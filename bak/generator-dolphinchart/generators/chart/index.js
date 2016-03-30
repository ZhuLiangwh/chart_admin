'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('yeoman-generator/node_modules/lodash');

var fileUtil = require('../../lib/file');
var angularUtil = require('../../lib/util');

var Generator = module.exports = function Generator() {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.chartName = this.name;
};

util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.askForAppConfig = function askForAppConfig() {
    this.log(yosay('Welcome to the dolphin chart  generator!'));
    this.configFile = 'config.json';
};

Generator.prototype.createChart = function createChart() {
    debugger;
    var _this = this,
        cmdDir = process.cwd(),
        appDir,
        //获取chart的配置文件路径
        chartConfigPath = path.join(cmdDir, './chart'),
        templatesDir = path.join(__dirname, '../templates');

    this.config = JSON.parse(this.readFileAsString(path.join(this.configFile)).trim());
    //全局app相关配置
    _.extend(this, this.config);
    this.capitalAppName = _.capitalize(_.camelize(this.appName));
    appDir = path.join(cmdDir, './' + this.appName);

    //配置模板路径
    _this.sourceRoot(path.join(__dirname, '../templates'));

    //读取配置文件
    var chartConfig = JSON.parse(_this.readFileAsString(path.join(chartConfigPath, this.chartName + '.json')));

    _.extend(_this, angularUtil.updateChartConfig(chartConfig));
    angularUtil.createChart(_this, appDir, templatesDir);
};

Generator.prototype.injectToModule = function injectToModule() {
    var _this = this,
        cmdDir = process.cwd(),
        chartConfigPath = path.join(cmdDir, './chart'),
        templatesDir = path.join(__dirname, '../templates'),
        appDir = path.join(cmdDir, './' + this.appName);

    this.conflicter.resolve(function (err) {
        var chartConfig = JSON.parse(_this.readFileAsString(path.join(chartConfigPath, _this.chartName + '.json')).trim());

        _.extend(_this, angularUtil.updateChartConfig(chartConfig));
        angularUtil.injectToChartModule(_this, appDir, templatesDir);

        angularUtil.gruntTask(
            [
                    appDir + '/**/*.js',
                    '!' + appDir + '/src/app/common/**/*.js',
                    '!' + appDir + '/src/app/server/**/*.js',
                    '!' + appDir + '/node_modules/**/*.js'
            ],
            [
                    appDir + '/src/css/app.css',
                    appDir + '/src/scss/app.scss'
            ]);
    });

};