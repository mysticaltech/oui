const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules = [
    {
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, '../')
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    {
      test: /\.(js|ts)x?$/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/env', '@babel/typescript', '@babel/react'],
          plugins: [
            "react-docgen",
            "babel-plugin-typescript-to-proptypes",
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-proposal-decorators",
              {
                "legacy": true
              }
            ],
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread"
          ]
        }
      }
    },
    {
      test: /\.story\.js?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'javascript' },
        },
      ],
      enforce: 'pre',
    }
  ];
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
