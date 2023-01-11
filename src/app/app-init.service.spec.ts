import { TestBed } from '@angular/core/testing';
import { CpeInstrumentationConfig } from '../config/cpe-instrumentation-config';
import { CpeInstrumentationToken, CPE_CONFIG } from '../config/cpe-tokens';
import { IConfig } from '../config/cpe-config';

import { AppInitService } from './app-init.service';

describe('AppInitService (dev)', () => {
    let service: AppInitService;

    const devConfig: IConfig = {
        instrumentation: {
            environment: 'dev',
            rollbar: {
                enabled: true,
                accessToken: 'rollbar_token'
            }
        }
    };

    const instrumentationConfig: CpeInstrumentationConfig = {
        environment: 'dev',
        rollbar: {
            enabled: false,
            accessToken: 'rollbar_token'
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: CPE_CONFIG,
                    useValue: devConfig
                },
                {
                    provide: CpeInstrumentationToken,
                    useValue: instrumentationConfig
                },
            ]
        });
        service = TestBed.inject(AppInitService);

        expect(service).toBeTruthy();
    });

    it('should process the fully specified config (dev mode)', async () => {
        expect(service.cpeInstrumentationConfig.environment).toEqual('dev');
        expect(service.cpeInstrumentationConfig.rollbar.enabled).toEqual(true);
        expect(service.cpeInstrumentationConfig.rollbar.accessToken).toEqual('rollbar_token');
    });

});
