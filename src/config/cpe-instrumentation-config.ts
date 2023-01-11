export class CpeInstrumentationConfig {
    constructor(
        public environment: string,
        public rollbar: CpeRollbarConfig
    ) { }
}

export class CpeRollbarConfig {
    constructor(
        public enabled: boolean,
        public accessToken: string
    ) { }
}