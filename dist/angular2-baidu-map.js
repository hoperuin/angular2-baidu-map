(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@angular/core")) : factory(root["@angular/core"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var core_1 = __webpack_require__(1);
	var MapStatus_1 = __webpack_require__(2);
	var defaults_1 = __webpack_require__(3);
	var Loader_1 = __webpack_require__(4);
	var CoreOperations_1 = __webpack_require__(5);
	var BaiduMap = (function () {
	    function BaiduMap(el) {
	        this.el = el;
	        this.onMapLoaded = new core_1.EventEmitter();
	        this.onMarkerClicked = new core_1.EventEmitter();
	        this.previousMarkers = [];
	    }
	    BaiduMap.prototype.ngOnInit = function () {
	        var offlineOpts = Object.assign({}, defaults_1.defaultOfflineOpts, this.offlineOpts);
	        this.offlineWords = offlineOpts.txt;
	        Loader_1.loader(this.ak, offlineOpts, this._draw.bind(this));
	    };
	    BaiduMap.prototype.ngOnChanges = function (changes) {
	        var baiduMap = window['baiduMap'];
	        if (!baiduMap || baiduMap.status !== MapStatus_1.MapStatus.LOADED) {
	            return;
	        }
	        if (changes['options'].isFirstChange() && !this.map) {
	            return;
	        }
	        var opts = changes['options'].currentValue;
	        CoreOperations_1.reCenter(this.map, opts);
	        CoreOperations_1.reZoom(this.map, opts);
	        CoreOperations_1.redrawMarkers.bind(this)(this.map, this.previousMarkers, opts);
	        CoreOperations_1.createOverlay(this.map, opts);
	    };
	    BaiduMap.prototype._draw = function () {
	        var options = Object.assign({}, defaults_1.defaultOpts, this.options);
	        this.map = CoreOperations_1.createInstance(options, this.el.nativeElement);
	        this.onMapLoaded.emit(this.map);
	        CoreOperations_1.redrawMarkers.bind(this)(this.map, this.previousMarkers, options);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], BaiduMap.prototype, "ak", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], BaiduMap.prototype, "options", void 0);
	    __decorate([
	        core_1.Input('offline'), 
	        __metadata('design:type', Object)
	    ], BaiduMap.prototype, "offlineOpts", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], BaiduMap.prototype, "onMapLoaded", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], BaiduMap.prototype, "onMarkerClicked", void 0);
	    BaiduMap = __decorate([
	        core_1.Component({
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	            selector: 'baidu-map',
	            styles: ["\n        .offlinePanel{\n            width: 100%;\n            height: 100%;\n            background-color: #E6E6E6;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            opacity: 0;\n        }\n    ", "\n        .offlineLabel{\n            font-size: 30px;\n        }\n    "],
	            template: "\n        <div class=\"offlinePanel\">\n            <label class=\"offlineLabel\">{{ offlineWords }}</label>\n        </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], BaiduMap);
	    return BaiduMap;
	}());
	exports.BaiduMap = BaiduMap;
	var ControlAnchor_1 = __webpack_require__(11);
	exports.ControlAnchor = ControlAnchor_1.ControlAnchor;
	var OverlayType_1 = __webpack_require__(10);
	exports.OverlayType = OverlayType_1.OverlayType;
	__export(__webpack_require__(12));
	var MapStatus_2 = __webpack_require__(2);
	exports.MapStatus = MapStatus_2.MapStatus;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	(function (MapStatus) {
	    MapStatus[MapStatus["LOADING"] = 0] = "LOADING";
	    MapStatus[MapStatus["LOADED"] = 1] = "LOADED";
	})(exports.MapStatus || (exports.MapStatus = {}));
	var MapStatus = exports.MapStatus;
	;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.defaultOpts = {
	    navCtrl: true,
	    scaleCtrl: true,
	    overviewCtrl: true,
	    enableScrollWheelZoom: true,
	    geolocationCtrl: false,
	    zoom: 10
	};
	exports.defaultOfflineOpts = {
	    retryInterval: 30000,
	    txt: 'OFFLINE'
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MapStatus_1 = __webpack_require__(2);
	exports.loader = function (ak, offlineOpts, callback) {
	    var MAP_URL = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=baidumapinit";
	    var win = window;
	    var baiduMap = win['baiduMap'];
	    if (baiduMap && baiduMap.status === MapStatus_1.MapStatus.LOADING) {
	        return baiduMap.callbacks.push(callback);
	    }
	    if (baiduMap && baiduMap.status === MapStatus_1.MapStatus.LOADED) {
	        return callback();
	    }
	    win['baiduMap'] = { status: MapStatus_1.MapStatus.LOADING, callbacks: [] };
	    win['baidumapinit'] = function () {
	        win['baiduMap'].status = MapStatus_1.MapStatus.LOADED;
	        callback();
	        win['baiduMap'].callbacks.forEach(function (cb) { return cb(); });
	        win['baiduMap'].callbacks = [];
	    };
	    var createTag = function () {
	        var script = document.createElement('script');
	        script.type = 'text/javascript';
	        script.src = MAP_URL;
	        script.onerror = function () {
	            Array.prototype
	                .slice
	                .call(document.querySelectorAll('baidu-map div'))
	                .forEach(function (node) {
	                node.style.opacity = 1;
	            });
	            document.body.removeChild(script);
	            setTimeout(createTag, offlineOpts.retryInterval);
	        };
	        document.body.appendChild(script);
	    };
	    createTag();
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GeoControl_1 = __webpack_require__(6);
	var ScaleControl_1 = __webpack_require__(7);
	var OverviewMapControl_1 = __webpack_require__(8);
	var NavigationControl_1 = __webpack_require__(9);
	var OverlayType_1 = __webpack_require__(10);
	exports.reCenter = function (map, opts) {
	    var BMap = window['BMap'];
	    if (opts.center) {
	        map.setCenter(new BMap.Point(opts.center.longitude, opts.center.latitude));
	    }
	};
	exports.reZoom = function (map, opts) {
	    if (opts.zoom) {
	        map.setZoom(opts.zoom);
	    }
	};
	exports.createInstance = function (opts, element) {
	    var BMap = window['BMap'];
	    var map = new BMap.Map(element);
	    map.centerAndZoom(new BMap.Point(opts.center.longitude, opts.center.latitude), opts.zoom);
	    NavigationControl_1.setNavigationCtrl(map, opts);
	    ScaleControl_1.setScaleCtrl(map, opts);
	    OverviewMapControl_1.setOverviewMapCtrl(map, opts);
	    if (opts.enableScrollWheelZoom) {
	        map.enableScrollWheelZoom();
	    }
	    GeoControl_1.setGeoCtrl(map, opts);
	    exports.createOverlay(map, opts);
	    return map;
	};
	exports.createOverlay = function (map, opts) {
	    var BMap = window['BMap'];
	    if (opts.overlays) {
	        opts.overlays.forEach(function (overlay) {
	            if (overlay.type === OverlayType_1.OverlayType.BMAP_OVERLAY_POLYLINE) {
	                var paths = Array();
	                overlay.opts.forEach(function (polyline) {
	                    var pt = new BMap.Point(polyline.longitude, polyline.latitude);
	                    paths.push(pt);
	                });
	                var polyline = new BMap.Polyline(paths, overlay.style);
	                map.addOverlay(polyline);
	            }
	            else if (overlay.type == OverlayType_1.OverlayType.BMAP_OVERLAY_MARKER) {
	                overlay.opts.forEach(function (marker) {
	                    var marker = new BMap.Marker(new BMap.Point(marker.longitude, marker.latitude));
	                    map.addOverlay(marker);
	                });
	            }
	            else if (overlay.type == OverlayType_1.OverlayType.BMAP_OVERLAY_CIRCLE) {
	                overlay.opts.forEach(function (circle) {
	                    var circle = new BMap.Circle(new BMap.Point(circle.longitude, circle.latitude), circle.radius, overlay.style);
	                    map.addOverlay(circle);
	                });
	            }
	            else if (overlay.type == OverlayType_1.OverlayType.BMAP_OVERLAY_POLYGON || overlay.type == OverlayType_1.OverlayType.BMAP_OVERLAY_RECTANGLE) {
	                var paths = Array();
	                overlay.opts.forEach(function (opt) {
	                    var pt = new BMap.Point(opt.longitude, opt.latitude);
	                    paths.push(pt);
	                });
	                var polygon = new BMap.Polygon(paths, overlay.style);
	                polygon.setPath(paths);
	                map.addOverlay(polygon);
	            }
	        });
	    }
	};
	exports.createMarker = function (marker, pt) {
	    var BMap = window['BMap'];
	    if (marker.icon) {
	        var icon = new BMap.Icon(marker.icon, new BMap.Size(marker.width, marker.height));
	        var mk = new BMap.Marker(pt, { icon: icon });
	        if (marker.label) {
	            var label = new BMap.Label(marker.label.title, marker.label.opts);
	            if (marker.label.style) {
	                label.setStyle(marker.label.style);
	            }
	            mk.setLabel(label);
	        }
	        return mk;
	    }
	    var mk2 = new BMap.Marker(pt);
	    if (marker.label) {
	        var label = new BMap.Label(marker.label.title, marker.label.opts);
	        if (marker.label.style) {
	            label.setStyle(marker.label.style);
	        }
	        mk2.setLabel(label);
	    }
	    return mk2;
	};
	exports.redrawMarkers = function (map, previousMarkers, opts) {
	    var BMap = window['BMap'];
	    var self = this;
	    previousMarkers.forEach(function (_a) {
	        var marker = _a.marker, listeners = _a.listeners;
	        listeners.forEach(function (listener) { marker.removeEventListener('click', listener); });
	        map.removeOverlay(marker);
	    });
	    previousMarkers.length = 0;
	    if (!opts.markers) {
	        return;
	    }
	    opts.markers.forEach(function (marker) {
	        var marker2 = exports.createMarker(marker, new BMap.Point(marker.longitude, marker.latitude));
	        map.addOverlay(marker2);
	        var previousMarker = { marker: marker2, listeners: [] };
	        previousMarkers.push(previousMarker);
	        var onMarkerClickedListener = function () {
	            self.onMarkerClicked.emit(marker2);
	        };
	        marker2.addEventListener('click', onMarkerClickedListener);
	        previousMarker.listeners.push(onMarkerClickedListener);
	        if (!marker.title && !marker.content) {
	            return;
	        }
	        var msg = "<p>" + (marker.title || '') + "</p><p>" + (marker.content || '') + "</p>";
	        var infoWindow2 = new BMap.InfoWindow(msg, {
	            enableMessage: !!marker.enableMessage
	        });
	        if (marker.autoDisplayInfoWindow) {
	            marker2.openInfoWindow(infoWindow2);
	        }
	        var openInfoWindowListener = function () {
	            this.openInfoWindow(infoWindow2);
	        };
	        previousMarker.listeners.push(openInfoWindowListener);
	        marker2.addEventListener('click', openInfoWindowListener);
	    });
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	exports.setGeoCtrl = function (map, opts) {
	    var BMap = window['BMap'];
	    var geoOpts = {};
	    if (typeof opts.geolocationCtrl !== 'boolean') {
	        var ctrl = opts.geolocationCtrl;
	        if (ctrl.anchor) {
	            geoOpts.anchor = ctrl.anchor;
	        }
	        if (ctrl.offset) {
	            geoOpts.offset = new BMap.Size(ctrl.offset.width, ctrl.offset.height);
	        }
	        if (typeof geoOpts.showAddressBar === 'boolean') {
	            geoOpts.showAddressBar = ctrl.showAddressBar;
	        }
	        if (typeof geoOpts.enableAutoLocation === 'boolean') {
	            geoOpts.enableAutoLocation = ctrl.enableAutoLocation;
	        }
	        if (geoOpts.locationIcon) {
	            geoOpts.locationIcon = new BMap.Size(ctrl.locationIcon.url, new BMap.Size(ctrl.locationIcon.size.width, ctrl.locationIcon.size.height));
	        }
	        map.addControl(new BMap.GeolocationControl(geoOpts));
	    }
	    else if (opts.geolocationCtrl) {
	        map.addControl(new BMap.GeolocationControl());
	    }
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.setScaleCtrl = function (map, opts) {
	    var BMap = window['BMap'];
	    var scaleOpts = {};
	    if (typeof opts.scaleCtrl !== 'boolean') {
	        var ctrl = opts.scaleCtrl;
	        if (ctrl.anchor) {
	            scaleOpts.anchor = ctrl.anchor;
	        }
	        if (ctrl.offset) {
	            scaleOpts.offset = new BMap.Size(ctrl.offset.width, ctrl.offset.height);
	        }
	        map.addControl(new BMap.ScaleControl(scaleOpts));
	    }
	    else if (opts.scaleCtrl) {
	        map.addControl(new BMap.ScaleControl());
	    }
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	exports.setOverviewMapCtrl = function (map, opts) {
	    var BMap = window['BMap'];
	    var overviewOpts = {};
	    if (typeof opts.overviewCtrl !== 'boolean') {
	        var ctrl = opts.overviewCtrl;
	        if (ctrl.anchor) {
	            overviewOpts.anchor = ctrl.anchor;
	        }
	        if (ctrl.offset) {
	            overviewOpts.offset = new BMap.Size(ctrl.offset.width, ctrl.offset.height);
	        }
	        if (ctrl.size) {
	            overviewOpts.size = new BMap.Size(ctrl.size.width, ctrl.size.height);
	        }
	        if (typeof ctrl.isOpen !== 'undefined') {
	            overviewOpts.isOpen = ctrl.isOpen;
	        }
	        map.addControl(new BMap.OverviewMapControl(overviewOpts));
	    }
	    else if (opts.overviewCtrl) {
	        map.addControl(new BMap.OverviewMapControl());
	    }
	};
	;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	exports.setNavigationCtrl = function (map, opts) {
	    var BMap = window['BMap'];
	    var navOpts = {};
	    if (typeof opts.navCtrl !== 'boolean') {
	        var ctrl = opts.navCtrl;
	        if (ctrl.anchor) {
	            navOpts.anchor = ctrl.anchor;
	        }
	        if (ctrl.offset) {
	            navOpts.offset = new BMap.Size(ctrl.offset.width, ctrl.offset.height);
	        }
	        if (typeof ctrl.type !== 'undefined') {
	            navOpts.type = ctrl.type;
	        }
	        if (typeof ctrl.showZoomInfo !== 'undefined') {
	            navOpts.showZoomInfo = ctrl.showZoomInfo;
	        }
	        if (typeof ctrl.enableGeolocation !== 'undefined') {
	            navOpts.enableGeolocation = ctrl.enableGeolocation;
	        }
	        map.addControl(new BMap.NavigationControl(navOpts));
	    }
	    else if (opts.navCtrl) {
	        map.addControl(new BMap.NavigationControl());
	    }
	};
	;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	(function (OverlayType) {
	    OverlayType[OverlayType["BMAP_OVERLAY_MARKER"] = 0] = "BMAP_OVERLAY_MARKER";
	    OverlayType[OverlayType["BMAP_OVERLAY_POLYLINE"] = 1] = "BMAP_OVERLAY_POLYLINE";
	    OverlayType[OverlayType["BMAP_OVERLAY_CIRCLE"] = 2] = "BMAP_OVERLAY_CIRCLE";
	    OverlayType[OverlayType["BMAP_OVERLAY_POLYGON"] = 3] = "BMAP_OVERLAY_POLYGON";
	    OverlayType[OverlayType["BMAP_OVERLAY_RECTANGLE"] = 4] = "BMAP_OVERLAY_RECTANGLE";
	})(exports.OverlayType || (exports.OverlayType = {}));
	var OverlayType = exports.OverlayType;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	(function (ControlAnchor) {
	    ControlAnchor[ControlAnchor["BMAP_ANCHOR_TOP_LEFT"] = 0] = "BMAP_ANCHOR_TOP_LEFT";
	    ControlAnchor[ControlAnchor["BMAP_ANCHOR_TOP_RIGHT"] = 1] = "BMAP_ANCHOR_TOP_RIGHT";
	    ControlAnchor[ControlAnchor["BMAP_ANCHOR_BOTTOM_LEFT"] = 2] = "BMAP_ANCHOR_BOTTOM_LEFT";
	    ControlAnchor[ControlAnchor["BMAP_ANCHOR_BOTTOM_RIGHT"] = 3] = "BMAP_ANCHOR_BOTTOM_RIGHT";
	})(exports.ControlAnchor || (exports.ControlAnchor = {}));
	var ControlAnchor = exports.ControlAnchor;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	(function (NavigationControlType) {
	    NavigationControlType[NavigationControlType["BMAP_NAVIGATION_CONTROL_LARGE"] = 0] = "BMAP_NAVIGATION_CONTROL_LARGE";
	    NavigationControlType[NavigationControlType["BMAP_NAVIGATION_CONTROL_SMALL"] = 1] = "BMAP_NAVIGATION_CONTROL_SMALL";
	    NavigationControlType[NavigationControlType["BMAP_NAVIGATION_CONTROL_PAN"] = 2] = "BMAP_NAVIGATION_CONTROL_PAN";
	    NavigationControlType[NavigationControlType["BMAP_NAVIGATION_CONTROL_ZOOM"] = 3] = "BMAP_NAVIGATION_CONTROL_ZOOM";
	})(exports.NavigationControlType || (exports.NavigationControlType = {}));
	var NavigationControlType = exports.NavigationControlType;


/***/ }
/******/ ])
});
;