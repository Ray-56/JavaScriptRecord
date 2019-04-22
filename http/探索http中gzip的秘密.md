# http中gzip压缩的秘密

## 介绍

Gzip 是 GNUzip 的缩写，最早用于 UNIX 系统的文件压缩。[Gzip详细说明传送门](https://zh.wikipedia.org/wiki/Gzip)

http 协议上的 gzip 编码是一种用来改进 web 应用程序性能的技术，web 服务器和客户端必须共同支持 gzip。
目前主流的浏览器，Chrome、Firefox、IE 等都支持该协议。
常见的服务器如 Apache、Nginx、IIS 同样支持。

## 如何通讯

在`http/1.0`协议中关于服务器发送的数据可以配置一个`Content-Encoding`字段，这个字段用于说明数据的压缩方法：

```http
Content-Encoding: gzip
Content-Encoding: compress
Content-Encoding: deflate
```

客户端在接受到返回的数据后去检查对应字段的信息，然后根据对应的格式去做相应的解码。
客户端在请求时，可以用`Accept-Encoding`字段说明自己接受哪些压缩方法。

```http
Accept-Encoding: gzip, deflate
```

## 谁来压缩文件

看起来貌似这些是由服务端来做，我们在网上也看到很多例如`nginx`开启`gzip`配置之类的文章。
但是现在前端使用`webpack`作为打包工具时，其中可以配置插件`compression-webpack-plugin`可以让我们要生成的文件进行`gzip`压缩。
而我们应用在架构时候有可能也会在服务区和前端文件中放置一层`node`应用来进行接口鉴权和文件转发。`node`中我们数字的`express`框架中也有一个`compression`中间件可以开启`gzip`。
这么多都可以开启`gzip`，我们到底该用谁怎么用呢？

### 服务端响应请求时候压缩

其实`nginx`和`node`中压缩都是一样的，当我们点击网页发送一个请求的时候，我们的服务器会找到对应的文件，然后对文件进行压缩返回压缩后的内容（可以利用缓存减少压缩次数），并配置好我们上面提及到的`Content-Encoding`信息。
对于一些应用在架构时候并没有上游代理层，比如服务端就一层`node`就可以直接用自己本省的压缩插件对文件进行压缩。
如果上有配有`ngnix`转发处理层，最好交给`nginx`来处理这些，因为它们有专门为此构建的内容，可以更好的利用缓存并减小开销。

`nginx`开启`gzip`的配置：

```shell
# 开启gzip
gzip on;
# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;
# gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
gzip_comp_level 2;
# 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript;
```

### 应用构建时候压缩

既然服务端都可以做了为什么`webpack`在打包时还有这样一个压缩插件呢？
我们可以在上面的`nginx`配置中看到`gzip_comp_level 2;`这个配置项，上面也有注释写道`1-10`数字越大压缩效果越好，但是会耗费更多的 CPU 和时间。
我们压缩文件除了减少文件体积大小外，也是为了减少传输时间，如果我们把压缩等级配置的很高，每次请求需要压缩很久才能返回信息，这样就得不偿失了。
但是现在的`spa`引用既然文件都是打包生成的，那如果我们在打包的时候就直接生成高级压缩等级的文件，作为静态资源放在服务器上，接受到请求后直接把压缩的文件内容返回回去会怎么样呢？

`webpack`中`compression-webpack-plugin`插件就用来做这件事，配置起来也很简单只需要在装置中加入对应插件，简单配置如下：

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin');

webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
);
```

`webpack`打包完成后会额外生成`.gz`后缀的压缩文件：
![webpack_dist_gzip](../images/http/webpack_dist_gzip.jpg)

这个插件的压缩等级是多少呢？可以在源码中看到。下面为部分源码：

```js
...
const zlib = require('zlib');
this.options.algorithm = zlib[this.options.algorithm];
...
this.options.compressionOptions = {
    level: options.level || 9, // 默认压缩等级为9
    flush: options.flush
    ...
}
```

这里使用`zlib`库，而`zlib`分级来说默认为 6，最高级别就是`9 Best Compression(also zlib.Z_BEST_COMPRESSION)`，因为我们是在本地打包构建，所以我们使用最高级的压缩方式（即便多损耗时间）对我们来说也没有任何问题，在服务器上也不再需要压缩，只需要找到相应压缩好的文件即可。

## 服务端如何找到这些文件

在应用层面解决这个问题还是比较简单的，比如上述压缩文件会产生`index.css`、`index.js`的压缩文件，
在服务端简单判断这两个请求然后给予想对应的压缩文件。以`node`的`express`举例：

```js
...
app.get(['/index.js','/index.css'], function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  res.setHeader("Content-Type", generateType(req.path)) // 这里要根据请求文件设置content-type
  next()
})
```

上面我们可以给请求返回`gzip`压缩后的数据了，当然上面只是简单的例子，无法应用，但对于处理这方面需求已经有很多库。
`express`有`express-static-gzip`插件，`koa`的`koa-static`则默认支持对`gzip`文件检测，基本原理就是对请求先检测`.gz`后缀文件是否存在，再根据结果返回不同内容。

## 哪些文件可以被压缩

`gzip`可以压缩所有文件，但这不代表我们要对所有的文件进行压缩。
`.css`、`.js`文件会有很好的压缩效果，然而图片之类的则不会被压缩太多，因为它们已经内置了一些压缩。
还有一些文件（已经被压缩的文件`.zip`）再去压缩可能会让生成的文件体积更大。
还有已经很小的文件也没有压缩的必要。

## 参考

[探索HTTP传输中gzip压缩的秘密](https://segmentfault.com/a/1190000012800222)

[你真的了解 gzip 吗？](https://zhuanlan.zhihu.com/p/24764131)