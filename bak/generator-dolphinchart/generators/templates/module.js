define([
    './<%= camelModuleName %>.config',
    'common/utils/registerToModule'
    /*insertrjs*/
], function(<%= camelModuleName %>Config, rtm/*insertparam*/){
     var modName = 'app.<%= camelModuleName %>',
         mod = angular.module(modName, []);
     rtm(/*insertparam*/)(mod);
     <%= camelModuleName %>Config(mod);
     return modName;
});