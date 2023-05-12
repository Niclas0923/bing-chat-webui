import Center from "../Center";
import Event_btn from "./Event_btn"

class Events {
    center
    $input
    $text
    inputShort
    btn
    constructor(center:Center) {
        this.center = center
        this.btn = new Event_btn(this)
        this.$input = $("#inputs")
        this.$text = $("#floatingTextarea2")

        const t = this
        $("#send").on("click",function (){t.sendEvent(String(t.$text.val()))})
        $(document).on('keydown', function(e){
            // 监听 Shift + Enter 按键
            if (e.shiftKey && e.key === "Enter") {
                t.sendEvent(String(t.$text.val()))
                return false
            }
        });

        this.inputShort = this.inputA()
    }

    // 发送的事件
    sendEvent(input:string){
        const val = this.center.lS.read(this.center.sex)
        if (!this.center.searching){
            this.center.searching = true
            const $text = $("#floatingTextarea2")
            if (input.length !== 0){

                if(val){
                    // 修改发送的数据
                    // @ts-ignore 确认一定会存在这项所以直接屏蔽
                    val.chat[val.chat.length] = ["user",input]
                    // 将这个数据显示在显示界面上
                    this.center.card.creatM(input)
                    // 清除输入框中的数据
                    $text.val("")
                    this.inputShort()
                    // 制作等待图标
                    const e  =
                        "<div class=\"line\" id=\"loading\">" +
                            `<div class="card card-gpt${this.center.night.now?"-d":""}">` +
                                `<div class="spinner-border${this.center.night.now?"":" text-secondary"}" style="width: 21px; height: 21px" role="status">` +
                                    "<span class=\"visually-hidden\">Loading...</span>" +
                                "</div>" +
                            "</div>" +
                        "</div>"
                    $("#in").append(e)
                    const $l = $("#loading")

                    // 发送请求
                    this.center.send.sendObj(val,(data:{"0":number,"1":string})=>{
                        this.center.searching = false
                        $l.remove()
                        // 成功则再更改数据
                        if (data["0"] === 0){
                            this.center.card.downLast()
                            // 访问超时
                            this.notice("danger","访问超时，可以尝试重复输入")
                            this.timeout()
                        }else if(data["0"] === 1){
                            // 返回成功
                            this.center.card.creatC(data["1"],false)
                            // 一言不保存
                            if (this.center.sex !== "一言"){
                                // @ts-ignore 确认一定会存在这项所以直接屏蔽
                                val.chat[val.chat.length] = ["assistant",data["1"]]
                                // 写入到cookie
                                this.center.lS.write(this.center.sex,val)
                            }
                            // console.log("val",val)
                        }
                    },()=>{
                        this.center.searching = false
                        $l.remove()
                        this.center.card.downLast()
                        this.notice("danger","网络链接超时，请检查网络连接")
                        this.timeout()
                    })
                }

            }else {
                this.center.searching = false
                this.notice("danger","请输入信息再发送")
            }
        }else {
            this.notice("danger","正在回复中，请回复后再发起提问")
        }
    }

    // 设置状态栏tag的点击函数
    tags(){
        const cen = this.center
        const t = this
        this.click($("#tag-menu a"),function (this: HTMLElement) {
            if (this.id !== cen.sex){
                cen.sex = this.id
                cen.draw()
                cen.creatTags()
                t.notice("success",`当前为${this.id}`)
            }else t.notice("danger",`已经为${this.id}`)
        },false)
    }

    // 设置复制按钮的点击事件
    copyE(){
        const t = this
        const $list = $("#in a")
        for (let i=0;i<$list.length;i++) {
            $($list[i]).off().on("click",function () {
                // console.log($(this).parent().find("div").html())
                const val = $(this).parent().find("div").html()
                t.copyVal(val,"复制成功")
            })
        }
    }

    // // 设置读取复制按钮的点击之间
    // readCopy(){
    //     $(".read-copy").on("click",function () {
    //         navigator.clipboard.readText().then(text => {
    //             // console.log('剪贴板内容：', text);
    //             $("#floatingTextarea2").val(text)
    //         });
    //     })
    // }

