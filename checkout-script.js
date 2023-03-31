function loadOrder() {
  const uniqueItems = JSON.parse(localStorage.getItem("uniqueItems")) || {};

  const orderList = document.querySelector(".order-list");
  let overallPrice = 0;
  for (const key in uniqueItems) {
    if (uniqueItems.hasOwnProperty.call(uniqueItems, key)) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");

      const e = uniqueItems[key];
      listItem.innerHTML = `${e.quantity} X ${e.title} at € ${e.price}`;
      orderList.appendChild(listItem);
      overallPrice += Number(e.price)*e.quantity;
    }
  }
}