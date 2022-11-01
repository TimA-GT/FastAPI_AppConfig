import { AppConfigClient, CreateApplicationCommand, CreateApplicationCommandInput } from '@aws-sdk/client-appconfig';

const awsRegion = 'us-east-1';

console.log('starting');
( async () => {
    const client = new AppConfigClient({ region: awsRegion });
})()
