cart = JSON.parse(localStorage.getItem('cart'));

let productsHTML = '';

cart.forEach((cartItem,index) => {
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      productsHTML += `<div class="product-${index}">
      <div class="cart-item-container">
        <div class="delivery-date-${cartItem.productId} delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
            </div>
            <div>
              <span>
                Quantity:
              </span>  
              <span class="quantity-label-${cartItem.productId}">
                ${cartItem.quantity}
              </span>
              <span class="update-quantity-link-${cartItem.productId} link-primary">
                Update
              </span>
              <span class="delete-quantity-link-${cartItem.productId} link-primary">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}"
                id="check1"
                value="0">
              <div>
                <div class="delivery-option-date-${cartItem.productId} delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}"
                id="check2"
                value="499">
              <div>
                <div class="delivery-option-date-${cartItem.productId} delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}"
                id="check3"
                value="999">
              <div>
                <div class="delivery-option-date-${cartItem.productId} delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      `
      cartItem.shippingCost = 0;
    }
  })
});

document.querySelector('.order-summary').innerHTML = productsHTML;

let cartItemQuantity = 0;
cart.forEach((item) => {
  cartItemQuantity += item.quantity
});

document.querySelector('.return-to-home-link').innerHTML = `${cartItemQuantity} items`;

let costSummaryHTML = '';
let shippingCents = 0;

function costSummaryUpdate () {
  let itemCostCents = 0;
  
  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (cartItem.productId === product.id) {
        itemCostCents += (product.priceCents  * cartItem.quantity);
      }
    });
  });

  let itemCost = (itemCostCents / 100).toFixed(2);
  let shipping = (shippingCents / 100).toFixed(2);
  let costBeforeTax = ((itemCostCents + shippingCents) / 100).toFixed(2);
  let tax = Math.round(((itemCostCents + shippingCents) * 0.1)) / 100;
  let totalCost = (Number(costBeforeTax) + tax).toFixed(2);

  costSummaryHTML = `
  <div class="payment-summary-row">
    <div>Items (${cartItemQuantity}):</div>
    <div class="payment-summary-money">$${itemCost}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${shipping}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${costBeforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${tax}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${totalCost}</div>
  </div>
  `
  document.querySelector('.payment-info').innerHTML = costSummaryHTML;

  costOfGoods[0].total = totalCost;
};

costSummaryUpdate(); 

cart.forEach ((item) => {
  const radioButton = document.querySelectorAll(`input[name="delivery-option-${item.productId}"]`);

  const deliveryDate = document.querySelector(`.delivery-date-${item.productId}`);

  radioButton.forEach ((button) => {
    button.addEventListener('change', function () {
      if (button.checked) {
        item.shippingCost = Number(this.value);
        shippingCents = 0;
        shippingCostUpdate ();
        costSummaryUpdate ();
      }
      if (item.shippingCost === 0) {
        deliveryDate.innerHTML = `
        Delivery date: Tuesday, June 21`;
      } else if (item.shippingCost === 499) {
        deliveryDate.innerHTML = `
        Delivery date: Wednesday, June 15`;
      } else {
        deliveryDate.innerHTML = `
        Delivery date: Monday, June 13`;
      }
  });
  });
});

function shippingCostUpdate () {
  cart.forEach ((item) => {
    shippingCents += item.shippingCost;
  })
}

cart.forEach ((item) => {
  let updateButton = document.querySelector(`.update-quantity-link-${item.productId}`);
  
  updateButton.addEventListener ('click', () => {
    document.querySelector(`.quantity-label-${item.productId}`).innerHTML = `
    <input type="number"
    class="new-quantity-input"
    min="1"
    value="${item.quantity}">
    <span class="save-quantity-link-${item.productId} link-primary"> 
      Save 
    </span>
    `;
    updateButton.style.display = "none";

    let saveButton = document.querySelector(`.save-quantity-link-${item.productId}`)
    saveButton.addEventListener('click', () => {
      item.quantity = Number(document.querySelector('.new-quantity-input').value);
      costSummaryUpdate(); 
      document.querySelector(`.quantity-label-${item.productId}`).innerHTML = `
        ${item.quantity}
      `;
      updateButton.style.display= "inline";
    });
  });
});

cart.forEach ((item,index) => {
  let deleteButton = document.querySelector(`.delete-quantity-link-${item.productId}`);
  deleteButton.addEventListener('click', () => {
    cart.splice(index,1)
    document.querySelector(`.product-${index}`).remove();
  });
});

document.querySelector('.place-order-button').addEventListener('click', () => {
  localStorage.setItem('cart',JSON.stringify(cart));
  localStorage.setItem('costOfGoods',JSON.stringify(costOfGoods));
})