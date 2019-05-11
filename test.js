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

const str = 'aaabbbcccddd';
function findIndex(s, t) {
    if (s.length < t.length) return -1;

    console.log(s.substr(0, t.length));
    for (let i = 0; i < s.length - t.length; i++) {
        if (s.substr(i, t.length) === t) return i;
    }
    return -1;
}
console.log(findIndex(str, 'bbb'));
