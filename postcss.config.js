const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключили плагины к PostCSS
  plugins: [
    autoprefixer, // подключили autoprefixer
    cssnano({ preset: 'default' })
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
  ]
};