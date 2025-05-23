const glob = require("glob");
const path = require("path");

const entry = glob.sync("./src/tests/**.js").reduce(function (obj, el) {
  obj[path.parse(el).name] = el;
  return obj;
}, {});

module.exports = {
  mode: "production",
  entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }],
  },
  target: "web",
  externals: /k6(\/.*)?/,
};
