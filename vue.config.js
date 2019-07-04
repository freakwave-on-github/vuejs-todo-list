module.exports = {
    devServer: {
      proxy: 'http://localhost:3000',
    },
    css: {
        loaderOptions: {
          sass: {
            data: `@import "@/style/_todolist.scss";`
          }
        }
    },
  };