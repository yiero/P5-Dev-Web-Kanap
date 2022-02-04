let url = window.location.search;
urlSearch = new URLSearchParams(url);
let order = urlSearch.get("id");

document.querySelector("#orderId").innerHTML = order;

// Récupération du numéro de commande stocker dans le barre d'adresse
// Nous l'affichons ensuite sur la page grâce au DOM.