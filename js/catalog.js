/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElementForTheForm = document.getElementById('items');

  for (let i in state.allProducts) {
    let OptionsForItems = document.createElement("option")
    let NamesOfProducts = state.allProducts[i].name
    OptionsForItems.innerHTML = NamesOfProducts
    selectElementForTheForm.append(OptionsForItems)
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault()
  // Do all the things ...
  //addproductToCart();
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let product = document.querySelector("select").value
  for (let i = 0; i < state.allProducts.length; i++) {
    if (state.allProducts[i].name === product) {
      let quantity = document.getElementById("quantity").value
      // TODO: get the quantity
      // TODO: using those, add one item to the Cart
      let UserAddedProduct = new CartItem(product, quantity)
      console.log(UserAddedProduct)
      state.cart.items.push(UserAddedProduct)
      console.log(state.cart.items)
    }
  }
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  let quantity = document.getElementById("quantity").value
  let product = document.querySelector("select").value

  // TODO: Add a new element to the cartContents div with that information
  let cartContentsDiv = document.getElementById("cartContents");
  for (let i = 0; i < state.allProducts.length; i++) {
    if (state.allProducts[i].name === product) {
      for (let j = 0; j < quantity; j++) {
        let ImageForProductSelected = document.createElement("img");
        ImageForProductSelected.src = state.allProducts[i].filePath;
        cartContentsDiv.append(ImageForProductSelected);
      }
    }
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();


