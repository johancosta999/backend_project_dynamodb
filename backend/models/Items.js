const { docClient } = require('../config/db')
const { PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuid4 } = require('uuid');

const createItem = async ({ title, description, userId }) => {
    const id = uuid4();
    const item = { id, title, description, userId, created: new Date().toISOString() };

    await docClient.send(new PutCommand({
        TableName: 'Items',
        Item: item,
    }));

    return item;
};

const findItemsByUserId = async(userId) => {
    const result = await docClient.send(new ScanCommand({
        TableName: 'Items',
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId },
    }))

    return result.Items;
}

module.exports = { createItem, findItemsByUserId }