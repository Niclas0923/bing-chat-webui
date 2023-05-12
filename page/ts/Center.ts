import Card from "./Card";
import Events from "./Event/Event";
import Send from "./Send";
import localStorage from "./LocalStorage";
import NightMode from "./NightMode";
import val from "./Val";

class Center {
    lS
    card
    send
    event
    night
    // 用于记录当前是否为询问状态
    searching = false
    // 用于记录当前的属性的状态
    sex :string = "GPT"
    constructor() {

        this.lS = new localStorage()
        this.card = new Card(this)
        this.send = new Send()
        this.event = new Events(this)
        this.night = new NightMode(this)
        // $.removeCookie("chartGPT-save")

        // 防止元素错位
        $("body").css({display:"block"})
        this.creatTags()
        this.draw()
        // console.log(val.ipUrl)
        // this.card.creatM("test")
        // const t = this
        // setTimeout(function () {
        //     t.card.downLast()
        // },2000)
    }
    // 通过list中的内容制作状态栏标签
    creatTags(){
        const val = this.lS.read("list")
        if (val){
            const $m = $("#tag-menu")
            // 先清空再写入
            $m.html("")
            let a1 = ""
            // @ts-ignore 确认如果读取的是list会存在这个属性，所以屏蔽
            const list = val['names']
            for (const i in list) {
                const id = list[i]
                a1+=`<a href="#" class="list-group-item list-group-item-action${id===this.sex?" active":""}${this.night.now?" list-group-item-dark":""}" id="${id}">${id}</a>`
            }
            $m.html(a1)
            if (["GPT"].indexOf(this.sex) !== -1){
                // 前两项
                $("#addTo,#export").removeClass("disabled")
                this.event.btn.addTo()
                this.event.btn.export()
                $("#remove,#rename").addClass("disabled")
            }else if(this.sex === "一言"){
                // 一言
                $("#remove,#rename,#addTo,#export").addClass("disabled")
            }else {
                // 添加项
                $("#rename,#remove,#export").removeClass("disabled")
                this.event.btn.rename()
                this.event.btn.remove()
                this.event.btn.export()
                $("#addTo").addClass("disabled")
            }
            // 都允许清空
            this.event.btn.reSet()
            // 重新设置点击函数
            this.event.tags()
        }
    }

    draw(fromReSet = false){
        $("#in").html("")
        // 读取当前localStorage，写入所有历史
        const nVal = this.lS.read(this.sex)
        if (nVal!==null && this.sex !== "一言"){
            // @ts-ignore
            for (const i of nVal.chat) {
                switch (i[0]) {
                    case "system":
                        this.card.creatS(i[1]);break
                    case "user":
                        this.card.creatM(i[1]);break
                    case "assistant":
                        this.card.creatC(i[1]);break
                }
            }
        }
        switch (this.sex) {
            case "GPT":
                if (!fromReSet) this.card.creatC("我已经完成了所有信息的读取，有什么问题都可以直接在下方向我提问。",false);break
            case "一言":
                this.card.creatS("你的回复与上下文不相关，只需要回复最后一个问题即可\n(这可以减少回复的计算时间)\n(但是问题和回复不会被记录)");break
            default:
                // 如果是自定义并且没有资源
                // @ts-ignore
                if (this.lS.read(this.sex)["chat"].length === 0){
                    // 生成一个system框，用于提示可以输入system
                    this.card.creatS("当前system未设置，可以点击设置，若不设置则为空，使用后不可以再进行设置设置")
                    const sys = $(".card")[0]
                    const cen = this
                    $(sys).one("click",function () {
                        cen.card.creatInput()
                    })
                }
        }
    }

}

export default Center
