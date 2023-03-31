var product = JSON.parse(sessionStorage.getItem("product"));document.getElementById("productInfo").innerHTML = product.title;
document.getElementById("price").innerHTML = "€ " + product.price.toFixed(2); //+ sek/USD
//document.getElementById("productImage").src = product.image;
//document.getElementById("orderedPage").append(product.image);
document.getElementById("firstLast").innerHTML = sessionStorage.getItem("name");
document.getElementById("theAddress").innerHTML = sessionStorage.getItem("street") + " " + sessionStorage.getItem("postal") + " " + sessionStorage.getItem("city");
var img = document.createElement("img");
img.src = product.image;
img.classList.add("productImg");
document.querySelector(".productImg").append(img);