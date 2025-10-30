/*function add(a, b, callback) {
  setTimeout(() => {
    const sum = a + b; //3
    callback(sum);
  }, 3000);
}

add(1, 2, (value) => {
  console.log(value);
});
*/
//음식을 주문하는 상황
function orderFood(callback) {
  setTimeout(() => {
    const food = "햄버거";
    callback(food);
  }, 3000);
}

function cooldownFood(food, callback) {
  setTimeout(() => {
    const cooldownedFood = `식은 ${food}`;
    callback(cooldownedFood);
  }, 2000);
}

function iceFood(food, callback) {
  setTimeout(() => {
    const icedFood = `냉동된 ${food}`;
    callback(icedFood);
  }, 1500);
}
orderFood((food) => {
  console.log(food);

  cooldownFood(food, (cooldownedFood) => {
    console.log(cooldownedFood);

    iceFood(cooldownedFood, (icedFood) => {
      console.log(icedFood);
    });
  });
});
