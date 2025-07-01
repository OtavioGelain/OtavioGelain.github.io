class ProductPageComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentImageIndex = 0;
    this.quantity = 1;
    this.product = {
      id: '',
      name: '',
      price: 0,
      images: [],
      description: '',
      category: '',
      specifications: {},
      reviews: []
    };
    this.render();
  }

  static get observedAttributes() {
    return ['product-id', 'product-name', 'product-price', 'product-images', 'product-description'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateProductData();
      this.render();
    }
  }

  updateProductData() {
    this.product = {
      id: this.getAttribute('product-id') || '1',
      name: this.getAttribute('product-name') || 'Caderno Universitário 96 Folhas',
      price: parseFloat(this.getAttribute('product-price') || '25.90'),
      images: this.getAttribute('product-images') ?
        this.getAttribute('product-images').split(',') :
        ['/images/caderno1.jpg', '/images/caderno2.jpg', '/images/caderno3.jpg'],
      description: this.getAttribute('product-description') ||
        'Caderno universitário com 96 folhas pautadas, capa dura resistente, ideal para anotações e estudos. Papel de alta qualidade que não borra com caneta esferográfica.',
      category: 'Cadernos',
      specifications: {
        'Número de folhas': '96',
        'Tipo de pauta': 'Pauta simples',
        'Formato': 'Universitário',
        'Capa': 'Capa dura',
        'Papel': '75g/m²'
      },
      reviews: [
        { user: 'Ana Silva', rating: 5, comment: 'Excelente caderno, papel de ótima qualidade!' },
        { user: 'João Santos', rating: 4, comment: 'Muito bom, recomendo!' },
        { user: 'Maria Costa', rating: 5, comment: 'Perfeito para anotações da faculdade.' }
      ]
    };
  }

  render() {
    this.updateProductData();

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/ProductPage/product-page-component.css');
      </style>
      
      <div class="product-page">
        <header class="page-header">
          <div class="breadcrumb">
            <a href="/index.html">Início</a>
            <i class="fas fa-chevron-right"></i>
            <a href="/pages/products-view/products-view.html">Produtos</a>
            <i class="fas fa-chevron-right"></i>
            <span>${this.product.category}</span>
            <i class="fas fa-chevron-right"></i>
            <span class="current">${this.product.name}</span>
          </div>
        </header>

        <main class="product-container">
          <section class="product-gallery">
            <div class="main-image-container">
              <img id="mainImage" src="${this.product.images[0]}" alt="${this.product.name}" />
              <div class="image-controls">
                <button class="image-nav prev" id="prevImage">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button class="image-nav next" id="nextImage">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
              <div class="zoom-indicator">
                <i class="fas fa-search-plus"></i>
                <span>Clique para ampliar</span>
              </div>
            </div>
            
            <div class="thumbnails">
              ${this.product.images.map((img, index) => `
                <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                     data-index="${index}" alt="Imagem ${index + 1}">
              `).join('')}
            </div>
          </section>

          <section class="product-info">
            <div class="product-header">
              <h1>${this.product.name}</h1>
              <div class="product-rating">
                ${this.generateStars(4.7)}
                <span class="rating-text">4.7 (${this.product.reviews.length} avaliações)</span>
              </div>
            </div>

            <div class="price-section">
              <div class="price-main">R$ ${this.product.price.toFixed(2).replace('.', ',')}</div>
              <div class="price-installments">
                ou 12x de R$ ${(this.product.price / 12).toFixed(2).replace('.', ',')} sem juros
              </div>
              <div class="shipping-info">
                <i class="fas fa-truck"></i>
                <span>Frete grátis para sua região</span>
              </div>
            </div>

            <div class="product-options">
              <div class="quantity-selector">
                <label>Quantidade:</label>
                <div class="quantity-controls">
                  <button class="qty-btn minus" id="qtyMinus">-</button>
                  <input type="number" id="quantity" value="${this.quantity}" min="1" max="10">
                  <button class="qty-btn plus" id="qtyPlus">+</button>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <button class="btn-primary buy-now" id="buyNow">
                <i class="fas fa-bolt"></i>
                Comprar Agora
              </button>
              <button class="btn-secondary add-to-cart" id="addToCart">
                <i class="fas fa-shopping-cart"></i>
                Adicionar ao Carrinho
              </button>
              <button class="btn-icon favorite" id="favorite">
                <i class="far fa-heart"></i>
              </button>
              <button class="btn-icon share" id="share">
                <i class="fas fa-share-alt"></i>
              </button>
            </div>

            <div class="product-description">
              <h3>Descrição do Produto</h3>
              <p>${this.product.description}</p>
            </div>

            <div class="product-specifications">
              <h3>Especificações</h3>
              <div class="specs-grid">
                ${Object.entries(this.product.specifications).map(([key, value]) => `
                  <div class="spec-item">
                    <span class="spec-label">${key}:</span>
                    <span class="spec-value">${value}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        </main>

        <section class="product-reviews">
          <h3>Avaliações dos Clientes</h3>
          <div class="reviews-summary">
            <div class="rating-overview">
              <div class="avg-rating">4.7</div>
              <div class="stars-large">${this.generateStars(4.7)}</div>
              <div class="total-reviews">${this.product.reviews.length} avaliações</div>
            </div>
          </div>
          
          <div class="reviews-list">
            ${this.product.reviews.map(review => `
              <div class="review-item">
                <div class="review-header">
                  <strong>${review.user}</strong>
                  <div class="review-rating">${this.generateStars(review.rating)}</div>
                </div>
                <p class="review-comment">${review.comment}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="related-products">
          <h3>Produtos Relacionados</h3>
          <div class="related-grid">
            ${this.generateRelatedProducts()}
          </div>
        </section>
      </div>
    `;

    this.setupEventListeners();
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return `
      ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
      ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
      ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
  }

  generateRelatedProducts() {
    const relatedProducts = [
      { name: 'Caneta Azul Bic', price: 2.50, image: '/images/caneta.jpg' },
      { name: 'Marca Texto Amarelo', price: 4.90, image: '/images/marca-texto.jpg' },
      { name: 'Lápis HB', price: 1.20, image: '/images/lapis.jpg' },
      { name: 'Borracha Branca', price: 1.50, image: '/images/borracha.jpg' }
    ];

    return relatedProducts.map(product => `
      <div class="related-item">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        <button class="btn-small">Adicionar</button>
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Image gallery
    const thumbnails = this.shadowRoot.querySelectorAll('.thumbnail');
    const mainImage = this.shadowRoot.querySelector('#mainImage');
    const prevBtn = this.shadowRoot.querySelector('#prevImage');
    const nextBtn = this.shadowRoot.querySelector('#nextImage');

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.changeImage(index);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.previousImage();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextImage();
      });
    }

    // Quantity controls
    const qtyMinus = this.shadowRoot.querySelector('#qtyMinus');
    const qtyPlus = this.shadowRoot.querySelector('#qtyPlus');
    const qtyInput = this.shadowRoot.querySelector('#quantity');

    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        if (this.quantity > 1) {
          this.quantity--;
          qtyInput.value = this.quantity;
        }
      });
    }

    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        if (this.quantity < 10) {
          this.quantity++;
          qtyInput.value = this.quantity;
        }
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('change', (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 10) {
          this.quantity = value;
        } else {
          e.target.value = this.quantity;
        }
      });
    }

    // Action buttons
    const buyNowBtn = this.shadowRoot.querySelector('#buyNow');
    const addToCartBtn = this.shadowRoot.querySelector('#addToCart');
    const favoriteBtn = this.shadowRoot.querySelector('#favorite');
    const shareBtn = this.shadowRoot.querySelector('#share');

    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        this.handleBuyNow();
      });
    }

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        this.handleAddToCart();
      });
    }

    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        this.handleFavorite();
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.handleShare();
      });
    }

    // Image zoom
    if (mainImage) {
      mainImage.addEventListener('click', () => {
        this.openImageModal();
      });
    }
  }

  changeImage(index) {
    const mainImage = this.shadowRoot.querySelector('#mainImage');
    const thumbnails = this.shadowRoot.querySelectorAll('.thumbnail');

    if (mainImage) {
      mainImage.src = this.product.images[index];
      this.currentImageIndex = index;

      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    }
  }

  previousImage() {
    const newIndex = this.currentImageIndex > 0 ?
      this.currentImageIndex - 1 :
      this.product.images.length - 1;
    this.changeImage(newIndex);
  }

  nextImage() {
    const newIndex = this.currentImageIndex < this.product.images.length - 1 ?
      this.currentImageIndex + 1 :
      0;
    this.changeImage(newIndex);
  }

  handleBuyNow() {
    const product = {
      ...this.product,
      quantity: this.quantity
    };

    document.dispatchEvent(new CustomEvent('buy-now', {
      detail: product
    }));

    this.showMessage('Redirecionando para o checkout...', 'info');

    setTimeout(() => {
      window.location.href = '/pages/payment/payment.html';
    }, 1000);
  }

  handleAddToCart() {
    const product = {
      ...this.product,
      quantity: this.quantity
    };

    document.dispatchEvent(new CustomEvent('add-to-cart', {
      detail: product
    }));

    this.showMessage('Produto adicionado ao carrinho!', 'success');
  }

  handleFavorite() {
    const favoriteBtn = this.shadowRoot.querySelector('#favorite i');
    const isFavorited = favoriteBtn.classList.contains('fas');

    if (isFavorited) {
      favoriteBtn.classList.remove('fas');
      favoriteBtn.classList.add('far');
      this.showMessage('Removido dos favoritos', 'info');
    } else {
      favoriteBtn.classList.remove('far');
      favoriteBtn.classList.add('fas');
      this.showMessage('Adicionado aos favoritos!', 'success');
    }

    document.dispatchEvent(new CustomEvent('toggle-favorite', {
      detail: {
        productId: this.product.id,
        isFavorited: !isFavorited
      }
    }));
  }

  handleShare() {
    if (navigator.share) {
      navigator.share({
        title: this.product.name,
        text: this.product.description,
        url: window.location.href
      });
    } else {
      // Fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      this.showMessage('Link copiado para a área de transferência!', 'info');
    }
  }

  openImageModal() {
    // Criar modal para visualização da imagem em tamanho maior
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img src="${this.product.images[this.currentImageIndex]}" alt="${this.product.name}">
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('close-modal')) {
        document.body.removeChild(modal);
      }
    });
  }

  showMessage(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

customElements.define('product-page-component', ProductPageComponent); 