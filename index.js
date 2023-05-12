import fs from "fs"
import shell from "shelljs"
import server from "./js/server.js";

// 读取配置信息
const config = JSON.parse(String(fs.readFileSync("./config.json")))
console.log("读取配置文件成功")
// console.log(config)

// 修改页面的访问目标数据
fs.writeFileSync("./page/ts/Val.ts",`const val = {"url":"${config["url"]}"}\nexport default val`)
console.log("写入配置文件完成")

// 运行编译命令
console.log("开始编译文件")
const command = 'npm run build';
const options = { silent: true };

shell.exec(command, options, (code, stdout, stderr) => {
    if (code === 0) {
        console.log("编译完成")
        // 修改完成后启动端口监听释放网页
        server(config.point,config["httpsO"],config["options"])
    } else {
        console.error(`Command failed with exit code ${code}: ${stderr}`);
    }
});