# 报表框架

1.安装nodeJS下载
2.安装SASS下载,注意要先装ruby
3.安装YO

> $ npm install -g yo

4.安装bower

> $ npm install -g bower

5.设置npm registry地址，因为此框架属于公司内部项目，所以源码放在前端搭建的私有npm服务器里

> $ npm set registry http://172.18.7.20:4873

6.安装报表生成器

> $ npm install -g @zl/generator-dolphinchart


新建项目

1.创建项目目录，并进入

> $ mkdir my-project

> $ cd my-project

2.在my-project目录，添加配置文件 
添加两类配置文件：config.json和chart\chart.json，参考报表前端框架设计中的项目配置说明
3.生成项目

> $ yo @zjh/dolphinchart

4.安装依赖
进入生成的项目文件夹(里面包含一个package.json文件),执行

> $ npm install

然后继续进入src文件夹(里面包含一个bower.json文件),执行

> $ bower install

5.运行项目
回到生成的项目文件夹(里面包含一个server.js文件),执行

> $ node server

6.查看最终效果
访问页面http://localhost:8080/src/#/login 用户名/密码：admin/123456 
注意这个用户名和密码只是展示用的假账户,实际应用中需要server端作真正的校验，然后可以将项目文件中的login.js删掉，并将server.js里两处TODO下面的一行代码删除

编辑
为已有项目新增chart

1.将新建的配置文件(如：stability.json)加入到chart文件夹下面
2.在项目文件目录下执行

$ yo @zl/dolphinchart:chart stability
参数“stability”为该配置文件的文件名称，无需后缀名

访问页面http://localhost:8080/src/#/login

----

### server需要返回的数据格式：
（参考：http://www.highcharts.com/demo/combo）

