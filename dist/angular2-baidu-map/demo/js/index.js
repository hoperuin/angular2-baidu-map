'use strict';
require.ensure(['splash-screen/dist/splash.min.css', 'splash-screen'], function (require) {
    require('splash-screen/dist/splash.min.css').use();
    require('splash-screen').Splash.enable('circular');
});
require.ensure(['../css/main.css', './main'], function (require) {
    require('../css/main.css').use();
    var App = require('./main').default;
    (new App()).run();
});
