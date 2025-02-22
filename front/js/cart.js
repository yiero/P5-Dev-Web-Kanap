let cart = JSON.parse(localStorage.getItem('myCart'));
let cartFetch;
let canap; 

// afficher le contenu du panier
async function showCart() {  
    let totalPriceCart = 0;  
    // Création d'une boucle pour chaque éléments présent dans le localStorage afin de les fetch un par un pour accéder à leur spécifications techniques.
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
            totalPriceCart += getProduit(produit, canap.qte, canap.color, i); 
        })
        .catch(function(err){
            console.log("Une erreur est survenue")
        })
    }
    
    document.querySelector(".cart__item").remove();

    // Calcul du prix total des articles contenus dans le panier, ainsi que le prix total des canapés (si nous avons 3 canapés identiques par exemple, multiplier son prix par 3).
    // Ensuite afficher la valeur pour l'utilisateur grâce au DOM.
    const reducer = (accumulator, curr) => accumulator + curr;
    let totalQuantity = cart.map(cart => cart.qte).reduce(reducer);
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
    document.querySelector("#totalPrice").innerHTML = totalPriceCart;
}

showCart();

// Création d'un clone du html que l'on bouclera sur la fonction ci-dessus, pour pouvoir afficher chaque produits enregistrer dans le localStorage en détail.
function getProduit(produit, qte, color, i) { 
    const totalPrice = produit.price * qte;
    var cloneProduct = document.querySelector(".cart__item").cloneNode(true);
    cloneProduct.querySelector("#name_product").innerHTML = produit.name;
    cloneProduct.querySelector("#price").innerHTML = totalPrice + " €";
    cloneProduct.querySelector("#canap_cart_img").src = produit.imageUrl;
    cloneProduct.querySelector("#canap_cart_img").alt = produit.altTxt;     
    cloneProduct.querySelector(".itemQuantity").value = qte;
    cloneProduct.querySelector(".itemQuantity").addEventListener('change', function(event) {
        updateQuantity(event, i);
    });
    cloneProduct.querySelector("#color").innerHTML = color;
    const elt = cloneProduct.querySelector(".deleteItem");
    elt.addEventListener('click', function () {         
        supprimerProduit(i);              
    });
    document.getElementById("cart__items").appendChild(cloneProduct);

    return totalPrice;
}

//Mise à jour de la quantité grâce à l'input.
function updateQuantity(e, i) {
    let value = parseInt(e.target.value);
    if (value > 0) {
        cart[i].qte = value;
        localStorage.setItem('myCart', JSON.stringify(cart));
    }
    location.reload();
};

//Suppression d'un produit du panier
function supprimerProduit(i) {
    if (i > -1) {
        cart.splice(i, 1)
    }
    localStorage.setItem('myCart', JSON.stringify(cart));
    location.reload(); 
};

// Création du fetch avec une méthode POST. A l'inverse des fetch précédents nous allons envoyer des informations à l'API (le formulaire complet et un tableau contenant son panier).
// En retour on récupérera la réponse (ici le numéro de commande généré par l'API).
// Pour terminer, on redirige l'utilisateur sur la page "confirmation" à l'aide d'un window.location.href et de l'url de la page.
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
        window.location.href = "D:/Workspace/Dev/P5-Dev-Web-Kanap/front/html/confirmation.html" + "?order=" + value.orderId;
    })
}

// Vérification des données entrées par l'utilisateur dans le formulaire par le biais de regex
document.querySelector("#order").addEventListener('click', function (e){
    e.preventDefault();

    let isFormValid = true;
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    let onlyText = /^([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ]+)$/;
    let textAndNumber = /([0-9a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ])/;
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    document.getElementById("firstNameErrorMsg").innerHTML = "";
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    document.getElementById("addressErrorMsg").innerHTML = "";
    document.getElementById("cityErrorMsg").innerHTML = "";
    document.getElementById("emailErrorMsg").innerHTML = "";
    
    if (! firstName.value.match(onlyText)) {
        document.getElementById("firstNameErrorMsg").innerHTML = "Prénom invalide";
        isFormValid = false;
    } 

    if (! lastName.value.match(onlyText)) {
        document.getElementById("lastNameErrorMsg").innerHTML = "Nom invalide";
        isFormValid = false;
    }

    if (! address.value.match(textAndNumber)) {
        document.getElementById("addressErrorMsg").innerHTML = "Adresse invalide";
        isFormValid = false;
    }

    if (! city.value.match(onlyText)) {
        document.getElementById("cityErrorMsg").innerHTML = "Ville inexistante";
        isFormValid = false;
    }

    if (! email.value.match(validEmail)) {
        document.getElementById("emailErrorMsg").innerHTML = "Email Invalide";
        isFormValid = false;
    }

    if (isFormValid) {
        send()
    }
});
