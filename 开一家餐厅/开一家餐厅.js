function Restaurant(obj){
    this.cash=obj.cash;
    this.seatNum=obj.seats;
    this.staff=obj.staff;
    this.hire=function(somebody){
        this.staff.push(somebody);
        console.log("招聘员工");
    }
    this.fire=function(somebody){
        let index=this.staff.indexOf(somebody);
        if(index>-1)
            this.staff.splice(index,1);
        console.log("解雇员工");
    }
}
function Clerk(args){
    this.id=args.id || '001';
    this.name=args.name || 'Mike';
    this.salary=args.salary || 100;
}

function sleepPromise(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

//单例模式的厨师
var Cook=(function(){
    var instance=null;
    function createCook(args){
        var args=new Clerk(args);
        this.id=args.id;
        this.name=args.name;
        this.salary=args.salary;
        document.getElementById("cookId").innerHTML='我是厨师'+this.name;
        document.getElementById("cookStatus").innerHTML='空闲';
        //console.log('我是厨师'+this.name);
    }
    createCook.prototype = {
        constructor:createCook,
        makeFood: async function(dish){
            var p = new Promise(async function(resolve,reject){
                document.getElementById("cookStatus").innerHTML='我正在做'+dish.name;
                await sleepPromise(dish.time*2000)
                let str='我做好了'+dish.name+'!';
                document.getElementById("cookStatus").innerHTML=str;
                resolve(dish);
            })
            return p;
        },
    };
    return {
        name:'createCook',
        getInstance:function(args){
            if(instance===null){
                instance=new createCook(args);
            }
            return instance;
        }
    };
})();

//单例模式的服务员
var Waiter=(function(){
    var instance=null;
    function createWaiter(args){
        var args=new Clerk(args);
        this.id=args.id;
        this.name=args.name;
        this.salary=args.salary;
        document.getElementById("waiterId").innerHTML='我是服务员'+this.name;
    }
    createWaiter.prototype = {
        constructor:createWaiter,
        orderDishes:function(dishes){
            var p=new Promise(function(resolve,reject){
                setTimeout(function(){
                    let str='厨师你好，我是服务员'+this.name+'，客人点了';
                    for(let i in dishes){
                        str+=dishes[i].name+'、';
                        document.getElementById("waiterStatus").innerHTML=str;
                    }
                    resolve(dishes);
                },500);
            })
            return p;
        },

        serveDishes:function(dish){
            let str='顾客你好，我是服务员'+this.name+'，厨师做好了'+dish.name+'!';
            document.getElementById("waiterStatus").innerHTML=str;
        },

        moveTo:function(destination){
            return new Promise(function(resolve,reject){
                if(isObjEqual(destination,new Custmer)){
                    setTimeout(()=>{
                        let top=(destination.id-1)*220+10;
                        document.getElementsByClassName('waiter')[0].style.left='300px';
                        document.getElementsByClassName('waiter')[0].style.top=top+'px';
                        resolve();
                    },500);   
                }
                else if(isObjEqual(destination,Cook.getInstance())){
                    setTimeout(()=>{
                        document.getElementsByClassName('waiter')[0].style.left='180px';
                        document.getElementsByClassName('waiter')[0].style.top='10px';
                        resolve();
                    },500);
                }        
            })
        },
        pay:function(){
            document.getElementById("waiterStatus").innerHTML='收到付款！';
        }
    };
    return {
        name:'createWaiter',
        getInstance:function(args){
            if(instance===null){
                instance=new createWaiter(args);
            }
            return instance;
        }
    };
})();

function Custmer(id){
    this.id=id;
    this.customerMenu=[];
    var dishes=[];
    this.order=function(menu){
        //假设顾客最多点三个菜
        //产生顾客点菜数量的随机数
        var that=this;
        var p=new Promise(function(resolve,reject){
            document.getElementById('custmer'+id+'Status').innerHTML='点菜中……';
            setTimeout(function(){
                for(let i=0;i<4;i++){
                    //获得所点菜品
                    let dish=menu[parseInt(Math.random()*3)];
                    if(dishes.indexOf(dish)<=-1){
                        dishes.push(dish);
                        that.customerMenu.push(dish);
                    }
                }
                var str='';
                for(let i in dishes){
                    str+='点菜: '+dishes[i].name+'</br>';
                } 
                document.getElementById('custmer'+id+'Status').innerHTML=str; 

                for(let i in dishes){
                    document.getElementById('menu'+id).innerHTML+=dishes[i].name+'<br>';
                }
                resolve(dishes);      
            },1000);
        })
        return p;
    };

    this.eat=function(dish){
        var that=this;
        document.getElementById('custmer'+id+'Status').innerHTML='顾客正在吃'+dish.name;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.getElementById('custmer'+id+'Status').innerHTML='顾客吃完了'+dish.name;
                let index=that.customerMenu.indexOf(dish)
                if(index>-1)
                    that.customerMenu.splice(index,1);

                resolve()
            }, 5000)
        })
    }
    this.pay=function(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.getElementById('custmer'+id+'Status').innerHTML='顾客付款！';
                resolve()
            }, 500)
        })
    }
}
function Dishes(name,cost,price){
    this.name=name;
    this.cost=cost;
    this.price=price;
}

