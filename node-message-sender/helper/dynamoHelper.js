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


var call = (action, params) => {
  return dynamoDb[action](params).promise();
};

module.exports.query = (params) => {
  return call('query', params);
}


module.exports.dynamoDb = getDynamoDb;
module.exports.call = call;


