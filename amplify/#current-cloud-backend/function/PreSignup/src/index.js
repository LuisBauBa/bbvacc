/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_USERGROUPS_ARN
	STORAGE_USERGROUPS_NAME
	STORAGE_USERGROUPS_STREAMARN
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');
const dynamoDb = new aws.DynamoDB({ region: process.env.REGION })

exports.handler = (event, context, callback) => {
  const { email } = event.request.userAttributes;
  const emailSuffix = email.split('@')[1];
  const params = {
    Key: {
      "EmailSuffix": {
        S: emailSuffix
      }, 
    }, 
    TableName: process.env.STORAGE_USERGROUPS_NAME
   };
  dynamoDb.getItem(params).promise().then(response => {
    if (response.Item && response.Item.UserGroup && response.Item.UserGroup.S) {
      callback(null, event);
    }
    else {
      return Promise.reject(new Error('Invalid domain, no User Group found'))
    }
  }).catch(callback);
};
