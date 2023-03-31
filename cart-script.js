function showCartTable() {
  // retrieve items from the cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartTableBody = document.querySelector("#cart-table tbody");

  // clear the tablebody before adding items
  while (cartTableBody.firstChild) {
    cartTableBody.removeChild(cartTableBody.firstChild);
  }

  const priceDiv = document.getElementById("overall-price");
  priceDiv.innerHTML = "";
  let overallPrice = 0;

  //grouping all items of the same type into one object
  const uniqueItems = {};

  cart.forEach((item) => {
    if (uniqueItems[item.title]) {
      uniqueItems[item.title].quantity += 1;
    } else {
      uniqueItems[item.title] = { ...item, quantity: 1 };
    }

    overallPrice += Number(item.price);
  });

  for (const key in uniqueItems) {
    if (uniqueItems.hasOwnProperty(key)) {
      const item = uniqueItems[key];
      const row = cartTableBody.insertRow();

      const titleCell = row.insertCell();
      titleCell.textContent = item.title;

      const priceCell = row.insertCell();
      priceCell.innerHTML = `€ ${Number(item.price).toFixed(2)}`;

      const quantityCell = row.insertCell();
      quantityCell.textContent = item.quantity;

      const totalCell = row.insertCell();
      totalCell.textContent = `€ ${Number(item.price * item.quantity).toFixed(
        2
      )} `;

      const editCell = row.insertCell();
      const plusBtn = document.createElement("button");
      plusBtn.innerHTML = '<i class="bi bi-plus-circle-dotted"></i>';
      plusBtn.classList.add("btn", "btn-outline-info", "plus-button");
      plusBtn.setAttribute("aria-label", "add-one");
      editCell.appendChild(plusBtn);
      plusBtn.addEventListener("click", () => {
        const index = cart.findIndex(
          (cartItem) => cartItem.title === item.title
        );
        if (index !== -1) {
          const copyItem = {
            title: item.title,
            price: item.price,
          };
          cart.push(copyItem);

          localStorage.setItem("cart", JSON.stringify(cart));
          showCartTable();
        }
      });

      const minusBtn = document.createElement("button");
      minusBtn.innerHTML = '<i class="bi bi-dash-circle-dotted"></i>';
      minusBtn.classList.add("btn", "btn-outline-warning", "minus-button");
      minusBtn.setAttribute("aria-label", "minus-one");
      editCell.appendChild(minusBtn);
      minusBtn.addEventListener("click", () => {
        const index = cart.findIndex(
          (cartItem) => cartItem.title === item.title
        );
        if (index !== -1) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          showCartTable();
        }
      });

      const removeCell = row.insertCell();
      const removeButton = document.createElement("button");
      removeButton.innerHTML = '<i class="bi bi-trash"></i>';
      removeButton.classList.add("btn", "btn-outline-danger", "remove-button");
      removeButton.setAttribute("aria-label", "remove");
      removeCell.appendChild(removeButton);

      removeButton.addEventListener(
        "click",
        function (title) {
          const updatedCart = cart.filter((item) => item.title !== title);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          showCartTable();
        }.bind(null, key)
      );
    }
  }

  // cartDiv.innerHTML = cartcontent
  priceDiv.innerHTML = `Overall Price: € ${overallPrice.toFixed(2)}`;

  // adds an event listener to clear our cart
  document.getElementById("clear-cart").addEventListener("click", clearCart);

  document.getElementById("checkout-btn").addEventListener("click", () => {
    const uniqueItemsArray = Object.values(uniqueItems);
    localStorage.setItem("uniqueItems", JSON.stringify(uniqueItemsArray));
    window.location.href = 'checkout.html';
  });
}

function clearCart() {
  localStorage.removeItem("cart");
  showCartTable();
}
