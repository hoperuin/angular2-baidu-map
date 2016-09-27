import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BaiduMap, OfflineOptions, ControlAnchor, NavigationControlType } from '../../src';
import { MainApp } from './demo.app'
@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        BaiduMap,
        MainApp
    ],
    bootstrap:[
        MainApp
    ]
})
export class DemoModule {}