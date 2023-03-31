function showCart() {

    const priceDiv = document.getElementById("overall-price");
    priceDiv.innerHTML = "";
    
    // retrieve items from the cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let overallPrice = 0;
    
    const uniqueItems={};
    
    if (cart.length) {
        // using the forEach method, calculate the total price of each item within our cart array
        cart.forEach((item) => {
            
            if(uniqueItems[item.name]){
                uniqueItems[item.name].quantity +=1;
            } else {
                uniqueItems[item.name] = {...item, quantity: 1};
            }
            
            overallPrice += parseInt(item.price, 10);
        });
        
        const cartTable = document.getElementById('cart-table');

        for (const key in uniqueItems){
            if (uniqueItems.hasOwnProperty(key)) {
                const item = uniqueItems[key];
                const row = document.createElement('tr');
            
                const nameCell = document.createElement('td');
                nameCell.textContent = item.name;
                row.appendChild(nameCell);
                
                const priceCell = document.createElement('td');
                priceCell.textContent = item.price;
                row.appendChild(priceCell);
                
                const quantityCell = document.createElement('td');
                quantityCell.textContent = item.quantity;
                row.appendChild(quantityCell);
            
                const totalCell = document.createElement('td');
                totalCell.textContent = item.quantity * item.price;
                row.appendChild(totalCell);
            
                const editCell = document.createElement('td');
                // add functionality to edit quantity here
                row.appendChild(editCell);
                
                const removeCell = document.createElement('td');
                // add functionality to remove item here
                row.appendChild(removeCell);
            
                cartTable.querySelector('tbody').appendChild(row);
              }
        }
       // cartDiv.innerHTML = cartcontent
        priceDiv.innerHTML = `Overall Price: $${overallPrice} USD`;
    }

    // adds an event listener to clear our cart
    document.getElementById("clear-cart").addEventListener("click", clearCart);
}

function clearCart() {

    localStorage.removeItem("cart");
    showCart();

}