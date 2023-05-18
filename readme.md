### 使用方法

克隆后在终端运行
```shell
npm i
```
来下载依赖库

之后填写config.json中到内容
```json
{
    "url":"https://",
    "serverIP": "localhost",
    "point": 18080,
    "httpsO": false,
    "options": {
        "key": "",
        "cert": ""
    },
    "dev": {
        "point": 8080,
        "host": ""
    }
}
```
url ：是本人另一个项目的接口链接，项目链接：

https://gitee.com/niclas0923/bing-chat-transfer-backend

它需要部署在合适的位置。

serverIP：这个指的是部署此项目的ip或者域名，如果不填写就会自动获取，有可能获取到局域网地址。

httpsO：这个布尔值表示是否使用https协议，如果使用则填`true`,那么后面的options就要填写你sll证书的位置。

dev：这个是开发服务器的配置文件，可以自定义开发端口，开发时同时会占用生产端口，所以开发请与生产分离。

配置完成后运行
```shell
npm run st
```
运行编译完成后即可访问链接 http://localhost:18080 访问到网页，如果设置了配置，则按配置链接访问即可。

### 开发方式

直接运行
```shell
npm run dev
```
注意，开发需要使用nodemon，如果没有安装过则需要进行安装，直接通过下面的代码安装即可
```shell
npm i -g nodemon
```
mac和linux的安装可能需要管理员权限，需要在前面添加 sudo 例如：
```shell
sudo npm i -g nodemon
```
开发端口默认是8080，可以在通过更改配置文件来更改开发端口