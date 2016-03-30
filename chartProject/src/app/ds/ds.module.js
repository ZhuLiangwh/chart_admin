define([
    './apiService',
    'common/utils/registerToModule', './clickTypeRatioRuRu', './totalClickRuRu'
    /*insertrjs*/
], function(apiService, rtm, clickTypeRatioRuRu, totalClickRuRu /*insertparam*/ ) {
    var modName = 'app.ds',
        mod = angular.module(modName, []);
    rtm(apiService, clickTypeRatioRuRu, totalClickRuRu /*insertparam*/ )(mod);
    return modName;
});
