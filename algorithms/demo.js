global.log = console.log.bind(console);
const arr = [10, 3, 6, 4, 2, 1, 7, 9, 8, 5];

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.log(arr);
}

// 改进冒泡排序1
function bubbleSort1(arr) {
    let i = arr.length - 1;

    while (i > 0) {
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
    console.log(arr);
}


// 改进冒泡排序2
function bubbleSort2(arr) {
    let low = 0;
    let high = arr.length - 1;
    let temp, j;

    while (low < high) {
        // 正排找最大
        for (j = low; j < high; ++j) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        --high;

        // 反排找最小
        for (j = high; j > low; --j) {
            if (arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
        ++low;
    }
    console.log(arr);
}

function parent(age) {
    this.age = age;
}

function parent1(age) {
    return {
        age
    }
}

const p1 = parent(19);
const p2 = Number(44);
console.log(Object.prototype.toString.call(p2));