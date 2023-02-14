'use strict';
// const axios = require("axios");
const AWS = require('aws-sdk');
const kendra = new AWS.Kendra();

module.exports.getWeather = async (event) => {
  const city = event.currentIntent.slots["city"];
  
// Set up the parameters for the Kendra search request
const params = {
  IndexId: 'efaa4c5e-27b6-405a-bb4c-fe586ac9f431',
  //QueryText: event.queryStringParameters.q,
  QueryText: city,
  // other optional parameters can be added here
};
try {

    const response = await kendra.query(params).promise();
    
    const message = `Here are the results I found: ${response.ResultItems.map(item => item.DocumentTitle.Text+'\n'+item.DocumentExcerpt.Text+'\n'+item.DocumentURI).join(', ')}`;
    return {
      "sessionAttributes": {},
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": message
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};