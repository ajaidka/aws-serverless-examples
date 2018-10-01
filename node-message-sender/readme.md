Setup:
1. Install serverless framework
2. Setup aws credentials 
3. Add sender email address and domain in secrets.json
4. make sure to change the profile name in serverless.yml, removing profile property and it will use the default one.


Code will deploy two APIs:
 1. /dev/api/v1/messages - POST
    JSON:
    {
        "toEmail": "to-email-address",
        "subject": "test subject",
        "bodyText": "test body"
    }
2.  /dev/api/v1/messages/<toEmailId> - GET


Note: for offline install
1. DynamoDB - https://www.npmjs.com/package/serverless-dynamodb-local
2. Serverless-offline - https://www.npmjs.com/package/serverless-offline