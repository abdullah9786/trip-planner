const Website = require("../Models/Websites");
const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const get = async () => {
  // Make a request to the OpenAI API
  const openaiApiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo-16k-0613',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, {
          role: 'user', content: {
            "message": "Hello, ChatGPT!"
          }
        }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );


  // return response.data.choices[0].message.content;
  let result = { a: "123" }
  return result;
};

module.exports = {
  get,
};
