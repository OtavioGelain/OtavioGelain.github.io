class CartComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cartItems = [];
    this.isOpen = false;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('components/Cart/cart-component.css');
      </style>
      <div class="cart-overlay ${this.isOpen ? 'active' : ''}"></div>
      <div class="cart-sidebar ${this.isOpen ? 'open' : ''}">
        <div class="cart-header">
          <h2>Seu Carrinho</h2>
          <button class="close-cart">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="cart-items">
          ${this.renderCartItems()}
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span>R$ ${this.calculateTotal().toFixed(2)}</span>
          </div>
          <button class="checkout-btn">Finalizar Compra</button>
          <button class="continue-shopping-btn">Continuar Comprando</button>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  renderCartItems() {
    if (this.cartItems.length === 0) {
      return '<p class="empty-cart-message">Seu carrinho está vazio</p>';
    }

    return this.cartItems
      .map(
        (item) => `
      <div class="cart-item" data-id="${item.id}">
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="item-price">R$ ${item.price.toFixed(2)}</p>
          <div class="quantity-control">
            <button class="decrease-quantity">-</button>
            <span class="item-quantity">${item.quantity}</span>
            <button class="increase-quantity">+</button>
          </div>
        </div>
        <button class="remove-item">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `
      )
      .join('');
  }

  calculateTotal() {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  setupEventListeners() {
    const closeBtn = this.shadowRoot.querySelector('.close-cart');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCart());
    }

    const overlay = this.shadowRoot.querySelector('.cart-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeCart());
    }

    const continueBtn = this.shadowRoot.querySelector('.continue-shopping-btn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.closeCart());
    }

    this.setupCartItemControls();

    document.addEventListener('toggle-cart', () => this.toggleCart());

    document.addEventListener('add-to-cart', (event) => {
      if (event.detail) {
        this.addToCart(event.detail);
      }
    });
  }

  setupCartItemControls() {
    const increaseButtons =
      this.shadowRoot.querySelectorAll('.increase-quantity');
    increaseButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const itemId = e.target.closest('.cart-item').dataset.id;
        this.updateItemQuantity(itemId, 1);
      });
    });

    const decreaseButtons =
      this.shadowRoot.querySelectorAll('.decrease-quantity');
    decreaseButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const itemId = e.target.closest('.cart-item').dataset.id;
        this.updateItemQuantity(itemId, -1);
      });
    });

    const removeButtons = this.shadowRoot.querySelectorAll('.remove-item');
    removeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const itemId = e.target.closest('.cart-item').dataset.id;
        this.removeItem(itemId);
      });
    });
  }

  toggleCart() {
    this.isOpen = !this.isOpen;
    this.render();
  }

  openCart() {
    this.isOpen = true;
    this.render();
  }

  closeCart() {
    this.isOpen = false;
    this.render();
  }

  addToCart(product) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.cartItems.push({
        ...product,
        quantity: product.quantity || 1,
      });
    }

    this.updateCartCount();
    this.render();
    this.openCart();
  }

  updateItemQuantity(itemId, change) {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        this.removeItem(itemId);
      } else {
        this.render();
      }

      this.updateCartCount();
    }
  }

  removeItem(itemId) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.updateCartCount();
    this.render();
  }

  updateCartCount() {
    const totalItems = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    document.dispatchEvent(
      new CustomEvent('update-cart-count', {
        detail: { count: totalItems },
      })
    );
  }
}

customElements.define('cart-component', CartComponent);
