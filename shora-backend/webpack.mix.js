require('dotenv').config()
let webpack = require('webpack')
const mix = require('laravel-mix');
require('mix-env-file');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .extract(['react'])
    .sass('resources/sass/app.scss', 'public/css');
mix.env(process.env.ENV_FILE);

mix.webpackConfig({
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                REACT_APP_BASE_URL: JSON.stringify(process.env.REACT_APP_BASE_URL),
                REACT_APP_BASE_FRONT_URL: JSON.stringify(process.env.REACT_APP_BASE_FRONT_URL)
            }
        })
    ]
})