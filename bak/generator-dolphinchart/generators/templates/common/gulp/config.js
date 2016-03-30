module.exports = {
    "src": "./src/",
    "build": "./build/",
    vendorJs: [
        "vendor/headjs/dist/1.0.0/head.load.min.js",
        "vendor/jquery/dist/jquery.min.js",
        "vendor/angular/angular.min.js",
        "vendor/angular-sanitize/angular-sanitize.min.js",
        "vendor/angular-ui-router/release/angular-ui-router.min.js",
        "vendor/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "vendor/ng-table/ng-table.min.js",
        "vendor/angular-dolphin/angular-dolphin.js",
        "vendor/toastr/toastr.min.js",
        "vendor/requirejs/require.js",
        "vendor/underscore/underscore.js",
        "vendor/highcharts-release/highcharts.js",
        "vendor/requirejs-domready/domReady.js",
        "vendor/requirejs-text/text.js"
    ],
    vendorCss: [
        "vendor/toastr/toastr.min.css",
        "vendor/bootstrap/dist/css/bootstrap.min.css",
        'vendor/bootstrap/dist/fonts/**/*.*',
        "vendor/font-awesome/css/font-awesome.min.css",
        "vendor/font-awesome/fonts/**/*.*"
    ],
    getVendors: function() {
        var js = this.vendorJs.slice(0),
            css = this.vendorCss.slice(0),
            dir = this.src,
            re = js.concat(css);

        return re.map(function(item) {
            return dir + item;
        })
    }
};
