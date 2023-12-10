module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
      proxy: "https://api.odinstock.ru/",
    },
  },
};
