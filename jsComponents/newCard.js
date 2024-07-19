export default function newCard(item, layout) {
  let { name, category, price, image } = item;

  const createCard = document.createElement("div");
  createCard.classList.add("card");
  const itemHTML = `  
      <div class="imgDiv">
          <picture>
            <source media="(max-width: 1104px)" srcset=${image.mobile}>
            <img   
            class="cardImg"
            src=${image.desktop}
            alt=""
            />
          </picture>
              <div class="addToCartButton">
                <p class="buttonText">Add to Cart</p>
                <div class="defineQuantity">
                  <button class="minusButton">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="2"
                      fill="none"
                      viewBox="0 0 10 2"
                    >
                      <path d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                  </button>
                  <p class="quantity">1</p>
                  <button class="plusButton">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <p class="desertType">${category}</p>
            <h2>${name}</h2>
            <p class="price">$${price.toFixed(2)}</p>`;
  createCard.innerHTML = itemHTML;
  return createCard;
}
