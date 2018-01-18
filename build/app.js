'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('babel-core/register');

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _indexModel = require('./models/indexModel');

var _indexModel2 = _interopRequireDefault(_indexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
/**
 * 定义需获取课程信息列表数组
 * url： 课程页面网址
 * course： 课程名
 * org： 发布课程的机构名
 * courseCode：自定义，递增，负责信息筛选
 *
 * @type {*[]}
 */
var urlList = [{
    url: 'https://ke.qq.com/course/130952',
    course: '阿里前端p6架构师培养计划',
    org: "动脑学院",
    courseCode: 10,
    data: [{
        createDate: '2018/1/11',
        onLineStu: '2000人',
        totalStu: '5万人'
    }, {
        createDate: '2018/1/12',
        onLineStu: '2050人',
        totalStu: '55000人'
    }, {
        createDate: '2018/1/13',
        onLineStu: '2200人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/14',
        onLineStu: '2100人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/15',
        onLineStu: '2000人',
        totalStu: '6万人'
    }]
}, {
    url: 'https://ke.qq.com/course/222222',
    course: '前腾讯架构师手把手教你前端工程师必备技能',
    org: '京程一灯',
    courseCode: 11,
    data: [{
        createDate: '2018/1/11',
        onLineStu: '3000人',
        totalStu: '45623人'
    }, {
        createDate: '2018/1/12',
        onLineStu: '3350人',
        totalStu: '55000人'
    }, {
        createDate: '2018/1/13',
        onLineStu: '2200人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/14',
        onLineStu: '3130人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/15',
        onLineStu: '5000人',
        totalStu: '6万人'
    }]
}, {
    url: 'https://ke.qq.com/course/97965',
    course: 'Web前端高薪就业班-公开课｜H5/CSS3/JS/JqueryUI/H5框架-vue',
    org: '职坐标',
    courseCode: 12,
    data: [{
        createDate: '2018/1/11',
        onLineStu: '3000人',
        totalStu: '45623人'
    }, {
        createDate: '2018/1/12',
        onLineStu: '3350人',
        totalStu: '55000人'
    }, {
        createDate: '2018/1/13',
        onLineStu: '2200人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/14',
        onLineStu: '3130人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/15',
        onLineStu: '5000人',
        totalStu: '6万人'
    }]
}, {
    url: 'https://ke.qq.com/course/20945',
    course: 'Web前端/全栈核心(html5/css3/js/vue/react/angular/es6/node)',
    org: '软谋教育',
    courseCode: 13,
    data: [{
        createDate: '2018/1/11',
        onLineStu: '3000人',
        totalStu: '45623人'
    }, {
        createDate: '2018/1/12',
        onLineStu: '3350人',
        totalStu: '55000人'
    }, {
        createDate: '2018/1/13',
        onLineStu: '2200人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/14',
        onLineStu: '3130人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/15',
        onLineStu: '5000人',
        totalStu: '6万人'
    }]
}, {
    url: 'https://ke.qq.com/course/218792',
    course: '精品实战案例，4步搞定 Vue.js',
    org: '妙味课堂',
    courseCode: 14,
    data: [{
        createDate: '2018/1/11',
        onLineStu: '3000人',
        totalStu: '45623人'
    }, {
        createDate: '2018/1/12',
        onLineStu: '3350人',
        totalStu: '55000人'
    }, {
        createDate: '2018/1/13',
        onLineStu: '2200人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/14',
        onLineStu: '3130人',
        totalStu: '6万人'
    }, {
        createDate: '2018/1/15',
        onLineStu: '5000人',
        totalStu: '6万人'
    }]
}];

/**
 * spider 为爬虫方法
 * @uri：抓取页面地址
 * @n: 0,抓取在读学生人数；1，抓取总学生人数
 */

var crawlData = {

    'start': function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
            var onLineStuTmp,
                onLineStu,
                totalStuTmp,
                totalStu,
                createDate,
                obj,
                _args = arguments;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.spider(item.url, 0);

                        case 2:
                            onLineStuTmp = _context.sent;
                            onLineStu = null;

                            onLineStuTmp.split(' ').forEach(function (item) {
                                if (item.includes('人')) {
                                    onLineStu = item;
                                }
                            });

                            _context.next = 7;
                            return this.spider(item.url, 1);

                        case 7:
                            totalStuTmp = _context.sent;
                            totalStu = null;

                            totalStuTmp.split(' ').forEach(function (item) {
                                if (item.includes('人')) {
                                    totalStu = item;
                                }
                            });

                            createDate = new Date().toLocaleString().split(' ')[0];
                            obj = {
                                onLineStu: onLineStu,
                                totalStu: totalStu,
                                createDate: createDate,
                                courseCode: item.courseCode
                            };
                            //用递归调用，在任一属性为空的时候再次抓取数据，直到全部非空，返回对象

                            if (!(obj.onLineStu && obj.totalStu && obj.createDate && obj.courseCode)) {
                                _context.next = 16;
                                break;
                            }

                            return _context.abrupt('return', obj);

                        case 16:
                            _args.callee();

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function start(_x) {
            return _ref.apply(this, arguments);
        }

        return start;
    }(),

    'spider': function spider(uri, n) {
        var options = {
            uri: uri,
            transform: function transform(body) {
                return _cheerio2.default.load(body);
            }
        };
        return new _promise2.default(function (resolve, reject) {
            (0, _requestPromise2.default)(options).then(function ($) {
                resolve($('.statistics-apply').eq(n).text());
            }).catch(function (err) {
                console.log(err);
            });
        });
    }
};
var rangeData = {
    'cloneList': function cloneList(urlList) {
        var newUrlList = [].concat((0, _toConsumableArray3.default)(urlList));
        newUrlList.forEach(function (item, index) {
            item.data = [];
            newUrlList[index] = (0, _extends3.default)({}, item);
        });
        return newUrlList;
    },

    'rangeList': function rangeList(urlList, dataList) {
        var newUrlList = this.cloneList(urlList);

        var _loop = function _loop(item) {
            dataList.forEach(function (it) {
                if (+it.courseCode == +item.courseCode) {
                    item.data.push(it);
                }
            });
            item.data = item.data.sort(function (a, b) {
                return Date.parse(a.createDate) - Date.parse(b.createDate);
            });
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(newUrlList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                _loop(item);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return newUrlList;
    }
};

function crawTimer() {
    //初始化list
    var listData = {
        list: [],
        date: new Date().toLocaleString().split(' ')[0]
    };
    //设置定时器，每30秒执行一次
    var timer = setInterval(function () {
        //获取当前时间
        var t = new Date().toLocaleString().split(' ')[1];
        console.log(t);
        var h = t.split(':')[0];
        var m = t.split(':')[1];

        if (parseInt(m) % 5 == 0) {
            //判断时间是否为5/0,todo换0:00
            if (listData.date && listData.date == new Date().toLocaleString().split(' ')[0]) {
                //判断listData.date是否为当前
                if (listData.list.length < urlList.length) {
                    //判断list是否为空
                    urlList.forEach(function (it) {
                        crawlData.start(it).then(function (res) {
                            //
                            listData.list.push(res);
                            //TODO写入数据库
                            console.log(res);
                        });
                    });
                }
            } else {
                //date过期，要抓取数据，修改listData.listData.date, 写入数据库
                urlList.forEach(function (it) {
                    crawlData.start(it).then(function (res) {
                        //
                        listData.list.push(res);
                        //TODO写入数据库
                        console.log(res);
                    });
                });
                listData.date = new Date().toLocaleString().split(' ')[0];
            }
        } else {
            //不是02:00则清空list
            listData.list.length = 0;
        }
    }, 30000);
}

crawTimer();

app.use((0, _koaSimpleRouter2.default)(function (_) {
    _.get('/getlist', function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
            var indexM, data, newUrlList;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            indexM = new _indexModel2.default();
                            _context2.next = 3;
                            return indexM.getList();

                        case 3:
                            data = _context2.sent;
                            newUrlList = rangeData.rangeList(urlList, JSON.parse(data));

                            ctx.body = newUrlList;

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x2, _x3) {
            return _ref2.apply(this, arguments);
        };
    }());
}));
app.listen(8800);
console.log('app started at port 8800...');