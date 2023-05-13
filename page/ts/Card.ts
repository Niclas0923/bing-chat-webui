import Center from "./Center";
declare var hljs: any;
declare var S: any;

class Card {

    $in
    center
    constructor(center:Center) {
        this.$in = $("#in")
        this.center = center
    }

    creatCardA(classV:string,head:string,val:string,fast = true){
        const t = this
        // 制作插入的基本框架
        const isS = (head === "System")
        const e0 = [`<div class="line${isS?" line-s":""}">`,`</div>`]
        const e1 = [`<div class="${classV+(t.center.night.now?"-d":"")}">`,`</div>`]
        const e2 = isS? `<h4>${head}</h4>`: ""
        const e3 =`<div class="init"></div>`
        let e = e0[0]+e1[0]+e2+e3+e1[1]+e0[1]
        // 把框架插入
        this.$in.append(e)
        // 记录需要插入的地方
        const $e = $('#in .init:last')
        // 数据处理
        val = S(val).escapeHTML().s
        let match;
        let count = 1;
        while ((match = /\[\d*?\.\s*(.*?)\]\((.*?)\)/g.exec(val)) !== null) {
            const str = match[0];
            const link = match[2];
            const name = match[1];
            const replaced = `<a href="${link}" target="_blank" title="${link}">${name}</a>`;
            val = val.replace(str, `${count}. ${replaced}`);
            count++;
        }
        val = val.replace(/\[(.+)\]\((http[s]?:\/\/.+)\)/g, '<a href="$2" target="_blank" title="$2">$1</a>');
        const [arr1,arr2] = this.extractArray(val)
        // 根据需求选择动态显示还是直接显示
        if (fast){
            let valO = ""
            for (const i in arr1) {
                if (arr2[i]==="0") valO+=`<pre>${arr1[i]}</pre>`
                else valO+=
                    `<div>`+
                        `<a href="#" class="copy">`+
                            `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;">`+
                                `<path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" style="fill: gray"></path>`+
                            `</svg>`+
                        `</a>`+
                        `<pre class="pre1">`+
                            `<code class="${t.center.night.now?"":"hljs-w "}${arr2[i]===""?"":"language-"+arr2[i]}">${arr1[i]}</code>`+
                        `</pre>`+
                        `<div style="display: none;">${arr1[i]}</div>`+
                    `</div>`
            }
            t.addEle(valO,$e)
            t.$in.stop(true).animate({scrollTop:t.$in[0].scrollHeight})
        }else {
            // 总共的不去除时的长度，用于确定时间
            const l = val.length
            // 每个字的时间
            let time = 0
            if (l<100) time = 40
            else if (l>=100 && l<300) time = 30
            else if (l>=300 && l<600) time = 24
            else if (l>=600 && l<800) time = 19
            else if (l>=800 && l<1500) time = 15
            else if (l>=1500) time = 10
            // 这个是之前的全部数据
            let valL = ""
            // 这个是现在是arr1的第几项
            let a1 = 0
            // 这个是这一项的第几个
            let a2 = 0
            // 这个是当前项的长度
            let l1 = arr1[a1].length
            // 是否出现过learn more
            let b0 = false
            let i = setInterval(function () {
                a2+=1
                // console.log(a2,l1,l)
                if (a2 >= l1+1){
                    valL+=arr2[a1]==="0"?`<pre>${arr1[a1]}</pre>`:
                        `<div>`+
                            `<a href="#" class="copy">`+
                                `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;">`+
                                    `<path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" style="fill: gray"></path>`+
                                `</svg>`+
                            `</a>`+
                            `<pre class="pre1">`+
                                `<code class="${t.center.night.now?"":"hljs-w "}${arr2[a1]===""?"":"language-"+arr2[a1]}">${arr1[a1]}</code>`+
                            `</pre>`+
                            `<div style="display: none;">${arr1[a1]}</div>`+
                        `</div>`
                    a1+=1
                    if (a1 === arr1.length){
                        clearInterval(i)
                        // @ts-ignore
                        let x = t.$in.prop("scrollHeight") - t.$in.scrollTop() == t.$in.height();
                        t.addEle(valL,$e)
                        if(x) t.$in.stop(true).animate({scrollTop:t.$in[0].scrollHeight},time)
                        return 0
                    }else {
                        a2 = 1
                        l1 = arr1[a1].length
                    }
                }
                let valX
                if (arr2[a1]==="0"){
                    valX = `<pre>${arr1[a1].substring(0, a2)}</pre>`
                }else {
                    valX = `<pre class="pre1"><code class="${t.center.night.now?"":"hljs-w "}language-${arr2[a1]}">${arr1[a1].substring(0, a2)}</code></pre>`
                }
                if (/Learn more:/.test(valX) && !b0){
                    b0 = true
                    a2 = l1-1
                }
                // @ts-ignore
                let x = t.$in.prop("scrollHeight") - t.$in.scrollTop() <= t.$in.height()+21
                t.addEle(valL+valX,$e)
                if(x) t.$in.stop(true).animate({scrollTop:t.$in[0].scrollHeight},time)
            },time)
        }
    }

