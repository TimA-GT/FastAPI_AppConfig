import fs from 'fs/promises';

import { AppConfigClient } from '@aws-sdk/client-appconfig';

import * as config from './src/config';
import * as appConfig from './src/app-config-client';

const stage = process.env.STAGE;
if (!stage || !Object.keys(config.environmentConfigs).includes(stage)) {
    throw Error('ERROR: Must provide valid STAGE environment variable');
}
const environmentSettings: config.EnvironmentSettings = config.environmentConfigs[stage];

const work = async () => {
    console.log(`starting to update AppConfig for stage ${stage}`);
    try {
        const validatorJSON = await fs.readFile('../../server/config/validator.json', 'utf-8');
        const configJSON = await fs.readFile(`../../server/config/${stage}.json`, 'utf-8');
        const client = new AppConfigClient({ region: config.awsRegion });
        await appConfig.updateConfigProfile(client, stage, environmentSettings, validatorJSON);
        const hostedConfig = await appConfig.createHostedConfigVersion(client, environmentSettings, configJSON);
        await appConfig.deployAppConfig(client, environmentSettings, hostedConfig);
    } catch (err) {
        console.log(`failed to update AppConfig for stage ${stage}`);
    } finally {
        console.log('work completed successfully');
    }
};

work();
