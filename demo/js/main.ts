import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DemoModule} from './demo.module';
import {Splash} from 'splash-screen';

class App {

    constructor() {
    
    }

    destroySplash(): void {
        var _this = this;
        Splash.destroy();
        (<any>require('splash-screen/dist/splash.min.css')).unuse();
        setTimeout(function() {
            if (Splash.isRunning()) {
                _this.destroySplash();
            }
        }, 100);
    }

    launch() {
        platformBrowserDynamic().bootstrapModule(DemoModule);
    }

    run(): void {
        this.destroySplash();
        this.launch();
    }
}

export default App;
