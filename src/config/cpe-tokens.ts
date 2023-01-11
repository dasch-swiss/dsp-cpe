import { InjectionToken } from "@angular/core";
import { IConfig } from "./cpe-config";
import { CpeInstrumentationConfig } from "./cpe-instrumentation-config";

export const CPE_CONFIG = new InjectionToken<IConfig>('cpe-config');

// config for instrumentation (datadog and rollbar)
export const CpeInstrumentationToken = new InjectionToken<CpeInstrumentationConfig>('CPE instrumentation configuration');