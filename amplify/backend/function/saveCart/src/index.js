
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  };

  try {
    // Extract userId from the query string
    const userId = event.queryStringParameters?.userId;

    // Check if a body is provided
    if (!event.body) {
      console.error("Missing event.body");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing request body" })
      };
    }

    const body = JSON.parse(event.body);
    const cart = body.cart;

    if (!userId || !Array.isArray(cart)) {
      console.error("Invalid userId or cart:", { userId, cart });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing or invalid userId/cart" })
      };
    }

    const params = {
      TableName: "Cart-devamp",
      Item: {
        userId,
        cart
      }
    };

    console.log("Using table:", params.TableName);
    console.log("About to save cart with userId:", userId);
    console.log("Cart contents:", cart);

    await docClient.put(params).promise();

    console.log("Saved successfully to DynamoDB.");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Cart saved successfully" })
    };
  } catch (err) {
    console.error("Error saving cart:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Could not save cart",
        details: err.message
      })
    };
  }
};
