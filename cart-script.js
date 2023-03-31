function showCartTable() {
  // retrieve items from local storage
  let uniqueItems = JSON.parse(localStorage.getItem("uniqueItems")) || [];

  
  // clear the tablebody before adding items
  const cartTableBody = document.querySelector("#cart-table tbody");
  while (cartTableBody.firstChild) {
    cartTableBody.removeChild(cartTableBody.firstChild);
  }

  const priceDiv = document.getElementById("overall-price");
  priceDiv.innerHTML = "";
  let overallPrice = 0;


  uniqueItems.forEach((item) => {
    
      const row = cartTableBody.insertRow();
      const titleCell = row.insertCell();
      titleCell.textContent = item.title;

      const priceCell = row.insertCell();
      priceCell.innerHTML = `€ ${Number(item.price).toFixed(2)}`;

      const quantityCell = row.insertCell();
      quantityCell.textContent = item.quantity;

      const totalCell = row.insertCell();
      totalCell.textContent = `€ ${Number(item.price * item.quantity).toFixed(2)} `;

      const editCell = row.insertCell();
      const plusBtn = document.createElement("button");
      plusBtn.innerHTML = '<i class="bi bi-plus-circle-dotted"></i>';
      plusBtn.classList.add("btn", "btn-outline-info", "plus-button");
      plusBtn.setAttribute("aria-label", "add-one");
      editCell.appendChild(plusBtn);

      plusBtn.addEventListener("click", () => {
         // Find the index of the item
        const index = uniqueItems.findIndex((item) => item.title === titleCell.textContent);

        // Update the quantity of the item
        uniqueItems[index].quantity++;

        // Save the updated array to localStorage
        localStorage.setItem("uniqueItems", JSON.stringify(uniqueItems));
        updateMainCart(uniqueItems);  //update the 'cart' object in localStorage

        // Update the quantity cell and total cell in the table
        quantityCell.textContent = uniqueItems[index].quantity;
        totalCell.textContent = `€ ${Number(uniqueItems[index].price * uniqueItems[index].quantity).toFixed(2)}`;

        // Update the overall price
        overallPrice += Number(uniqueItems[index].price);
        priceDiv.innerHTML = `Overall Price: € ${overallPrice.toFixed(2)}`;
      });

      const minusBtn = document.createElement("button");
      minusBtn.innerHTML = '<i class="bi bi-dash-circle-dotted"></i>';
      minusBtn.classList.add("btn", "btn-outline-warning", "minus-button");
      minusBtn.setAttribute("aria-label", "minus-one");
      editCell.appendChild(minusBtn);
      minusBtn.addEventListener("click", () => {
        const index = uniqueItems.findIndex((item) => item.title === titleCell.textContent);
        
        if (uniqueItems[index].quantity > 1) {
          uniqueItems[index].quantity--;
        } else {
          uniqueItems.splice(index, 1); //remove item from the array
          row.remove();                 //remove the row from the table
        }
        localStorage.setItem("uniqueItems", JSON.stringify(uniqueItems));
        updateMainCart(uniqueItems);
        
        quantityCell.textContent = uniqueItems[index].quantity;
        totalCell.textContent = `€ ${Number(uniqueItems[index].price * uniqueItems[index].quantity).toFixed(2)}`;
        overallPrice -= Number(uniqueItems[index].price);
        priceDiv.innerHTML = `Overall Price: € ${overallPrice.toFixed(2)}`;
      });
      
      const removeCell = row.insertCell();
      const removeButton = document.createElement("button");
      removeButton.innerHTML = '<i class="bi bi-trash"></i>';
      removeButton.classList.add("btn", "btn-outline-danger", "remove-button");
      removeButton.setAttribute("aria-label", "remove");
      removeCell.appendChild(removeButton);
      
      removeButton.addEventListener("click",  () => {
        const index = uniqueItems.findIndex((item) => item.title === titleCell.textContent);
        uniqueItems.splice(index, 1); //remove item from the array
        localStorage.setItem("uniqueItems", JSON.stringify(uniqueItems));
        updateMainCart(uniqueItems);
        showCartTable();
        });
   overallPrice += Number(item.price * item.quantity); 
  });

  // cartDiv.innerHTML = cartcontent
  priceDiv.innerHTML = `Overall Price: € ${overallPrice.toFixed(2)}`;

  // adds an event listener to clear our cart
  document.getElementById("clear-cart").addEventListener("click", ()=>{
    localStorage.removeItem("cart");
    localStorage.removeItem("uniqueItems");
    showCartTable();
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
        window.location.href = 'checkout.html';
  });
}

function updateMainCart (uniqueItems) {
  const cart = [];
  uniqueItems.forEach((item) => {
    for (i=0; i<item.quantity; i++){
      let newItem = {
        title: item.title,
        price: item.price,
      };
      cart.push(newItem);
    }
  });
localStorage.setItem("cart", JSON.stringify(cart));
}