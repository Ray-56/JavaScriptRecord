

class LazyManClass { // class 使用
    constructor(name) {
        this.name = name;
        this.taskQueue = []; // 队列
        console.log(`Hi I am ${name}`);

        // 执行栈 eventLoop
        setTimeout(() => {
            this.next();
        }, 0);
    }

    sleep(time) {
        const timeout = time * 1000;
        const fn = () => { // this 指向
            setTimeout(() => {
                console.log(`等待了${time}秒...`);
                this.next();
            }, timeout);
        }
        this.taskQueue.push(fn);
        return this; // 链式调用
    }

    sleepFirst(time) {
        const timeout = time * 1000;
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}秒...`);
                this.next();
            }, timeout);
        }
        this.taskQueue.unshift(fn);
        return this;
    }

    eat(foodName) {
        const fn = () => {
            console.log(`I am eating ${foodName}`);
            this.next();
        }
        this.taskQueue.push(fn);
        return this;
    }

    next() {
        const fn = this.taskQueue.shift();
        fn && fn(); // 防错机制
    }
}

function LazyMan(name) {
    return new LazyManClass(name);
}

// LazyMan('Tony1');
// Hi I am Tony

// LazyMan('Tony2').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony3').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food