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
        const data = await airtable.list();
        if(data.records){
            const products = data.records.map(record => {
                const { id } = record;
                const {name, image, price} = record.fields;
                const url = image[0].url;
                return {id, name, price, url}
            })
            return {
                statusCode: 200,
                body: JSON.stringify(products)
            }
        } else if(data.error){
            return {
                statusCode: 500,
                body: "Server Error"
            }
        }
    }
}