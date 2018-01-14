
import Koa from 'koa';
import babel_po from 'babel-polyfill';
import babel_co from 'babel-core/register';
import router from 'koa-simple-router';
import serve from 'koa-static';
// import render from 'koa-swig';
import path from 'path';
import co from 'co';
import initController from './controllers/initController';
const app = new Koa();
initController.init(app,router);
app.context.render = co.wrap(render({
    root: path.join(__dirname,'views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html'
}));
app.use(serve(path.join(__dirname,'public')));

app.listen(8800);
console.log('app started at port 8800...');
