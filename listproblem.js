// const nestedList = [
//   1,
//   [2, 3, [4, [5, 6]]],
//   7,
//   [8, [9, 10], 11],
//   12,
//   [[13, [14]], 15],
//   [16, [17, [18, [19, [20]]]]],
//   21,
//   [[[[22]]], 23],
//   [24, [25, [26, [27, [28, 29]]]]],
//   30,
// ];
const nestedList = [
  1,
  [2, [3, [4, [5, 6,7,8]]]],
  7,
  [],
  [8, [9, 10], [11, [12, [13, 14]]]],
  15,
  [[[[16]]]],
  [17, [18, [19, [20, [21, [22]]]]]],
  23,
  [[24], 25, [[[[26,27,28]]]], [27, 28]],
  [
    [
      [29, 30,31],
      [31, [32, 33]],
    ],
  ],
  34,
  [35, [36, [37, [38, [39, [40, [41, [42, [43]]]]]]]]],
  [[[[[[[44]]]]]]],
  [],
  [45, [46], [], [47, [48, [], [49, [50]]]]],
  51,
  [52, [53, [54, [55, [56, [57, [58, [59, [60]]]]]]]]],
  [61, [[62]], [[[63, [64]]]], 65],
  [[[[[[[[[[[66]]]]]]]]]]],
  67,
]


  

//   function flattenList(list) {
//     const flattened = [];

//     function flattenHelper(list) {
//       for (const item of list) {
//         if (Array.isArray(item)) {
//           flattenHelper(item);
//         } else {
//           flattened.push(item);
//         }
//       }
//     }

//     flattenHelper(list);

//     return flattened;
//   }

//   const flattenedList = flattenList(nestedList);

const flatteredList = [];
function makeListFlat(list) {
//   for (var item of list) {
//     if (Array.isArray(item)) {
//       makeListFlat(item);
//     } else {
//       flatteredList.push(item);
//     }
    //   }
    for (let index = 0; index < list.length; index++) {
        if (Array.isArray(list[index])) {
             makeListFlat(list[index]);
        } else {
            flatteredList.push(list[index]);
            
        }
        
    }
}

makeListFlat(nestedList);
console.log(flatteredList);
