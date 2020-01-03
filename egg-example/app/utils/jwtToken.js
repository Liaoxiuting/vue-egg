const md5 = require("md5");
module.exports = function(id) {
  let obj = {
    city: "bj",
    time: new Date().getTime(),
    id
  };
  return md5(JSON.stringify(obj));
};
