//inputs + error messages
const inputs = document.querySelectorAll("input");
const errorMessage = document.querySelectorAll(".checkout__error");
const checkoutButton = document.querySelector(".button__checkout--cart")
checkoutButton.addEventListener("click", validateForm);

// radio buttons
const borderOne = document.querySelector(".payment__row--one");
const borderTwo = document.querySelector(".payment__row--two");
const paymentOption = document.querySelector(".checkout__payment--option")
borderOne.addEventListener("click", radioButtonEmoney);
borderTwo.addEventListener("click", radioButtonDelivery);

// import grandtotal + vat from localStorage
const grandTotalHTML = document.querySelector(".cart__grandtotal");
const vatHTML = document.querySelector(".cart__total--vat");

// if cart changes prices gets updated
updatePrice();
document.addEventListener("click", updatePrice);

const backToMain = document.querySelector(".backToHome")
backToMain.addEventListener("click", backToMainPage)
//resets all inputs after client is finshed
function backToMainPage(){
    const orderMenu = document.querySelector(".order__menu--wrapper")
    const overlay = document.querySelector(".checkout__overlay");
    inputs.forEach(e => e.innerHTML = "");
    localStorage.removeItem("CART");
    localStorage.removeItem("grandTotal");
    localStorage.removeItem("VAT");
    localStorage.removeItem("totalItems");
    localStorage.removeItem("firstCartItem");
    orderMenu.style.display = "none"
    overlay.style.display = "none"
}

// gets grandtotal from localstorage + updates innerHTML
function updatePrice(){
    let grandTotalLocalStorage = JSON.parse(localStorage.getItem("grandTotal"));
    let VATLocalStorage = JSON.parse(localStorage.getItem("VAT"));
    let totalItems  = JSON.parse(localStorage.getItem("totalItems"));
    let firstItem  = JSON.parse(localStorage.getItem("firstCartItem"));

    vatHTML.innerHTML = " " + Math.floor(VATLocalStorage) || 0;
    grandTotalHTML.innerHTML = "$ "+ grandTotalLocalStorage || 0;

    // updates order menu items
    let totalItemsOrderMenu = document.querySelector(".order__product--amount")
    let grandTotalOrderMenu = document.querySelector(".order__grandtotal--price")
    grandTotalOrderMenu.innerHTML = "$ " + grandTotalLocalStorage || 0;
    totalItemsOrderMenu.innerHTML = totalItems - firstItem || 0;
}

//add styles when radio button one selected
function radioButtonEmoney(){
        borderOne.style.borderColor = "#D87D4A";
        borderTwo.style.borderColor = "#CFCFCF";   
        paymentOption.style.display = "grid";
        inputs[7].checked = true
        borderTwo.style.marginBottom = "0"
}

//add styles when radio button two selected
function radioButtonDelivery(){
    borderTwo.style.borderColor = "#D87D4A";
    borderOne.style.borderColor = "#CFCFCF";
    paymentOption.style.display = "none";
    inputs[8].checked = true
    borderTwo.style.marginBottom = "32px"
}

// check if all inputs return true
function validateForm(){
   const orderMenu = document.querySelector(".order__menu--wrapper")
   const overlay = document.querySelector(".checkout__overlay");
    if(checkName() && checkEmail() && checkPhoneNumber()  && checkAddress()  && checkZipCode() 
    && checkCity() && checkCountry() && checkEmoneyNumber() && checkEmoneyPin()){
        checkName(); checkEmail();
        checkPhoneNumber(); checkAddress();
        checkZipCode(); checkCity();
        checkCountry(); checkEmoneyNumber();
        checkEmoneyPin();
        orderMenu.style.display = "grid"
        overlay.style.display = "block"

    }    else{
        checkName(); checkEmail();
        checkPhoneNumber(); checkAddress();
        checkZipCode(); checkCity();
        checkCountry(); checkEmoneyNumber();
        checkEmoneyPin();
    }
    }


// checks name input
function checkName(){
    if(inputs[0].value.match(/^[A-Za-z-\s]+$/)){
        removeError(0,0)
        return true
    }else{
        showError(0,0)
    }
}
/// email input
function checkEmail(){
    if (inputs[1].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
    removeError(1,1)
    return true
    }else{
        showError(1,1)
    }
}
//phone input
function checkPhoneNumber(){
    if (inputs[2].value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)){
    removeError(2,2)
    return true
    }else{
        showError(2,2)
    }
}
//address input
function checkAddress(){
    if (inputs[3].value.match(/\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/)){
    removeError(3,3)
    return true
    }else{
        showError(3,3)
    }
}
//zipcode input
function checkZipCode(){
    if (inputs[4].value.match(/^\d{5}(-\d{4})?$/)){
    removeError(4,4)
    return true
    }else{
        showError(4,4)
    }
}
// city input
function checkCity(){
    if (inputs[5].value.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)){
    removeError(5,5)
    return true
    }else{
        showError(5,5)
    }
}
// country input
function checkCountry(){
    if (inputs[6].value.match(/[a-zA-Z]{2,}/)){
    removeError(6,6)
    return true
    }else{
        showError(6,6)
    }
}
// emoney number input
function checkEmoneyNumber(){
    if (inputs[9].value.match(/^\d+$/) && inputs[9].value.length === 9){
    removeError(9,7)
    return true
    }else{
        showError(9,7)
    } 
}
// emoney pin input
function checkEmoneyPin(){
    if (inputs[10].value.match(/^\d+$/) && inputs[10].value.length === 4){
    removeError(10,8)
    return true
    }else{
        showError(10,8)
    }

}

//shows error message
function showError(input,error){
    inputs[input].style.borderColor = "red";
    errorMessage[error].style.display = "block";
}
// removes error message
function removeError(input,error){
    inputs[input].style.borderColor = "";
    errorMessage[error].style.display = "none";
}
