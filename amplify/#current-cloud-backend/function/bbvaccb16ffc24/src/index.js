/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_USERGROUPS_ARN
	STORAGE_USERGROUPS_NAME
	STORAGE_USERGROUPS_STREAMARN
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
