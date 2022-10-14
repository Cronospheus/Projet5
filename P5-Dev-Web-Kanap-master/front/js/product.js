const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");

/* PROMESSE POUR ALLER CHERCHER LE PRODUIT PAR SON ID*/

let promise = fetch(`http://localhost:3000/api/products/${id}`);
promise.then(async (result) => {
  try {
    data = await result.json();
    articles(data);
  } catch (e) {
    document.querySelector("#title").innerHTML = "<h1>Error 404</h1>";
  }
});

/* FONCTION POUR AFFICHER LES ARTICLES EN DETAILS */

function articles(article) {
  let image = document.querySelector(".item__img");
  let positionImage = document.createElement("img");
  positionImage.setAttribute("src", article.imageUrl);
  positionImage.setAttribute("alt", article.altTxt);
  image.appendChild(positionImage);

  let positionName = document.querySelector("#title");
  positionName.textContent = article.name;

  let positionPrice = document.querySelector("#price");
  positionPrice.textContent = article.price;

  let positionDescription = document.querySelector("#description");
  positionDescription.textContent = article.description;

  let positionColors = document.querySelector("#colors");

  for (i = 0; i < article.colors.length; i++) {
    positionColors.innerHTML += `<option value="${article.colors[i]}">${article.colors[i]}</option>`;
  }
}

/****************************************************************************** */
/* AJOUT AU PANIER */
const btn = document.querySelector("#addToCart");
const color = document.getElementById("colors");
const product = document.getElementById("title");
const description = document.getElementById("description");
const number = document.getElementById("quantity");
const price = document.getElementById("price");

/* EVENT SUR LE BOUTON POUR AJOUTER LE PRODUIT AU PANIER*/

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const colorChoose = color.value;
  const numberProduct = Number(number.value);

  let optionProduct = {
    id: id,
    color: colorChoose,
    quantity: numberProduct,
  };
  if (numberProduct > 0 && numberProduct <= 100 && colorChoose != "") {
    addBasket(optionProduct);
  }
});

/* FONCTION POUR SAUVEGARDER LE PANIER*/

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

/* FONCTION POUR ALLER CHERCHER LES INFORMATIONS DANS LE PANIER*/

function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

/* FONCTION POUR AJOUTER DES PRODUITS DANS LE PANIER*/

function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p) => p.id == product.id && p.color == product.color
  );
  console.log(foundProduct);
  if (!foundProduct) {
    basket.push(product);
    saveBasket(basket);
  } else {
    foundProduct.quantity += product.quantity;
    saveBasket(basket);
  }
  console.log(foundProduct);
}
const popupConfirmation = () => {
  if (
    window.confirm(`${product.innerText} couleur: ${colorChoose} a bien été ajouté à votre panier
  Consultez le panier OK ou revenir à l'accueil ANNULER`)
  ) {
    window.location.href = "cart.html";
  } else {
    window.location.href = "index.html";
  }
};
