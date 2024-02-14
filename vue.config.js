module.exports = {
  transpileDependencies: ['vuetify'],
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";
                         @import "@/styles/discipline_colors.scss";
                         @import "@/styles/weapon_colors.scss";
                         @import "@/styles/terrain_colors.scss";
                         `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
}
