export interface IConfig {
    instrumentation: {
        environment: string;
        rollbar: {
            enabled: boolean;
            accessToken: string;
        };
    };
}