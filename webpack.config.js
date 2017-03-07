var config = {
    entry: [
        __dirname + "/static/todo/js/entry.js"
    ],
    output: {
        path: __dirname + "/static/todo/js/assets/",
        publicPath: "/assets/",
        filename: "bundle.js"
    },

   devServer: {
      inline: true,
      port: 7777
   },

   module: {
      loaders: [ {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel',

         query: {
            presets: ['es2015', 'react']
         }
      }]
   }

}

module.exports = config;