import { AppConfigClient, CreateApplicationCommand } from '@aws-sdk/client-appconfig';

const awsRegion = 'us-east-1';

console.log('starting');
( async () => {
    const client = new AppConfigClient({ region: awsRegion });
    const command = new CreateApplicationCommand({Name: 'Ads_Manager_2', Description: 'app config POC', Tags: {
        "owner_name": "tim",
        "ttl": "2022",
    }})
})()
