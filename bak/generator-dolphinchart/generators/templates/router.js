define([], function () {
    return function config(mod) {
        mod.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('<%= sluggyModuleName %>', {
                        abstract: true,
                        url: '/<%= sluggyModuleName %>',
                        template: '<ui-view/>'
                    })
                    /*insertstate*/
            }
        ]);
        return mod;
    };
});