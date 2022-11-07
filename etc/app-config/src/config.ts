export const awsRegion: string = 'us-east-1';
export const contentType: string = 'application/json';
export const deploymentStrategyId: string = 'AppConfig.AllAtOnce';
export const validatorType: string = 'JSON_SCHEMA';

export interface EnvironmentSettings {
    applicationID: string;
    configurationProfileId: string;
    environmentId: string;
}

export const environmentConfigs: { [key: string]: EnvironmentSettings } = {
    staging: {
        applicationID: '8pzhwwu',
        configurationProfileId: 'fyg22o7',
        environmentId: '7xtdtg1'
    },
    prod: {
        applicationID: '',
        configurationProfileId: '',
        environmentId: ''
    }
};
