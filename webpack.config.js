module.exports = {
    node: {
      crypto: true,
      http: true,
      https: true,
      os: true,
      vm: true,
      stream: true
    },
    devSever: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
          }
    },
    module: {
      rules: [
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
        // options: { 
        //   presets: ["@babel/preset-env"]
        // } 
         },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
          loader: 'file-loader!url-loader',
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    }
  }