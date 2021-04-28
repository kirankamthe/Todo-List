let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let newList1 = list.map((item) => item < 5);

let newList2 = list.filter((item) => item < 5);

console.log("list===>", list);
console.log("newList1===>", newList1);
console.log("newList2===>", newList2);