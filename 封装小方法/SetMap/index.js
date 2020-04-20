// ----------Set  and   Map----------//

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 88, 88, 8, 8, 8, 8, 8, 88, 8, 8, 9, 10];

// Set 方法
// Set的属性：

// size：返回集合所包含元素的数量

// Set的方法：

// 操作方法

// add(value)：向集合添加一个新的项
// delete(value)：从集合中移除一个值
// has(value)：如果值在集合中存在，返回true,否则false
// clear(): 移除集合里所有的项

// 遍历方法

// keys()：返回一个包含集合中所有键的数组
// values()：返回一个包含集合中所有值的数组
// entries：返回一个包含集合中所有键值对的数组(感觉没什么用就不实现了)
// forEach()：用于对集合成员执行某种操作，没有返回值

var a = new Set(arr)

console.log(a, 'a') //Set(11) {1, 2, 3, 4, 5, …} "a"
console.log([...a], 'a') //[1, 2, 3, 4, 5, 6, 7, 8, 88, 9, 10] "a"

a.add(11) //add方法
console.log(a, 'a')
console.log([...a], 'a') //[1, 2, 3, 4, 5, 6, 7, 8, 88, 9, 10,11] "a"

a.delete(11) //delete 方法
console.log(a, 'a')
console.log([...a], 'a') //[1, 2, 3, 4, 5, 6, 7, 8, 88, 9, 10] "a"

a.has(11) ///has 方法
console.log(a.has(10), 'a') //true "a"
console.log([...a], 'a') //[1, 2, 3, 4, 5, 6, 7, 8, 88, 9, 10] "a"

//Map 方法
// 属性：

// size：返回字典所包含的元素个数

// 操作方法：

// set(key, val): 向字典中添加新元素
// get(key):通过键值查找特定的数值并返回
// has(key):如果键存在字典中返回true,否则false
// delete(key): 通过键值从字典中移除对应的数据
// clear():将这个字典中的所有元素删除

// 遍历方法：

// keys():将字典中包含的所有键名以数组形式返回
// values():将字典中包含的所有数值以数组形式返回
// forEach()：遍历字典的所有成员
var b = new Map()
console.log(b, 'b') //  Map(0) {} "b"
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
        //  set方法
    b.set(i, arr[i])
}
console.log(b, 'b') //   Map(22) {0 => 1, 1 => 2, 2 => 3, 3 => 4, 4 => 5, …} "b"
    //get 方法   
console.log(b.get(0), 'b.get(0)') // 1 "b.get(0)"
    //has方法
console.log(b.has(13)) //true
console.log(b.has(95)) //false