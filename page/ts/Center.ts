import Card from "./Card";
import Events from "./Event/Event";
import Send from "./Send";
import localStorage from "./LocalStorage";
import NightMode from "./NightMode";

class Center {
    lS
    card
    send
    event
    night
    // 用于记录当前是否为询问状态
    searching = false
    // 用于记录当前的属性的状态
    sex :string = "bing"
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
            if (["bing"].indexOf(this.sex) !== -1){
                // bing
                $("#export").removeClass("disabled")
                $("#remove").addClass("disabled")
                $("#reN").css({"display": "none"})
                $("#addTo").css({"display": ""})
            }else {
                // 添加项
                $("#remove,#export").removeClass("disabled")
                this.event.btn.remove()
                $("#reN").css({"display": ""})
                $("#addTo").css({"display": "none"})
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
        const $btnG = $("#btnG .btn")
        $btnG.removeClass("active")
        // @ts-ignore
        $("select").val(`${nVal["mod"]}`).trigger('change');
        if (nVal!==null){
            // @ts-ignore
            for (const i of nVal.history) {
                switch (i[0]) {
                    case "system":
                        this.card.creatS(i[1]);break
                    case "user":
                        this.card.creatM(i[1]);break
                    case "assistant":
                        if (i.length == 2) this.card.creatC(i[1])
                        else this.card.creatC(i[1],i[2])
                        break
                }
            }
        }
        if (!fromReSet) this.card.creatC( "我已经完成了所有信息的读取，有什么问题都可以直接在下方向我提问。",[],false)
    }

}

export default Center
