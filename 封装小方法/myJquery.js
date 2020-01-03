(function() {
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector);
  };
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    /**
     * 获取jQuery的对象
     */
    init: function(selector) {
      this.length = 0; //设置默认的length为0
      if (!selector) {
        return this;
      }
      if (typeof selector === "string") {
        //判断id
        if (
          selector[0] === "#" &&
          this.strNum(selector, "#") === 1 &&
          this.strNum(selector, " ") === 0
        ) {
          var dom = document.getElementById(selector.slice(1));
          if (dom) {
            this[0] = dom;
            this.length = 1;
          }
        } else {
          var eles = document.querySelectorAll(selector);
          for (var i = 0; i < eles.length; i++) {
            Array.prototype.push.call(this, eles[i]);
          }
        }
      } else if (selector.nodeType) {
        //selector是DOM节点
        this[0] = selector;
        this.length = 1;
      } else if (selector instanceof jQuery) {
        //selector是jQuery的实例
        return selector;
      } else {
        //防止出错
        return this;
      }
    },
    /**
     * 遍历当前实例对象
     */
    each: function(fn) {
      for (var i = 0; i < this.length; i++) {
        fn.call(this[i], i, this[i]);
      }
      return this;
    },
    /**
     * 隐藏
     */
    hide: function() {
      this.each(function(key, value) {
        value.style.display = "none";
      });
      return this;
    },
    /**
     * 显示
     */
    show: function() {
      this.each(function(key, value) {
        value.style.display = "block";
      });
      return this;
    },
    /**
     * 点击事件
     */
    click: function(fn) {
      this.each(function(key, value) {
        value.onclick = fn;
      });
      return this;
    },
    /**
     * css方法
     */
    css: function(propName, propValue) {
      if (!propValue) {
        //只有一个参数
        if (typeof propName === "object") {
          //设置多个属性  propName = {"color":"red","width":"100px"}
          this.each(function(key, value) {
            //value.style.color = "red";
            //value.style.width = "100px"
            for (var i in propName) {
              value.style[i] = propName[i];
            }
          });
        } else {
          //获取第一个元素的对应的属性值 propName = "color"
          return getComputedStyle(this[0])[propName];
        }
        return this;
      } else {
        //有两个参数
        this.each(function(key, value) {
          value.style[propName] = propValue;
        });
      }
      return this;
    },
    /**
     * 返回第几个dom对象
     * @params  索引、下标
     */
    get: function(index) {
      return this[index];
    },
    html: function(contents) {
      if (!contents) {
        return this[0].innerHTML;
      } else {
        this.each(function(key, value) {
          value.innerHTML = contents;
        });
      }
      return this;
    },
    text: function(contents) {
      if (!contents) {
        return this[0].innerText;
      } else {
        this.each(function(key, value) {
          value.innerText = contents;
        });
      }
      return this;
    },
    val: function(contents) {
      if (!contents) {
        return this[0].value;
      } else {
        this.each(function(i, ele) {
          ele.value = contents;
        });
      }
      return this;
    },
    attr: function(attrName, attrValue) {
      if (!attrValue) {
        //没有设置属性值，则返回第一个元素的属性值
        return this[0].getAttribute(attrName);
      } else {
        this.each(function(i, ele) {
          ele.setAttribute(attrName, attrValue);
        });
      }
      return this;
    },
    /**
     * 返回的是第几个jQuery对象
     */
    eq: function(index) {
      return jQuery(this[index]);
    },
    /**
     * 判断字符在字符串中出现的次数
     */
    strNum: function(str, char) {
      var num = 0;
      for (var i = 0; i < str.length; i++) {
        if (str[i] === char) {
          num++;
        }
      }
      return num;
    }
  };
  jQuery.fn.init.prototype = jQuery.fn;
  window.jQuery = window.$ = jQuery;
})();
