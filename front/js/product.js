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

    for (let i = 0; i < produits.colors.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = produits.colors[i];
        document.querySelector("#colors").appendChild(option);
    }
}

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

function ajouterPanier() {
    let panier;
    
    if (localStorage.getItem("myCart") === null) {
        panier = [];
    } else {
        panier = JSON.parse(localStorage.getItem("myCart"));
    }
    
    for (var i = 0; i < panier.length; i++) {
        console.log(panier[i].id); //comparer a ID
    }

    if (panier[i].id === ID ){
        
    }

    let canap = {id: ID, qte: document.querySelector("#quantity").value}
    panier.push(canap);
    localStorage.setItem("myCart", JSON.stringify(panier));



    
    // deuxième approche
    //console.log(canap.id)
    //let clePanier = "panier";
    //let nombrePanier = localStorage.length+1;
    //localStorage[clePanier + nombrePanier] = JSON.stringify(panier); 
    //console.log(localStorage.getItem("panier1"))
    
    //localStorage.setItem(ID, document.querySelector("#quantity").value); // première approche
    
    

    //let canap = {id: ID, qte: document.querySelector("#quantity").value}
    //let panier = localStorage.getItem("panier");
    //console.log(canap);
    //panier.push(canap);
    //panier = JSON.parse(panier); //Lorsque je récupère un getItem il faut parse pour le manipuler
    //localStorage.setItem("panier", JSON.stringify(panier));


    //JSON.parse : chaîne de caractère => objet / JSON.stringify : object => chaîne de caractère


    //localStorage.setItem('id', ID);
    //let quantite = document.querySelector("#quantity").value;
    //localStorage.setItem("qte", quantite);
    //localStorage.setItem("qte" , document.querySelector("#quantity").value);  Autre manière d'appliquer le local storage sur la quantité
};
