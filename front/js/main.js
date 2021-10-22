//cloneNode ... Cloner un élément.
//appendChild .. Ajouter un enfant.

fetch("http://localhost:3000/api/products/")
.then (function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value){
    value.forEach(element => console.log(element.imageUrl, element.name, element.description, element.altTxt));
    //    console.log(value);
})
.catch(function(err){
    console.log("Une erreur est survenue")
});

//document
    //.getElementsByClassName("productName")
    //.innerHTML = element.description;

let el = document.querySelector(".productName");
el.innerHTML = ("Téo");
console.log(el);


