var sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
document.getElementById("save").onclick=function(){
    //遍历表格的数组
    let data=[];
    let tb=document.getElementById("tb");
    for(let i=1;i<tb.rows.length;i++){
        let obj={};
        obj.product="";
        obj.region="";
        obj.sale=[];
        if(tb.rows[i].cells.length==13){
            for(let j=i;j>=0;j--){
                if(tb.rows[j].cells.length==14){
                    obj.region=tb.rows[j].cells[1].innerText;
                    break;
                }
            }
        }
        else if(tb.rows[i].cells.length==14)
            obj.region=tb.rows[i].cells[1].innerText;
        obj.product=tb.rows[i].cells[0].innerText;

        for(let j=tb.rows[i].cells.length-1;j>=tb.rows[i].cells.length-12;j--){
            obj.sale.unshift(tb.rows[i].cells[j].innerText);
        }
        data.push(obj);
    }
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("sourceData", JSON.stringify(data));
        // Retrieve
        document.getElementById("showLocalStorage").innerHTML = localStorage.getItem("sourceData")[0].region;
    } 
    else {
        document.getElementById("showLocalStorage").innerHTML = "抱歉！您的浏览器不支持 Web Storage ...";
    }
}

genCheckBox(document.getElementById("region-radio-wrapper"),
[
    {name:1,value:"华北",text:"华北"},
    {name:1,value:"华南",text:"华南"},
    {name:1,value:"华东",text:"华东"},
]);
genCheckBox(document.getElementById("product-radio-wrapper"),
[
    {name:1,value:"手机",text:"手机"},
    {name:1,value:"笔记本",text:"笔记本"},
    {name:1,value:"智能音箱",text:"智能音箱"},
]);
document.getElementById("region-radio-wrapper").onchange=function(){
    let regions=document.getElementById("region-radio-wrapper").getElementsByTagName("input");
    let products=document.getElementById("product-radio-wrapper").getElementsByTagName("input");

    let selectData=getData(regions,products);
    drawTable(selectData);  
    drawLine();
}
document.getElementById("product-radio-wrapper").onchange=function(){
    let regions=document.getElementById("region-radio-wrapper").getElementsByTagName("input");
    let products=document.getElementById("product-radio-wrapper").getElementsByTagName("input");

    let selectData=getData(regions,products);
    drawTable(selectData);
    drawLine();  
}

function genCheckBox(CheckBox,CheckBoxArr){
    CheckBox.innerHTML="<input type='CheckBox' name=2 value='全选'>全选</input>";
    for(let i=0;i<CheckBoxArr.length;i++){
        CheckBox.innerHTML+="<input type='CheckBox' name="+CheckBoxArr[i].name
        +" value="+CheckBoxArr[i].value+">"+CheckBoxArr[i].text+"</input>";
    }
    CheckBox.onclick=function(event){
        if(event.target&&event.target.type=="checkbox"){
            let inputs=CheckBox.getElementsByTagName("input");
            if(event.target.name=="2"){
                for(let i=0;i<inputs.length;i++){
                    if(inputs[i].type=="checkbox"&&inputs[i].name=="1"){
                        inputs[i].checked=(event.target.checked);
                    }
                } 
            }
            else if(event.target.name=="1"){             
                let flag=1;
                for(let i=0;i<inputs.length;i++){
                    if(inputs[i].type=="checkbox"&&inputs[i].name=="1"&&inputs[i].checked==false){
                        flag=flag&0;
                    }
                } 
                if(flag==1)
                    inputs[0].checked=true;
            }
        }
    }
}
function getData(regions,products){
    let data=[];
    for(let j=0;j<regions.length;j++){
        if(regions[j].checked==true){
            for(let i=0;i<sourceData.length;i++){
                if(sourceData[i].region==regions[j].value){
                    for(let k=0;k<products.length;k++){
                        if(products[k].checked==true){
                            if(sourceData[i].product==products[k].value){
                                data.push(sourceData[i]);
                            }
                        }
                    }
                }
            }  
        }
    }
    return data;
}
function drawTable(data) {
    let tableHTML="<table id='tb' border='1'>"+"<tr>"+"<th>商品</th>"+"<th>地区</th>"+"<th>1月</th>"+"<th>2月</th>"+"<th>3月</th>"+"<th>4月</th>"+"<th>5月</th>"+"<th>6月</th>"+"<th>7月</th>"+"<th>8月</th>"+"<th>9月</th>"+"<th>10月</th>"+"<th>11月</th>"+"<th>12月</th>"+"</tr>";
    for(let i=0;i<data.length;i++){
        tableHTML+="<tr>";
        tableHTML+="<td>"+data[i].product+"</td>"+"<td>"+data[i].region+"</td>";
        for(let j=0;j<data[i].sale.length;j++)
            tableHTML+="<td>"+data[i].sale[j]+"</td>";
        tableHTML+="</tr>";
    }
    tableHTML+="</table>";
    document.getElementById("table-wrapper").innerHTML=tableHTML;
    tb=document.getElementById("tb");
    rowSpan(tb,0,1);
    document.getElementById("tb").addEventListener("mouseover",showBar,false);
    document.getElementById("tb").addEventListener("mouseover",showAndHideEdit,false);
    document.getElementById("save").removeAttribute("disabled");
;}

