'use strict';

const isOffline = process.env.IS_OFFLINE
const LOCAL_DYNAMO_REGION = 'localhost'
const LOCAL_DYNAMO_ENDPOINT = 'http://localhost:8000'

const AWS = require('aws-sdk');
const dynamoDb = isOffline ? new AWS.DynamoDB.DocumentClient({
  region: LOCAL_DYNAMO_REGION,
  endpoint: LOCAL_DYNAMO_ENDPOINT
}) : new AWS.DynamoDB.DocumentClient();

function getDynamoDb () {
    return dynamoDb;
}

module.exports.dynamoDb = getDynamoDb;


