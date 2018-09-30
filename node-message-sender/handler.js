'use strict';

const myEmail = process.env.EMAIL
const myDomain = process.env.DOMAIN

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();

async function sendEmail (event) {
  return await ses.sendEmail(generateEmailParams(event.body)).promise();
}

module.exports.send = (event, context, callback) => {
  console.log("body", event.body);
  const data = JSON.parse(event.body);
  const emailStatus = sendEmail(event);
  console.log("sendEmail Status: ", emailStatus);

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
        body: 'Couldn\'t fetch the messages.' + error,
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

function generateEmailParams (emailParameters) {
  const { toEmail, subject, bodyText } = JSON.parse(emailParameters)
  console.log("In generateEmailParams:", toEmail, subject, emailParameters)
  if (!(toEmail && subject && emailParameters)) {
    throw new Error('Missing parameters! Make sure to add parameters \'toEmail\', \'subject\', \'bodyText\'.')
  }
  return {
    Source: myEmail,
    Destination: { ToAddresses: [myEmail] },
    ReplyToAddresses: [toEmail],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Message sent from email ${toEmail} \nContent: ${bodyText}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `${subject}! `
      }
    }
  }
}

