const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')
require('dotenv').config()

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMO_ENDPOINT,
    credentials: {
        accessKeyId: 'fakeMYKeyId',
        secretAccessKey: 'fakeSecretAccessKey',
    },
});

const docClient = DynamoDBDocumentClient.from(client);

const connectDB = async () => {
    try{
        console.log('Dynamo (local) connected successfully');

    } catch (error) {
        console.log('Unable to connect to Dynamo', error.message);
        process.exit(1);
    }
};

module.exports = { docClient, connectDB };