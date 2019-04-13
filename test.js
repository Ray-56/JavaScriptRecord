const classRoom = {
    students: ['武大', '郎二', '张三', '张起灵', '李四', '王五'],
}

// classRoom.find = function() {
//     switch(arguments.length) {
//         case 0:
//             return this.students;
//         case 1:
//             return this.students.filter(student => {
//                 let surname = arguments[0];
//                 return ~student.indexOf(surname);
//             });
//         case 2:
//             return this.students.filter(student => {
//                 let fullName = arguments.join('');
//                 return ~student.indexOf(fullName);
//             });
//     }
// }
function addMethod(target, name, fn) {
    const old = target[name];

    target[name] = function() {
        if (fn.length === arguments.length) {
            return fn.apply(this, arguments);
        } else if (typeof old === 'function') {
            return old.apply(this, arguments);
        }
    }
}

addMethod(classRoom, 'find', function() {
    return this.students;
});

addMethod(classRoom, 'find', function(surname) {
    return this.students.filter(student => {
        return ~student.indexOf(surname);
    });
});

addMethod(classRoom, 'find', function(surname, personalName) {
    return this.students.filter(student => {
        return ~student.indexOf(surname + personalName);
    });
});

console.log(classRoom.find());
console.log(classRoom.find('张'));
console.log(classRoom.find('三'));