'use strict';

const sesHelper = require('./helper/sesHelper');
const dynamoHelper = require('./helper/dynamoHelper');
const dynamoDb = require('./helper/dynamoHelper').dynamoDb();
const responseHelper = require('./helper/responseHelper');

module.exports.send = async (event, context) => {
  console.log("body", event.body);
  const data = JSON.parse(event.body);
  sesHelper.sendEmail(event);
  console.log("sendEmail request sent!");

  var params = {
    TableName: process.env.MESSAGE_TABLE,
    Item: {
      toEmail: data.toEmail,
      messageId: '' + Date.now(),
      subject: data.subject,
      bodyText: data.bodyText
    }
  };
  console.log("params", params);
  try {
    await dynamoDb.put(params)
    return responseHelper.createResponse({
      body: JSON.stringify({
        message: 'Message Sent to: ' + data.toEmail,
      })
    });
  } catch (error) {
    console.error(error)
    return responseHelper.createErrorResponse({
      body: 'Couldn\'t send the messages. ' + error,
      statusCode: error.statusCode
    });
  }
};

module.exports.read = async (event, context) => {

  var params = {
    TableName: process.env.MESSAGE_TABLE,
    KeyConditionExpression: 'toEmail = :toEmail1',
    ExpressionAttributeValues: {
      ':toEmail': event.pathParameters.toEmail,
    }
  };

  try {

    var result = await dynamoHelper.query(params);
    return responseHelper.createResponse({ body: JSON.stringify(result.Items) });

  } catch (error) {
    console.error(error)
    return responseHelper.createErrorResponse({
      body: 'Couldn\'t fetch the messages. ' + error,
      statusCode: error.statusCode
    });
  }
}