# JavaScript实现函数重载

> **函数重载**（function overloading），是 Ada、C++、C#、D、Java等编程语言中具有的一项特性，这项特性允许创建数项名称相同但输入输出类型或个数不同的子程序，它可以简单地称为一个单独功能可以执行多项任务的能力。[维基百科-函数重载](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E9%87%8D%E8%BD%BD)

函数重载是强类型语言的特性，虽然 js 是弱类型语言，我们可以通过一些方法实现函数重载。

## 场景

班级中有很多学生，通过姓名要找到某个学生或多个学生时，同一个方法传入的参数个数的不同去查找同学。

```js
const classRoom = {
    students: ['武大', '郎二', '张三', '张起灵', '李四', '王五'],
}

classRoom.find(); // ['武大', '郎二', '张三', '张起灵', '李四', '王五'];
classRoom.find('张'); // ['张三', '张起灵'];
classRoom.find('张', '三'); // ['张三'];
```

- `find()`方法不传入参数时，输出班级所有学生。
- `find()`方法传一个参数（姓），输入班级相同姓的学生。
- `find()`方法传两个个参数（姓，名），输入班级相同姓名的学生。

## 第一种

我们使用 arguments 和 switch 实现重载。

```js
classRoom.find = function() {
    switch(arguments.length) {
        case 0:
            return this.students;
        case 1:
            return this.students.filter(student => {
                let surname = arguments[0];
                return ~student.indexOf(surname);
            });
        case 2:
            return this.students.filter(student => {
                let fullName = arguments.join('');
                return ~student.indexOf(fullName);
            });
    }
}

console.log(classRoom.find()); // [ '武大', '郎二', '张三', '张起灵', '李四', '王五' ]
console.log(classRoom.find('张')); // [ '张三', '张起灵' ]
console.log(classRoom.find('三')); // [ '张三' ]
```

## 第二种

使用 arguments 和闭包。

```js
function addMethod(target, name, fn) {
    const old = target[name];

    target[name] = function() {
        if (fn.length === arguments.length) {
            return fn.apply(this, arguments);
        } else if (typeof old === 'function') {
            return old.apply(this, arguments);
        }
    }
}

addMethod(classRoom, 'find', function() {
    return this.students;
});

addMethod(classRoom, 'find', function(surname) {
    return this.students.filter(student => {
        return ~student.indexOf(surname);
    });
});

addMethod(classRoom, 'find', function(surname, personalName) {
    return this.students.filter(student => {
        return ~student.indexOf(surname + personalName);
    });
});

console.log(classRoom.find()); // [ '武大', '郎二', '张三', '张起灵', '李四', '王五' ]
console.log(classRoom.find('张')); // [ '张三', '张起灵' ]
console.log(classRoom.find('三')); // [ '张三' ]
```

调用`addMethod`时会将匿名函数指向`classRoom`中的`find`，由于`classRoom`是全局变量所以`addMethod`执行完毕后其中的`old`、`fn`仍然在被引用，这里产生闭包。

所以在每次调用`addMethod`时，都有一个执行环境保存着当时的`old`以及`fn`，所以在使用`find`方法是可以找到`fn`，实现重载。

需要注意的是：
- 这个重载适用于不同数量的参数，不区分类型、参数名或其它。
- 会有一些函数调用的开销。

## 其它

在 TypeScript 中加入了类型，它自带函数重载。[ts函数](https://www.tslang.cn/docs/handbook/functions.html)