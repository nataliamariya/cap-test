

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const products = [
      { id: 1, name: "Green Tea Cleanser", price: 12.99 },
      { id: 2, name: "Hyaluronic Cream", price: 18.49 },
      { id: 3, name: "Retinol Serum", price: 24.99 },
    ];
  
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    };
  };
  