// 显然这是一个无关IE（高级IE除外）的话题，尽管如此，有兴趣的同学还是一起来认识一下ECMAScript5标准中getter和setter的实现。
//在一个对象中，操作其中的属性或方法，通常运用最多的就是读（引用）和写了，譬如说o.get，这就是一个读的操作，而o.set = 1则是一个写的操作。
//事实上在除ie外最新主流浏览器的实现中，任何一个对象的键值都可以被getter和setter方法所取代，这被称之为“存取器属性”。
// 毫无疑问，getter负责查询值，它不带任何参数，setter则负责设置键值，值是以参数的形式传递，在他的函数体中，一切的return都是无效的。
//和普通属性不同的是，存储器属性在只声明了get或set时，对于读和写是两者不可兼得的，当它只拥有了getter方法，那么它仅仅只读，同样的，当它只有setter方法，那么您读到的永远都是undefined。
//如何声明对象存储器属性呢？ 最快捷的途径就是利用对象字面量的语法来写了，请看下述一段代码：

// var oo = {
//     get sex() {
//         if (this.sexx) {
//             return this.sexx;
//         } else {
//             return 'man';
//         }
//     },
//     set sex(val) {
//         this.sexx = val;
//     }
// };
// //噢，他如此包容，乃至于人们改变他的性别，他也接受
// oo.sex = 'woman';
// console.log(oo.sex); //结果woman

var obj = {
    str: '廖修亭',
    get val() {
        if (this.str) {
            return this.str
        } else {
            return this.str = 'str'
        }
    },
    set val(vl) {
        this.str = vl
    }
}
obj.val = 'lyx'
console.log(obj.val)
console.log(obj.str)
console.log(Object)


// 就是将方法的key作为变量传入使其更灵活
// get 和 set 关键字都要写在对象内,注意关键字后面没有引号
var _key = 'symb'

var Obj = {
        name: [],
        set [_key](ev) {
            console.log(_key, 'key', ev)
            this.name.push(ev)
        },
        get [_key]() {
            return this.name
        }
    }
    // 试验
Obj.symb = 'shimh'
console.log(Obj.symb) // ["shimh"]