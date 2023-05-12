import val from "./Val";
class Send {
    url
    lastSendVal={}

    constructor() {
        this.url = val.url
    }

    sendTools(urlAdd:string,obj:object,canCallBack:(data:{"0":number,"1":string})=>void,canNotCallBack:()=>void){
        this.lastSendVal = obj
        console.log(obj,"send")
        $.ajax({
            // 响应体结果
            dataType:'json',
            // 内容类型
            contentType: 'application/json',
            // url
            url:`${this.url}`,
            //参数
            data: JSON.stringify(obj),
            // 请求类型
            type:'POST',
            // 发送成功回调
            "success":function(d){
                console.log(d.text)
                canCallBack(d)
            },
            // 超时时间
            timeout:310000,
            //失败的回调
            "error":function(jqXHR, textStatus, errorThrown){
                console.log('请求失败：', jqXHR, textStatus, errorThrown);
                canNotCallBack()
            }
        })
    }

    sendObj(obj:object,canCallBack:(data:{"0":number,"1":string})=>void,canNotCallBack:()=>void){
        this.sendTools("chart",obj,canCallBack,canNotCallBack)
    }
}

export default Send