define(['./DataSource'], function(DataSource) {
    var basePath = 'click_type_ratio_ru_ru';

    var ClickTypeRatioRuRuDS = DataSource.ext({
        getData: function(params) {
            return this._load(basePath, {
                params: params
            });
        }
    });
    return {
        __register__: function(mod) {
            mod.service('ds.clickTypeRatioRuRu', ClickTypeRatioRuRuDS);
            return mod;
        }
    };
});
