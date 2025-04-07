const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  };

  console.log("📥 Incoming event:", JSON.stringify(event, null, 2));

  try {
    const userId = event.queryStringParameters?.userId;
    console.log("🆔 Querying orders for userId:", userId);

    if (!userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing userId" }),
      };
    }

    const params = {
      TableName: "orders-devamp",
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": userId,
      },
    };

    console.log("📦 DynamoDB Query Params:", JSON.stringify(params, null, 2));
    const data = await docClient.query(params).promise();

    console.log("✅ Query result:", JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ orders: data.Items }),
    };
  } catch (err) {
    console.error("🔥 Error fetching orders:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Could not fetch orders", details: err.message }),
    };
  }
};
