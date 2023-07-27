track = JSON.parse(localStorage.getItem('track'));
cart = JSON.parse(localStorage.getItem('cart'));

let totalQuantity = 0;

cart.forEach ((item) => {
  totalQuantity += item.quantity;
});
document.querySelector('.cart-quantity').innerHTML = totalQuantity;

let orderTrackingHTML = '';

track.forEach ((trackItem) => {
  cart.forEach ((cartItem) => {
    products.forEach ((product) => {
      if(trackItem.productId === cartItem.productId && trackItem.productId === product.id) {
        orderTrackingHTML =  `
          <div class="delivery-date-${cartItem.productId} delivery-date">
            Arriving on Monday, June 13
          </div>

          <div class="product-info">
            ${product.name}
          </div>

          <div class="product-info">
            Quantity: ${cartItem.quantity}
          </div>

          <img class="product-image" src="${product.image}">

          <div class="progress-labels-container">
            <div class="progress-label">
              Preparing
            </div>
            <div class="progress-label current-status">
              Shipped
            </div>
            <div class="progress-label">
              Delivered
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
        `;
      }
    });
  });
});
document.querySelector('.order-tracking').innerHTML = orderTrackingHTML;

track.forEach ((trackItem) => {
  cart.forEach ((item) => {
    if (trackItem.productId === item.productId) {
      let deliveryDate = document.querySelector(`.delivery-date-${item.productId}`);
      if (item.shippingCost === 0) {
        deliveryDate.innerHTML = 'Arriving on Tuesday, June 21'
      } else if (item.shippingCost === 499) {
        deliveryDate.innerHTML = 'Arriving on Wednesday, June 15'
      } else {
        deliveryDate.innerHTML = 'Arriving on Monday, June 13'
      }
    }
  });
});