function rowSpan(tb,row,col){
    let lastValue="";
    let value="";
    let pos=1;
    for(let i=row;i<tb.rows.length;i++){
        value=tb.rows[i].cells[col].innerText;
        if(lastValue==value){
            tb.rows[i].deleteCell(col);
            tb.rows[i-pos].cells[col].rowSpan=tb.rows[i-pos].cells[col].rowSpan+1;
            pos++;
        }
        else{
            lastValue=value;
            pos=1;
        }
    }

}
function showBar(event){
    let tb=document.getElementById("tb");
    if(event.target.nodeName=="TD"){
        let index=event.target.parentNode.rowIndex;
        let data=[];
        if(index!=0){
            for(let i=tb.rows[index].cells.length-12;i<tb.rows[index].cells.length;i++){
                data.push(tb.rows[index].cells[i].innerText);
            }
        }
        drawBar(data);
    }
}
function drawBar(data){
    let svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); 
    svg=document.getElementById("bar-chart");
    svg.innerHTML="";
    svg.setAttribute("height",'500px'); 
    svg.setAttribute("width",'500px'); 
    let max=Math.max.apply(null,data);
    for(let i=0;i<sourceData[0].sale.length;i++){
        let rect=document.createElementNS('http://www.w3.org/2000/svg','rect'); 
        rect.setAttribute("id","rect"); 
        rect.setAttribute("x",60+i*30); 
        rect.setAttribute("y",max-data[i]); 
        rect.setAttribute("width",18); 
        rect.setAttribute("height",parseInt(data[i])); 
        rect.setAttribute("fill",'#9ACEE6'); 
        svg.appendChild(rect); 
    }
    let bar=document.getElementById("bar-charts"); 
    bar.appendChild(svg); 
}
function drawLine(){
    let tb=document.getElementById("tb");
    let data=[];
    for(let i=1;i<tb.rows.length;i++){
        let lineData=[];
        for(let j=tb.rows[i].cells.length-12;j<tb.rows[i].cells.length;j++){
            lineData.push(parseInt(tb.rows[i].cells[j].innerText));
        }
        data.push(lineData);
    }
    let canvas=document.getElementById("line-chart").getContext("2d");
    canvas.beginPath();
    let max=Math.max.apply(null,data[0]);
    max=710;
    let color=["#156945","#145789","#129543","#567325","#482642","#826246"];
    for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].length;j++){
            canvas.arc(60+30*j,max-data[i][j],3,0,2*Math.PI);   
            if(j==0)
                canvas.moveTo(60,max-data[i][j]);
            canvas.moveTo(60+30*(j-1),max-data[i][j-1]);
            canvas.lineTo(60+30*j,max-data[i][j]);
            canvas.strokeStyle=color[i];
            canvas.stroke();
            canvas.beginPath();
        }
    }
}
/*阻止冒泡事件函数*/
function isMouseLeaveOrEnter(e, handler) { 
    if (e.type != 'mouseout' && e.type != 'mouseover') 
        return false; 
    var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
    while (reltg && reltg != handler) 
        reltg = reltg.parentNode;
    return (reltg != handler);
}
    

function showAndHideEdit(){
    //event.target.onclick=function(){showEdit();}
    event.target.onmouseover = function(e) {
        e = e||window.event;
        if (isMouseLeaveOrEnter(e,this)) {
        　　//运行相关操作
            showEdit();
        }
    }

    //event.target.addEventListener("mouseenter",showEdit,false);
    event.target.addEventListener("mouseleave",hideEdit,false);
}
function showEdit(){
    if(event.target.nodeName=="TD"){
        let rowIndex=event.target.parentNode.rowIndex;
        let colIndex=event.target.cellIndex;
        let value= 50;
        document.getElementById("tb").rows[rowIndex].cells[colIndex].innerHTML=value+"<button id='edit'>编辑</button>";
        document.getElementById("edit").addEventListener('click', function(){editTd(value)}, false);
    }
}
function hideEdit(){
    if(event.target.nodeName=="TD"){
        let rowIndex=event.target.parentNode.rowIndex;
        let colIndex=event.target.cellIndex;
        document.getElementById("tb").rows[rowIndex].cells[colIndex].innerHTML="50";
    }
}
function editTd(value){
    console.log("edit")
    let rowIndex=event.target.parentNode.parentNode.rowIndex;
    let colIndex=event.target.parentNode.cellIndex;
    document.getElementById("tb").rows[rowIndex].cells[colIndex].innerHTML="<input id='editInput' value="+value+"></input><button id='ok'>确定</button><button id='cancel'>取消</button>";
    document.getElementById("ok").addEventListener("click",ok,false);
    document.getElementById("cancel").addEventListener("click",function(){cancel(value)},false);
}
function ok(){
    let inputValue=document.getElementById("editInput").value;
    if(event.target.nodeName=="BUTTON"){
        event.target.parentNode.innerHTML=inputValue;
    }
}
function cancel(value){
    if(event.target.nodeName=="BUTTON"){
        event.target.parentNode.innerHTML=value;
    }
}
