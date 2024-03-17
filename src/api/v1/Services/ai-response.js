const Website = require("../Models/Websites");
const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const OpenAI = require("openai");
const { prompt } = require("../Helpers/prompt");
const Users = require("../Models/Users");
const { NotFoundError } = require("../../../Errors");
const Iternary = require("../Models/Iternary");


const create = async ( userId, promptInfo ) => {
  const generateAiResponse = async () => {
    const openaiApiKey = process.env.openaiApiKey
    const openai = new OpenAI({ apiKey: openaiApiKey });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt(promptInfo) }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    // return response.data.choices[0].message.content;
    return JSON.parse(completion.choices[0].message.content) 
  }
  const user = await Users.findOne({ _id: userId });
  console.log(userId);
  if (!user) {
    throw new NotFoundError("User Not found", "Ai service");
  }

  if(!user.isIternaryAllowed && !user.isPremium){
    return {status:0, data: "Your Free Trial Is Exhausted"}
  }

  else if(user.isIternaryAllowed && !user.isPremium){
    let aiResult = await generateAiResponse()
    user.isIternaryAllowed = false,
    await user.save()
    let result = await Iternary.create({userId, response: aiResult})
    console.log(result);
    return {status:1, data: aiResult}
  }
  else if(user.isPremium){
    let aiResult = await generateAiResponse()
    let result =  await Iternary.create({userId, response: aiResult})
    console.log(result);
    return {status:1, data: aiResult}
  }
};

const get = async (id) => {
  let iternary = await Iternary.findOne({ _id: id })
  return iternary
}

module.exports = {
  create,
  get
};
