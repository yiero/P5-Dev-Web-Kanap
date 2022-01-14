
let cart = JSON.parse(localStorage.getItem('myCart'));
let cartFetch;
let canap; 

async function showCart() {  
    let totalPriceCart = 0;  
    for (var i = 0; i < cart.length; i++) {
        canap = cart[i];
        cartFetch = "http://localhost:3000/api/products/" + canap.id; 
        await fetch(cartFetch) 
        .then(function(res){
            if (res.ok) {
                return res.json();
            }
        }) 
        .then(function(produit){
            totalPriceCart += getProduit(produit, canap.qte);
        })
        .catch(function(err){
            console.log("Une erreur est survenue")
        })
    }
    document.querySelector(".cart__item").remove();

    const reducer = (accumulator, curr) => accumulator + curr;
    let totalQuantity = cart.map(cart => cart.qte).reduce(reducer);
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
    document.querySelector("#totalPrice").innerHTML = totalPriceCart;

    //document.getElementById("order").addEventListener("click", supprimerProduit);
}

showCart();

function getProduit(produit, qte) {
    const totalPrice = produit.price * qte;
    var cloneProduct = document.querySelector(".cart__item").cloneNode(true);
    cloneProduct.querySelector("#name_product").innerHTML = produit.name;
    cloneProduct.querySelector("#price").innerHTML = totalPrice + " €";
    cloneProduct.querySelector("#canap_cart_img").src = produit.imageUrl;
    cloneProduct.querySelector("#canap_cart_img").alt = produit.altTxt;     
    cloneProduct.querySelector(".itemQuantity").value = qte;
    document.getElementById("cart__items").appendChild(cloneProduct);

    return totalPrice;
}

function supprimerProduit() {
    localStorage.clear();
}

function send () {
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
    let products = [];
    for (const item of cart) {
        console.log(item);
        products.push(item.id);
    };
    let body = {contact: contact, products: products};
    console.log(body);
    
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        localStorage.setItem("order", value.orderId);
        window.location.href = "D:/Workspace/Dev/P5-Dev-Web-Kanap/front/html/confirmation.html";
    })
}

document.querySelector("#order").addEventListener('click', function (e){
    e.preventDefault();
    send();
});