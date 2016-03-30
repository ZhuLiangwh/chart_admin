报表框架

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

编辑
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
