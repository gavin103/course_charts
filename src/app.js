import 'babel-core/register';
import 'babel-polyfill';
import Koa from 'koa';
import router from 'koa-simple-router';
import serve from 'koa-static';
import path from 'path';
import cheerio from "cheerio";
import rp from 'request-promise';
import CONFIG from './configs/config.js';
import urlList from './configs/url-list.js';
import indexModel from './models/indexModel';
import cors from 'koa2-cors';
const indexM = new indexModel();
const app = new Koa();

app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

/**
 * spider 为爬虫方法
 * @uri：抓取页面地址
 * @n: 0,抓取在读学生人数；1，抓取总学生人数
 */

const crawlData = {

    'start': async function (item) {
        let onLineStuTmp = await this.spider(item.url, 0);
        let onLineStu = null;
        onLineStuTmp.split(' ').forEach((item) => {
            if (item.includes('人')) {
                onLineStu = item;
            }
        });

        let totalStuTmp = await this.spider(item.url, 1);
        let totalStu = null;
        totalStuTmp.split(' ').forEach((item) => {
            if (item.includes('人')) {
                totalStu = item;
            }
        });

        let createDate = (new Date).toLocaleString().split(' ')[0];

        let obj = {
            onLineStu,
            totalStu,
            createDate,
            courseCode: item.courseCode
        };
        //用递归调用，在任一属性为空的时候再次抓取数据，直到全部非空，返回对象
        if (obj.onLineStu && obj.totalStu && obj.createDate && obj.courseCode) {
            return obj;
        } else {
            arguments.callee();
        }

    },

    'spider': function (uri, n) {
        let options = {
            uri,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        return new Promise(function (resolve, reject) {
            rp(options)
                .then(function ($) {
                    resolve($('.statistics-apply').eq(n).text());
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
    },
};
const rangeData = {
    'cloneList': function (urlList) {
        let newUrlList = [...urlList];
        newUrlList.forEach((item, index) => {
            item.data = [];
            newUrlList[index] = {...item};
        });
        return newUrlList;
    },

    'rangeList': function (urlList, dataList) {
        let newUrlList = this.cloneList(urlList);
        for (let item of newUrlList) {
            dataList.forEach(it => {
                if (+it.courseCode == +item.courseCode) {
                    item.data.push(it)
                }
            });
            item.data = item.data.sort((a, b) => {
                return Date.parse(a.createDate) - Date.parse(b.createDate)
            })
        }
        return newUrlList
    }
};


function crawTimer() {
    //初始化list
    const listData = {
        list: [],
        date: (new Date).toLocaleString().split(' ')[0]
    };
    //设置定时器，每30秒执行一次
    let timer = setInterval(() => {
        //获取当前时间
        let t = (new Date).toLocaleString().split(' ')[1];
        console.log(t);
        let h = t.split(':')[0];
        let m = t.split(':')[1];
        // if (parseInt(h) == (CONFIG.crawT || 2)) { 取消注释本行，注释掉下一行
        if (parseInt(m) % 5 == 0) { //判断时间是否为5/0,抓取一次数据
            if (listData.date && listData.date == (new Date).toLocaleString().split(' ')[0]) { //判断listData.date是否为当前
                if (listData.list.length < urlList.length) { //判断list是否为空
                    urlList.forEach(it => {
                        crawlData.start(it).then(res => { //
                            listData.list.push(res);
                            indexM.setList(res);
                        })
                    });
                }
            } else { //date过期，要抓取数据，修改listData.listData.date, 写入数据库
                urlList.forEach(it => {
                    crawlData.start(it).then(res => { //
                        listData.list.push(res);
                        indexM.setList(res);
                    })
                });
                listData.date = (new Date).toLocaleString().split(' ')[0];
            }
        } else { //不是02:00则清空list
            listData.list.length = 0;
        }
    }, CONFIG.step || 30000);
}

crawTimer();

app.use(router(_ => {
    _.get('/getlist', async (ctx, next) => {
        let limit = ctx.request.query.limit || urlList.length*7;
        let data = await indexM.getList(limit);
        let newUrlList = rangeData.rangeList(urlList, JSON.parse(data));
        ctx.body = {
            err:0,
            msg:"success",
            list:newUrlList
        };
    })
}));
app.listen(8800);
console.log('app started at port 8800...');

