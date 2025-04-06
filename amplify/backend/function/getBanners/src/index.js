const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // Handle preflight request for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS"
      },
      body: ""
    };
  }

  const params = {
    TableName: "Banners-devamp", // Make sure this matches your actual table name
    Key: { id: "homepage" }
  };

  try {
    const data = await docClient.get(params).promise();
    console.log("DynamoDB data:", data);

    if (!data || !data.Item) {
      throw new Error("No banner item found for id: homepage");
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // 🚨 This enables frontend access from localhost
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data.Item)
    };
  } catch (err) {
    console.error("Error fetching banner:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Could not fetch banners",
        details: err.message
      })
    };
  }
};
