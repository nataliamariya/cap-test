const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // Handle CORS preflight request
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
    TableName: "navbarImages-devamp", // Make sure this exactly matches your table name
    Key: { id: "navbar" }
  };

  try {
    const data = await docClient.get(params).promise();
    console.log("DynamoDB data:", data);
    if (!data || !data.Item) {
      throw new Error("No navbar item found for id: navbar");
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data.Item)
    };
  } catch (err) {
    console.error("Error fetching navbar images:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Could not fetch navbar images",
        details: err.message
      })
    };
  }
};
