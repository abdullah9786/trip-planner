const Website = require("../Models/Websites");
const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const OpenAI = require("openai");
const { prompt, prompt2 } = require("../Helpers/prompt");
const Users = require("../Models/Users");
const { NotFoundError } = require("../../../Errors");
const Iternary = require("../Models/Iternary");
const uuid = require('uuid');
const { limitExhaustedTemplate } = require("../Helpers/mail-templates/limit-exhausted");
const { sendMail } = require("../Helpers/mail-sender");

const create = async (userId, promptInfo) => {
  const generateAiResponse = async () => {
    const openai = new OpenAI({ apiKey: process.env.openaiApiKey });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt(promptInfo) }],
      model: "gpt-3.5-turbo",
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.2,
    });

    console.log(JSON.parse(completion.choices[0].message.content).result,"chkce");

    const completion2 = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt2(promptInfo) }],
      model: "gpt-3.5-turbo",
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.2,
    });

    let res1 = JSON.parse(completion.choices[0].message.content).result
    let res2 = JSON.parse(completion2.choices[0].message.content).result
    console.log(res1, res2,"asdda");
    return {...res1, ...res2}
  }
  const user = await Users.findOne({ _id: userId });
  console.log(userId);
  if (!user) {
    throw new NotFoundError("User Not found", "Ai service");
  }

  if (!user.isIternaryAllowed && !user.isPremium) {
    return { status: 0, data: "Your Free Trial Is Exhausted" }
  }

  else if (user.isIternaryAllowed && !user.isPremium) {
    let aiResult = await generateAiResponse()
    user.isIternaryAllowed = false,
      await user.save()
    let result = await Iternary.create({ userId, response: aiResult })
    console.log(result);
    await sendMail('Limit Exhausted', limitExhaustedTemplate, user.email)
    return { status: 1, data: result }
  }
  else if (user.isPremium) {
    let aiResult = await generateAiResponse()
    let result = await Iternary.create({ userId, response: aiResult })
    console.log(result);
    return { status: 1, data: result }
  }
};

const createForLoggedOutUser = async (promptInfo) => {
  const generateAiResponse = async () => {
    const openai = new OpenAI({ apiKey: process.env.openaiApiKey });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt(promptInfo) }],
      model: "gpt-3.5-turbo",
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.2,
    });

    console.log(JSON.parse(completion.choices[0].message.content).result,"chkce");

    const completion2 = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt2(promptInfo) }],
      model: "gpt-3.5-turbo",
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.2,
    });

    let res1 = JSON.parse(completion.choices[0].message.content).result
    let res2 = JSON.parse(completion2.choices[0].message.content).result
    console.log(res1, res2,"asdda");
    return {...res1, ...res2}
  }
  let aiResult = await generateAiResponse()
  let result = await Iternary.create({ userId: uuid.v4(), response: aiResult })
  console.log(result);
  console.log('Unique ID:', uuid.v4());
  return { status: 1, data: result }
};

const get = async (id) => {
  let iternary = await Iternary.findOne({ _id: id })
  return iternary
}

module.exports = {
  create,
  get,
  createForLoggedOutUser
};
