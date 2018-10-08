> 最近在写一个由`node koa2 mongodb`创建的一个后台接口服务的这么一个项目, 可能会遇到各式各样的问题, 故而以此来记录.

## mongoose创建collection时自动加入s
在对`db`做`CURD`时这里使用`mongoose`. 集成了一些方法, 调用起来方便快捷.
使用`collection`时一般会这样调用, `model`中:
```js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = ({
    name: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
```

给`User`添加一些数据后
```js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = ({
    name: String,
    password: String
});

const userController = mongoose.model('User', userSchema);

// 添加数据
const res = new userController({ name: 'admin', password: '123456'}).save();
```
执行成功后在数据库中查看
```
> user 你的数据库名
> show collections
users
```
只能查看到有`users`这个文档, 而不是想象中的`user`.

这里的问题出在创建`model`时, 在`mongoose.model()`这里可以传入三个参数, 
1. modelName: 模型的集合名.
2. Schema: 结构对象, 定义类型/默认值/验证/索引等.
3. collectionName: collection的名称, 不传时默认取model的第一个参数加s.

到这里也就分析出症结所在, 只需要再加入一个参数即可.
