const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "foodXpert",
    projectName: "foodXpert-navbar",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9003, // Specify the port here
    },
    externals: ["@foodXpert/foodXpert-store"],
  });
};
