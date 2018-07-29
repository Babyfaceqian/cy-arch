var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var path = require('path');
// var route = require('./lib/route');


/** webpack middleware config, 在routes之前 */
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');
var compiler = webpack(webpackDevConfig({}, { mode: "development" }));
// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    // publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));



app.use('/', express.static(path.join(__dirname, '')));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); //通常 POST 内容的格式是 application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '10mb' })); //设置上传数据大小
// app.use(cookieParser);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/app/getAppData', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/1.png'));
// });
// route(app);

app.listen(3000, () => {
    console.info('App is running on port 3000');
});