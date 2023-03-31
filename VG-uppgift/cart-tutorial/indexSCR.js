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
    itemButton.classList.add("add-to-cart");
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
    });
  });