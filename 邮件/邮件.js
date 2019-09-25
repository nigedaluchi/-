var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var index=0;

/*监听用书输入并获取用户输入的值*/
function OnInput(event){
    generatePrompt(event.target.value.trim());
    document.getElementsByTagName("li")[index].classList.add("email-li-select");
}
/*生成UL中的提示内容*/
function generatePrompt(content){
    if(content!=""){
        document.getElementById("email-sug-wrapper").innerHTML="";
        /*检测是否存在@字符*/
        //如果不存在
        let str="";
        if(content.indexOf("@")==-1)
        for(let i=0;i<postfixList.length;i++){
            str=content.toString() + "@"+postfixList[i];
            document.getElementById("email-sug-wrapper").innerHTML+="<li class='email-li'>"+str+"</li>";
        }
        else{
            //如果存在，截取到@后面的字符，与postfixList比较
            let afterAt=content.substr(content.indexOf("@")+1,content.length);
            let flag=0;
            for(let i=0;i<postfixList.length;i++){
                if(postfixList[i].indexOf(afterAt)!=-1){
                    str=content.substr(0,content.indexOf(afterAt))+"@"+postfixList[i];
                    document.getElementById("email-sug-wrapper").innerHTML+="<li class='email-li'>"+str+"</li>";
                    flag++;
                }
            }
            if(flag==0){
                for(let j=0;j<postfixList.length;j++){
                    str=content.substr(0,content.indexOf(afterAt))+"@"+postfixList[j];
                    document.getElementById("email-sug-wrapper").innerHTML+="<li class='email-li'>"+str+"</li>";
                }
            }
        }
    }
}
/*基于数据，置一个变量，来保存当前选择的index*/
document.getElementById("email-input").onkeydown=function(event){
    var event = event || window.event || arguments.callee.caller.arguments[0];
    if(event&&event.keyCode==40){
        let selectLi=document.getElementsByTagName("li");
        if(index!=selectLi.length-1){
            selectLi[index].classList.remove("email-li-select");
            selectLi[++index].classList.add("email-li-select");
        }
        else if(index==selectLi.length-1){
            selectLi[index].classList.remove("email-li-select");
            selectLi[0].classList.add("email-li-select");
            index=0;
        }
    }
    else if(event&&event.keyCode==13){
        let selectLi=document.getElementsByTagName("li");
                document.getElementById("email-input").value=selectLi[index].innerHTML;
        }
}
document.getElementById("email-sug-wrapper").onclick=function(event){
    document.getElementById("email-input").value=event.target.innerHTML;
}
/*基于DOM，通过样式找到设置了特殊样式的Li */
/*
document.getElementById("email-input").onkeydown=function(event){
    var event = event || window.event || arguments.callee.caller.arguments[0];
    if(event&&event.keyCode==40){
        let selectLi=document.getElementsByTagName("li");
        for(let i=0;i<selectLi.length;i++){
            if(selectLi[i].classList.contains("email-li-select")){
                selectLi[i].classList.remove("email-li-select");
                if((i+1)!=selectLi.length)
                    selectLi[i+1].classList.add("email-li-select");
                else if((i+1)==selectLi.length)
                    selectLi[0].classList.add("email-li-select");
                break;
            }
        }
    }
    else if(event&&event.keyCode==13){
        let selectLi=document.getElementsByTagName("li");
        for(let i=0;i<selectLi.length;i++){
            if(selectLi[i].classList.contains("email-li-select")){
                document.getElementById("email-input").value=selectLi[i].innerHTML;
            }
        }

    }
}
document.getElementById("email-sug-wrapper").onclick=function(event){
    document.getElementById("email-input").value=event.target.innerHTML;
}*/