/*
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
*/

function ListNode(val) {
    this.val = val;
    this.next = null;
}

function createList(numList) {
    var next = new ListNode(numList.shift());
    var cur = next;
    
    while (numList.length) {
        cur = new ListNode(numList.shift());
        cur.next = next;
        next = cur;
    }

    return cur;
}
var list1 = createList([5]);
var list2 = createList([5]);

var addTwoNumbers = function(l1, l2) {
    /**
    * 两数和
    * @param {ListNode} l1
    * @param {ListNode} l2
    * @return {ListNode}
    */
    
    var res = new ListNode();
    var cur = res;
    var decade = 0;

    while (l1 || l2 || decade) {
        var num1 = l1 ? l1.val : 0;
        var num2 = l2 ? l2.val : 0;
        var val = num1 + num2 + decade;
        
        if (val > 9) {
            cur.next = new ListNode(val % 10);
            decade = 1;
        } else {
            cur.next = new ListNode(val);
            decade = 0;
        }

        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
        cur = cur.next;
    }

    return res.next;
};
addTwoNumbers(list1, list2)