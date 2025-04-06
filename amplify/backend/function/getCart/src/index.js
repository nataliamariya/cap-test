const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  };

  console.log("🔍 Full event:", JSON.stringify(event));

  try {
    const userId = event?.queryStringParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing userId" }),
      };
    }

    const params = {
      TableName: "Cart-devamp",
      Key: { userId },
    };

    const result = await docClient.get(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ cart: result.Item?.cart || [] }),
    };
  } catch (err) {
    console.error("❌ Error in getCart:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch cart", details: err.message }),
    };
  }
};
