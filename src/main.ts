import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CPE_CONFIG } from './config/cpe-tokens';
import { environment } from './environments/environment';

function configListener(this: any) {
    try {
        const configuration = JSON.parse(this.responseText);
        
        // pass config to bootstrap process using an injection token
        platformBrowserDynamic([
            { provide: CPE_CONFIG, useValue: configuration }
        ])
            .bootstrapModule(AppModule)
            .catch(err => console.error(err));

    } catch (error) {
        console.error(error);
    }
}

function configFailed() {
    console.error('Error: retrieving config.json');
}

if (environment.production) {
    enableProdMode();
}

const request = new XMLHttpRequest();
request.addEventListener('load', configListener);
request.addEventListener('error', configFailed);
request.open('GET', `./config/config.${environment.name}.json`);
request.send();