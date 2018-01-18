import 'babel-core/register';
import 'babel-polyfill';
import Koa from 'koa';
import router from 'koa-simple-router';
import serve from 'koa-static';
import path from 'path';
import cheerio from "cheerio";
import rp from 'request-promise';
import indexModel from './models/indexModel';

const app = new Koa();
/**
 * 定义需获取课程信息列表数组
 * url： 课程页面网址
 * course： 课程名
 * org： 发布课程的机构名
 * courseCode：自定义，递增，负责信息筛选
 *
 * @type {*[]}
 */
const urlList = [
    {
        url: 'https://ke.qq.com/course/130952',
        course: '阿里前端p6架构师培养计划',
        org: "动脑学院",
        courseCode: 10,
        data: [
            {
                createDate: '2018/1/11',
                onLineStu: '2000人',
                totalStu: '5万人'
            },
            {
                createDate: '2018/1/12',
                onLineStu: '2050人',
                totalStu: '55000人'
            },
            {
                createDate: '2018/1/13',
                onLineStu: '2200人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/14',
                onLineStu: '2100人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/15',
                onLineStu: '2000人',
                totalStu: '6万人'
            }
        ]
    },
    {
        url: 'https://ke.qq.com/course/222222',
        course: '前腾讯架构师手把手教你前端工程师必备技能',
        org: '京程一灯',
        courseCode: 11,
        data: [
            {
                createDate: '2018/1/11',
                onLineStu: '3000人',
                totalStu: '45623人'
            },
            {
                createDate: '2018/1/12',
                onLineStu: '3350人',
                totalStu: '55000人'
            },
            {
                createDate: '2018/1/13',
                onLineStu: '2200人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/14',
                onLineStu: '3130人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/15',
                onLineStu: '5000人',
                totalStu: '6万人'
            }
        ]
    },
    {
        url: 'https://ke.qq.com/course/97965',
        course: 'Web前端高薪就业班-公开课｜H5/CSS3/JS/JqueryUI/H5框架-vue',
        org: '职坐标',
        courseCode: 12,
        data: [
            {
                createDate: '2018/1/11',
                onLineStu: '3000人',
                totalStu: '45623人'
            },
            {
                createDate: '2018/1/12',
                onLineStu: '3350人',
                totalStu: '55000人'
            },
            {
                createDate: '2018/1/13',
                onLineStu: '2200人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/14',
                onLineStu: '3130人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/15',
                onLineStu: '5000人',
                totalStu: '6万人'
            }
        ]
    },
    {
        url: 'https://ke.qq.com/course/20945',
        course: 'Web前端/全栈核心(html5/css3/js/vue/react/angular/es6/node)',
        org: '软谋教育',
        courseCode: 13,
        data: [
            {
                createDate: '2018/1/11',
                onLineStu: '3000人',
                totalStu: '45623人'
            },
            {
                createDate: '2018/1/12',
                onLineStu: '3350人',
                totalStu: '55000人'
            },
            {
                createDate: '2018/1/13',
                onLineStu: '2200人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/14',
                onLineStu: '3130人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/15',
                onLineStu: '5000人',
                totalStu: '6万人'
            }
        ]
    },
    {
        url: 'https://ke.qq.com/course/218792',
        course: '精品实战案例，4步搞定 Vue.js',
        org: '妙味课堂',
        courseCode: 14,
        data: [
            {
                createDate: '2018/1/11',
                onLineStu: '3000人',
                totalStu: '45623人'
            },
            {
                createDate: '2018/1/12',
                onLineStu: '3350人',
                totalStu: '55000人'
            },
            {
                createDate: '2018/1/13',
                onLineStu: '2200人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/14',
                onLineStu: '3130人',
                totalStu: '6万人'
            },
            {
                createDate: '2018/1/15',
                onLineStu: '5000人',
                totalStu: '6万人'
            }
        ]
    }
];


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

        if (parseInt(m) % 5 == 0) { //判断时间是否为5/0,todo换0:00
            if (listData.date && listData.date == (new Date).toLocaleString().split(' ')[0]) { //判断listData.date是否为当前
                if (listData.list.length < urlList.length) { //判断list是否为空
                    urlList.forEach(it => {
                        crawlData.start(it).then(res => { //
                            listData.list.push(res);
                            //TODO写入数据库
                            console.log(res);
                        })
                    });
                }
            } else { //date过期，要抓取数据，修改listData.listData.date, 写入数据库
                urlList.forEach(it => {
                    crawlData.start(it).then(res => { //
                        listData.list.push(res);
                        //TODO写入数据库
                        console.log(res);
                    })
                });
                listData.date = (new Date).toLocaleString().split(' ')[0];
            }
        } else { //不是02:00则清空list
            listData.list.length = 0;
        }
    }, 30000)
}

crawTimer();

app.use(router(_ => {
    _.get('/getlist', async (ctx, next) => {
        let indexM = new indexModel();
        let data = await indexM.getList();
        let newUrlList = rangeData.rangeList(urlList, JSON.parse(data));
        ctx.body = newUrlList;
    })
}));
app.listen(8800);
console.log('app started at port 8800...');

