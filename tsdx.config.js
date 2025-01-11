const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      ...config.plugins,
      postcss({
        extensions: ['.css'],
      }),
    ];
    return config;
  },
};
