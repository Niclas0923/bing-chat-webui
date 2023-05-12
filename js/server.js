import express from "express"
import cors from "cors"
import fs from "fs"
import https from "https"

// 释放网页
const myServer = (point,httpsO = false,options = {})=>{
    const app = express()
    // 允许跨域
    app.use(cors());
    // 托管静态库
    app.use(express.static('./page/dist'))

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