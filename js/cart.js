/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

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

    // TODO: Find the table body
    //let Table = document.getElementById("cart");
    let items = state.cart.items;
    // TODO: Iterate over the items in the cart
    for (let i = 0; i < state.cart.items.length; i++) {
        // TODO: Create a TR
        let CartTableRow = document.createElement("tr")

        // TODO: Create a TD for the delete link, quantity,  and the item
        let CartTableDataForDeletedLink = document.createElement("td");
        CartTableDataForDeletedLink.innerHTML = "X"

        let CartTableDataForQuantity = document.createElement("td");
        CartTableDataForQuantity.innerHTML = items[i].quantity;

        let CartTableDataForItem = document.createElement("td");
        CartTableDataForItem.innerHTML = state.cart.items[i].product;
        // TODO: Add the TR to the TBODY and each of the TD's to the TR
        CartTableRow.append(CartTableDataForDeletedLink, CartTableDataForQuantity, CartTableDataForItem);

        table.append(CartTableRow);
        document.body.append(table);
    }
    console.log(items)
}



function removeItemFromCart(event) {
    // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
    //let Table = document.getElementById("cart");
    let TableTr = document.getElementsByTagName("tr");
    console.log(TableTr);
    if (event.target.innerHTML === "X") {
        //console.log("Was Clicked");
        //console.log(event.target)
        let clickedItem = event.target.parentElement;
        let deletedItem = clickedItem.children[2].innerHTML;

        console.log("deletedItem data type is a",typeof(deletedItem));
        for (let i = 0; i < state.cart.items.length; i++) {
            let item =  state.cart.items[i].product
            console.log(item)
            if (item.name === deletedItem) {
                console.log(typeof(deletedItem));
                item.remove()
                
                console.log("state.cart.items[i].product data type is a",typeof(state.cart.items[i].product));
                
                
                console.log(state.cart.items[i].product);

                TableTr.remove()



            }
        }

    }
    // TODO: Save the cart back to local storage
    //let cartString = JSON.stringify(cart.state);
    //localStorage.setItem('cart', cartString);
    
    // TODO: Re-draw the cart table
    renderCart();
    showCart() ;
}


// This will initialize the page and draw the cart on screen



renderCart();