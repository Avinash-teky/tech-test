# tech-test
This repository contains code for a technical test using typescript which includes Angular 13 and Node.js

# Live demo 
The code can be seen working at http://test-tech-cake-web.s3-website-us-west-2.amazonaws.com/

# Technical Details

On the frontend side, it uses Angular, you can run it locally by running following commands in order - 
1. npm install
2. npm start

On the backend side, it uses Node.js with serverless framework, you can run it locallly by running following commands in order - 
1. npm install
2. npm install -g serverless
3. serverless invoke local --function getCakes

Note1: getCakes is the name of a function in the code, you can replace it with any backend function
Note2: The backend needs a file serverless.yml for deployment, I have removed that file from code since it contains AWS related information.
