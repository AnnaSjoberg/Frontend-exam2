const data = [
    {
      name: "Kindle",
      price: 70,
    },
    {
      name: "Cool Lamp",
      price: 15,
    },
    {
      name: "Mirror",
      price: 25,
    },
  ];


function showItems() {
    const wrapper = document.getElementById("catalogue");
    data.forEach((element) => {
        // create an item wrapper
        let item = document.createElement("div");
        item.innerHTML = element.name;

        // create item price
        let itemPrice = document.createElement("div");
        itemPrice.innerHTML = `$${element.price} USD`;
        item.appendChild(itemPrice);

        // create "Add to cart" button for each item
        let itemButton = document.createElement("button");
        itemButton.innerHTML = "Add to cart";

        // Add info to the button which we will when we want to safe it into Local Storage
        itemButton.dataset.name = element.name;
        itemButton.dataset.price = element.price;
        itemButton.classList.add("add-to-cart", "btn", "btn-sm", "btn-outline-success");
        item.appendChild(itemButton);

        // a line to separate the items
        item.appendChild(document.createElement("hr"));

        // insert item to the main wrapper
        wrapper.appendChild(item);
        return true;
    });

    // We have to loop through all buttons and add an event listener to each individual button
    Array.from(document.getElementsByClassName("add-to-cart")).forEach(function (
        element
    ) {
        element.addEventListener("click", (e) => {
            // retrieve current cart if it exists. If it doesn't create an empty cart
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let newItem = {
                name: e.target.dataset.name,
                price: e.target.dataset.price,
            };
            cart.push(newItem);

            localStorage.setItem("cart", JSON.stringify(cart));
            showCart();
        });
    });
}
function showCart() {

    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    const priceDiv = document.getElementById("overall-price");
    priceDiv.innerHTML = "";

    // retrieve items from the cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let overallPrice = 0;

    if (cart.length) {
        // using the forEach method, calculate the total price of each item within our cart array
        cart.forEach((element) => {

            let item = document.createElement("div");
            item.innerHTML = `${element.name}: $${element.price} USD`;
            cartDiv.appendChild(item);

            overallPrice += parseInt(element.price, 10);
        });

        priceDiv.innerHTML = `Overall Price: $${overallPrice} USD`;
    }

    // adds an event listener to clear our cart
    document.getElementById("clear-cart").addEventListener("click", clearCart);
}

function clearCart() {

    localStorage.removeItem("cart");
    showCart();

}