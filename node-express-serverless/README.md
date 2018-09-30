#1 Local deployment as standalone nodejs application 

$ node app.js

#2 Deploy on AWS cloud, make sure update aws profile name in serverless.yml

$ sls deploy

#3 Deploy serverless in offline mode

$ sls offline start


Once deployed you would be able to hit three type of request 

#1 curl protocol://<domain:port>/dev/

#2 curl protocol://<domain:port>/dev/user

#3 curl protocol://<domain:port>/dev/user/1
