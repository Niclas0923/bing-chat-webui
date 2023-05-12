// 本文件不能直接运行，直接运行的话文件目录会出错，请去根目录运行 npm run dev
import shell from "shelljs";
import fs from "fs"
import server from "../js/server.js";

// 读取配置信息
const config = JSON.parse(String(fs.readFileSync("./config.json")))
console.log("读取配置文件成功")

// 修改页面的访问目标数据
fs.writeFileSync("./page/ts/Val.ts",`const val = {"url":"${config["url"]}"}\nexport default val`)
console.log("写入配置文件完成")

// 开发服务器运行
const devC = JSON.parse(String(fs.readFileSync("./config.json")))["dev"];
const s = `webpack-dev-server --mode development --port ${devC["point"]}${devC["host"] !== ""?` --allowed-hosts ${devC["host"]}`:""}`

// 接收服务器运行
shell.exec(s, (code, stdout, stderr) => {
    console.log(`child process exited with code ${code}`);
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
})
// 端口监听并释放网页
server(config.point)
