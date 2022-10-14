/* FONCTION POUR AFFICHER LE NUMERO DE COMMANDE*/

const renderConfirmPage = () => {
  let order = JSON.parse(localStorage.getItem("order"));
  const orderIdSpan = document.getElementById("orderId");
  orderIdSpan.innerHTML = "<br>" + order.orderId;
  localStorage.clear();
};
renderConfirmPage();
