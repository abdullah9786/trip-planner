const Website = require("../Models/Websites");
const { StatusCodes } = require("http-status-codes");

const get = async () => {
  let result = await Website.find()
  return result;
};

const create = async (data) => {
  let result = await Website.create(data);
  return result;
};

const update = async (websiteId, websiteName,customFields) => {
  let result = await Website.findOneAndUpdate(
    { _id: websiteId },
    { websiteName,customFields },
    { returnDocument: "after", runValidators: true }
  );
  return result;
};

const remove = async (websiteId) => {
  let result = await Website.findByIdAndDelete({ _id: websiteId })
  return result;
};

module.exports = {
  create,
  get,
  update,
  remove
};