    creatS(val:string){
        this.creatCardA("card card-s",
            "System",val)
    }

    creatC(val:string,fast=true){
        this.creatCardA("card card-gpt",
            "chartGPT",val,fast)
    }

    creatM(val:string,fast=true){
        this.creatCardA("card card-me",
            "我",val,fast)
    }

    // removeLast(){
    //     $('#in div:last').remove();
    // }

    downLast(){
        $('.line:last div').animate({
            backgroundColor:"#505659"
        })
    }

    creatInput(){
        this.creatSI("inputSet","sendSet","输入system","输入")
        const cen = this.center
        $("#sendSet").on("click",function (e) {
            e.preventDefault()
            const val = String($("#inputSet").val())
            const valS = cen.lS.read(cen.sex)
            if (valS){
                // @ts-ignore
                if(valS["chat"].length === 0){
                    if (val!.length !== 0){
                        $("#sendSet").off('click');
                        // @ts-ignore
                        valS["chat"] = [["system",val]]
                        cen.lS.write(cen.sex,valS)
                        cen.draw()
                    }else {
                        cen.event.notice("danger","请输入内容")
                    }
                }else {
                    cen.event.notice("danger","已经有过对话,重新创建.")
                }
            }
        })
    }

    creatSI(id_ip:string,id_btn:string,val_ip:string,val_send:string){
        const e =
            "<div class=\"line line-s\">"+
                `<div class="card card-s${this.center.night.now?"-d":""}">`+
                    "<h5>System</h5>"+
                    "<div class=\"input-group mb-3\">"+
                        `<input type="text" class="form-control" placeholder="${val_ip}" id="${id_ip}"  onkeydown="if (event.keyCode===13)document.getElementById('${id_btn}').click()">`+
                        `<button class="btn btn-success" type="button" id="${id_btn}">${val_send}</button>`+
                    "</div>"+
                "</div>"+
            "</div>"
        this.$in.append(e)
            .stop(true)
            .animate({
                scrollTop:this.$in[0].scrollHeight
            })
    }

    // 根据信息计算出两个数组，一个数组是信息，一个是特征值
    extractArray(val:string){
        let arr0:string[]=[]
        let arr1:string[]=[]
        const ll = ["python","js","javascript","typescript","css","java","cpp","csharp","php","ruby","go","bash","html","c++",""]
        // console.log(val)
        const regex = /```(\w*)\n([\s\S]*?)\n```/
        let str = val
        // 保存运行次数
        let a = 1
        while (regex.exec(str)){
            const match = regex.exec(str);
            if (match) {
                const index = match.index;
                const before = str.substring(0, index);
                const matched = match[0];
                // @ts-ignore
                const after = str.substring(index + matched.length);
                arr0[a*2-2] = before
                arr1[a*2-2] = "0"
                arr0[a*2-1] = match[2]
                arr1[a*2-1] = match[1]
                str = after
                a+=1
            } else {
                console.log("没有匹配项");
            }
        }
        arr0[arr0.length] = str
        arr1[arr1.length] = "0"
        // console.log(arr0,arr1,0)

        for (const i in arr1) {
            if (ll.indexOf(arr1[i])===-1) arr1[i]="0"
            else {
                function changeText(val:string){
                    switch (val) {
                        case "c++":
                            return "cpp"
                        case "js":
                            return "javascript"
                        default:
                            return val
                    }
                }
                arr1[i] = changeText(arr1[i])
            }
        }
        // console.log(arr0,arr1,1)
        return [arr0,arr1]
    }

    addEle(val:string,jqueryE:JQuery<HTMLElement>){
        val = val.replace(/\[\^h\^\]/g, "<hr>");
        val = val.replace(/(\[\^[0-9]+\^\]\s*)+/g, " $& ");
        val = val.replace(/\[\^(\d+)\^\]/g, '<span class="badge rounded-pill bg-primary">$1</span>');
        jqueryE.html(val)
        this.center.event.copyE()
        $(".line:last pre").filter(function() {
            return $(this).has("code").length > 0;
        }).each(function() {
            // console.log(this)
            hljs.highlightElement($(this).children()[0])
        });
    }

}

export default Card