// hamburger menu
const hamburgerIcon = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger__menu");
const hamburgerItem = document.querySelectorAll(".hamburger__link");

hamburgerIcon.addEventListener("click", toggleHamburgerMenu);
hamburgerItem.forEach(e => {
    e.addEventListener("click", () =>{
        hamburgerMenu.classList.remove("active")
        overlay.classList.remove("active");
    })
});

// toggles hamburger menu when clicked
// + removes hamburger menu when active
function toggleHamburgerMenu(){
    cartMenu.classList.remove("active");
    hamburgerMenu.classList.toggle("active");
    overlay.classList.add("active");
    
    if(hamburgerMenu.classList.contains("active")){
        overlay.classList.add("active");
    }else{
        overlay.classList.remove("active");
    }
}

// cart menu
const cartIcon = document.querySelector(".cart");
const cartButton = document.querySelector(".button__cart");
const cartMenu = document.querySelector(".cart__menu");

cartIcon.addEventListener("click", toggleCartMenu);
// removes cart menu + overlay when button is clicked
cartButton.addEventListener("click", ()=>{
    overlay.classList.remove("active")
    cartMenu.classList.remove("active");
})

// toggles cart menu when clicked
//+ removes hamburger menu when active
function toggleCartMenu(){
    hamburgerMenu.classList.remove("active");
    cartMenu.classList.toggle("active");

    if(cartMenu.classList.contains("active")){
        overlay.classList.add("active");
    }else{
        overlay.classList.remove("active");
    }
}


// when overlay is clicked removes cart + hamburger
const overlay = document.querySelector(".overlay");
// removes cart + hamburger menu when clicked out of menu
overlay.addEventListener("click", () =>{
    hamburgerMenu.classList.remove("active");
    cartMenu.classList.remove("active");
    overlay.classList.remove("active");
})






