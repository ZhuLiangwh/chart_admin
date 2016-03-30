var express = require('express'),
    router = express.Router(),
    navData = {
        "status": 0,
        "msg": "",
        "data": {
            "menu": [{
                "items": [{
                    "url": "ru_ru/total_click_ru_ru",
                    "model": "total_click_ru_ru",
                    "display": "\u603b\u70b9\u51fb\u7edf\u8ba1"
                }, {
                    "url": "ru_ru/click_type_ratio_ru_ru",
                    "model": "click_type_ratio_ru_ru",
                    "display": "\u5206\u7c7b\u70b9\u51fb\u6bd4\u4f8b\u7edf\u8ba1"
                }, {
                    "url": "ru_ru/recommend_click_ru_ru",
                    "model": "recommend_click_ru_ru",
                    "display": "\u63a8\u8350\u6d41\u7edf\u8ba1"
                }, {
                    "url": "ru_ru/recommend_ratio_ru_ru",
                    "model": "recommend_ratio_ru_ru",
                    "display": "\u63a8\u8350\u6d41\u70b9\u51fb\u5360\u6bd4"
                }, {
                    "url": "ru_ru/category_click_ru_ru",
                    "model": "category_click_ru_ru",
                    "display": "\u5404\u5206\u7c7b\u7edf\u8ba1"
                }, {
                    "url": "ru_ru/category_source_ratio_ru_ru",
                    "model": "category_source_ratio_ru_ru",
                    "display": "\u5404\u5206\u7c7b\u65b0\u95fb\u6e90\u5360\u6bd4"
                }],
                "display": "\u4fc4\u7f57\u65af",
                "module": "ru_ru"
            }, {
                "items": [{
                    "url": "tr_tr/total_click_tr_tr",
                    "model": "total_click_tr_tr",
                    "display": "\u603b\u70b9\u51fb\u7edf\u8ba1"
                }, {
                    "url": "tr_tr/click_type_ratio_tr_tr",
                    "model": "click_type_ratio_tr_tr",
                    "display": "\u5206\u7c7b\u70b9\u51fb\u6bd4\u4f8b\u7edf\u8ba1"
                }, {
                    "url": "tr_tr/recommend_click_tr_tr",
                    "model": "recommend_click_tr_tr",
                    "display": "\u63a8\u8350\u6d41\u7edf\u8ba1"
                }, {
                    "url": "tr_tr/recommend_ratio_tr_tr",
                    "model": "recommend_ratio_tr_tr",
                    "display": "\u63a8\u8350\u6d41\u70b9\u51fb\u5360\u6bd4"
                }, {
                    "url": "tr_tr/category_click_tr_tr",
                    "model": "category_click_tr_tr",
                    "display": "\u5404\u5206\u7c7b\u7edf\u8ba1"
                }, {
                    "url": "tr_tr/category_source_ratio_tr_tr",
                    "model": "category_source_ratio_tr_tr",
                    "display": "\u5404\u5206\u7c7b\u65b0\u95fb\u6e90\u5360\u6bd4"
                }],
                "display": "\u571f\u8033\u5176",
                "module": "tr_tr"
            }, {
                "items": [{
                    "url": "ja_jp/total_click_ja_jp",
                    "model": "total_click_ja_jp",
                    "display": "\u603b\u70b9\u51fb\u7edf\u8ba1"
                }, {
                    "url": "ja_jp/click_type_ratio_ja_jp",
                    "model": "click_type_ratio_ja_jp",
                    "display": "\u5206\u7c7b\u70b9\u51fb\u6bd4\u4f8b\u7edf\u8ba1"
                }, {
                    "url": "ja_jp/recommend_click_ja_jp",
                    "model": "recommend_click_ja_jp",
                    "display": "\u63a8\u8350\u6d41\u7edf\u8ba1"
                }, {
                    "url": "ja_jp/recommend_ratio_ja_jp",
                    "model": "recommend_ratio_ja_jp",
                    "display": "\u63a8\u8350\u6d41\u70b9\u51fb\u5360\u6bd4"
                }, {
                    "url": "ja_jp/category_click_ja_jp",
                    "model": "category_click_ja_jp",
                    "display": "\u5404\u5206\u7c7b\u7edf\u8ba1"
                }, {
                    "url": "ja_jp/category_source_ratio_ja_jp",
                    "model": "category_source_ratio_ja_jp",
                    "display": "\u5404\u5206\u7c7b\u65b0\u95fb\u6e90\u5360\u6bd4"
                }],
                "display": "\u65e5\u672c",
                "module": "ja_jp"
            }, {
                "items": [{
                    "url": "ar_sa/total_click_ar_sa",
                    "model": "total_click_ar_sa",
                    "display": "\u603b\u70b9\u51fb\u7edf\u8ba1"
                }, {
                    "url": "ar_sa/click_type_ratio_ar_sa",
                    "model": "click_type_ratio_ar_sa",
                    "display": "\u5206\u7c7b\u70b9\u51fb\u6bd4\u4f8b\u7edf\u8ba1"
                }, {
                    "url": "ar_sa/recommend_click_ar_sa",
                    "model": "recommend_click_ar_sa",
                    "display": "\u63a8\u8350\u6d41\u7edf\u8ba1"
                }, {
                    "url": "ar_sa/recommend_ratio_ar_sa",
                    "model": "recommend_ratio_ar_sa",
                    "display": "\u63a8\u8350\u6d41\u70b9\u51fb\u5360\u6bd4"
                }, {
                    "url": "ar_sa/category_click_ar_sa",
                    "model": "category_click_ar_sa",
                    "display": "\u5404\u5206\u7c7b\u7edf\u8ba1"
                }, {
                    "url": "ar_sa/category_source_ratio_ar_sa",
                    "model": "category_source_ratio_ar_sa",
                    "display": "\u5404\u5206\u7c7b\u65b0\u95fb\u6e90\u5360\u6bd4"
                }],
                "display": "\u963f\u62c9\u4f2f",
                "module": "ar_sa"
            }],
            "features": [],
            "need_changepwd": false,
            "permissions": [{
                "action": ["list"],
                "model": "click_type_ratio_ja_jp"
            }, {
                "action": ["list"],
                "model": "recommend_ratio_ja_jp"
            }, {
                "action": ["list"],
                "model": "recommend_click_ar_sa"
            }, {
                "action": ["list"],
                "model": "category_source_ratio_ru_ru"
            }, {
                "action": ["list"],
                "model": "category_click_ja_jp"
            }, {
                "action": ["list"],
                "model": "click_type_ratio_ar_sa"
            }, {
                "action": ["list"],
                "model": "category_source_ratio_ar_sa"
            }, {
                "action": ["list"],
                "model": "total_click_ar_sa"
            }, {
                "action": ["list"],
                "model": "recommend_ratio_tr_tr"
            }, {
                "action": ["list"],
                "model": "click_type_ratio_ru_ru"
            }, {
                "action": ["list"],
                "model": "recommend_click_ru_ru"
            }, {
                "action": ["list"],
                "model": "recommend_click_tr_tr"
            }, {
                "action": ["list"],
                "model": "category_click_tr_tr"
            }, {
                "action": ["list"],
                "model": "category_click_ar_sa"
            }, {
                "action": ["list"],
                "model": "category_click_ru_ru"
            }, {
                "action": ["list"],
                "model": "category_source_ratio_ja_jp"
            }, {
                "action": ["list"],
                "model": "recommend_click_ja_jp"
            }, {
                "action": ["list"],
                "model": "total_click_tr_tr"
            }, {
                "action": ["list"],
                "model": "click_type_ratio_tr_tr"
            }, {
                "action": ["list"],
                "model": "recommend_ratio_ar_sa"
            }, {
                "action": ["list"],
                "model": "recommend_ratio_ru_ru"
            }, {
                "action": ["list"],
                "model": "category_source_ratio_tr_tr"
            }, {
                "action": ["list"],
                "model": "total_click_ru_ru"
            }, {
                "action": ["list"],
                "model": "total_click_ja_jp"
            }]
        }
    };

router.post('/admin/login', function(req, res) {
    console.log('login request handling...');
    var userInfo = {
        name: req.param('user_name'),
        password: req.param('password')
    };

    if(validateUser(userInfo)) {
        res.send(200, navData)
    } else {
        navData.status = -1;
        navData.msg = 'login failed';
        res.send(200, navData);
    }
});

function validateUser(userInfo) {
    return userInfo.name == 'admin' && userInfo.password == 'e10adc3949ba59abbe56e057f20f883e';
}

module.exports = router;
