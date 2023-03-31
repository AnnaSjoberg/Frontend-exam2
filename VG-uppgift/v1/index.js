
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

    const priceDiv = document.getElementById("overall-price");
    priceDiv.innerHTML = "";

    // retrieve items from the cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const uniqueItems = {};
    let overallPrice = 0;

    if (cart.length) {
        // using the forEach method, calculate the total price of each item within our cart array
        cart.forEach((item) => {
            if (uniqueItems[item.name]) {
                uniqueItems[item.name].quantity += 1;
              } else {
                uniqueItems[item.name] = {...item, quantity: 1};
              }
            overallPrice += parseInt(item.price, 10);
        });
    

        const cartDropdown = document.getElementById('cart-dropdown');
        cartDropdown.innerHTML="";
        let sumItem = document.createElement('li');
        sumItem.style="font-weight:bold"

        for (const key in uniqueItems) {
            let listItem = document.createElement('li');
          if (uniqueItems.hasOwnProperty(key)) {
              
              const item = uniqueItems[key];
            const text = `${item.name} x ${item.quantity}`;
            listItem.textContent = text;
            
            cartDropdown.appendChild(listItem);

          }
        }
        const btnGroup = document.createElement('div');
        const editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit order';
        editBtn.addEventListener('click', function () {
            window.location.href = "cart.html";
        })
        const checkOutBtn = document.createElement('button');
        checkOutBtn.innerHTML = 'Checkout';
        checkOutBtn.addEventListener('click', function () {
            window.location.href = "mahmudscart.html";
        })

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(checkOutBtn);
        
        cartDropdown.appendChild(btnGroup)
        
        sumItem.innerHTML = `Overall Price: $${overallPrice} USD`;
        cartDropdown.appendChild(sumItem)
    }

    // adds an event listener to clear our cart
    document.getElementById("clear-cart").addEventListener("click", clearCart);
}
function clearCart() {

    localStorage.removeItem("cart");
    showCart();

}/**btn.className = "btn btn-outline-success p-2";        
        btn.addEventListener("click", function () {
       sessionStorage.setItem("product", JSON.stringify(e));
       window.location.href = "form.html";
       }); */