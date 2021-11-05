function afficherItem(item) {
    var clone = document.querySelector(".link").cloneNode(true);
    clone.querySelector(".productName").innerHTML = item.name; // création fonction qui permet de cloner et remplacer les éléments.
    clone.querySelector(".productDescription").innerHTML = item.description;
    clone.querySelector(".canapImg").src = item.imageUrl; 
    clone.querySelector(".canapImg").alt = item.altTxt;
    console.log(item._id)
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