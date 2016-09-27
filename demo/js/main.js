"use strict";
require('es6-shim');
require('reflect-metadata');
require('zone.js/dist/zone');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var demo_module_1 = require('./demo.module');
var splash_screen_1 = require('splash-screen');
var App = (function () {
    function App() {
    }
    App.prototype.destroySplash = function () {
        var _this = this;
        splash_screen_1.Splash.destroy();
        require('splash-screen/dist/splash.min.css').unuse();
        setTimeout(function () {
            if (splash_screen_1.Splash.isRunning()) {
                _this.destroySplash();
            }
        }, 100);
    };
    App.prototype.launch = function () {
        platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(demo_module_1.DemoModule);
    };
    App.prototype.run = function () {
        this.destroySplash();
        this.launch();
    };
    return App;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
