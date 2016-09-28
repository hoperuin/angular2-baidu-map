"use strict";
var GeoControl_1 = require('./controls/GeoControl');
var ScaleControl_1 = require('./controls/ScaleControl');
var OverviewMapControl_1 = require('./controls/OverviewMapControl');
var NavigationControl_1 = require('./controls/NavigationControl');
var OverlayType_1 = require('./enum/OverlayType');
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
        var mk = new BMap.Marker(pt, { icon: icon });
        var icon = new BMap.Icon(marker.icon, new BMap.Size(marker.width, marker.height));
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
