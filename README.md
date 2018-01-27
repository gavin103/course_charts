# course_charts
A vue project using koa vue-echarts to tracking data in ke.qq.com
## 技术栈介绍
- PHP: 实现后台接口；
- MYSQL: 仅仅创建一个表，存储数据列表
- Koa2: 实现中间层转发，实现爬虫定时抓取数据
- Vue/Vue-Charts：绘制前端页面

## 目录介绍
- php 暂存php接口文件，需转移到系统相关路径，例如XAMPP下的htdoc下
- src/controller 存储node接口，暂时未拆分模块
- src/model 连接后台接口
- view 提供前端视图
- app.js为node主程序
- configs 存储配置文件
- configs/url-list.js 配置需要抓取的信息；如需修改或添加，需要根据已有例子操作。

## 接口列表
- 默认端口为8800；
- 前端接口为127.0.0.1:8800/getlist?limit=35;
- limit参数可选，默认设置为url-list中数组长度的7倍。即7天的数据

