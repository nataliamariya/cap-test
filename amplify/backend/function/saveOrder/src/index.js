const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  };

  try {
    const userId = event.queryStringParameters?.userId;
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const order = body.order;

    if (!userId || !order) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing userId or order" }),
      };
    }

    const orderId = uuidv4(); // Generate a unique order ID
    const total = order.items.reduce((sum, item) => {
        return sum + (item.price || 0) * (item.quantity || 0);
      }, 0);
      
      // Optionally attach total to the order object
      order.total = total;
    const params = {
      TableName: "orders-devamp",
      Item: {
        userId,
        orderId,
        order,
        timestamp: new Date().toISOString()
      },
    };

    await docClient.put(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Order saved successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Could not save order", details: err.message }),
    };
  }
};
