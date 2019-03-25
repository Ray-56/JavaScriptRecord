global.log = console.log.bind(console);
const arr = [10, 3, 6, 4, 2, 1, 7, 9, 8, 5];

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function selectionSort(arr) {
    let temp, minIndex;
    for (let i = 0; i < arr.length; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
// log(selectionSort(arr));

function insertionSort(arr) {
    let j, temp;
    for (let i = 0; i < arr.length; i++) {
        j = i;
        temp = arr[i];
        while (j > 0 && temp < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}

// 二分法插入排序
function insertionSort1(arr) {
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
    return arr;
}

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
// console.log('归并排序 > ', mergeSort(arr));

var num = 1;
var myObject = {
    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            console.log(this.num);
            this.num = 4;
        })();
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num);
    }
}
myObject.add();
console.log(myObject.num);
console.log(num);
var sub = myObject.sub;
sub();
/*
3
5
1
2
4
0
*/