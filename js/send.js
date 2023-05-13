import axios from "axios";

// 发送请求并回调
const send = (url,obj,callBack)=>{
    // 发送 post 请求
    axios.post(url, obj, {
        headers: { 'Content-type': 'application/json' },
        timeout: 310000
    }).then(response => {
        // response.data 表示返回的数据
        callBack(false, response.data);
    }).catch(error => {
        console.log("axios 请求post 出现错误 err : ", error);
        callBack(true);
    });
};

export default send