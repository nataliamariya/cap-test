const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {
    TableName: "Banners-devamp", // This must match your actual DynamoDB table name
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
      body: JSON.stringify(data.Item)
    };
  } catch (err) {
    console.error("Error fetching banner:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Could not fetch banners",
        details: err.message
      })
    };
  }
};
