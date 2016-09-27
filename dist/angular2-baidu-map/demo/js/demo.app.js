'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var src_1 = require('../../src');
var tpl = require('./demo.app.tpl');
var style = require('./demo.app.style');
var prism = require('./prism');
var center1 = {
    longitude: 121.506191,
    latitude: 31.245554
};
var center2 = {
    longitude: 121.500885,
    latitude: 31.190032
};
var markers1 = [{
        longitude: 121.506191,
        latitude: 31.245554,
        title: 'Where',
        content: 'Put description here',
        autoDisplayInfoWindow: true,
        label: {
            title: '1',
            opts: {
                postion: {
                    longitude: 121.506191,
                    latitude: 31.245554,
                },
                offset: {
                    width: 5,
                    height: 3
                }
            },
            style: {
                "color": "white",
                "border": "none",
                "background": "none"
            }
        }
    }];
var markers2 = [{
        longitude: 121.500885,
        latitude: 31.190032
    }];
var MainApp = (function () {
    function MainApp() {
        this.privousCenter = center1;
        this.privousMarkers = markers1;
        this.display = true;
    }
    MainApp.prototype.ngOnInit = function () {
        this.opts = {
            center: center1,
            zoom: 17,
            markers: markers1,
            geolocationCtrl: {
                anchor: src_1.ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
            },
            scaleCtrl: {
                anchor: src_1.ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
            },
            overviewCtrl: {
                isOpen: true
            },
            navCtrl: {
                type: src_1.NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
            },
            overlays: [
                {
                    type: src_1.OverlayType.BMAP_OVERLAY_POLYLINE,
                    opts: [
                        {
                            longitude: 121.506191,
                            latitude: 31.245554
                        },
                        {
                            longitude: 121.503535,
                            latitude: 31.245053
                        },
                        {
                            longitude: 121.500885,
                            latitude: 31.190032
                        }
                    ]
                },
                {
                    type: src_1.OverlayType.BMAP_OVERLAY_MARKER,
                    opts: [
                        {
                            longitude: 121.500885,
                            latitude: 31.190032
                        }
                    ]
                },
                {
                    type: src_1.OverlayType.BMAP_OVERLAY_CIRCLE,
                    opts: [
                        {
                            longitude: 121.506191,
                            latitude: 31.245554,
                            radius: 100
                        }
                    ],
                    style: {
                        strokeColor: "blue",
                        strokeWeight: 2,
                        strokeOpacity: 0.5
                    }
                }, {
                    type: src_1.OverlayType.BMAP_OVERLAY_POLYGON,
                    opts: [
                        {
                            longitude: 121.502583,
                            latitude: 31.245368
                        },
                        {
                            longitude: 121.504343,
                            latitude: 31.245275
                        },
                        {
                            longitude: 121.502762,
                            latitude: 31.244549
                        },
                        {
                            longitude: 121.504424,
                            latitude: 31.244573
                        }
                    ]
                }, {
                    type: src_1.OverlayType.BMAP_OVERLAY_RECTANGLE,
                    opts: [
                        {
                            longitude: 121.502583,
                            latitude: 31.245368
                        },
                        {
                            longitude: 121.504343,
                            latitude: 31.245275
                        },
                        {
                            longitude: 121.504343,
                            latitude: 31.245275
                        },
                        {
                            longitude: 121.504424,
                            latitude: 31.244573
                        }
                    ],
                    style: {
                        strokeColor: "red",
                        strokeWeight: 2,
                        strokeOpacity: 0.5
                    }
                }
            ]
        };
        this.offlineOpts = {
            retryInterval: 5000,
            txt: 'NO-NETWORK'
        };
    };
    MainApp.prototype.ngAfterContentInit = function () {
        prism.highlightAll();
    };
    MainApp.prototype.updateCoordinate = function (e) {
        this.opts = this.privousCenter === center1 ? { center: center2 } : { center: center1 };
        this.privousCenter = this.opts.center;
    };
    MainApp.prototype.updateMarker = function (e) {
        this.opts = this.privousMarkers === markers1 ? { markers: markers2 } : { markers: markers1 };
        this.privousMarkers = this.opts.markers;
    };
    MainApp.prototype.updateZoom = function (e) {
        this.opts = {
            zoom: Math.floor(Math.random() * 16) + 3
        };
    };
    MainApp.prototype.loadMap = function (map) {
        console.log('The map instance is created', map);
    };
    MainApp.prototype.clickMarker = function (marker) {
        console.log('The clicked marker is', marker);
    };
    MainApp.prototype.toggleDisplay = function (e) {
        if (!this.display) {
            this.opts = {
                center: center1,
                zoom: 17,
                markers: markers1,
                geolocationCtrl: {
                    anchor: src_1.ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
                },
                scaleCtrl: {
                    anchor: src_1.ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
                },
                overviewCtrl: {
                    isOpen: true
                },
                navCtrl: {
                    type: src_1.NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
                }
            };
        }
        this.display = !this.display;
    };
    MainApp = __decorate([
        core_1.Component({
            selector: 'map-presentation',
            template: tpl,
            styles: [style]
        }), 
        __metadata('design:paramtypes', [])
    ], MainApp);
    return MainApp;
}());
exports.MainApp = MainApp;
