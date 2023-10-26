// no 1

// const sampleInput1 = 1; // Output : 9
// const sampleInput2 = 2; // Output : 9009
// const sampleInput3 = 3; // Output : 906609

// function checkPalindrome(number) {
//     const numToString = number.toString()
//     const numLength = numToString.length

//     for (let i = 0; i < numLength / 2; i++) {
//         if (numToString[i] !== numToString[numLength - 1 - i]) {
//             return false
//         }
//     }

//     return true
// }

// function findBiggestPalindrome(number) {
//     if (number < 1 || number > 4) {
//         return "Invalid input. n should be between 1 and 4.";
//     }

//     const min = Math.pow(10, number - 1)
//     const max = Math.pow(10, number) - 1

//     let biggestPalindrome = 0

//     for (let i = max; i >= min; i--) {
//         for (let j = i; j >= min; j--) {
//             const result = i * j;
//             if (result > biggestPalindrome && checkPalindrome(result)) {
//                 biggestPalindrome = result;
//             }
//         }
//     }

//     return biggestPalindrome;
// }

// console.log(findBiggestPalindrome(sampleInput1))
// console.log(findBiggestPalindrome(sampleInput2))
// console.log(findBiggestPalindrome(sampleInput3))

// no 2

const tables = require('./assets/tables.json')
let result = []

tables.forEach(el => {
    let temp = {
        name: el.name,
        group: el.group,
        match_played: el.matches.length,
        points: 0
    }
    el.matches.forEach(e => {
        if (e.result == "win") {
            temp.points = temp.points + 3
        } else if (e.result == "draw") {
            temp.points = temp.points + 1
        }
    })
    result.push(temp)
})

console.log(result)