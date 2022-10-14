/* FONCTION POUR AFFICHER LES ARTICLES */

const displayProducts = (products) => {
  let allArticles = document.getElementById("items");

  for (produit of products) {
    let link = document.createElement("a");
    link.setAttribute("href", "product.html?id=" + produit._id);

    let article = document.createElement("article");

    let image = document.createElement("img");
    image.setAttribute("src", produit.imageUrl);
    image.setAttribute("alt", produit.altTxt);

    let title = document.createElement("h3");
    title.setAttribute("class", "productName");
    title.innerText = produit.name;

    let description = document.createElement("p");
    description.setAttribute("class", "productDescription");
    description.innerText = produit.description;

    allArticles.appendChild(link);
    link.appendChild(article);
    article.append(image, title, description);
  }
};

/* FONCTION POUR ALLER CHERCHER LES PRODUITS DANS L'API*/

const init = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();

    displayProducts(data);
  } catch (e) {
    document.querySelector(".titles").innerHTML = "<h1>Error 404</h1>";
  }
};

init();