var menu=[
    {name:'米饭',time:1},
    {name:'馒头',time:2},
    {name:'鱼香肉丝',time:3},
    {name:'宫保鸡丁',time:4}
];

function isObjEqual(o1,o2){
	var props1 = Object.getOwnPropertyNames(o1);
    var props2 = Object.getOwnPropertyNames(o2);
    if (props1.length != props2.length) {
        return false;
    }
    for (var i = 0,max = props1.length; i < max; i++) {
        if (props1[i] !== props2[i]) {
            return false;
        }
    }
    return true;
}


//产生一个服务员、一个厨师
var waiter=Waiter.getInstance({id:'001',name:'Lucy',salary:123});
var cook=Cook.getInstance({id:'002',name:'Mike',salary:456});

//顾客入座
var custmer1=new Custmer(001);
var custmer2=new Custmer(002);
var custmer3=new Custmer(003);

var cookMenuArr=[];//用于存放厨师待做的菜
var strArr=[];//用于存放厨师的菜单

document.getElementById('custmer1Id').innerHTML='我是顾客'+custmer1.id;
document.getElementById('custmer2Id').innerHTML='我是顾客'+custmer2.id;
document.getElementById('custmer3Id').innerHTML='我是顾客'+custmer3.id;

Serve()
    .then(async function(result){
        for(let i in result){
            const data = await cook.makeFood(result[i]);
            //发布通知
            pubsub.publish(data.name);  
        }
    });

async function Serve(){
    await serve(custmer1,cook);
    await serve(custmer2,cook);
    return serve(custmer3,cook);
}

async function serve(custmer,cook){
    await waiter.moveTo(custmer);
    let cookMenu=await custmer.order(menu);
    for(let i in cookMenu){
        pubsub.subscribe(cookMenu[i].name, custmer,async function (data,custmer) {
            await waiter.moveTo(custmer);
            Promise.resolve(data)
                .then(async function(data){
                    waiter.serveDishes(data);
                    waiter.moveTo(cook);
                    await custmer.eat(data);
                    if(custmer.customerMenu.length<=0){
                        await waiter.moveTo(custmer);
                        await custmer.pay();
                        waiter.pay();
                    }
                })
        });
    
    }
    await waiter.moveTo(cook);
    cookMenu=await waiter.orderDishes(cookMenu);
    for(let i in cookMenu){
        if(cookMenuArr.indexOf(cookMenu[i])<=-1)
            cookMenuArr.push(cookMenu[i]);
    }
    for(let i in cookMenuArr)
        strArr[i]=cookMenuArr[i].name;

    document.getElementById('cookMenu').innerHTML='菜单：'+strArr;
    return new Promise((resolve,reject)=>{
        resolve(cookMenuArr);
    })
}

/*观察者模式 */
var pubsub = {};// 定义发布者
(function (q) {

    var list = []; //回调函数存放的数组，也就是记录有多少人订阅了我们东西

    // 发布消息,遍历订阅者
    q.publish = function (type) {
        
        // 如果没有人订阅，直接返回
        if (!list[type]) {

            return false;
        }

        setTimeout(function () {
            var subscribers = list[type],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                let i=0;
                for(i in menu){
                    if(type==menu[i].name)
                        break;
                }
                // 将内容注入到订阅者那里
                subscribers[len].func(menu[i],subscribers[len].token);
            }
        }, 0);

        return true;

    };
    //订阅方法，由订阅者来执行
    q.subscribe = function (type, custmer, func) {
        // 如果之前没有订阅过
        if (!list[type]) {
            list[type] = [];
        }

        // token相当于订阅者的id，这样的话如果退订，我们就可以针对它来知道是谁退订了。
        var token = custmer;
        // 每订阅一个，就把它存入到我们的数组中去
        list[type].push({
            token: custmer,
            func: func
        });
        return token;
    };
    //退订方法
    q.unsubscribe = function (token) {
        for (var m in list) {
            if (list[m]) {
                for (var i = 0, j = list[m].length; i < j; i++) {
                    if (list[m][i].token === token) {
                        list[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };

} (pubsub));
