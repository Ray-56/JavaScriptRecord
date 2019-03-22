# 算法

经典算法总结

## 冒泡排序（Bubble Sort）

冒泡排序是一种简单的排序算法。它重复走访要排序的数列，依次比较两个元素，如果它们的顺序错误就把它们交换过来。
走访数列的工作时重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
这个算法的名字由来是因为越小的元素会经由交换慢慢 ‘浮’ 到数列的顶端。

```js
const arr = [1, 3, 6, 4, 66, 99, 22, 9, 0, 2];

function bubbleSort(arr) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) { // 依次对比将最大的放在最后面（下次循环时最后面的已为最大不需要再去判断）
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.log(arr);
}
bubbleSort(arr);
```

> **改进冒泡排序**：设置标志性标量 pos ，用于记录每趟排序中最后一次进行交换的位置。由于 pos 位置之后的记录已交换到位，故而下趟排序时只要扫描到 pos 位置即可。

```js
const arr = [1, 3, 6, 4, 66, 99, 22, 9, 0, 2];

function bubbleSort2(arr) {
    let i = arr.length - 1; // 初始位置为末位

    while (i) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }
}
bubbleSort2(arr);
```

> 传统冒泡排序中每一趟操作只能找到一个最大值或最小值，我们考虑利用每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值（min 和 max），从而使排序趟数几乎少了一半。

```js
const arr = [1, 3, 6, 4, 66, 99, 22, 9, 0, 2];

function bubbleSort3(arr) {
    let low = 0;
    let high = arr.length - 1;
    let temp, j;

    while (low < high) {
        for (j = low; j < high; ++j) { // 正向，找最大
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        --high; // 最高位置前移一位

        for (j = high; j > low; --j) { // 反向，找最小
            if (arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
        ++low; // 最低位置后移一位
    }
    console.log(arr);
}
bubbleSort3(arr);
```

## 选择排序（Selection Sort）

选择排序 Selection Sort 是一种简单直观的排序算法。
它的工作原理：首先在未排序序列中找到最小的元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾。以此推类，直到所有元素均排序完成。
或者在未排序元素中寻找最大元素。

```js
const arr = [1, 3, 6, 4, 66, 99, 22, 9, 0, 2];

function selectionSort(arr) {
    let minIndex, temp;
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < length; j++) { // 下趟对比时不需要与当前项做对比（j = i + 1）
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.log(arr);
}
selectionSort(arr);
```

## 插入排序（Insertion Sort）

插入排序（Insertion Sort）的算法描述是一种简单直观的排序算法。
它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
插入排序在实现上，通常采用 in-place 排序（即只需用到 O(1) 的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素向后挪位，为最新的元素提供插入空间。

```js
const arr = [100, 3, 6, 4, 66, 99, 22, 9, 0, 2];

function insertionSort(arr) {
    let j, temp;
    for (let i = 0; i < arr.length; i++) {
        temp = arr[i];
        j = i;
        while (j > 0 && arr[j - 1] > temp) { // 挪位过程，为最新的元素提供插入空间
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp; // 插入相应位置
    }
    console.log(arr);
}
insertionSort(arr);
```

> **改进插入排序**：查找位置时使用二分查找的方式

```js
function binaryInsertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i];
        let left = 0;
        let right = i - 1;
        while (left <= right) {
            const middle = parseInt((left + right) / 2);
            if (temp < arr[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = temp;
    }
    console.log(arr);
}
binaryInsertionSort(arr);
```

## 希尔排序（Shell Sort）

> 希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔序列的算法是 《算法（第四版）》 和合著者 Robert Sedgewick 提出的。

**描述**

先将整个待排序的记录序列分割称为若干子序列分别进行直接插入排序，具体算法描述：
1.  选择一个增量序列 t1, t2, ..., tk, 其中 ti > tj, tk = 1
2.  按增量序列个数 k ，对序列进行 k 趟排序
3.  每趟排序，根据对应的增量 ti ，将待排序列分割成若干长度为 m 的子序列，分别对各子序列进行插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

```js
function shellSort(arr) {
    const { length } = arr;
    let temp;
    let j;
    let gap = 1;
    while (gap < length / 5) { // 动态定义间隔序列
        gap = gap * 5 + 1;
    }

    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (let i = gap; i < length; i++) {
            temp = arr[i];
            for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    console.log('希尔排序 > ', arr);
}
shellSort(arr);
```

## 归并排序（Merge Sort）

> 和选择排序一样，归并排序的性能不受输入数据的影响，但表示比选择排序好的多，因为始终都是 O(n log n) 的时间复杂度。代价是需要额外的内存空间。

**简介**

> 归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到一个完全有序的序列；即先使每个子序列有序，再使用子序列段间有序。若将两个有序表合并成一个有序表，称为 2-路归并。

**描述**

具体描述如下：
1.  把长度为 n 的输入序列分成两个长度为 n/2 的子序列
2.  对着两个子序列分别采用归并排序
3.  将两个排序好的子序列合并称为一个最终的排序序列

```js
const arr = [100, 3, 6, 4, 66, 99, 22, 9, 0, 2];

function mergeSort(arr) {
    const { length } = arr;
    if (length < 2) return arr;

    const middle = Math.floor(length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    const result = [];
    
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }

    return result;
}
console.log('归并排序 > ', mergeSort(arr));
```

## 快速排序（Quick Sort）

> 处理大数据最快的排序算法之一。

**简介**

> 快速排序的基本思想：通过一趟排序将待排记录分割成独立的两个部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

**描述**

快速排序使用分治法来把一个串 list 分成两个子串 sub-list 。具体算法：
1.  从数列中挑出一个元素，称为“基准”（pivot）
2.  重新排序数列，所有元素比基准小的摆放在基准前面，所有元素比基准数值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作。
3.  递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

```js
// 方法一
function quickSort(arr, left, right) {
    if (left < right) {
        let x = arr[right],
            i = left - 1,
            temp;
        for (let j = left; j <= right; j++) {
            if (arr[j] <= x) {
                i++;
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        quickSort(array, left, i - 1);
        quickSort(array, i + 1, right);
    }
    return arr;
}
console.log(quickSort(arr, 0, arr.length - 1));

// 方法二
function quickSort1(arr) {
    if (arr.length <= 1) return arr;
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0]; // 从源数据取出
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort1(left).concat([pivot], quickSort1(right));
}
console.log(quickSort1(arr));
```

## 堆排序（Heap Sort）