'use strict';
var path = require('path');
var fs = require('fs');
var grunt = require('grunt');
var _ = require('yeoman-generator/node_modules/lodash');
var fileUtil = require('./file');


module.exports = {
    rewrite: rewrite,
    rewriteFile: rewriteFile,
    gruntTask: gruntTask,
    createChart: createChart,
    updateChartConfig: updateChartConfig,
    injectToChartModule: injectToChartModule,
    checkAddedModule: checkAddedModule
};

function rewriteFile(args) {
    args.path = args.path || process.cwd();
    var fullPath = path.resolve(args.path, args.file);

    args.spliceWithinLine = args.spliceWithinLine || false;

    args.haystack = fs.readFileSync(fullPath, 'utf8');
    var body = rewrite(args);

    fs.writeFileSync(fullPath, body);
}

function rewrite(args){
    var lines = args.haystack.split('\n'),
        insertpos = args.insertPos;

    lines.forEach(function(line,index){
        if(line.indexOf(insertpos) > -1){
            if(args.spliceWithinLine){
                lines[index] = line.replace(insertpos,function(pos){ return ', '+args.splicable.join(', ') + pos }).replace(/\(\s*\,/g,'(')
            }else{
                lines[index] = args.splicable.concat(lines[index])
            }
        }
    });
    lines = _.flatten(lines);
    return lines.join('\n');
}

function gruntTask(beautifySrc, sassSrc) {
    grunt.task.init = function(){};

    var sassFiles = {};
    sassFiles[sassSrc[0]] = sassSrc[1];

    grunt.initConfig({
        jsbeautifier: {
            files: beautifySrc,
            options: {
                js: {
                    indentSize: 4,
                    spaceBeforeConditional: false
                }
            }
        },
        sass: {
            dev: {
                options: {
                    noCache: true,
                    spawn: false,
                    'line-comments': true,
                    'line-numbers': true,
                    'style': 'expended'
                },
                files: sassFiles
            }
        }
    });

    var cwd = process.cwd();
    process.chdir(path.join(__dirname, '../'));//because the loadNpmTasks'root path is based on the process.cwd()
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-sass');
    process.chdir(cwd);

    grunt.tasks(['jsbeautifier', 'sass:dev'], {}, function () {
        grunt.log.ok('grunt task done');
    });
}

function updateChartConfig(chartConfig) {
    var config = {};
    chartConfig = _.extend({}, chartConfig);

    config.moduleName = chartConfig.moduleName;
    config.camelModuleName = _.camelize(chartConfig.moduleName);
    //config.sluggyModuleName = _.slugify(_.humanize(chartConfig.moduleName)); //un-ele-a-e
    config.sluggyModuleName = _.underscored(chartConfig.moduleName); //un-ele-a-e
    config.modelName = chartConfig.modelName;
    config.camelModelName = _.camelize(chartConfig.modelName);
    config.sluggyModelName = _.underscored(chartConfig.modelName); //un-ele-a-e
    config.capitalModelName = _.capitalize(_.camelize(chartConfig.modelName));
    config.lcaseModelName = chartConfig.modelName.toLowerCase();
    _.extend(config, chartConfig);
    return config;
}

function createChart(_this, appDir, templatesDir) {
    var curModuleDir, curConfigDir;

    _this.template('chart/highchart.html', appDir + '/src/app/' + _this.camelModuleName + '/' + _this.camelModelName + '.html');//chart page
    _this.template('chart/highchart.js', appDir + '/src/app/' + _this.camelModuleName + '/' + _this.camelModelName + '.js');//chart page controller


    _this.template(templatesDir + '/ds.js', appDir + '/src/app/ds/' + _this.camelModelName + '.js');//ds


    curConfigDir = appDir + '/src/app/' + _this.camelModuleName + '/' + _this.camelModuleName + '.config.js';
    curModuleDir = appDir + '/src/app/' + _this.camelModuleName + '/' + _this.camelModuleName + '.module.js';

    if (!fileUtil.exists(curModuleDir)) {
        _this.template('router.js', curConfigDir);
        _this.template('module.js', curModuleDir);
    }
}

function injectToChartModule(_this, appDir, templatesDir) {
    var curConfigDir,
        curModuleDir,
        appConfigDir,
        dsModuleDir;

    curConfigDir = appDir + '/src/app/' + _this.camelModuleName + '/' + _this.camelModuleName + '.config.js';
    curModuleDir = appDir + '/src/app/' + _this.camelModuleName + '/' + _this.camelModuleName + '.module.js';
    appConfigDir = appDir + '/src/app/app.js';
    dsModuleDir = appDir + '/src/app/ds/ds.module.js';

    //update config.js: update related states(router)
    rewriteFile({//add chart router
        file: curConfigDir,
        insertPos:'/*insertstate*/',
        splicable: [
            '.state(\'' + _this.sluggyModuleName + '.' + _this.sluggyModelName + '\', {',
            '   url: \'/' + _this.sluggyModelName + '\',',
            '   templateUrl: \'app/' + _this.camelModuleName + '/' + _this.camelModelName + '.html\',',
            '   controller: \'' + _this.capitalModelName + 'ListCtrl\'',
            '})'
        ]
    });

    //update module.js
    rewriteFile({
        file: curModuleDir,
        insertPos:'/*insertrjs*/',
        splicable: [
            '   ,\'./' + _this.camelModelName + '\''
        ]
    });

    rewriteFile({
        file: curModuleDir,
        insertPos:'/*insertparam*/',
        splicable: [
            _this.capitalModelName + 'ListCtrl'
        ],
        spliceWithinLine: true
    });

    //update app.js
    updateAppJS(appConfigDir, _this.camelModuleName);

    //update ds.module.js
    updateDSModule(dsModuleDir, _this.camelModelName);
}

/*check whether the module has been added to the app.js*/
function checkAddedModule(appPath, module) {
    var content = fs.readFileSync(appPath, 'utf8'),
        lines = content.split('\n'), line;

    for (var i = 0, l = lines.length; i < l; i++) {
        line = lines[i];
        if (line.indexOf(module) !== -1) {
            return true;
        }
    }
    return false;
}

function updateDSModule(dsModuleDir, camelModelName) {
    rewriteFile({
        file: dsModuleDir,
        insertPos:'/*insertrjs*/',
        splicable: [
            '   ,\'./' + camelModelName + '\''
        ]
    });

    rewriteFile({
        file: dsModuleDir,
        insertPos:'/*insertparam*/',
        splicable: [
            camelModelName
        ],
        spliceWithinLine: true
    });
}

function updateAppJS(appConfigDir, camelModuleName) {
    if (!checkAddedModule(appConfigDir, camelModuleName + '/' + camelModuleName + '.module')) {
        //update app.js: add current module to the app.js if the module is not exist
        rewriteFile({
            file: appConfigDir,
            insertPos:'/*insertrjs*/',
            splicable: [
                '   ,\'' + camelModuleName + '/' + camelModuleName + '.module\''
            ]
        });

        rewriteFile({
            file: appConfigDir,
            insertPos:'/*insertparam*/',
            splicable: [
                camelModuleName
            ],
            spliceWithinLine: true
        });
    }
}