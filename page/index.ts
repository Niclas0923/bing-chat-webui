import "./ts/Center"
import "./less/index.less"
import Center from "./ts/Center";

// 设置全局变量cen，但是仅开发使用
// declare global {
//     interface Window {
//         cen: Center;
//     }
// }


window.onload = function (){
    new Center()
    // window.cen = new Center()
}