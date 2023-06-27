const returnButton = document.querySelectorAll(".return__page");
returnButton.forEach(e =>{
e.addEventListener("click", previousPage);
})
// select add to cart button 
// select shopping cart container
const addToCartButton = document.querySelectorAll(".addToCart__button");
const shoppingCart = document.querySelectorAll(".cart__main");
const clearCartButton = document.querySelectorAll(".cart__clear");
const cartCounter = document.querySelectorAll(".number");
const payButton = document.querySelector(".button__checkout--cart")
/// value holder for counter of product page + cart/checkout
let totalCount = 1
let number = document.querySelectorAll(".number");

// update innerHTML for cart items
let amount = document.querySelector(".cart__amount");
let subTotal = document.querySelectorAll(".cart__subtotal");
let navAmount = document.querySelector(".nav__cart--total");

// get cart from local storage + update
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


//adds event to all add to cart buttons
addToCartButton.forEach(e => {
    e.addEventListener("click", addToCart);
})
// adds event to all clear from cart buttons
clearCartButton.forEach(e =>{
e.addEventListener("click", emptyCart);
})

// select plus/minus counter from product pages
const minusButton = document.querySelectorAll(".minus");
const plusButton = document.querySelectorAll(".plus");
// increases/decreases pages counter
plusButton.forEach(e => {
e.addEventListener("click", increaseCounter)
});
minusButton.forEach(e => {
    e.addEventListener("click", decreaseCounter)
});


// increases counter for product page
function increaseCounter(e){
    totalCount ++
    number.forEach(e => e.innerHTML = totalCount);
    changeNumberOfUnits("plus", e.target.getAttribute('name'));
    updateCart()
}
// decreases counter for product page
function decreaseCounter(){
    if(totalCount>1){
        totalCount --
    }
    number.forEach(e => e.innerHTML = totalCount);
    updateCart()
}


// fetch data from data.json then appeend it to shopping cart
function addToCart(e){
    //get id of product
    let id = e.target.id;

    fetch("../data.json")
    .then(res => res.json())
        .then(data =>{
            // if item already in cart increment amount
            if(cart.some((item) => item.id === data[id].id)){  
                changeNumberOfUnits("plus", data[id].id)
            }else{/// if not in cart push item in array
                const item = data.find((product) => product.id === data[id].id)

                cart.push({
                    ...item,
                    numberOfUnits : 1,
                });
            }
            updateCart();

        }).catch(err =>{
            console.log(err)
        })
}

// render subtotal
  function  renderSubTotal(){
    let totalItems = 0;
    let totalPrice = 0;
    let shipping = 50;
    let VAT = 0;
    let grandTotal = 0;
    let firstItem =  0
    //sums up all prcies from products added to cart
    cart.forEach((item) =>{
        totalPrice += item.price  * item.numberOfUnits;
        totalItems += item.numberOfUnits;
        grandTotal += totalPrice + shipping
        VAT += (totalPrice / 100 ) * 20;
    });

    if(cart.length > 0){
        firstItem = cart[0].numberOfUnits
    }
    
    // store vat + total in local sotrage
    localStorage.setItem("grandTotal",JSON.stringify(grandTotal));
    localStorage.setItem("VAT", JSON.stringify(VAT));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
    localStorage.setItem("firstCartItem", JSON.stringify(firstItem));

    

    // updates price on all pages
    subTotal.forEach( e => e.innerHTML = totalPrice);
    amount.innerHTML = " " + totalItems;
  }

//render cart items
function renderCartItems(){
    shoppingCart.forEach(e =>{
        e.innerHTML = "";
    })
    // updates cart with cart items
    cart.forEach((item) =>{
    shoppingCart.forEach(e =>{
    e.innerHTML += `
        <div class="shoppingcart__item">
            <div class="shoppingcart__row">
              <img src="${item.cartImage}" alt="" class="shoppingcart__img" onclick="removeItemFromCart(${item.id})">
              <div class="shoppingcart__price--wrapper">
                <h2 class="shoppingcart__title">${item.name}</h2>
                <h3 class="shoppingcart__price">$ ${item.price}</h3>
              </div>
            </div>
    
              <div class="quantity__counter shoppingcart__counter">
                <button class="minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
                <p class="number">${item.numberOfUnits}</p>
                <button class="plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
              </div>
          </div>`     
    })
    })
}


// removes item on click
function removeItemFromCart(id){
   cart = cart.filter((item) => item.id !== id)
    updateCart();
}

// change number of units for item
function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits 
        if(item.id === id){
            if(action === "minus" && numberOfUnits > 1 ){
                numberOfUnits --;
            }else if(action === "plus"){
                // increase shopping cart by the amount of tolalcount selected
                numberOfUnits += totalCount
            }
            // resets totalCount to 0 + updates html
            totalCount = 1;
            number.forEach(e => e.innerHTML = totalCount);
        }
        
        
        return{
            ...item,
            numberOfUnits,
        };
    });
    updateCart();
}

// removes all items from shopping cart
function emptyCart(){
    cart = [];
    updateCart();
}

// goes to previous page
function previousPage(){
   window.history.go(-1); 
   return false
}


// update cart
function updateCart(){
    renderCartItems();
    renderSubTotal();
    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}



 

