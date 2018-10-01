'use strict';

const sesHelper = require('./helper/sesHelper')
const dynamoDb = require('./helper/dynamoHelper').dynamoDb()

module.exports.send = (event, context, callback) => {
  console.log("body", event.body);
  const data = JSON.parse(event.body);
  sesHelper.sendEmail(event);
  console.log("sendEmail request sent!");

  var params = {
    TableName : process.env.MESSAGE_TABLE,
    Item: {
       toEmail: data.toEmail,
       messageId: '' + Date.now(),
       subject: data.subject,
       bodyText: data.bodyText
    }
  };
  console.log("params", params);
  dynamoDb.put(params, function(error, result) {
    if (error){
      console.log(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t send the messages.' + error,
      });
      return;
    } 
    
  });
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Message Sent to: ' + data.toEmail,
    }),
  };
  callback(null, response);

};

module.exports.read = (event, context, callback) => {
  
  var params = {
    TableName: process.env.MESSAGE_TABLE,
    KeyConditionExpression: 'toEmail = :toEmail',
    ExpressionAttributeValues: {
      ':toEmail': event.pathParameters.toEmail,
    }
  };
  

  // fetch messages from the database
  dynamoDb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the messages. ' + error,
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);

  });
};
