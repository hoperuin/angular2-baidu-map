import { OnInit, AfterContentInit } from '@angular/core';
import { OfflineOptions } from '../../src';
export declare class MainApp implements OnInit, AfterContentInit {
    opts: any;
    offlineOpts: OfflineOptions;
    privousCenter: Object;
    privousMarkers: Object[];
    display: boolean;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    updateCoordinate(e: MouseEvent): void;
    updateMarker(e: MouseEvent): void;
    updateZoom(e: MouseEvent): void;
    loadMap(map: any): void;
    clickMarker(marker: any): void;
    toggleDisplay(e: MouseEvent): void;
}
