# 原型模式Prototype

>  用原型实例指定创建对象的种类，并且通过拷贝这个原型来创建新的对象。

我们能够将原型模式认作是基于原型的继承中，我们创建作为其它对象的对象。  
原型对象自身被当做构造器创建的每一个对象的蓝本高效使用者。  
如果构造器函数使用的原型包含例如叫做 name 的属性，那么每一个通过同一个构造器创建的对象都将拥有这个相同的属性。

在现在存（非JavaScript）语法中重新看一看对这个模式的定义，我们也许可以再一次发现对类的引用。  
真是的情况是那种原型继承避免了完全使用类。理论上既不是一个“定义的”对象，也不是一个核心对象。  
我们可以简单地创建现存函数型对象的拷贝。

使用原型模式的好处之一就是，我们在 JavaScript 提供的原生能力之上工作的，而不是 JavaScript 视图模仿其它语言的特性。  
而对于其它的模式来说，情况并非如此。

这一模式不仅仅是实现继承的一种简单方式，它顺便还能够带来一点性能上的提升：**当定义对象的一个方法时，它们都是使用引用创建的（因此所有的子对象都指向同一个函数），而不是创建属于它们的单独拷贝。**

对于那些有趣的，真正原型的继承，像 ECMAScript5 标准中所定义的那样，需要使用`Object.crate`。  
为了提醒我们自己，`Object.create`创建了一个拥有特定原型的对象，并且也包含选项式的特定属性。

我们可以在下面的示例中看到对这个的展示：
```js
var myCar = {
    name: 'BMW',
    drive: function() {
        console.log('I`m driving!');
    },
    panic: function() {
        console.log('行车不规范，亲人两行泪！')；
    }
}

// 使用 Object.create 来实例化新车
var yourCar = Object.create(myCar);
console.log(yourCar.name);
```

`Object.create`也允许我们简单的继承的概念，比如对象能够直接继承自其它对象，这种不同的继承。  
我们早先也看到`Object.create`允许我们使用第二个参数来初始化对象属性。

```js
var vehicle = {
    getModel: function() {
        console.log("The model of this vehicle is.." + this.model);
    }
}

var car = object.create(vehicle, {
    id: {
        value: 99,
        enumerable: true,
    },
    model: {
        value: 'BMW',
        enumerable: true
    }
});
```

这里的属性可以被`Object.create`的第二个参数来初始化，使用一种类似于我们前面看到的`Object.defineProperties`和`Object.defineProperties`方法所使用语法的对象字面值。

在枚举对象的属性，和在一个`hasOwnProperty()`检查中封装循环的内容时，原型关系会造成麻烦，这一事实值得我们关注的。

如果我们希望在不直接使用`Object.create`的前提下实现原型模式，我们可以像下面这样，按照上面的示例，模拟这一模式：

```js
var vehiclePrototype = {
    init: function(varModel) {
        this.model = carModel;
    },
    getModel: function() {
        console.log('The model of this vehicle is..' + this.model);
    }
};

function vehicle(model) {
    function Fn() {};
    Fn.protytype = vehiclePrototype;

    var fn = new Fn();
    fn.init(model);
    return fn;
}

var car = vehicle('BMW');
var.getModel();
```

需要注意的是**这种可选的方式不允许用户使用相同的方式定义只读属性（因为如果不小心的话 vehicle 原型可能会被改变）。**

原型模式的最后一种可选实现可以像下面这样：

```js
var beget = (function() {
    function Fn() {};

    return function(proto) {
        Fn.prototype = proto;
        return new Fn();
    };
})();
```

可以从 vehicle 函数引用这个方法，注意，这里的那个 vehicle 正是在模拟着构造器，因为原型模式将一个对象链接到一个原型之外没有任何初始化的概念。