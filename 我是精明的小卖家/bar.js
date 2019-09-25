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
var svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); 
svg.setAttribute("height",'500px'); 
svg.setAttribute("width",'500px'); 
var max=Math.max.apply(null,sourceData[0].sale);
for(let i=0;i<sourceData[0].sale.length;i++){
    let rect=document.createElementNS('http://www.w3.org/2000/svg','rect'); 
    rect.setAttribute("id","rect"); 
    rect.setAttribute("x",60+i*30); 
    rect.setAttribute("y",max-sourceData[0].sale[i]); 
    rect.setAttribute("width",18); 
    rect.setAttribute("height",sourceData[0].sale[i]); 
    rect.setAttribute("fill",'#9ACEE6'); 
    svg.appendChild(rect); 
}
var bar=document.getElementById("bar-charts"); 
bar.appendChild(svg); 
