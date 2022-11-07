import {
    AppConfigClient,
    UpdateConfigurationProfileCommand,
    CreateHostedConfigurationVersionCommand,
    CreateHostedConfigurationVersionCommandOutput,
    StartDeploymentCommand
} from '@aws-sdk/client-appconfig';

import { EnvironmentSettings, contentType, validatorType, deploymentStrategyId } from './config';

export const updateConfigProfile = async (
    client: AppConfigClient,
    stage: string,
    stageSettings: EnvironmentSettings,
    validatorJSONString: string
) => {
    const updateConfigCommand = new UpdateConfigurationProfileCommand({
        ApplicationId: stageSettings.applicationID,
        ConfigurationProfileId: stageSettings.configurationProfileId,
        Name: stage,
        Validators: [
            {
                Type: validatorType,
                Content: validatorJSONString
            }
        ]
    });
    await client.send(updateConfigCommand);
};

export const createHostedConfigVersion = async (
    client: AppConfigClient,
    stageSettings: EnvironmentSettings,
    appConfigJSONString: string
) => {
    const createHostedConfigVersionCommand = new CreateHostedConfigurationVersionCommand({
        ApplicationId: stageSettings.applicationID,
        ConfigurationProfileId: stageSettings.configurationProfileId,
        ContentType: contentType,
        Content: new Uint8Array(Buffer.from(appConfigJSONString))
    });
    return await client.send(createHostedConfigVersionCommand);
};

export const deployAppConfig = async (
    client: AppConfigClient,
    stageSettings: EnvironmentSettings,
    hostedConfig: CreateHostedConfigurationVersionCommandOutput
) => {
    const deployCommand = new StartDeploymentCommand({
        ApplicationId: stageSettings.applicationID,
        EnvironmentId: stageSettings.environmentId,
        ConfigurationProfileId: stageSettings.configurationProfileId,
        ConfigurationVersion: `${hostedConfig.VersionNumber}`,
        DeploymentStrategyId: deploymentStrategyId
    });
    await client.send(deployCommand);
};
