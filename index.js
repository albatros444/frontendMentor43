import newCard from "./jsComponents/newCard.js";
import cartItem from "./jsComponents/cartItem.js";
import orderItem from "./jsComponents/orderItem.js";
import {
  getCardContent,
  handleTotal,
  getLayout,
} from "./jsComponents/utils.js";
let data;
let cartContent = [];
let order = {
  cartCounter: 0,
  orderTotal: 0,
};
/////screen width////
let screenWidth;
let layout = getLayout();

///
fetch("./data.json")
  .then((resp) => resp.json())
  .then((json) => {
    data = json;
    const cards = document.querySelector(".cards");
    data.forEach((item) => {
      cards.appendChild(newCard(item, layout));
    });
    const body = document.querySelector("body");
    const cartCounter = document.querySelector(".cartCounter");
    const totalPrice = document.querySelector(".totalPrice");
    const cartItems = document.querySelector(".cartItems");
    const addToCartButtons = document.querySelectorAll(".addToCartButton");
    const plusButtons = document.querySelectorAll(".plusButton");
    const minusButtons = document.querySelectorAll(".minusButton");
    let deleteBtns; ///create dom link when add new elements
    const confirmOrderBtn = document.querySelector(".confirmOrderButton");
    const emptyCartImg = document.querySelector(".emptyCartImg");
    const emptyCartText = document.querySelector(".emptyCartText");
    const carbonNeutral = document.querySelector(".carbonNeutral");
    const orderItems = document.querySelector(".items"); ///box in order items to separate from total
    const confirmedModal = document.querySelector(".confirmedModal");
    const totalOrderPrice = document.querySelector(".totalOrderPrice");
    const startNewOrderBtn = document.querySelector(".startNewOrderBtn");
    const allquantities = document.querySelectorAll(".quantity");
    const cardImages = document.querySelectorAll(".cardImg");

    window.addEventListener("resize", () => {
      layout = getLayout();
      // screenWidth = document.querySelector("body").clientWidth;
      // console.log(screenWidth, layout);
      if (layout === "desktop") {
        console.log("rerender");
        data.forEach((item, i) => {
          cardImages[i].src = item.image.desktop;
        });
      } else if (layout === "mobile") {
        console.log("rerender");
        data.forEach((item, i) => {
          cardImages[i].src = item.image.mobile;
        });
      }
    });
    ////functions/////////
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
          if (cartContent.length === 0) {
            console.log("empty");
            emptyCartImg.style.display = "block";
            emptyCartText.style.display = "block";
            totalPrice.style.display = "none";
            carbonNeutral.style.display = "none";
            confirmOrderBtn.style.display = "none";
          }
        });
      });
      console.log(cartContent);
    };

    const closeModal = () => {
      cartContent = [];
      rerender();
      order.cartCounter = 0;
      order.orderTotal = 0;
      cartCounter.innerText = order.cartCounter;
      totalPrice.innerText = order.orderTotal;
      orderItems.innerText = "";
      allquantities.forEach((q) => {
        q.innerText = 1;
      });
      console.log(cartContent, order);
      ///styles
      body.classList.remove("body-modal-open");
      confirmedModal.style.display = "none";
      emptyCartImg.style.display = "block";
      emptyCartText.style.display = "block";
      totalPrice.style.display = "none";
      carbonNeutral.style.display = "none";
      confirmOrderBtn.style.display = "none";
      addToCartButtons.forEach((btn) => {
        btn.classList.remove("chosen");
      });
    };

    ///card buttons//////////
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("chosen");
        if (cartContent.length === 0) {
          emptyCartImg.style.display = "none";
          emptyCartText.style.display = "none";
          totalPrice.style.display = "flex";
          carbonNeutral.style.display = "flex";
          confirmOrderBtn.style.display = "inline-block";
        }
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
    confirmOrderBtn.addEventListener("click", () => {
      body.classList.add("body-modal-open");
      confirmedModal.style.display = "flex";
      cartContent.forEach((item) => {
        orderItems.appendChild(orderItem(item));
        totalOrderPrice.innerText = order.orderTotal.toFixed(2);
      });
    });
    startNewOrderBtn.addEventListener("click", () => {
      closeModal();
    });
    confirmedModal.addEventListener("click", () => {
      closeModal();
    });
  });
