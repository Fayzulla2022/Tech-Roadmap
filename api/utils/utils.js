const fs = require("fs");
const path = require("path");

module.exports = {
  readTemplate: (templateName) => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, `../templates/${templateName}.html`),
        "utf8",
        (err, html) => {
          if (err) resolve(``);

          resolve(html);
        }
      );
    });
  },
  groupArrayOfObjects: (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },
  replaceAll: (find, replace, str) =>
    str.replace(new RegExp(find, "g"), replace),
};
