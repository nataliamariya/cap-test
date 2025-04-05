

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {
    TableName: "navbarImages-devamp", 
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.Item)
    };
  } catch (err) {
    console.error("Error fetching navbar images:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Could not fetch navbar images",
        details: err.message
      })
    };
  }
};
