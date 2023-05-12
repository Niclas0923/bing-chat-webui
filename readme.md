### 使用方法

克隆后在终端运行

    npm i

之后填写config.json中到内容，然后运行

    npm run st

即可访问链接 http://localhost:18080 访问到网页

### 开发方式

直接运行

    npm run dev

注意，开发需要使用nodemon，如果没有安装过则需要进行安装，直接通过下面的代码安装即可

    npm i -g nodemon

mac和linux的安装可能需要管理员权限，需要在前面添加 sudo 例如：

    sudo npm i -g nodemon

开发端口默认是8080，可以在pakage.json中修改dev-w命令的后缀来更改开发端口