const getCardContent = (button) => {
  let quantity = button.children[1].textContent.trim();
  let item = button.parentElement.parentElement.children[2].textContent;
  return { quantity, item };
};
const handleTotal = (sign, price, order, cartCounter, totalPrice) => {
  if (sign === "+") {
    order.cartCounter++;
    cartCounter.innerText = order.cartCounter;
    order.orderTotal += price;
    totalPrice.innerText = order.orderTotal.toFixed(2);
  } else {
    order.cartCounter--;
    cartCounter.innerText = order.cartCounter;
    order.orderTotal -= price;
    totalPrice.innerText = order.orderTotal.toFixed(2);
  }
};

const getLayout = () => {
  let screenWidth = document.querySelector("body").clientWidth;
  if (screenWidth <= 900) return "mobile";
  if (screenWidth > 900) return "desktop";
};

export { getCardContent, handleTotal, getLayout };
