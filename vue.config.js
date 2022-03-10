module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
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
