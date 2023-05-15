import Center from "./Center";

class NightMode {
    cen
    // 用于记录当前模式,true表示深色，false表示浅色，默认深色
    now:boolean
    constructor(center:Center) {
        this.cen = center

        const t = this.cen.lS.read("nightMod")
        if (t){
            // @ts-ignore
            this.now = t["0"]
        }else {
            this.now = true
            this.cen.lS.write("nightMod",{"0":this.now})
        }
        this.set()
    }

    switchC(){
        this.now = !this.now
        this.cen.lS.write("nightMod",{"0":this.now})
        this.set()
    }

    set(){
        // console.log(this.now)
        if (this.now){
            // 设置为深色
            // 设置背景
            $("body")
                .removeClass("body")
                .addClass("body-d")
            // 菜单栏修改
            $("nav")
                .addClass("bg-dark")
            $("#switchC")
                .removeClass("switch")
                .addClass("switch-d")
            $("#switchC svg").html(`<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                                        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>`)
            // card
            $(".card-s").removeClass("card-s").addClass("card-s-d")
            $(".card-gpt").removeClass("card-gpt").addClass("card-gpt-d")
            $(".card-me").removeClass("card-me").addClass("card-me-d")
            // 工具栏
            $("#button-addon2,#button-addon3")
                .removeClass("btn-primary")
                .addClass("btn-secondary")
                .addClass("bg-dark")
            // 卡片
            $(".tags-menu").addClass("bg-dark")
            $(".tags-menu h5").css("color","rgb(225, 225, 225)")
            $("#tag-menu .list-group-item").addClass("list-group-item-dark")
            // 底栏
            $("#send path").css("color","rgb(82, 44, 150)")
            $("textarea").css("backgroundColor","rgb(211,211,211)")
            // css文件
            const links = document.getElementsByTagName('link');
            for (let i = 0; i < links.length; i++) {
                if (links[i].href.indexOf('lightfair.min.css') != -1) {
                    // @ts-ignore
                    links[i].parentNode.removeChild(links[i]);
                }
            }
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css';
            document.getElementsByTagName('head')[0].appendChild(link);
            $(".pre1>code").removeClass("hljs-w")
            // 进度条
            $(".spinner-border").removeClass("text-secondary")
        }else {
            // 设置为浅色
            // 设置背景
            $("body")
                .removeClass("body-d")
                .addClass("body")
            // 设置状态栏
            $("nav").removeClass("bg-dark")
            $("#switchC")
                .removeClass("switch-d")
                .addClass("switch")
            $("#switchC svg").html(`<path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>`)

            $(".card-s-d").removeClass("card-s-d").addClass("card-s")
            $(".card-gpt-d").removeClass("card-gpt-d").addClass("card-gpt")
            $(".card-me-d").removeClass("card-me-d").addClass("card-me")
            // 工具栏
            $("#button-addon2,#button-addon3")
                .addClass("btn-primary")
                .removeClass("btn-secondary")
                .removeClass("bg-dark")
            // 卡片
            $(".tags-menu").removeClass("bg-dark")
            $(".tags-menu h5").css("color","black")
            $(".list-group-item").removeClass("list-group-item-dark")

            // 底栏
            $("#send path").css("color","rgb(39, 111, 253)")
            $("textarea").css("backgroundColor","rgb(255,255,255)")
            // css文件
            const links = document.getElementsByTagName('link');
            for (let i = 0; i < links.length; i++) {
                if (links[i].href.indexOf('atom-one-dark.min.css') != -1) {
                    // @ts-ignore
                    links[i].parentNode.removeChild(links[i]);
                }
            }
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.7.0/styles/lightfair.min.css';
            document.getElementsByTagName('head')[0].appendChild(link);
            $(".pre1>code").addClass("hljs-w")
            // 进度条
            $(".spinner-border").addClass("text-secondary")
        }
    }

}

export default NightMode