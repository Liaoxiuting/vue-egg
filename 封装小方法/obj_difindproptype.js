var data = {name: 'kindeng'};
observe(data);
data.name = 'dmq'; 

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function(key) {
        console.log(key,'key--forEach') //name key--forEach
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, val) {
    console.log(data,'data--defineReactive')//{name: "kindeng"} "data--defineReactive"
    console.log(key,'key--defineReactive')//name key--defineReactive
    console.log(val,'val--defineReactive')//kindeng val--defineReactive
    observe(val); 
    var dep = new Dep();
    Object.defineProperty(data, key, {
        
        enumerable: true, 
        configurable: false, 
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log(val, ' val-->newVal ', newVal);//kindeng  val-->newVal  dmq
            val = newVal;
            dep.notify(); // 通知所有订阅者
        }
    });
}



// 


function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};