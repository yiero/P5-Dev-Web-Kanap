
let idProduit = localStorage.getItem('panier1');
idProduit = JSON.parse(idProduit);
console.log(idProduit)
let idCanap = idProduit ;
let cartFetch = "http://localhost:3000/api/products/" + idCanap;

fetch(cartFetch) 
.then(function(res){
    if (res.ok) {
        return res.json();
    }
}) 
.then(function(value){
    getProduit(value);
})
.catch(function(err){
    console.log("Une erreur est survenue")
})

function getProduit(produit) {
    document.querySelector("#name_product").innerHTML = produit.name;
    document.querySelector("#price").innerHTML = produit.price + " €";
    document.querySelector("#canap_cart_img").src = produit.imageUrl;
    document.querySelector("#canap_cart_img").alt = produit.altTxt;
    let quantity = localStorage.getItem('qte');
    document.querySelector(".itemQuantity").value = quantity;
    document.querySelector("#totalQuantity").innerHTML = quantity;
    document.querySelector("#totalPrice").innerHTML = quantity * produit.price;
    document.querySelector(".deleteItem").addEventListener("click", supprimerProduit(produit._id));
    
}
function supprimerProduit(id) {
    localStorage.removeItem();
}

//for (var i = 0; i < localStorage.length; i++) {
//    console.log(localStorage.getItem(localStorage.key(i)));
//}

//document.querySelector("#price").innerHTML = produits.price * quantity;
