let cart = JSON.parse(localStorage.getItem("cart")) || [];
let overallPrice = 0;

if (cart.length) {
  // using the forEach method, calculate the total price of each item within our cart array
  cart.forEach((element) => {
    overallPrice += parseInt(element.price, 10);
  });
}
document.getElementById(
  "overall-price"
).innerHTML = `Overall Price: $${overallPrice} USD`;

// adds an event listener to clear our cart
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  alert("Cart is cleared!");
});