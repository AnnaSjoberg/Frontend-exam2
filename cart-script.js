function showCartTable() {
  // retrieve items from local storage
  let uniqueItems = JSON.parse(localStorage.getItem("uniqueItems")) || {};

  
  // clear the tablebody before adding items
  const cartTableBody = document.querySelector("#cart-table tbody");
  while (cartTableBody.firstChild) {
    cartTableBody.removeChild(cartTableBody.firstChild);
  }

  const priceDiv = document.getElementById("overall-price");
  priceDiv.innerHTML = "";
  let overallPrice = 0;


  for (const title in uniqueItems) {
    const item = uniqueItems[title];
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
        item.quantity++;   // Update the quantity of the item

        localStorage.setItem("uniqueItems", JSON.stringify(uniqueItems)); // Save the updated object to localStorage
      
        // Update the view on the page
        quantityCell.textContent = item.quantity;
        totalCell.textContent = `€ ${Number(item.price * item.quantity).toFixed(2)}`;
        overallPrice += Number(item.price);
        priceDiv.innerHTML = `Overall Price: € ${overallPrice.toFixed(2)}`;
      });

      const minusBtn = document.createElement("button");
      minusBtn.innerHTML = '<i class="bi bi-dash-circle-dotted"></i>';
      minusBtn.classList.add("btn", "btn-outline-warning", "minus-button");
      minusBtn.setAttribute("aria-label", "minus-one");
      editCell.appendChild(minusBtn);
      minusBtn.addEventListener("click", () => {

        if (item.quantity > 1) {
          item.quantity--;
        } else {
          delete uniqueItems[title];
          row.remove();                 //removes the row from the table
        }
        localStorage.setItem("uniqueItems", JSON.stringify(uniqueItems));
        
        if (Object.keys(uniqueItems).length === 0){
          localStorage.removeItem('uniqueItems');
        }
        
        quantityCell.textContent = item.quantity;
        totalCell.textContent = `€ ${Number(item.price * item.quantity).toFixed(2)}`;
        overallPrice -= Number(item.price);
        priceDiv.innerHTML = `Overall Price: € ${overallPrice.toFixed(2)}`;
      });
      
      const removeCell = row.insertCell();
      const removeButton = document.createElement("button");
      removeButton.innerHTML = '<i class="bi bi-trash"></i>';
      removeButton.classList.add("btn", "btn-outline-danger", "remove-button");
      removeButton.setAttribute("aria-label", "remove");
      removeCell.appendChild(removeButton);
      
      removeButton.addEventListener("click",  () => {
        delete uniqueItems[title];
        if (Object.keys(uniqueItems).length === 0){
          localStorage.removeItem('uniqueItems');
        } else {
        localStorage.setItem("uniqueItems", JSON.stringify(uniqueItems));
      }
        showCartTable();
        });
   overallPrice += Number(item.price * item.quantity); 
  };

  // cartDiv.innerHTML = cartcontent
  priceDiv.innerHTML = `Overall Price: € ${overallPrice.toFixed(2)}`;

  // adds an event listener to clear our cart
  document.getElementById("clear-cart").addEventListener("click", ()=>{
    
    localStorage.removeItem("uniqueItems");
    showCartTable();
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
        window.location.href = 'checkout.html';
  });
}
