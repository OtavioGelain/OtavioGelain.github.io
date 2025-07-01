class ProductListComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.products = [
      {
        id: '1',
        name: 'Caderno Universitário',
        price: 25.9,
        image: 'https://dummyimage.com/200x200&text=Caderno%20Universit%C3%A1rio',
        description:
          'Caderno universitário capa dura com 10 matérias, 200 folhas.',
      },
      {
        id: '2',
        name: 'Estojo Escolar',
        price: 18.5,
        image: 'https://dummyimage.com/200x200&text=Estojo',
        description:
          'Estojo escolar com 3 compartimentos, material resistente.',
      },
      {
        id: '3',
        name: 'Lápis de Cor',
        price: 32.75,
        image: 'https://dummyimage.com/200x200&text=L%C3%A1pis',
        description: 'Conjunto com 24 lápis de cor, ponta macia e resistente.',
      },
      {
        id: '4',
        name: 'Mochila Escolar',
        price: 129.9,
        image: 'https://dummyimage.com/200x200&text=Mochila',
        description:
          'Mochila escolar com compartimento para notebook e bolsos laterais.',
      },
    ];
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/ProductList/product-list-component.css');
        .more-products-container {
          text-align: center;
          margin-top: 40px;
        }
      </style>
      <section class="product-list-section">
        <div class="container">
          <h2 class="section-title">Produtos em Destaque</h2>
          <div class="product-list">
            ${this.renderProducts()}
          </div>
          <div class="more-products-container">
            <button-component variant="primary" size="large" icon="arrow-right">
              MAIS PRODUTOS
            </button-component>
          </div>
        </div>
      </section>
    `;
  }

  setupEventListeners() {
    const moreProductsButton = this.shadowRoot.querySelector('button-component');
    if (moreProductsButton) {
      moreProductsButton.addEventListener('button-click', () => {
        window.location.href = 'pages/products-view/products-view.html';
      });
    }
  }

  renderProducts() {
    return this.products
      .map(
        (product) => `
      <product-component
        id="${product.id}"
        name="${product.name}"
        price="${product.price}"
        image="${product.image}"
        description="${product.description}"
      ></product-component>
    `
      )
      .join('');
  }
}

customElements.define('product-list-component', ProductListComponent);
