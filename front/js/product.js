let url = window.location.search;
urlSearch = new URLSearchParams(url);
let ID = urlSearch.get("id"); // Récupération de l'id dans la barre de recherche.
let urlFetch = "http://localhost:3000/api/products/" + ID; // Création variable fetch + url.

// Afficher le produit sélectionné grâce au DOM (même principe que la fonction de la page index.js).
function afficherProduit(produits){
    document.querySelector("#title").innerHTML = produits.name
    document.querySelector("#img_canap").src = produits.imageUrl;
    document.querySelector("#img_canap").alt = produits.altTxt;
    document.querySelector("#price").innerHTML = produits.price;
    document.querySelector("#description").innerHTML = produits.description;

    // boucle for qui permettra d'afficher les couleurs disponibles dans le menu déroulant.
    for (let i = 0; i < produits.colors.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = produits.colors[i];
        document.querySelector("#colors").appendChild(option);
    }
}

// Fetch qui aura le même principe que le fetch de la page index.js, la particularité est que celui-ci va cibler directement le produit qui nous intéresse grâce 
// à la variable urlFetch, qui regroupe le lien du fetch utilisé précédemment auquel on ajoute l'ID du produit concerné et cibler un produit spécifique.
fetch(urlFetch)
.then (function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value){
    afficherProduit(value);
})
.catch(function(err){
    console.log("Une erreur est survenue")
});


document.getElementById("addToCart").addEventListener("click", ajouterPanier);

// Fonction utiliser au-dessus, qui s'éxecute au moment du click sur le bouton "ajouter au panier".
// Ici nous allons créer le localStorage, créer un array appelé panier que l'on remplira à certaines conditions pour, par la suite, pouvoir y accéder plus tard 
// sur la page "panier" par exemple.
// Pour résumer, à chaque clique sur le bouton "ajouter au panier" nous allons sauvegarder notre produit ce-dernier sera conservé tout au long de notre session sur la page.
function ajouterPanier() {
    let panier;
   
    if (localStorage.getItem("myCart") === null) {
        panier = [];
    } else {
        panier = JSON.parse(localStorage.getItem("myCart"));
    }
    
    for (var i = 0; i < panier.length; i++) {
        console.log(panier[i].id); 
    }
    
    let quantity =  parseInt(document.querySelector("#quantity").value);
    let canap = {id: ID, qte: quantity}
    if (canap.qte > 0) {
        panier.push(canap);
        localStorage.setItem("myCart", JSON.stringify(panier));
    }
};
