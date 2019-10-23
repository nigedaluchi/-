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
var page=0;
document.getElementById("region-radio-wrapper").onchange=function(){changeRegionAndProduct()};
document.getElementById("product-radio-wrapper").onchange=function(){changeRegionAndProduct()};

function changeRegionAndProduct(){
    console.log("发生复选框改变")
    let regions=document.getElementById("region-radio-wrapper").getElementsByTagName("input");
    let products=document.getElementById("product-radio-wrapper").getElementsByTagName("input");

    let selectData=getData(regions,products);
    let checkboxResult=getCheckBox(regions,products);
    drawTable(selectData);  
    let str="?page="+page;
    page++;
    window.history.pushState({status: checkboxResult} ,'' ,str);

}
window.addEventListener("popstate", function(e) { 
    let regions=document.getElementById("region-radio-wrapper").getElementsByTagName("input");
    let products=document.getElementById("product-radio-wrapper").getElementsByTagName("input");

    for(let i=0;i<history.state.status.regions.length;i++){
        if(history.state.status.regions[i]==1)
            regions[i].checked=true;
        else
            regions[i].checked=false;
    }
    for(let i=0;i<history.state.status.products.length;i++){
        if(history.state.status.products[i]==1)
            products[i].checked=true;
        else
            products[i].checked=false;
    }
    console.log(history.state.status)
    console.log(regions,products);
    let selectData=getData(regions,products);
    drawTable(selectData);  
    //changeRegionAndProduct();
}, false);
function getCheckBox(regions,products){
    let regionArr=new Array(3),productArr=new Array(3);
    regionArr.fill(0);
    productArr.fill(0);
    for(let i=0;i<regions.length;i++){
        if(regions[i].checked==true)
            regionArr[i]=1;
    }
    for(let i=0;i<products.length;i++){
        if(products[i].checked==true)
            productArr[i]=1;
    }
    let checkboxResult={
        regions:regionArr,
        products:productArr
    }
    console.log(checkboxResult)
    return checkboxResult;
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
