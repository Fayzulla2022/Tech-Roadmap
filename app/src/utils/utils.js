const getUrlVars = (url) => {
  var vars = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
};

export default class Utils {
  static getUrlParam = (url, parameter, defaultvalue) => {
    let urlparameter = defaultvalue;
    if (url.indexOf(parameter) > -1) {
      urlparameter = getUrlVars(url)[parameter];
    }
    return urlparameter;
  };

  static getRandomString = () => Math.random().toString(36).substr(2, 10);
}
