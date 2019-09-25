var date=new Date();
var hour=date.getHours();

document.getElementById("sayHello").onclick=function() {
    if(hour<=12){
    document.getElementById("sayHello-content").innerHTML='上午好';
    }
    else
    document.getElementById("sayHello-content").innerHTML='下午好';

}