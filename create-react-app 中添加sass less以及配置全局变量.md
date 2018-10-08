由于create-react-app中没有内置sass或者less这种预编译的工具, 这篇文章即为如何添加sass或者less工具.

## 暴露`webpack`配置
首先全局下载create-react-app, 创建一个项目, 然后暴露出webpack的配置.

```
npm install -g create-react-app
create-react-app my-app
cd my-app
npm install
npm run eject
```
这里需要注意的是***npm run eject***这个命令则是暴露出webpack配置的命令.

## 添加`sass`
然后安装sass-loader.

```
npm i sass-loader node-sass --save-dev
```
找到config文件中的webpack.config.dev.js 中找到 

```js
rules: []
```
在它里面已经配置了很多loader包括css的, 找到css的loader:
```js
{
    test: /\.css$/,
    use: [
        require.resolve('style-loader'),
        {
        loader: require.resolve('css-loader'),
        options: {
            importLoaders: 1,
        },
        },
        {
        loader: require.resolve('postcss-loader'),
        options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
            ],
        },
        },
    ],
},
```
就是这段代码 它已经给做了postcss后处理配置好了, postcss这里就不说了,不了解的可以google一下.
在这段代码下面添加一段

```js
{
    test: /\.scss$/,
    use: [
        {loader: require.resolve('style-loader')},
        {loader: require.resolve('css-loader')},
        {
        loader: require.resolve('postcss-loader'),
        options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
            ],
        },
        },
        require.resolve('sass-loader')
    ],
},
```
这样你dev跑起来的时候scss文件就可以编译过去了 而且还做了后处理, 也不用自己去加一个前缀什么的.需要注意的是在build时不会去编译 如果想build时也编译的话. 在同级目录中找到webpack.config.prod.js, 在它里面找到css的loader, 把编译sass的loader放入相同的位置即可.

## 添加`sass`全局变量
在我们使用`sass`时, 变量可以说是离不开的. 我们在使用时每个需要用到的组件都需要去引入, 这样很麻烦.

这时就用到了`sass-resources-loader`, 它可以添加全局变量等.

首先下载依赖包`npm i sass-resources-loader --save-dev`.
在上面添加`scss`规则的`loaders`中加入`sass-resources-loader`:
```js
...
{
    test: /\.scss$/,
    use: [
        {loader: require.resolve('style-loader')},
        {loader: require.resolve('css-loader')},
        {
        loader: require.resolve('postcss-loader'),
        options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
            ],
        },
        },
        require.resolve('sass-loader'),
        {
            loader: require.resolve('sass-resources-loader'),
            options: {
                resources: './src/assets/css/theme.scss'
            }
        }
    ],
},
...
```
这样`theme.scss`就成为不需要引入就可以使用的全局变量了.