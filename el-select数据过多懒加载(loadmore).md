# el-select数据过多处理方式

在日常项目中`el-select`组件的使用频率是非常之高的. 当数据过多时渲染时间非常长, 这里提供几个处理方式.

## 远程搜索

组件提供了远程搜索方式, 也就是按照你输入的结果匹配选项.

官网提供了[参考示例](https://jsfiddle.net/api/post/library/pure/); 这里不加赘述.

## 下拉懒加载loadMore

下拉懒加载, 当select滚动到底部时, 你再去请求一部分数据, 加入到当前数据中.

某组件中:
```js
<template>
    <el-select
        v-model="value"
        placeholder="请选择"
        filterable
        multiple
        v-el-select-loadmore="loadmore"
    >
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
        </el-option>
    </el-select>
</template>

export default {
    directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    /**
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
    },
    data() {
        return {
            value: '',
            options: [],
            formData: {
                pageIndex: 1,
                pageSize: 20,
            }
        };
    },
    mounted() {
        this.getList(this.formData);
    },
    methods: {
        loadmore() {
            this.formData.pageIndex++;
            this.getList(this.formData);
        },
        getList(formData) {
            // 这里是接口请求数据, 带分页条件
            const _res = [1, 2, 3]; // 请求得到的数据
            this.options = [...this.options, ..._res];
        }
    }
};
```

这样就做到了滚动懒加载, 具体细节在应用时修改.

## 问题

这样渲染问题解决了, 随之会出现一个问题, 就是当你的`value`为选中的数据后, 分页数大的数据.
当页数小时, `options`数据中没有当前`value`的那一个, `value`就会显示为得到的id.

当你选中后你要保存下来当前的`id`以及`lable`, 下次过来时, 带入当前组件, 手动放在`options`中,
这样就解决了这个问题.