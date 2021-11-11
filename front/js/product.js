let url = window.location.search;
urlSearch = new URLSearchParams(url);
let ID = urlSearch.get("id"); //récupération de l'id dans la barre de recherche
let urlFetch = "http://localhost:3000/api/products/" + ID; // création variable fetch + url

function afficherProduit(produits){
    document.querySelector("#title").innerHTML = produits.name
    document.querySelector("#img_canap").src = produits.imageUrl;
    document.querySelector("#img_canap").alt = produits.altTxt;
    document.querySelector("#price").innerHTML = produits.price;
    document.querySelector("#description").innerHTML = produits.description;

    let couleurSélectionnée = 0;
    for (let i = 0; i < produits.colors.lenght; i++) {
        if (produits.colors[i].selected) {
            couleurSélectionnée++;
        }
    }
    console.log(couleurSélectionnée);
    return couleurSélectionnée;
}

fetch(urlFetch)
    .then (function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        const produits = value;
        afficherProduit(produits);
    })
    .catch(function(err){
        console.log("Une erreur est survenue")
    });

