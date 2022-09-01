const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: 'keyIWjsvYr9wpGxKX' })
  .base('appwCThjyVmVaQOS4')
  .table('products')

exports.handler = async (event, context) => {
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