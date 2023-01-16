import { Inject, Injectable } from '@angular/core';
import { CpeInstrumentationConfig, CpeRollbarConfig } from '../config/cpe-instrumentation-config';
import { IConfig } from '../config/cpe-config';
import { CPE_CONFIG } from '../config/cpe-tokens';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    private _cpeInstrumentationConfig: CpeInstrumentationConfig;

    get cpeInstrumentationConfig(): CpeInstrumentationConfig {
        return this._cpeInstrumentationConfig;
    }

    constructor(@Inject(CPE_CONFIG) private _config: IConfig) {
        // init instrumentation configuration
        this._cpeInstrumentationConfig = new CpeInstrumentationConfig(
            this._config.instrumentation.environment,
            new CpeRollbarConfig(
                this._config.instrumentation.rollbar.enabled,
                this._config.instrumentation.rollbar.accessToken
            )
        );
    }
}
