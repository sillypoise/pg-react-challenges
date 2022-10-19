const light = require("./light");
const dark = require("./dark");
const overlay = require("./overlay");

module.exports = {
    ...light,
    ...dark,
    ...overlay,
};
