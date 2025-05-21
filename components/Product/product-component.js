class ProductComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['id', 'name', 'price', 'image', 'description'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const id = this.getAttribute('id') || '';
    const name = this.getAttribute('name') || 'Produto';
    const price = parseFloat(this.getAttribute('price') || '0');
    const image =
      this.getAttribute('image') || 'https://via.placeholder.com/200';
    const description =
      this.getAttribute('description') || 'Descrição do produto';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('components/Product/product-component.css');
      </style>
      <div class="product-card">
        <div class="product-image">
          <img src="${image}" alt="${name}" />
        </div>
        <div class="product-info">
          <h3 class="product-name">${name}</h3>
          <p class="product-description">${description}</p>
          <div class="product-price">R$ ${price.toFixed(2)}</div>
          <button class="add-to-cart-btn">
            <i class="fas fa-shopping-cart"></i>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const addToCartBtn = this.shadowRoot.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const product = {
          id: this.getAttribute('id'),
          name: this.getAttribute('name'),
          price: parseFloat(this.getAttribute('price') || '0'),
          image: this.getAttribute('image'),
          quantity: 1,
        };

        document.dispatchEvent(
          new CustomEvent('add-to-cart', {
            detail: product,
          })
        );
      });
    }
  }
}

customElements.define('product-component', ProductComponent);
