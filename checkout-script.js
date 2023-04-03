const validRegexName =
  /^[a-zA-Z-åäöÅÄÖ]+(([',. -][a-zA-Z-åäöÅÄÖ ])?[a-zA-Z-åäöÅÄÖ]*)*$/;
const validRegexStreet =
  /^[A-Za-z0-9-åäöÅÄÖ_]+[A-Za-z0-9][A-Za-z-åäöÅÄÖ0-9 _]*$/;
const validRegexPostal = /^[0-9]{3}\s{1}[0-9]{2}$/;
const validRegexCity =
  /^[a-zA-Z-åäöÅÄÖ]+(([,. -][a-zA-Z-åäöÅÄÖ])?[a-zA-Z-åäöÅÄÖ ]*)*$/;
const validRegexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g;
const validRegexMail = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;

document.addEventListener("keyup", () => {
  var name = document.getElementById("full-name").value;
  var street = document.getElementById("street-address").value;
  var postal = document.getElementById("postal-code").value;
  var city = document.getElementById("city").value;
  var mail = document.getElementById("e-mail").value;
  var phone = document.getElementById("phone-number").value;
  checkValid(
    name.match(validRegexName) && 1 < name.length && name.length < 51,
    "full-name",
    name
  );
  checkValid(
    street.match(validRegexStreet) && 3 < street.length && street.length < 51,
    "street-address",
    street
  );
  checkValid(postal.match(validRegexPostal), "postal-code", postal);
  checkValid(
    city.match(validRegexCity) && 1 < city.length && city.length < 51,
    "city",
    city
  );
  checkValid(mail.match(validRegexMail) && mail.length < 51, "e-mail", mail);
  checkValid(
    phone.match(validRegexPhone) && phone.length < 51,
    "phone-number",
    phone
  );
});

function checkValid(ifStatement, elementID, inputValue) {
  if (inputValue.length == 0) {
    document.getElementById(elementID).classList.remove("input-not-correct");
    document.getElementById(elementID).classList.remove("input-correct");

    return false;
  } else if (ifStatement) {
    document.getElementById(elementID).classList.remove("input-not-correct");
    document.getElementById(elementID).classList.add("input-correct");
    return true;
  } else {
    document.getElementById(elementID).classList.remove("input-correct");
    document.getElementById(elementID).classList.add("input-not-correct");
    return false;
  }
}
const modal = document.createElement("div");
modal.className = "modal fade modal-sm";
modal.setAttribute("id", `modal`);
modal.setAttribute("tabindex", "-1");
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-labelledby", "exampleModalCenterTitle");
modal.setAttribute("aria-hidden", "true");

//skapa modal-dialog
let modalDialog = document.createElement("div");
modalDialog.className = "modal-dialog modal-dialog-centered";
modalDialog.setAttribute("role", "document");
modal.append(modalDialog);

//skapa modal content
let modalContent = document.createElement("div");
modalContent.className = "modal-content";
modalDialog.append(modalContent);

//skapa modalHeader
let modalHeader = document.createElement("div");
modalHeader.className = "modal-header";
modalContent.append(modalHeader);

//skapa modal-title
let modalTitle = document.createElement("h5");
modalTitle.className = "modal-title";
modalTitle.setAttribute("id", "modal-title");
modalHeader.append(modalTitle);

//skapa modalbody
let modalBody = document.createElement("div");
modalBody.className = "modal-body";
modalContent.append(modalBody);

//skapa modal-footer
let modalFooter = document.createElement("div");
modalFooter.className = "modal-footer";
modalContent.append(modalFooter);

const yesBtn = document.createElement("button");
yesBtn.type = "button";
yesBtn.classList.add("btn", "btn-danger");
yesBtn.textContent = "Yes";
modalFooter.append(yesBtn);

const noBtn = document.createElement("button");
noBtn.type = "button";
noBtn.classList.add("btn", "btn-secondary");
noBtn.textContent = "No";

const completeBtn = document.querySelector(".complete-btn");

completeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  var name = document.getElementById("full-name").value;
  var street = document.getElementById("street-address").value;
  var postal = document.getElementById("postal-code").value;
  var city = document.getElementById("city").value;
  var mail = document.getElementById("e-mail").value;
  var phone = document.getElementById("phone-number").value;

  const uniqueItems = localStorage.getItem("uniqueItems");

  if (!uniqueItems || Object.keys(JSON.parse(uniqueItems)).length === 0) {
    
    document.querySelector(".error-message").innerHTML = "";
    document.querySelector(".error-message").innerHTML +=
      "Please add at least one product";
  } else if (
    checkValid(
      name.match(validRegexName) && 1 < name.length && name.length < 51,
      "full-name",
      name
    ) === true &&
    checkValid(
      street.match(validRegexStreet) && street.length < 51 && street.length > 3,
      "street-address",
      street
    ) === true &&
    checkValid(postal.match(validRegexPostal), "postal-code", postal) ===
      true &&
    checkValid(
      city.match(validRegexCity) && city.length < 51 && city.length > 1,
      "city",
      city
    ) === true &&
    checkValid(
      mail.match(validRegexMail) && mail.length < 51,
      "e-mail",
      mail
    ) === true &&
    checkValid(
      phone.match(validRegexPhone) && phone.length < 51,
      "phone-number",
      phone
    ) === true
  ) {
   
    modal.classList.add("show");
    modal.style.display = "block";
    modalTitle.innerHTML = "Purchase Completed";
    modalBody.innerHTML = `Thank you for your purchase <br> ${name}. We will send your order to you within 3-5 working days. 
    A receipt for your purchase will be sent to <br> ${mail}. <br><br>By clicking 'OK' your cart will be emptied and you will be redirected to the Product page. Your contact information will be cleared from storage.`;
    yesBtn.textContent = "OK";
    document.body.classList.add("modal-open");
  } else {
    document.querySelector(".error-message").innerHTML = "";
    document.querySelector(".error-message").innerHTML +=
      "Please fill out all fields correctly";
  }
});

const cancelBtn = document.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", () => {
  modal.classList.add("show");
  modal.style.display = "block";
  modalTitle.innerHTML = "Cancel purchase?";
  modalBody.innerHTML =
    "Do you want to cancel your purchase? Your cart will be emptied and you will be redirected to the Product page";
  modalFooter.append(noBtn);
  document.body.classList.add("modal-open");
});

yesBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});

noBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.body.appendChild(modal);

// Set the height of the list-div to be the same as the form-div
var formDivHeight = document.querySelector(".form-div").offsetHeight;
document.querySelector(".list-div").style.height = formDivHeight + "px";

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
      overallPrice += Number(e.price) * e.quantity;
      document.querySelector('.price-p').innerHTML=`€ ${overallPrice.toFixed(2)}`;
    }
  }
}
/**
const cancelModal = document.createElement('div');
cancelModal.className = "modal fade modal-sm";
cancelModal.setAttribute("id", `cancel-modal`);
cancelModal.setAttribute("tabindex", "-1");
cancelModal.setAttribute("role", "dialog");
cancelModal.setAttribute("aria-labelledby", "exampleModalCenterTitle");
cancelModal.setAttribute("aria-hidden", "true");

 //skapa modal-dialog
 let modalDialog = document.createElement("div");
 modalDialog.className = "modal-dialog modal-dialog-centered";
 modalDialog.setAttribute("role", "document");
 cancelModal.append(modalDialog);

 //skapa modal content
 let modalContent = document.createElement("div");
 modalContent.className = "modal-content";
 modalDialog.append(modalContent);

 //skapa modalHeader
 let modalHeader = document.createElement("div");
 modalHeader.className = "modal-header";
 modalContent.append(modalHeader);

 //skapa modal-title
 let modalTitle = document.createElement("h5");
 modalTitle.className = "modal-title";
 modalTitle.setAttribute("id", "exampleModalLongTitle");
 modalTitle.innerHTML = 'Cancel purchase?';
 modalHeader.append(modalTitle);

 //skapa modalbody
 let modalBody = document.createElement("div");
 modalBody.className = "modal-body";
 modalBody.innerHTML = 'Do you want to cancel your purchase? Your cart will be emptied and you will be redirected to the Product page.';
 modalContent.append(modalBody);

 //skapa modal-footer
 let modalFooter = document.createElement("div");
 modalFooter.className = "modal-footer";
 modalContent.append(modalFooter);

cancelBtn.addEventListener('click', () =>{
  cancelModal.classList.add('show');
  cancelModal.style.display='block';
  document.body.classList.add('modal-open');

});
const yesBtn = document.createElement('button');
yesBtn.type = 'button';
yesBtn.classList.add('btn', 'btn-danger');
yesBtn.textContent='Yes';
modalFooter.append(yesBtn);

const noBtn = document.createElement('button');
noBtn.type = 'button';
noBtn.classList.add('btn', 'btn-secondary');
noBtn.textContent='No';
modalFooter.append(noBtn);

yesBtn.addEventListener('click', ()=>{
localStorage.clear();
window.location.href = 'index.html';
});

noBtn.addEventListener('click', ()=>{
  cancelModal.style.display = 'none';
});

document.body.appendChild(cancelModal);
 */
