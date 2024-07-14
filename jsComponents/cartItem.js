const cartItem = ({ name, quantity, price }) => {
  const createCartItem = document.createElement("div");
  createCartItem.classList.add("cartItem");
  const itemHTML = `
            <div>
              <p class="cartItem__name">${name}</p>
              <p>
                <span class="cartItem__quantity">${quantity}x</span
                ><span class="cartItem__price">@$${price.toFixed(2)}</span
                ><span class="cartItem__totalPrice">$${(
                  price * quantity
                ).toFixed(2)}</span>
              </p>
            </div>
            <button class="deleteBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#CAAFA7"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </button>
          `;
  createCartItem.innerHTML = itemHTML;
  return createCartItem;
};
export default cartItem;
