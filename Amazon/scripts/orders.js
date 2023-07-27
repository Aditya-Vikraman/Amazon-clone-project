cart = JSON.parse(localStorage.getItem('cart'));
costOfGoods = JSON.parse(localStorage.getItem('costOfGoods'));
console.log(cart);
let orderListHeaderHTML = '';
let orderListHTML = '';

let totalQuantity = 0;

cart.forEach((item) => {
  totalQuantity += item.quantity ;
});
document.querySelector('.cart-quantity').innerHTML = totalQuantity;

costOfGoods.forEach((item) => {
  orderListHeaderHTML = `
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>June 10</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${item.total}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
    </div>
  `;
});

document.querySelector('.order-header').innerHTML = orderListHeaderHTML;

cart.forEach((cartItem) => {
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      orderListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date-${cartItem.productId} product-delivery-date">
            Arriving on: June 21
          </div>
          <div class="product-quantity">
            Quantity: ${cartItem.quantity}
          </div>
          <button class="buy-again-button-${cartItem.productId} buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button-${cartItem.productId} track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
    }
  });
});

document.querySelector('.order-details-grid').innerHTML = orderListHTML;

cart.forEach ((item) => {
  let deliveryDate = document.querySelector(`.product-delivery-date-${item.productId}`);
  if (item.shippingCost === 0) {
    deliveryDate.innerHTML = 'Arriving on: June 21';
  } else if (item.shippingCost === 499) {
    deliveryDate.innerHTML = 'Arriving on: June 15';
  } else {
    deliveryDate.innerHTML = 'Arriving on: June 13';
  }

});

cart.forEach ((item) => {
  let addedTextTimeouts = {};
  let buyAgainButton = document.querySelector(`.buy-again-button-${item.productId}`);

  buyAgainButton.addEventListener('click', () => {
    buyAgainButton.innerHTML = `
      <span class="added-messsage"> &check; Added</span>
    `;

    let previousTimeoutId = addedTextTimeouts[item.productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    let timeoutId = setInterval(() => {
      buyAgainButton.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      `;
    }, 1500);
    addedTextTimeouts[item.productId] = timeoutId;
  });
});

cart.forEach ((item) => {
  let trackButton = document.querySelector(`.track-package-button-${item.productId}`);

  trackButton.addEventListener('click', () => {
    track[0].productId = `${item.productId}`;
    localStorage.setItem('track',JSON.stringify(track));
  });
});

