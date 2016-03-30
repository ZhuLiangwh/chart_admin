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
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForAppConfig = function(){
    this.log(yosay('Welcome to the dolphin chart  generator!'));
    this.configFile = 'config.json';
};

Generator.prototype.createCommon = function(){
    debugger;
    var _this = this,
        appDir,
        cmdDir = process.cwd();

    this.config = JSON.parse(this.readFileAsString(path.join(cmdDir, this.configFile)));

    //全局app相关配置
    _.extend(this, this.config);
    this.capitalAppName = _.capitalize(_.camelize(this.appName));
    appDir = path.join(cmdDir, './' + this.appName);

    this.mkdir(appDir);//生成项目目录
    fileUtil.copyDirectory(path.join(__dirname, '../templates/common'), appDir);//拷贝admin的核心框架
    //根据config.json配置项生成基础框架
    _this.template(appDir + '/package.json', appDir + '/package.json');
    _this.template(appDir + '/src/app/app.config.module.js', appDir + '/src/app/app.config.module.js');
    fs.unlinkSync(appDir + '/package.json');
    fs.unlinkSync(appDir + '/src/app/app.config.module.js');
};

Generator.prototype.createChart = function createChart() {
    var _this = this,
        cmdDir = process.cwd(),
        chartConfigPath = path.join(cmdDir, './chart'),
        templatesDir = path.join(__dirname, '../templates'),
        appDir = path.join(cmdDir, './' + this.appName),
        chartList = fileUtil.getFilesInDirectory(chartConfigPath);//读取所有chart的配置文件

    //配置模板路径
    _this.sourceRoot(path.join(__dirname, '../templates'));

    //读取所有chart的配置文件，并生成相应的view、controller
    chartList.forEach(function (chart) {
        try {
            var chartConfig = JSON.parse(_this.readFileAsString(path.join(chart)).trim());
        } catch (e) {
            console.log('chart: ' + chart + ', JSON parse error: ' + e);
        }
        _.extend(_this, angularUtil.updateChartConfig(chartConfig));
        angularUtil.createChart(_this, appDir, templatesDir);
    });
};


Generator.prototype.injectToModule = function injectToModule() {
    var _this = this,
        cmdDir = process.cwd(),
        chartConfigPath = path.join(cmdDir, './chart'),
        templatesDir = path.join(__dirname, '../templates'),
        appDir = path.join(cmdDir, './' + this.appName),
        chartList = fileUtil.getFilesInDirectory(chartConfigPath);//读取所有chart的配置文件

    this.conflicter.resolve(function (err) {
        chartList.forEach(function (chart) {
            var chartConfig = JSON.parse(_this.readFileAsString(path.join(chart)).trim());

            _.extend(_this, angularUtil.updateChartConfig(chartConfig));
            angularUtil.injectToChartModule(_this, appDir, templatesDir);
        });

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

