/* FONCTION POUR ALLER CHERCHER LE PANIER DANS LE LOCALESTORAGE*/

const getBasket = () => {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    console.error("Panier vide");
    document.querySelector("#cartAndFormContainer").innerHTML =
      "<h1>Votre panier est vide!</h1>";
    return [];
  } else {
    return JSON.parse(basket);
  }
};
/* FONCTION POUR SAUVEGARDER DANS LE LOCALESTORAGE*/

const saveBasket = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

/* FONCTION POUR ALLER CHERCHER L'ID D'UN PRODUIT*/

async function searchInfo(product_id) {
  let result = await fetch(`http://localhost:3000/api/products/${product_id}`);
  return await result.json();
}

/* FONCTION POUR AFFICHER LES PRODUITS*/

async function displayProductsCart() {
  let basket = getBasket();

  for (let i = 0; i < basket.length; i++) {
    let item = await searchInfo(basket[i].id);

    doDisplayProduct(item, basket[i], (total = 0));
  }
}

function doDisplayProduct(item, basket, total) {
  let sectionProduct = document.getElementById("cart__items");
  let article = document.createElement("article");
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", item._id);
  article.setAttribute("data-color", item.colors[0]);
  sectionProduct.appendChild(article);

  let image = document.createElement("div");
  image.setAttribute("class", "cart__item__img");

  let positionImage = document.createElement("img");
  positionImage.setAttribute("src", item.imageUrl);
  positionImage.setAttribute("alt", item.altTxt);
  image.appendChild(positionImage);

  let itemContent = document.createElement("div");
  itemContent.setAttribute("class", "cart__item__content");

  let itemContentDescription = document.createElement("div");
  itemContentDescription.setAttribute(
    "class",
    "cart__item__content__description"
  );
  itemContent.appendChild(itemContentDescription);

  let positionName = document.createElement("h2");
  positionName.textContent = item.name;

  let positionColor = document.createElement("p");
  positionColor.textContent = basket.color;

  let positionPrice = document.createElement("p");
  positionPrice.textContent = item.price + " €";
  itemContentDescription.append(positionName, positionColor, positionPrice);

  let itemContentSettings = document.createElement("div");
  itemContentSettings.setAttribute("class", "cart__item__content__settings");

  let itemsSettingsQuantity = document.createElement("div");
  itemsSettingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );

  let quantity = document.createElement("p");
  quantity.textContent = "Qté : ";

  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("class", "itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", basket.quantity);

  itemsSettingsQuantity.append(quantity, input);

  let itemsSettingsDelete = document.createElement("div");
  itemsSettingsDelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );

  let itemsDelete = document.createElement("p");
  itemsDelete.setAttribute("class", "deleteItem");
  itemsDelete.textContent = "Supprimer";

  itemsSettingsDelete.appendChild(itemsDelete);
  itemContentSettings.append(itemsSettingsQuantity, itemsSettingsDelete);

  itemContent.appendChild(itemContentSettings);
  article.append(image, itemContent);

  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = getNumberProduct();

  let totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML = getTotalPrice(item.price, total);

  /* EVENT POUR MODIFIER LA QUANTITE D'UN PRODUIT*/

  input.addEventListener("change", () =>
    changeQuantity(basket.id, basket.color, input.value)
  );

  /* EVENT POUR SUPPRIMER UN PRODUIT*/

  itemsDelete.addEventListener("click", () => {
    removeFromBasket(basket);
    location.reload();
  });
}

displayProductsCart();

/* FONCTION POUR SUPPRIMER LE PRODUIT DU PANIER*/

function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id || p.color != product.color);

  saveBasket(basket);
}

/* FONCTION POUR CHANGER LA QUANTITE*/

function changeQuantity(id, color, newValue) {
  let basket = getBasket();
  foundProduct = basket.find((item) => item.id === id && item.color == color);
  if (newValue <= 0) {
    alert("votre produit a été supprimé du panier");
  }
  if (newValue > 100 || newValue < -1) {
    alert("Veuillez sélectionner un nombre entre 1 et 100");
  } else {
    foundProduct.quantity = Number(newValue);
    saveBasket(basket);
  }

  location.reload();
}

/* FONCTION POUR RECUPERER LE NOMBRE DE PRODUIT*/

function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

/* FONCTION PRIX TOTAL*/

function getTotalPrice(priceItem, total) {
  let basket = getBasket();

  for (let product of basket) {
    total += product.quantity * priceItem;
  }
  return total;
}

// CONST POUR LE FORMULAIRE DE COMMANDE
/*********************************************************/

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const errorFirstName = document.getElementById("firstNameErrorMsg");
const errorLastName = document.getElementById("lastNameErrorMsg");
const errorAdress = document.getElementById("addressErrorMsg");
const errorCity = document.getElementById("cityErrorMsg");
const errorEmail = document.getElementById("emailErrorMsg");
const btnFormulaire = document.getElementById("order");

/*FONCTION EVENT SUR LE BOUTON POUR ENVOYER LES INFORMATIONS PANIER ET FORMULAIRES */
/************************************************************* */

btnFormulaire.addEventListener("click", (e) => {
  e.preventDefault();
  let basket = getBasket();
  let users = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  let errors = 0;

  /*FONCTION REGEX FORMULAIRE*/

  const checkFormFirstName = (firstName) => {
    const regexFirstName = /^[a-zA-Z-éè]{2,20}$/g;
    const validFirstName = regexFirstName.test(firstName.value);
    if (validFirstName) {
      errorFirstName.innerText = "";
    } else {
      errorFirstName.innerText = "Veuillez saisir un prénom correct";
      errors++;
    }
  };

  const checkFormLastName = (lastName) => {
    const regexFirstName = /^[a-zA-Z-éè]{2,20}$/g;
    const validLastName = regexFirstName.test(lastName.value);
    if (validLastName) {
      errorLastName.innerText = "";
    } else {
      errorLastName.innerText = "Veuillez saisir un nom correct";
      errors++;
    }
  };

  const checkFormAdress = (adress) => {
    const regexAdress = /^([0-9]{1,5}) ?([a-zA-Z,\. ]+)$/g;
    const validAdress = regexAdress.test(adress.value);
    if (validAdress) {
      errorAdress.innerText = "";
    } else {
      errorAdress.innerText = "Veuillez saisir une adresse correct";
      errors++;
    }
  };

  const checkFormCity = (city) => {
    const regexCity = /^([0-9]{5}) ?([a-zA-Z]+)$/g;
    const validCity = regexCity.test(city.value);
    if (validCity) {
      errorCity.innerText = "";
    } else {
      errorCity.innerText = "Veuillez saisir le code postale puis la ville";
      errors++;
    }
  };

  const checkFormEmail = (email) => {
    const regexmail = /^[\w\.]+@[\w\.]+\.{1}[\w]+$/g;
    const validEmail = regexmail.test(email.value);
    if (validEmail) {
      errorEmail.innerText = "";
    } else {
      errorEmail.innerText = "Veuillez saisir une adresse mail correct";
      errors++;
    }
  };

  checkFormFirstName(firstName);
  checkFormLastName(lastName);
  checkFormAdress(address);
  checkFormCity(city);
  checkFormEmail(email);

  if (errors === 0) {
    let products = [];
    for (let listId of basket) {
      products.push(listId.id);
    }

    fetchPostOrder(users, products);
    console.log(products);
  }
});

/* FONCTION FETCH POST POUR RECUPERER LES INFOS*/

const fetchPostOrder = (contact, products) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("order", JSON.stringify(data));
      document.location.href = "confirmation.html";
    })
    .catch((erreur) => console.log("erreur : " + erreur));
};
