import {
    AppConfigClient,
    UpdateConfigurationProfileCommand,
    CreateHostedConfigurationVersionCommand,
    StartDeploymentCommand
} from '@aws-sdk/client-appconfig';

import { validationSchema } from './config/validator';
import { stagingConfig } from './config/staging_config';

const awsRegion = 'us-east-1';

console.log('starting');
console.log(validationSchema);

(async () => {
    const client = new AppConfigClient({ region: awsRegion });
    const updateConfigCommand = new UpdateConfigurationProfileCommand({
        ApplicationId: '8pzhwwu',
        ConfigurationProfileId: 'fyg22o7',
        Name: 'staging',
        Validators: [
            {
                Type: 'JSON_SCHEMA',
                Content: JSON.stringify(validationSchema)
            }
        ]
    });
    const updateConfigResponse = await client.send(updateConfigCommand);
    const createHostedConfigVersionCommand = new CreateHostedConfigurationVersionCommand({
        ApplicationId: '8pzhwwu',
        ConfigurationProfileId: 'fyg22o7',
        ContentType: 'application/json',
        Content: new Uint8Array(Buffer.from(JSON.stringify(stagingConfig)))
    });
    const createHostedConfigResponse = await client.send(createHostedConfigVersionCommand);
    const deployCommand = new StartDeploymentCommand({
        ApplicationId: '8pzhwwu',
        EnvironmentId: '7xtdtg1',
        ConfigurationProfileId: 'fyg22o7',
        ConfigurationVersion: `${createHostedConfigResponse.VersionNumber}`,
        DeploymentStrategyId: 'AppConfig.AllAtOnce'
    });
    const deployResponse = await client.send(deployCommand);
})();
