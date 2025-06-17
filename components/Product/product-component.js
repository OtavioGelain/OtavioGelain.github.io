class ProductComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isFavorite = false;
    this.render();
  }

  static get observedAttributes() {
    return ['id', 'name', 'price', 'old-price', 'installment', 'badge', 'image', 'description'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  generatePlaceholderImage() {
    return `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#f8f9fa"/>
            <rect x="60" y="60" width="80" height="80" rx="8" fill="#dee2e6"/>
            <circle cx="85" cy="85" r="8" fill="#adb5bd"/>
            <path d="M70 120 L85 105 L100 115 L115 100 L130 120 Z" fill="#adb5bd"/>
            <text x="100" y="160" font-family="Arial" font-size="12" fill="#6c757d" text-anchor="middle">Sem imagem</text>
        </svg>
    `)}`;
  }

  render() {
    const id = this.getAttribute('id') || '';
    const name = this.getAttribute('name') || 'Produto';
    const price = parseFloat(this.getAttribute('price') || '0');
    const oldPrice = this.getAttribute('old-price') ? parseFloat(this.getAttribute('old-price')) : null;
    const installment = this.getAttribute('installment') || '';
    const badge = this.getAttribute('badge') || '';
    const image = this.getAttribute('image') || this.generatePlaceholderImage();
    const description = this.getAttribute('description') || 'Descrição do produto';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Product/product-component.css');
      </style>
      <div class="product-card" data-product-id="${id}">
        ${badge ? `<div class="product-badge">${badge}</div>` : ''}
        
        <div class="product-image">
          <a href="/pages/product/product-detail.html?id=${id}" class="product-link">
            <img src="${image}" alt="${name}" loading="lazy">
          </a>
          <button class="product-favorite" data-favorite="false">
            <i class="far fa-heart"></i>
          </button>
        </div>
        
        <div class="product-info">
          <h3 class="product-title">
            <a href="/pages/product/product-detail.html?id=${id}" class="product-title-link">${name}</a>
          </h3>
          
          <div class="product-price">
            ${oldPrice ? `<span class="price-old">R$ ${oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
            <span class="price-current">R$ ${price.toFixed(2).replace('.', ',')}</span>
            ${installment ? `<div class="price-installment">${installment}</div>` : ''}
          </div>
          
          <button class="product-button">
            <i class="fas fa-shopping-cart"></i>
            Comprar
          </button>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const addToCartBtn = this.shadowRoot.querySelector('.product-button');
    const favoriteBtn = this.shadowRoot.querySelector('.product-favorite');

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

    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        this.toggleFavorite();
      });
    }
  }

  toggleFavorite() {
    const favoriteBtn = this.shadowRoot.querySelector('.product-favorite');
    const icon = favoriteBtn.querySelector('i');

    if (icon.classList.contains('far')) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      icon.style.color = '#ff6500';
      this.isFavorite = true;
      favoriteBtn.setAttribute('data-favorite', 'true');
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
      icon.style.color = '';
      this.isFavorite = false;
      favoriteBtn.setAttribute('data-favorite', 'false');
    }

    // Dispatch favorite event
    document.dispatchEvent(
      new CustomEvent('toggle-favorite', {
        detail: {
          productId: this.getAttribute('id'),
          isFavorite: this.isFavorite
        }
      })
    );
  }
}

customElements.define('product-component', ProductComponent);
