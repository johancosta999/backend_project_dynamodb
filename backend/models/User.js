const { docClient } = require('../config/db');
const { PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb')
const { v4: uuidv4 } = require('uuid')

const createUser = async({ username, email, password }) => {
    const id = uuidv4();
    const user = {id, username, email, password, createdAt: new Date().toISOString() };

    await docClient.send(new PutCommand({
        TableName: 'Users',
        Item: user,
    }))

    return user;
};

const findUserByEmail = async(email) => {
    //Dynamo db native 'WHERE' like sql - scan reads whole table
    const result = await docClient.send(new ScanCommand({
        TableName: 'Users',
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: { ':email' : email },
    }))

    return result.Items[0];
};

module.exports = { createUser, findUserByEmail };