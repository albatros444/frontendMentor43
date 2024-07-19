const orderItem = ({ name, quantity, price, thumbnail }) => {
  const createOrderItem = document.createElement("div");
  createOrderItem.classList.add("item");
  const itemHTML = ` <div class="item__left">
                <img src=${thumbnail} alt="" />
                <div class="box">
                  <p class="name">${name}</p>
                  <p class="quantPr">
                    <span class="quantity">${quantity}x</span
                    ><span class="price">@$${price.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <div class="item__right">
                <p>$${(price * quantity).toFixed(2)}</p>
              </div>`;
  createOrderItem.innerHTML = itemHTML;

  return createOrderItem;
};
export default orderItem;
