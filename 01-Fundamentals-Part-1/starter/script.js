// Coding Challenge #1

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

let marks_weight = 78;
let marks_height = 1.68;

let john_weight = 92;
let john_height = 1.95;

function calculate(height, weight) {
  return weight / height ** 2;
}

console.log(calculate(marks_height, marks_weight));
console.log(calculate(john_height, john_weight));

marks_weight = 95;
marks_height = 1.88;

john_weight = 85;
john_height = 1.76;

console.log(calculate(marks_height, marks_weight));
console.log(calculate(john_height, john_weight));
