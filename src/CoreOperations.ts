import {MapOptions, MarkerOptions,OverlayOptions} from './interfaces/Options';
import {PreviousMarker} from './interfaces/PreviousMarker';

import {setGeoCtrl} from './controls/GeoControl';
import {setScaleCtrl} from './controls/ScaleControl';
import {setOverviewMapCtrl} from './controls/OverviewMapControl';
import {setNavigationCtrl} from './controls/NavigationControl';

import {OverlayType} from './enum/OverlayType';

export const reCenter = function(map: any, opts: MapOptions) {
    var BMap: any = (<any>window)['BMap'];
    if (opts.center) {
        map.setCenter(new BMap.Point(opts.center.longitude, opts.center.latitude));
    }
};

export const reZoom = function(map: any, opts: MapOptions) {
    if (opts.zoom) {
        map.setZoom(opts.zoom);
    }
};

export const createInstance = function(opts: MapOptions, element: any) {
    var BMap: any = (<any>window)['BMap'];
    // create map instance
    var map = new BMap.Map(element);

    // init map, set central location and zoom level
    map.centerAndZoom(new BMap.Point(opts.center.longitude, opts.center.latitude), opts.zoom);

    setNavigationCtrl(map, opts);
    setScaleCtrl(map, opts);
    setOverviewMapCtrl(map, opts);
    if (opts.enableScrollWheelZoom) {
        //enable scroll wheel zoom
        map.enableScrollWheelZoom();
    }
    setGeoCtrl(map, opts);
    createOverlay(map,opts);
    return map;
};

export const createOverlay = function(map: any,opts:MapOptions){
    var BMap: any = (<any>window)['BMap'];
    if(opts.overlays){
        opts.overlays.forEach(function(overlay:OverlayOptions){
            if(overlay.type === OverlayType.BMAP_OVERLAY_POLYLINE ){
                var paths = Array<any>()
                overlay.opts.forEach(function(polyline:any){
                    var pt = new BMap.Point(polyline.longitude,polyline.latitude);
                    paths.push(pt);
                });
                var polyline = new BMap.Polyline(paths,overlay.style);
                map.addOverlay(polyline);    
            }else 
            if(overlay.type == OverlayType.BMAP_OVERLAY_MARKER){
                overlay.opts.forEach(function(marker:any){
                    var marker = new BMap.Marker(new BMap.Point(marker.longitude, marker.latitude));
                    map.addOverlay(marker);
                });
            }else
            if(overlay.type == OverlayType.BMAP_OVERLAY_CIRCLE){
                overlay.opts.forEach(function(circle:any){
                    var circle = new BMap.Circle(new BMap.Point(circle.longitude,circle.latitude),circle.radius,overlay.style);
                    map.addOverlay(circle);
                });
            }else
            if(overlay.type == OverlayType.BMAP_OVERLAY_POLYGON || overlay.type == OverlayType.BMAP_OVERLAY_RECTANGLE){
                var paths = Array<any>()
                overlay.opts.forEach(function(opt:any){
                    var pt = new BMap.Point(opt.longitude,opt.latitude);
                    paths.push(pt);
                });
                var polygon = new BMap.Polygon(paths,overlay.style);
                polygon.setPath(paths);
                map.addOverlay(polygon);
            }
        });
    }
}

export const createMarker = function(marker: MarkerOptions, pt: any) {
    var BMap: any = (<any>window)['BMap'];
    if (marker.icon) {
        var mk = new BMap.Marker(pt, { icon: icon });
        var icon = new BMap.Icon(marker.icon, new BMap.Size(marker.width, marker.height));
        if(marker.label){
            var label = new BMap.Label(marker.label.title,marker.label.opts);
            if(marker.label.style){
                label.setStyle(marker.label.style)
            }
            mk.setLabel(label);
        }
        return mk;
    }
    var mk2 = new BMap.Marker(pt);
    if(marker.label){
        var label = new BMap.Label(marker.label.title,marker.label.opts);
        if(marker.label.style){
            label.setStyle(marker.label.style)
        }
        mk2.setLabel(label);
    }
    return mk2;

};

export const redrawMarkers = function(map: any, previousMarkers: PreviousMarker[], opts: MapOptions) {
    var BMap: any = (<any>window)['BMap'];
    var self = this;

    previousMarkers.forEach(function({marker, listeners}) {
        listeners.forEach(listener => { marker.removeEventListener('click', listener); });
        map.removeOverlay(marker);
    });

    previousMarkers.length = 0;

    if (!opts.markers) {
        return;
    }

    opts.markers.forEach(function(marker: MarkerOptions) {

        var marker2 = createMarker(marker, new BMap.Point(marker.longitude, marker.latitude));

        // add marker to the map
        map.addOverlay(marker2);
        let previousMarker: PreviousMarker = { marker: marker2, listeners: [] };
        previousMarkers.push(previousMarker);


        let onMarkerClickedListener = () => {
            self.onMarkerClicked.emit(marker2);
        };
        marker2.addEventListener('click', onMarkerClickedListener);
        previousMarker.listeners.push(onMarkerClickedListener);

        if (!marker.title && !marker.content) {
            return;
        }
        let msg = `<p>${marker.title || ''}</p><p>${marker.content || ''}</p>`;
        let infoWindow2 = new BMap.InfoWindow(msg, {
            enableMessage: !!marker.enableMessage
        });
        if (marker.autoDisplayInfoWindow) {
            marker2.openInfoWindow(infoWindow2);
        }
        let openInfoWindowListener = function() {
            this.openInfoWindow(infoWindow2);
        };
        previousMarker.listeners.push(openInfoWindowListener);
        marker2.addEventListener('click', openInfoWindowListener);
    });
};
