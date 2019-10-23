document.getElementById("a").onclick=function(){
    location.hash="#a";
}
document.getElementById("b").onclick=function(){
    location.hash="#b";
}
document.getElementById("c").onclick=function(){
    location.hash="#c";
}
document.getElementById("d").onclick=function(){
    location.hash="#d";
}
document.getElementById("e").onclick=function(){
    location.hash="#e";
}
document.getElementById("f").onclick=function(){
    location.hash="#f";
}

draw();
window.onhashchange=function(){
    draw();
}

function analyseHash(hash){
    return hash.substring(1,hash.length);
}
function draw(){
    let id=analyseHash(location.hash);
    if(id=="a"||id=="b"||id=="c")
    document.getElementById("contABC").innerHTML="contABC "+id;
    else if(id=="d"||id=="e"||id=="f")
    document.getElementById("contDEF").innerHTML="contDEF "+id;

}