const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb')
require('dotenv').config();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMO_ENDPOINT,
    credentials: {
        accessKeyId: 'fakeMYKeyId',
        secretAccessKey: 'fakeSecretAccessKey',
    },
});

const createUserTable = new CreateTableCommand({
    TableName: 'Users',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH'}],
    AttributeDefinitions : [{ AttributeName: 'id', AttributeType: 'S'}],
    BillingMode: 'PAY_PER_REQUEST',
});

const createItemsTable = new CreateTableCommand({
    TableName: 'Items',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH'}],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S'}],
    BillingMode: 'PAY_PER_REQUEST'
});

const run = async () => {
    try {
        await client.send(createUserTable);
        console.log('Users table created.');

        await client.send(createItemsTable);
        console.log('Items table created')

    } catch (error) {
        console.error('Error creating tables : ', error.message);
    }
}

run();