//Here we use the structure of mongoose
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const Plant = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    //Because the image comes in a url tag it is a string
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(`plants`, Plant);
