const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

    devServer: {
        // port: 80, // 원하는 포트로 변경
      // proxy: 'http://43.200.140.164:8080'
    },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
