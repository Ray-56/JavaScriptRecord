# JavaScript描述二分查找

一种在 **有序数组** 中查找某一特定元素的搜索算法。
搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；
如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。
如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。

## 递归方式

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function binarySearch(arr, target, left, right) {
    const middle = Math.floor((left + right) / 2);
    if (target > arr[middle]) {
        return binarySearch(arr, target, middle + 1, right);
    } else if (target < arr[middle]) {
        return binarySearch(arr, target, left, middle - 1);
    } else {
        return middle;
    }
}
console.log(binarySearch(arr, 7, 0, arr.length - 1));
```

## 遍历

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function binarySearch(arr, target, left, right) {
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (target > arr[middle]) {
            left = middle + 1;
        } else if (target < arr[middle]) {
            right = middle - 1;
        } else {
            return middle;
        }
    }
}
console.log(binarySearch(arr, 7, 0, arr.length - 1));
```