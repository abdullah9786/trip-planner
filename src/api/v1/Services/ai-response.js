const Website = require("../Models/Websites");
const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const OpenAI = require("openai");


const get = async () => {
  // Make a request to the OpenAI API
  // const openaiApiKey = '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';
  const openaiApiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const openai = new OpenAI({apiKey:openaiApiKey});

    // const response = await axios.post(
    //   apiUrl,
    //   {
    //     model: 'gpt-3.5-turbo-16k-0613',
    //     messages: [{ role: 'system', content: 'You are a helpful assistant.' }, {
    //       role: 'user', content: {
    //         "message": "Hello, ChatGPT!"
    //       }
    //     }],
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${openaiApiKey}`,
    //     },
    //   }
    // );

    // const response = await axios.post(
    //   'https://api.openai.com/v1/engines/davinci/completions',
    //   {
    //     prompt: "Hello",
    //     max_tokens: 100
    //   },
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${openaiApiKey}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `Generate a JSON object with information about 10 cars, including their names, manufacturers, model years, and prices. Each entry in the 'cars' array should have the following structure:

      {
          "car_name": "<Car Name>",
          "manufacturer": "<Manufacturer>",
          "model_year": <Model Year>,
          "price": "<Price>"
      }
      ` }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);

console.log(completion);
  // return response.data.choices[0].message.content;
  let result = { data : JSON.parse(completion.choices[0].message.content) }
  return result;
};

module.exports = {
  get,
};
