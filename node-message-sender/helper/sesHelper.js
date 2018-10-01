'use strict';
const myEmail = process.env.EMAIL
const myDomain = process.env.DOMAIN

const AWS = require('aws-sdk');
const ses = new AWS.SES();

async function sendEmail (event) {
  console.log("sendStatus: ", await ses.sendEmail(generateEmailParams(event.body)).promise());
}

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


module.exports.sendEmail = sendEmail;