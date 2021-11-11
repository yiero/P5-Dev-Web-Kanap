function afficherItem(item) {
    var clone = document.querySelector(".link").cloneNode(true);
    clone.querySelector(".productName").innerHTML = item.name; // création fonction qui permet de cloner et remplacer les éléments.
    clone.querySelector(".productDescription").innerHTML = item.description;
    clone.querySelector(".canapImg").src = item.imageUrl; 
    clone.querySelector(".canapImg").alt = item.altTxt;
    clone.href = "./product.html?id=" + item._id;
    document.getElementById("items").appendChild(clone);
}

fetch("http://localhost:3000/api/products/")
    .then (function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        const items = value;
        items.forEach(item => afficherItem(item));
        document.querySelector(".link").remove();
    })
    .catch(function(err){
        console.log("Une erreur est survenue")
});
// ..  récupération de l'array Products avec un fetch pour récupérer le contenu. Création d'une boucle forEach pour sortir les différentes lignes composant l'array
// ..  ici les différentes fiches produits (CANAPE : nom/image/description/altTxt etc)  