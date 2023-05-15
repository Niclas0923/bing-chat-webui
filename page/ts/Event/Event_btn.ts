import Event from "./Event";

class Event_btn{
    // 这里存储着功能按钮们的事件
    cen
    e
    constructor(e:Event) {
        this.e = e
        this.cen = e.center

        this.switchC()
        this.rename()
        this.addTo()
    }

    // 设置清空按钮的点击函数
    reSet(){
        this.e.click($("#reset"),()=>{
            this.cen.lS.reset(this.cen.sex)
            this.cen.draw(true)
            this.cen.card.creatC("我已经完成了信息的清空，有什么问题都可以通过下方进行提问。",[],false)
        })
    }

    // 设置删除按钮的点击函数
    remove(){
        this.e.click($("#remove"),()=>{
            // 删除掉ls中的数据
            this.cen.lS.removeOne(this.cen.sex)
            this.cen.sex = "bing"
            this.cen.creatTags()
            this.cen.draw()
            this.e.notice("success","删除成功!")
        })
    }

    // 设置重命名按钮的点击函数
    rename(){
        const c = this.cen
        this.e.click($("#button-addon2"),()=>{
            const id = c.sex
            this.e.testName($("#reN input"),(val,list)=>{
                $("#reN input").val("")
                // 在list中替换这一项
                list[list.indexOf(id)] = val
                c.lS.write("list", {"names":list})
                // 在is中删除这一项并写入新的
                const valOne = c.lS.read(id)
                if (valOne) c.lS.write(val,valOne)
                c.lS.onlyRemove(id)
                // 重置画面
                c.sex = val
                c.draw()
                c.creatTags()
            })
        })
    }

    // 设置添加到单项按钮的点击函数
    addTo(){
        const c = this.cen
        this.e.click($("#button-addon3"),()=>{
            this.e.testName($("#addTo input"),(val,list)=>{
                $("#addTo input").val("")
                // 向后写入list并保存
                list[list.length] = val
                c.lS.write("list", {"names":list})
                // 读取当前内容再清除当前内容
                const val0 = c.lS.read(c.sex)
                if (val0){
                    c.lS.write(val, val0)
                    c.lS.reset(c.sex)
                    c.sex = val
                    this.e.notice("success",`当前为${c.sex}`)
                    c.creatTags()
                    c.draw()
                }
            })
        })
    }

    // 设置导出按钮的点击函数
    export(){
        const cen = this.cen
        this.e.click($("#export"), ()=>{
            // 读取当前数据，转化为专业格式
            let val = cen.lS.read(cen.sex)
            // 复制到剪贴板
            this.e.copyVal(JSON.stringify(val),"已经导出到剪贴板")
        })
    }

    // 切换颜色的按钮
    switchC(){
        const cen = this.cen
        $("#switchC").on("click",function () {
            cen.night.switchC()
        })
    }


}

export default Event_btn