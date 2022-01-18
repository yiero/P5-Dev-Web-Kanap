let order = localStorage.getItem('order');

document.querySelector("#orderId").innerHTML = order;

// Récupération du numéro de commande stocker dans le localStorage, grâce à un GET.
// Nous l'affichons ensuite sur la page grâce au DOM.