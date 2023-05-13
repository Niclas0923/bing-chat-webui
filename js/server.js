import express from "express"
import cors from "cors"
import fs from "fs"
import https from "https"
import bodyParser from "body-parser";
import send from "./send.js";

// 释放网页
const myServer = (point,url,httpsO = false,options = {})=>{
    const app = express()
    // 允许跨域
    app.use(cors());
    // 托管静态库
    app.use(express.static('./page/dist'))
    // 设置body的接收方式
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // 端口接收数据
    app.post('/bing' , (req , res)=>{
        // 获取数据对象
        const obj = req.body;
        send(url,obj,(e,v)=>{
            if (e){
                // 访问失败就返回失败
                res.status(500).send('<h1>访问失败</h1>');
            }else {
                // 访问成功返回数据
                res.send(v)
            }
        })
    })

    // 判断端口的输入
    if (point){
        // 判断是否给出了https协议的数据
        if (httpsO){
            const option = {
                key: fs.readFileSync(options["key"]),
                cert: fs.readFileSync(options["cert"])
            }
            https.createServer(option, app).listen(point,function (){
                console.log(point+'端口https协议监听中')
            });
        }else {
            // 直接发放网页并开启监听
            app.listen(point,function () {
                console.log(point+'端口http协议监听中')
            })
        }
    }else console.log("端口非纯数字，请去config文件修改为数字")


}

export default myServer