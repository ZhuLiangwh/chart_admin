define([
    './ruRu.config',
    'common/utils/registerToModule', './clickTypeRatioRuRu', './totalClickRuRu'
    /*insertrjs*/
], function(ruRuConfig, rtm, ClickTypeRatioRuRuListCtrl, TotalClickRuRuListCtrl /*insertparam*/ ) {
    var modName = 'app.ruRu',
        mod = angular.module(modName, []);
    rtm(ClickTypeRatioRuRuListCtrl, TotalClickRuRuListCtrl /*insertparam*/ )(mod);
    ruRuConfig(mod);
    return modName;
});
