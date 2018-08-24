所有实例托管在github, [传送门]: (./reactDemo)

## 核心内容
react的核心内容其实不多, 主要是下面这些:
- 虚拟dom对象 (Virtual Dom)
- 虚拟dom差异化算法 (diff 算法)
- 单项数据流 (Data Flow)
- 组件生命周期
- 事件处理
下面我们将一点一点来实现一个简易版的react.

## Hello World
```js
<script type="text/javascript">
    React.render('Hello world', document.getElementById('app'))
</script>
```
想要让这一行代码把`Hello World`渲染到对应的dom中. 我们需要做些什么:
```js
// component类, 用来表示文本在渲染, 更新, 删除时做什么
function ReactDOMTextComponent(text) {
    // 存储当前的字符串
    this._currentElement = '' + text;

    // 标识当前的component
    this._rootNodeID = null;
};

// component渲染时生成的dom结构
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeID = rootID;
    return '<span data-reactid="' + rootID + '">' + this._currentElement + '</span>';
};

// component工厂函数 返回一个component实例
function instantiateReactComponent(node) {
    if(typeof node === 'string' || typeof node === 'number') {
        return new ReactDOMTextComponent(node)
    }
};

React = {
    nextReactRootIndex: 0,
    render: function(element, container) {
        var componentInstance = instantiateReactComponent(element);
        var markup = componentInstance.mountComponent(React.nextReactRootIndex++);

        $(container).html(markup);

        // 触发完成mount的事件
        $(document).trigger('mountReady');
    }
};
```
上面代码分为三个部分:
1. React.render 作为入口负责调用渲染
2. 引入了component类的概念, ReactDOMTextComponent是一个component类的定义, 定义对于这种 _文本类型_ 的节点, 在渲染、更新、删除时应该做什么操作, 现在暂时只用到 **渲染**.
3. instantiateReactComponent用来根据element的类型 (暂时只有`string`类型), 返回一个component的实例. 也就是类工厂

nextReactRootIndex作为每一个component的标识id, 不断加1, 确保唯一性. 这样我们以后可以通过这个标识找到这个元素.

逻辑分为几个部分, 主要的渲染逻辑放在了具体的component类去定义. React.render负责调度整个流程, 这里是调用instantiateReactComponent生成一个对应component类型的实例对象, 然后低啊用此对象的mountComponent获取生成的内容. 最后写入对应的app节点中.

至此一个最简单Hello World就OK了, 继续往下进行吧.

## 引入element
