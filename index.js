import newCard from "./jsComponents/newCard.js";
import cartItem from "./jsComponents/cartItem.js";
import { getCardContent, handleTotal } from "./jsComponents/utils.js";
let data;
let cartContent = [];
let order = {
  cartCounter: 0,
  orderTotal: 0,
};
fetch("./data.json")
  .then((resp) => resp.json())
  .then((json) => {
    data = json;
    const cards = document.querySelector(".cards");
    data.forEach((item) => {
      cards.appendChild(newCard(item));
    });
    const cartCounter = document.querySelector(".cartCounter");
    const totalPrice = document.querySelector(".totalPrice");
    const cartItems = document.querySelector(".cartItems");
    const addToCartButtons = document.querySelectorAll(".addToCartButton");
    const plusButtons = document.querySelectorAll(".plusButton");
    const minusButtons = document.querySelectorAll(".minusButton");
    let deleteBtns; ///create dom link when add new elements

    const rerender = () => {
      cartItems.innerHTML = "";
      cartContent.forEach((item) => {
        cartItems.appendChild(cartItem(item));
      });
      deleteBtns = document.querySelectorAll(".deleteBtn");
      deleteBtns.forEach((delBtn) => {
        delBtn.addEventListener("click", () => {
          const name = delBtn.previousElementSibling.children[0].textContent;
          const cartItem = delBtn.parentElement;
          const ind = cartContent.findIndex((el) => el.name === name);
          let { price, quantity } = cartContent[ind];
          let chosenButton = cartContent[ind].chosenButton;
          cartContent.splice(ind, 1);
          cartItem.remove();
          // console.log(cartContent, price);
          order.cartCounter -= quantity;
          cartCounter.innerText = order.cartCounter;
          order.orderTotal -= price * quantity;
          totalPrice.innerText = order.orderTotal.toFixed(2);
          chosenButton.classList.remove("chosen");
          chosenButton.children[1].children[1].innerText = 1;
        });
      });
    };
    ///card buttons//////////
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("chosen");
        let { quantity, item } = getCardContent(button);
        let { image, category, price } = data.find((el) => el.name === item);

        if (!cartContent.find((el) => el.name === item)) {
          let cartElem = {
            name: item,
            quantity,
            category,
            price,
            thumbnail: image.thumbnail,
            chosenButton: button,
          };
          cartContent.push(cartElem);
          handleTotal("+", price, order, cartCounter, totalPrice);
          rerender();
        }
      });
    });
    // plus minus buttons ////
    minusButtons.forEach((minusBtn) => {
      minusBtn.addEventListener("click", () => {
        if (minusBtn.nextElementSibling.textContent > 1) {
          minusBtn.nextElementSibling.textContent--;
          let item =
            minusBtn.parentElement.parentElement.parentElement.parentElement
              .children[2].textContent;
          let cartElem = cartContent.find((el) => el.name === item);
          cartElem.quantity--;
          handleTotal("-", cartElem.price, order, cartCounter, totalPrice);
          rerender();
        }
        // console.log(cartContent);
      });
    });
    plusButtons.forEach((plBtn) => {
      plBtn.addEventListener("click", () => {
        plBtn.previousElementSibling.textContent++;
        let item =
          plBtn.parentElement.parentElement.parentElement.parentElement
            .children[2].textContent;
        let cartElem = cartContent.find((el) => el.name === item);
        cartElem.quantity++;
        handleTotal("+", cartElem.price, order, cartCounter, totalPrice);
        rerender();

        // console.log(cartContent);
      });
    });
  });
