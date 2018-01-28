'use strict';

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
    data: []
}, {
    url: 'https://ke.qq.com/course/222222',
    course: '前腾讯架构师手把手教你前端工程师必备技能',
    org: '京程一灯',
    courseCode: 11,
    data: []
}, {
    url: 'https://ke.qq.com/course/97965',
    course: 'Web前端高薪就业班-公开课｜H5/CSS3/JS/JqueryUI/H5框架-vue',
    org: '职坐标',
    courseCode: 12,
    data: []
}, {
    url: 'https://ke.qq.com/course/20945',
    course: 'Web前端/全栈核心(html5/css3/js/vue/react/angular/es6/node)',
    org: '软谋教育',
    courseCode: 13,
    data: []
}, {
    url: 'https://ke.qq.com/course/218792',
    course: '精品实战案例，4步搞定 Vue.js',
    org: '妙味课堂',
    courseCode: 14,
    data: []
}];
module.exports = urlList;