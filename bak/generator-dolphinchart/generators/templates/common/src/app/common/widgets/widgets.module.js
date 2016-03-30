define([
    './ccTree',
    './dpMultiDropdown',
    './cascadeDropdown',
    './dpHighChart',
    './dpTableChart',
    './hasFeature',
    './hasPermission',
    'common/utils/registerToModule'], function ( ccTree, dpMultiDropdown, cascadeDropdown, dpHighChart, dpTableChart, hasFeature, hasPermission, rtm) {
    var authModName = 'app.widgets',
        mod = angular.module(authModName, []);
    rtm(
        ccTree,
        dpMultiDropdown,
        cascadeDropdown,
        dpHighChart,
        dpTableChart,
        hasFeature,
        hasPermission
    )(mod);
    return authModName;
});