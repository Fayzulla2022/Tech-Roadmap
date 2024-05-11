require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API);

module.exports = {
  send: (obj) => {
    return new Promise((resolve, reject) => {
      const msg = {
        to: obj.to,
        from: process.env.EMAIL_FROM,
        subject: obj.subject,
        html: obj.html,
      };

      sgMail
        .send(msg)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
