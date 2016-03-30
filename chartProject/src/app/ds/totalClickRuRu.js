define(['./DataSource'], function(DataSource) {
    var basePath = 'total_click_ru_ru';

    var TotalClickRuRuDS = DataSource.ext({
        getData: function(params) {
            return this._load(basePath, {
                params: params
            });
        }
    });
    return {
        __register__: function(mod) {
            mod.service('ds.totalClickRuRu', TotalClickRuRuDS);
            return mod;
        }
    };
});
