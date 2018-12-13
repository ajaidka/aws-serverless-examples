## 5 minutes guide to host your reactjs applications on Amazon S3

### Prerequisite:
#### 1. Setup serverless framework
https://serverless.com/framework/docs/providers/aws/guide/installation/

#### 2. Setup aws cli
https://serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-the-aws-cli

#### 3. This repositoy must be cloned locally

### Steps:
#### 1. Set service name
`export appname=<your-demo-react-app>`

Set service/app name as an Enviroment variable, it will be used to create cloud formation stack and s3 bucket name<br>


#### 2. Provision s3 public bucket and its policies
`sls deploy`

This will create the AWS cloudformation stack in your account, please check serverless.yml for details.

#### 3. Grab the endpoint of newly created bucket
`sls info --verbose`

Output: 
Stack Outputs
StaticWebsiteBucketURL: http://your-demo-react-app.s3-website-us-east-1.amazonaws.com


#### 4. Set bucket name
In package.json replace bucket name under script -> deploy
e,g "deploy": "aws s3 sync build/ s3://your-demo-react-app --delete"

#### 5. deploy the application 
`npm run deploy`

Now build the production ready reactjs code and deploy 

**Note: Next time you just need to do `npm run deploy` in order to deplay your application on s3.
**

# Enjoy!