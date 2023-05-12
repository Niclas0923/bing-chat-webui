class LocalStorage {
    constructor() {
        // 开机自动检测是否存在list
        if (this.read("list") === false){
            // 不存在就全部初始化
            this.creatOnce()
        }
    }

    // 读取localStorage
    read(name:string): {}|false {
        const val = localStorage.getItem(name)
        // console.log(val)
        if (val!==null){
            return JSON.parse(val)
        }else {
            return false
        }
    }


    // 直接生成新的内容并写入
    creatOnce(){
        const names = ["GPT","一言"]
        // 生成列表，生成初始
        this.write("list",{'names':names})
        for (const i of names) {
            this.reset(i)
        }
    }


    reset(name:string){
        const val0:{model:string,chat:object} = {
            "model": "gpt-3.5-turbo",
            "chat": []
        }
        this.write(name,val0)
    }


    // 根据需求写入
    write(name:string,val:object){
        localStorage.setItem(name, JSON.stringify(val));
    }

    removeOne(name:string){
        const val = this.read("list")
        if (val){
            // @ts-ignore
            const list = val["names"]
            list.splice(list.indexOf(name), 1)
            this.write("list",{"names":list})
            localStorage.removeItem(name);
        }
    }

    onlyRemove(name:string){
        localStorage.removeItem(name);
    }

}

export default LocalStorage