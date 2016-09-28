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
var core_1 = require('@angular/core');
var MapStatus_1 = require('./enum/MapStatus');
var defaults_1 = require('./defaults');
var Loader_1 = require('./Loader');
var CoreOperations_1 = require('./CoreOperations');
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
var ControlAnchor_1 = require('./enum/ControlAnchor');
exports.ControlAnchor = ControlAnchor_1.ControlAnchor;
var OverlayType_1 = require('./enum/OverlayType');
exports.OverlayType = OverlayType_1.OverlayType;
__export(require('./enum/NavigationControlType'));
var MapStatus_2 = require('./enum/MapStatus');
exports.MapStatus = MapStatus_2.MapStatus;
