class ProductGridComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Mock data - in a real application this would come from an API
    this.allProducts = [
      {
        id: 1,
        title: "Lorem ipsum dolor sit amet consectetur",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 2,
        title: "Adipiscing elit sed do eiusmod tempor",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 3,
        title: "Incididunt ut labore et dolore magna",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: null
      },
      {
        id: 4,
        title: "Aliqua enim ad minim veniam quis",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 5,
        title: "Nostrud exercitation ullamco laboris",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: null
      },
      {
        id: 6,
        title: "Nisi ut aliquip ex ea commodo consequat",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 7,
        title: "Duis aute irure dolor in reprehenderit",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 8,
        title: "Voluptate velit esse cillum dolore",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: null
      },
      {
        id: 9,
        title: "Fugiat nulla pariatur excepteur sint",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 10,
        title: "Occaecat cupidatat non proident sunt",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 11,
        title: "In culpa qui officia deserunt mollit",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: null
      },
      {
        id: 12,
        title: "Anim id est laborum sed ut perspiciatis",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 13,
        title: "Unde omnis iste natus error sit",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: null
      },
      {
        id: 14,
        title: "Voluptatem accusantium doloremque",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: null
      },
      {
        id: 15,
        title: "Laudantium totam rem aperiam eaque",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: null
      }
    ];

    this.filteredProducts = [...this.allProducts];
    this.currentSearchTerm = '';

    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/ProductGrid/product-grid-component.css');
      </style>
      <div class="product-grid-container">
        <breadcrumb-component count="${this.filteredProducts.length}" search-term="${this.currentSearchTerm}"></breadcrumb-component>
        <div class="products-grid">
          ${this.renderProducts()}
        </div>
      </div>
    `;
  }

  renderProducts() {
    return this.filteredProducts.map(product => `
      <product-component
        id="${product.id}"
        name="${product.title}"
        price="${product.price}"
        ${product.oldPrice ? `old-price="${product.oldPrice}"` : ''}
        ${product.installment ? `installment="${product.installment}"` : ''}
        ${product.badge ? `badge="${product.badge}"` : ''}
        ${product.image ? `image="${product.image}"` : ''}
        description="${product.title}"
      ></product-component>
    `).join('');
  }

  searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    this.currentSearchTerm = searchTerm;

    if (!searchTerm) {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    this.render();
  }

  setupEventListeners() {
    // Listen for search events from the header
    document.addEventListener('search-products', (event) => {
      this.searchProducts(event.detail.query || '');
    });
  }
}

customElements.define('product-grid-component', ProductGridComponent); 