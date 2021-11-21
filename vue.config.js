module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("raw")
      .test(/\.txt$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
};
