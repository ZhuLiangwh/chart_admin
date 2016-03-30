define(['common/utils/tree', 'common/utils/url', 'common/utils/store', 'common/utils/md5'], function(TreeUtil, UrlUtil, Store, Md5) {
    var store = Store('localStorage'),
        STORAGE_USER_KEY = 'user_info',
        STORAGE_PERMISSION_KEY = 'user_permission';

    var diName = 'authenticator';
    return {
        __register__: function(_mod) {
            _mod.factory(diName, ['$http', '$q', '$state', '$log', 'session', 'permissions', 'apiService', Authenticator]);
            return _mod;
        }
    };

    function Authenticator($http, $q, $state, $log, session, permissions, apiService) {
        return {
            login: loginUser,
            logout: logoutUser,
            isLogin: function() {
                return !!session.sessionId;
            }
        };

        function loginUser(username, password) {
            var dfd = $q.defer(),
                loginUrl = apiService.getApiUrl('/login');
            password = Md5.hex_md5(password);
            if(username === '') {
                return makeRejected('A valid username is required!');
            } else {
                $http({
                    url: loginUrl,
                    method: 'POST',
                    cache: false,
                    responseType: 'json',
                    data: {
                        user_name: username,
                        password: password
                    }
                }).success(function(res) {
                    var permissionList = res.data.permissions || [],
                        featureList = res.data.features || [];

                    if(res.status != 0) {
                        return dfd.reject(res.msg);
                    } else {
                        navData = TreeUtil.processNodes(res.data && res.data.menu || [], 'items', function(node) {
                            if(node.url) {
                                node.state = node.url.replace('/', '.');
                            }
                        });

                        session.set({
                            username: username,
                            navData: navData,
                            permissions: permissionList,
                            features: featureList
                        });
                        permissions.setPermissions(session.permissions); //在auth.config.js中$stateChangeStart会优先于watch sessionId触发
                        permissions.setFeatures(session.features);
                        dfd.resolve(res.data);
                    }
                }).error(function(data, status, headers) {
                    return dfd.reject('Login Failed: Server Error');
                });
                return dfd.promise;
            }
        }

        function logoutUser() {
            $state.go('login');
        }
    }
})
