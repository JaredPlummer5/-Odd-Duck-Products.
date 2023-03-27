/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
//table.addEventListener('click', removeItemFromCart);

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
    loadCart();
    clearCart();
    showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
    let tableRow = document.querySelectorAll("tbody tr");
    for (let i = 0; i < tableRow.length; i++) {
        tableRow[i].remove();
    }

}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // Find the table body
  const tbody = document.querySelector('#cart tbody');

  // Clear the existing table body
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  // Iterate over the items in the cart and add them to the table
  for (const item of state.cart.items) {
    const tr = document.createElement('tr');

    // Create a TD for the delete link, quantity, and item
    const tdDelete = document.createElement('td');
    tdDelete.innerHTML = 'X';

    const tdQuantity = document.createElement('td');
    tdQuantity.innerHTML = item.quantity;

    const tdProduct = document.createElement('td');
    tdProduct.innerHTML = item.product;

    // Add an event listener to the delete link
    tdDelete.addEventListener('click', () => {
      state.cart.removeItem(item);
      state.cart.saveToLocalStorage();
      renderCart();
    });

    // Add the TDs to the TR
    tr.appendChild(tdDelete);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdProduct);

    // Add the TR to the table body
    tbody.appendChild(tr);
  }
}

function removeItemFromCart(event) {
    // When a delete link is clicked, remove the corresponding item from the cart.
    if (event.target.innerHTML === "X") {
        let clickedItem = event.target.parentElement;
        let deletedItemName = clickedItem.children[2].innerHTML;

        for (let i = 0; i < state.cart.items.length; i++) {
            let item = state.cart.items[i].product;
            if (item.name === deletedItemName) {
                state.cart.items.splice(i, 1);
                break;
            }
        }

        // Save the cart back to local storage.
        state.cart.saveToLocalStorage();

        // Re-draw the cart table.
        renderCart();
        showCart();
    }
}



// This will initialize the page and draw the cart on screen



renderCart();