    // 制作弹窗的事件
    notice(style:string,val:string){
        if (style === "success"){
            if (this.center.night.now) style = "dark"
            else style = "primary"
        }
        const s = `<div class="alert alert-${style} alert0" role="alert">${val}</div>`
        $("body").append(s)
        const time = window.innerWidth <= 767?800:500
        const f = $('body').find(".alert0:last")
        f.css({
            top :"-5%",
            opacity: 0,
            display:"block"
        }).animate({
            top :"2%",
            opacity: 0.95,
        },300,function () {
            setTimeout(function () {
                f.animate({
                    top :"-5%",
                    opacity: 0
                },300,function (){
                    f.remove()
                })
            },time)
        })
    }

    // 设置有关底部input框动画的函数
    inputA(){
        const nowL = ()=>{
            return this.$input[0].scrollHeight
        }
        const h = 55
        const time = 250
        const times = 3.5
        const long = ()=>{
            const t = (h*times-nowL())*time/(h*2)
            if (nowL()!==h*times){
                this.$input
                    .stop(true)
                    .animate({
                        height:h*times
                    },Math.floor(t))
            }
        }

        const short = ()=>{
            // console.log(this.$input.find("textarea").val());
            if (this.$input.find("textarea").val()===""){
                const t = (nowL()-h)*time/(h*(times-1))
                if (nowL()!==h){
                    this.$input
                        .stop(true)
                        .animate({
                            height:h
                        },Math.floor(t))
                }
            }
        }

        this.$input.on("mouseenter",function () {
            long()
        })
        this.$input.on("mouseleave",function () {
            short()
        })
        this.$text.on("focus", function() {
            // 获取焦点时的处理
            long()
        });
        this.$text.on("blur", function() {
            // 失去焦点时的处理
            short()
        });
        return short

    }


    // 点击事件设置，屏蔽正在搜索，可指定ele的this
    click(ele: JQuery<HTMLElement>,call:Function,thisE=true){
        const cen = this.center
        const t = this
        ele.off().on("click",function (e) {
            e.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            if (!cen.searching){
                if (thisE) call()
                else call.call(this)
            }else {
                t.notice("danger","正在回复中，请回复后再尝试")
            }
        })
    }

    // 测试输入名称的函数
    testName($input: JQuery<HTMLElement>, canCallback: (name:string,list0: Array<string>) => void){
        const name = String($input.val())
        if (name !== ""){
            const list = this.center.lS.read("list")
            let list0 = []
            // @ts-ignore
            if (list) list0 = list["names"]
            if(list0.indexOf(name)===-1){
                if (!/[<>$&#]/.test(name)){
                    if(Array.isArray(list0)) canCallback(name,list0)
                }else this.notice("danger","不得含有特殊字符")
            }else this.notice("danger","命名不能重复")
        }else this.notice("danger","命名不能为空")
    }

    // 用于内容复制到剪贴板的工具
    copyVal(val:string,successVal:string){
        const t = this
        function addToClipboard(text:string) {
            let textArea = document.createElement("textarea");
            textArea.value = text;

            // 将文本框添加到页面
            document.body.appendChild(textArea);

            // 选择文本框中的内容
            textArea.select();

            try {
                // 尝试将文本添加到剪切板中
                document.execCommand('cut');
                // console.log('Added to clipboard!');
                t.notice("success",successVal)
            } catch (err) {
                console.error('Unable to add to clipboard!', err);
            }

            // 删除文本框
            document.body.removeChild(textArea);
        }
        function decodeHTMLEntities(text: string): string {
            let encodedHTML = document.createElement('textarea');
            encodedHTML.innerHTML = text;
            return encodedHTML.value;
        }
        addToClipboard(decodeHTMLEntities(val))
    }

    // 访问超时或者网络失败的函数
    timeout(){
        const t = this
        const c = t.center
        const e =
            `<a href="#" style="position: absolute;left: -30px;top: 50%;transform: translate(0,-50%)" id="resend">`+
                `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">`+
                    `<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" style=""/>`+
                    `<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" style=""/>`+
                `</svg>`+
            `</a>`
        $(".line:last .card").append(e)
        // 设置点击函数
        $("#resend").one("click",function () {
            $(".line:last .card a").remove()
            // @ts-ignore
            const val = c.send.lastSendVal["chat"][c.send.lastSendVal["chat"].length-1][1]
            // 再次发送请求
            t.sendEvent(String(val))
        })
    }

}

export default Events