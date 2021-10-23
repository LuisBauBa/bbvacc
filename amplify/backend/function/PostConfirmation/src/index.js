/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_USERGROUPS_ARN
	STORAGE_USERGROUPS_NAME
	STORAGE_USERGROUPS_STREAMARN
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');
const dynamoDb = new aws.DynamoDB({region: process.env.REGION })

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
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
  const GroupName = await dynamoDb.getItem(params).promise().then(response => response.Item.UserGroup.S).catch(callback);
  const groupParams = {
    GroupName,
    UserPoolId: event.userPoolId,
  };

  const addUserParams = {
    ...groupParams,
    Username: event.userName,
  };

  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }

  try {
    await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }
};