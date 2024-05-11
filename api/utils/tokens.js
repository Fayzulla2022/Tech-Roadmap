require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  getJwt: async (userId) => {
    try {
      const data = { userId };
      const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
      return token;
    } catch (ex) {
      throw ex;
    }
  },
};
