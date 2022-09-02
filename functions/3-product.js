const Airtable = require('airtable-node');
require("dotenv").config();

const airtable = new Airtable({ apiKey: process.env.SECRET_AIR_KEY })
  .base(process.env.SECRET_AIR_BASE)
  .table('products')

exports.handler = async (event, context) => {
    const {id} = event.queryStringParameters;

    if(id){
        const product = await airtable.retrieve(id);

        if(product.error){
            return {
                statusCode: 404,
                body: `No Product with the id of ${id}`
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(product)
        }
    } 
    else {
        return {
            statusCode: 400,
            body: "Please provide a product id"
        }
    }
}