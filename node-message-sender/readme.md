Two APIs:
 1. /dev/api/v1/messages - POST
    - 
    {
        "toEmail": "to-email-address",
        "subject": "test subject",
        "bodyText": "test body"
    }
2.  /dev/api/v1/messages/<toEmailId> - GET

Setup:
1. add sender email address and domain in secrets.json
2. make sure to change the profile name in serverless.yml, removing it will use the default profile
