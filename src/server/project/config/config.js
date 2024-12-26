require("dotenv").config();

module.exports = {
  SECRET_KEY: Buffer.from(process.env.SECRET_KEY, "hex"),
  IV: Buffer.from(process.env.IV, "hex"),
};
