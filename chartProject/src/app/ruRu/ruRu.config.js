define([], function() {
    return function config(mod) {
        mod.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('ru_ru', {
                        abstract: true,
                        url: '/ru_ru',
                        template: '<ui-view/>'
                    })
                    .state('ru_ru.click_type_ratio_ru_ru', {
                        url: '/click_type_ratio_ru_ru',
                        templateUrl: 'app/ruRu/clickTypeRatioRuRu.html',
                        controller: 'ClickTypeRatioRuRuListCtrl'
                    })
                    .state('ru_ru.total_click_ru_ru', {
                        url: '/total_click_ru_ru',
                        templateUrl: 'app/ruRu/totalClickRuRu.html',
                        controller: 'TotalClickRuRuListCtrl'
                    })
                    /*insertstate*/
            }
        ]);
        return mod;
    };
});
