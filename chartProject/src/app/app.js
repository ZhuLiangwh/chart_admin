/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'app.config.module',
    'services/services.module',
    'common/widgets/widgets.module',
    'common/filters/filters.module',

    'auth/auth.module',
    'ds/ds.module',
    'layouts/layouts.module', 'ruRu/ruRu.module'
    /*insertrjs*/
], function(appConfig, services, widgets, filters, auth, ds, layouts, ruRu /*insertparam*/ ) {
    'use strict';

    var appMod = angular.module('app', [
        'ui.bootstrap',
        'ngTable',
        'ui.router',
        'ngSanitize',

        appConfig,
        services,
        widgets,
        filters,
        auth,
        ds,
        layouts, ruRu /*insertparam*/
    ]);
    return 'app';
});
