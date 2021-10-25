//cloneNode ... Cloner un élément.
//appendChild .. Ajouter un enfant.

for (var i = 0; i < 7; i++) {
    var clone = document.querySelector(".link").cloneNode(true);
    document.getElementById("items").appendChild(clone);
}

// ..  dupplication du html 8 fois. 


fetch("http://localhost:3000/api/products/")
    .then (function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        const item = value;
        item.forEach(element => console.log(element.name));     
    })
    .catch(function(err){
        console.log("Une erreur est survenue")
});

// ..  récupération de l'array Products avec un fetch pour récupérer le contenu. Création d'une boucle for in pour sortir les différentes lignes composant l'array
// ..  ici les différentes fiches produits (CANAPE : nom/image/description/altTxt etc)  

// ..  étape 1 : corriger le clonage pour pouvoir créer les 8 sections qui vont contenir les fiches produits / FAIT.
// ..  étape 2 : réussir à manipuler la réponse du fichier json (avec json.parse())
// ..  étape 3 : avec l'étape 2, pouvoir sortir les élément qui m'intéressent (nom, image, description, altTxt)
// ..  étape 4 : les mettres en relation sur les bons id/class grace aux méthodes .getElementById / .getElementsByClass ainsi que .innerHTML en bouclant tout ça pour ne pas devoir tout inscrire manuellement


let student = {name:"Téo", age: 24, degree:"Masters"};
for (var item in student) {
    console.log(student[item])
}


//document
//.getElementsByClassName("productName")
//.innerHTML = element.description;

//let el = document.querySelector(".productName");
//el.innerHTML = ("Téo");
//console.log(el);

//exemple boucle forEach
// ..
//item.forEach(element => console.log(element.imageUrl, element.name, element.description, element.altTxt));

//exemple boucle for in
// ..
//for (var id in item) {
//    console.log(item[id])
//}