// const data = [
//     { goodsId: 1, name: '货品1', sku: '颜色:红色,尺码:S', number: 1 },
//     { goodsId: 1, name: '货品1', sku: '颜色:红色,尺码:M', number: 1 },
//     { goodsId: 1, name: '货品1', sku: '颜色:红色,尺码:L', number: 1 },
//     { goodsId: 3, name: '货品3', number: 10 },
//     { goodsId: 2, name: '货品2', sku: '颜色:绿色,尺码:S', number: 1 },
//     { goodsId: 2, name: '货品2', sku: '颜色:绿色,尺码:M', number: 1 },
//     { goodsId: 2, name: '货品2', sku: '颜色:绿色,尺码:L', number: 1 },
// ];

// /**
// * res
// [
//     { goodsId: 1, name: '货品1', '颜色': '红色', 'S': 1, 'M': 1, 'L': 1, number: 3 },
//     { goodsId: 2, name: '货品2', '颜色': '绿色', 'S': 1, 'M': 1, 'L': 1, number: 3 },
// ]
// */


// const map = {};
// data.forEach((item, index) => {
//     if (Reflect.has(item, 'sku') && item.sku) {
//         const skuList = item.sku.split(',');
//         const firstSku = skuList.splice(0, 1);
//         const newItem = Object.assign(item, { sku: skuList.join(',') })
//         if (!Reflect.has(map, firstSku)) {
//             map[firstSku] = [newItem];
//         } else {
//             map[firstSku].push(newItem);
//         }
//     } else {
//         map[`__${index}_${item.goodsId}`] = [item];
//     }
    
// });
// console.log(map);

// const res = [];
// for (let key in map) {
//     const value = map[key];
//     if (!key.startsWith('__')) {
//         const [firstSkuKey, firstSkuValue] = key.split(':');
//         let skuData = { [firstSkuKey]: firstSkuValue };
//         let number = 0;
//         value.forEach(item => {
//             number += item.number;
//             const [skuKey, skuValue] = item.sku.split(':');
//             skuData[skuValue] = item.number;
//         });
//         skuData.number = number;

//         res.push(Object.assign({}, value[0], skuData));
//     } else {
//         res.push(value[0]);
//     }
// }
// console.log(res);

// add(1)(2)


// function removeZero(arr) {
//     let i = 0;
//     let j = 0;

//     while (j < arr.length) {
//         console.log(j);
//         if (arr[i] === 0) {
//             if (arr[j] !== 0) {
//                 [arr[i], arr[j]] = [arr[j], arr[i]];
//                 i++;
//             }
//         } else {
//             i++
//         }
//         j++
//     }
//     console.log(arr);
// }

// removeZero([0, 1, 0, 3, 12]);

// 产品类
class Product {
    showProduct() {
        console.log('name:', this._name);
        console.log('name:', this._type);
    }
    setName(name) {
        this._name = name;
    }
    setType(type) {
        this._type = type;
    }
}

// 抽象建造者
class Abstract {
    constructor() {
        if (new.target === Abstract) {
            throw new TypeError('class Abstract该类为抽象类，不能实例化。')
        }
    }
    setPart(arg1, arg2) {}
    getProduct() {}
}

// 建造者
class ConcreteBuilder extends Abstract {
    constructor() {
        super();
        this._product = new Product();
    }

    getProduct() {
        return this._product;
    }

    setPart(arg1, arg2) {
        this._product.setName(arg1);
        this._product.setType(arg2);
    }
}

// 指挥者
class Director {
    constructor() {
        this._builder = new ConcreteBuilder();
    }
    getProduct1() {
        this._builder.setPart('奔驰', 'C200');
        return this._builder.getProduct();
    }
    getProduct2() {
        this._builder.setPart('奥迪', 'A8');
        return this._builder.getProduct();
    }
}

const director = new Director();
console.log(director.getProduct1());
console.log(director.getProduct2());