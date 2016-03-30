define([
    './apiService',
    'common/utils/registerToModule'
    /*insertrjs*/
], function (apiService,rtm/*insertparam*/) {
    var modName = 'app.ds',
        mod = angular.module(modName, []);
    rtm(apiService/*insertparam*/)(mod);
    return modName;
});