'use strict';

const https = require('https');
const weatherAPI = process.env.WEATHER_API;

module.exports.collectWeatherData = (event, context, callback) => {

  https.get(weatherAPI, (resp) => {
    let data = '';

    // A dataChunk of data has been recieved.
    resp.on('data', (dataChunk) => {
      data += dataChunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Your function executed successfully!',
          date: JSON.parse(data),
          input: event,
        }),
      };

      callback(null, response);
    });



  }).on("error", (err) => {
    console.log("Error: " + err.message);
    callback(null, err);
  });
};