{
  "appName": "SampleApp",//项目名称
  "defaultState": "translation-tool.translation",//登录成功后的跳转页面
  "defaultEnv": "development", //默认环境
  "releaseBaseUrl": "/admin", //release环境下所有API的前缀
  "releaseDomain": "http://172.16.77.30", //release环境下API的domain
  "developmentBaseUrl": "/admin", //development环境下所有API的前缀
  "developmentDomain": "http://172.16.77.30", //development环境下API的domain
}
图表层，主要是图表相关配置项，如下：
{
  "moduleName": "A", //该model所属模块，实际上会生成A目录，该目录下放属于该模块的所有model相关代码
  "modelName": "stability", //chart名称
  "filters": ["cascade-dropdown"], //filter相关可以跟控制台框架共用
  "charts": [
    {
      "title": {
           "text":"Stability", //图标名称
      }
      "type":"line",
      "yAxis": [ //y轴相关配置，可配置多个Y轴
        {
          "title": "User Call Limited"
        },
        {
          "title": "Temperature",
          "opposite": true
        }
      ]
    },
    {
      "type": "pie", 
      "title":{
          "text": "Distribution"
      }
    }
  ]
}
charts里每个对象的格式都可以参考highchart的调用参数，目前支持line,bar,pie三种类型
filters过滤查询支持联动下拉cascade-dropdown，非联动下拉multi-dropdown，输入框input，日期datepicker，日期范围datepicker-range，五种类型的任意组合，一般datepicker和datepicker-range只需一个，查询字符串的格式为
q:{"filters":[{"name":"category","op":"eq","val":10},{"name":"date","op":">=","val":"2015-03-23"},{"name":"date","op":"<=","val":"2015-04-13"}]}
server端需要返回的数据格式为
{
    "status": 0, 
    "msg": "", 
    "data": {
        "items": [
            [
                {
                    "x_val": "2015-03-23", 
                    "y_val": {
                        "total_click": 10389.0
                    }
                }, 
                {
                    "x_val": "2015-03-24", 
                    "y_val": {
                        "total_click": 7988.0
                    }
                }, 
                {
                    "x_val": "2015-03-25", 
                    "y_val": {
                        "total_click": 4571.0
                    }
                }, 
                {
                    "x_val": "2015-03-26", 
                    "y_val": {
                        "total_click": 9443.0
                    }
                }, 
                {
                    "x_val": "2015-03-27", 
                    "y_val": {
                        "total_click": 7194.0
                    }
                }, 
                {
                    "x_val": "2015-03-28", 
                    "y_val": {
                        "total_click": 1893.0
                    }
                }, 
                {
                    "x_val": "2015-03-29", 
                    "y_val": {
                        "total_click": 1885.0
                    }
                }, 
                {
                    "x_val": "2015-03-30", 
                    "y_val": {
                        "total_click": 5009.0
                    }
                }, 
                {
                    "x_val": "2015-03-31", 
                    "y_val": {
                        "total_click": 10185.0
                    }
                }, 
                {
                    "x_val": "2015-04-01", 
                    "y_val": {
                        "total_click": 9117.0
                    }
                }, 
                {
                    "x_val": "2015-04-02", 
                    "y_val": {
                        "total_click": 12002.0
                    }
                }, 
                {
                    "x_val": "2015-04-03", 
                    "y_val": {
                        "total_click": 5350.0
                    }
                }, 
                {
                    "x_val": "2015-04-04", 
                    "y_val": {
                        "total_click": 1933.0
                    }
                }, 
                {
                    "x_val": "2015-04-05", 
                    "y_val": {
                        "total_click": 2099.0
                    }
                }, 
                {
                    "x_val": "2015-04-06", 
                    "y_val": {
                        "total_click": 4988.0
                    }
                }, 
                {
                    "x_val": "2015-04-07", 
                    "y_val": {
                        "total_click": 4596.0
                    }
                }, 
                {
                    "x_val": "2015-04-08", 
                    "y_val": {
                        "total_click": 7070.0
                    }
                }, 
                {
                    "x_val": "2015-04-09", 
                    "y_val": {
                        "total_click": 4084.0
                    }
                }, 
                {
                    "x_val": "2015-04-10", 
                    "y_val": {
                        "total_click": 5445.0
                    }
                }, 
                {
                    "x_val": "2015-04-11", 
                    "y_val": {
                        "total_click": 1793.0
                    }
                }, 
                {
                    "x_val": "2015-04-12", 
                    "y_val": {
                        "total_click": 1468.0
                    }
                }, 
                {
                    "x_val": "2015-04-13", 
                    "y_val": {
                        "total_click": 4141.0
                    }
                }
            ]
        ], 
        "filters": {
            "multi": [
                {
                    "items": [
                        {
                            "display_value": "Accident", 
                            "value": 30
                        }, 
                        {
                            "display_value": "Auto", 
                            "value": 10
                        }, 
                        {
                            "display_value": "Entertainment", 
                            "value": 5
                        }, 
                        {
                            "display_value": "Finance", 
                            "value": 7
                        }, 
                        {
                            "display_value": "Game", 
                            "value": 42
                        }, 
                        {
                            "display_value": "Health", 
                            "value": 35
                        }, 
                        {
                            "display_value": "Humor", 
                            "value": 15
                        }, 
                        {
                            "display_value": "Important News", 
                            "value": 1
                        }, 
                        {
                            "display_value": "International", 
                            "value": 2
                        }, 
                        {
                            "display_value": "Life", 
                            "value": 13
                        }, 
                        {
                            "display_value": "Magazine", 
                            "value": 17
                        }, 
                        {
                            "display_value": "Man", 
                            "value": 48
                        }, 
                        {
                            "display_value": "Moment", 
                            "value": 47
                        }, 
                        {
                            "display_value": "National", 
                            "value": 3
                        }, 
                        {
                            "display_value": "Other", 
                            "value": 12
                        }, 
                        {
                            "display_value": "Politics", 
                            "value": 18
                        }, 
                        {
                            "display_value": "Popular", 
                            "value": 53
                        }, 
                        {
                            "display_value": "Russia", 
                            "value": 51
                        }, 
                        {
                            "display_value": "Science", 
                            "value": 33
                        }, 
                        {
                            "display_value": "Sport", 
                            "value": 6
                        }, 
                        {
                            "display_value": "Technology", 
                            "value": 8
                        }, 
                        {
                            "display_value": "Woman", 
                            "value": 40
                        }, 
                        {
                            "display_value": "World", 
                            "value": 52
                        }
                    ], 
                    "name": "category"
                }
            ]
        }
    }
}
q={"filters":[{"name":"lc","op":"eq","val":"en_US"},{"name":"date","op":">=","val":"2015-12-13"},{"name":"date","op":"<=","val":"2015-12-14"},{"name":"statid","op":"eq","val":"65536"}]}

{"filters":[{"name":"lc","op":"eq","val":"en_US"},{"name":"statid","op":"eq","val":"65536"},{"name":"date","op":">=","val":"2015-12-13"},{"name":"date","op":"<=","val":"2015-12-14"}]}
