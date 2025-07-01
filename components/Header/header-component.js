class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cartCount = 0;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Header/header-component.css');
      </style>
      <header>
        <div class="top-bar">
          <div class="container">
            <div class="logo-small">
              <span class="hide-mobile"
                >Envio grátis para compras acima de R$200,00</span
              >
            </div>
            <div class="welcome">
              <a href="#">Seja bem-vindo(a)!</a>
            </div>
            <div class="user-actions">
              <a href="/pages/account/my-account.html" class="account">
                <i class="fas fa-user"></i>
                <span class="hide-mobile">Minha conta</span>
              </a>
              <a href="#" class="cart" id="cart-toggle">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count-badge">${this.cartCount}</span>
                <span class="hide-mobile">Carrinho</span>
              </a>
            </div>
          </div>
        </div>

        <div class="search-bar">
          <div class="container">
            <a href="/index.html" class="logo">EDUCA-STORE</a>
            <div class="search-container">
              <input type="search" placeholder="O que você está procurando?" />
              <i class="fas fa-search"></i>
            </div>
          </div>
        </div>

        <nav class="main-nav">
          <div class="container">
            <input type="checkbox" id="menu-toggle-shadow" class="menu-toggle" />
            <label for="menu-toggle-shadow" class="menu-icon">
              <i class="fas fa-bars"></i>
            </label>
            <ul class="nav-links">
              <li><a href="#">CATEGORIAS</a></li>
              <li><a href="#">PROMOÇÕES</a></li>
              <li><a href="#">NOVIDADES</a></li>
              <li><a href="/pages/contact/contact.html">CONTATO</a></li>
              <li><a href="#">INSTITUCIONAL</a></li>
              <li><a href="#">BLOG</a></li>
            </ul>
          </div>
        </nav>
      </header>
    `;

    this.setupMobileMenu();

    this.setupCartToggle();

    this.setupCartCountListener();
  }

  setupMobileMenu() {
    const menuToggle = this.shadowRoot.getElementById('menu-toggle-shadow');
    const navLinks = this.shadowRoot.querySelector('.nav-links');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('change', function () {
        if (this.checked) {
          navLinks.style.display = 'flex';
        } else {
          navLinks.style.display = 'none';
        }
      });
    }
  }

  setupCartToggle() {
    const cartToggle = this.shadowRoot.getElementById('cart-toggle');
    if (cartToggle) {
      cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('toggle-cart'));
      });
    }
  }

  setupCartCountListener() {
    document.addEventListener('update-cart-count', (event) => {
      if (event.detail && typeof event.detail.count === 'number') {
        this.cartCount = event.detail.count;
        const cartCountElement =
          this.shadowRoot.querySelector('.cart-count-badge');
        if (cartCountElement) {
          cartCountElement.textContent = this.cartCount;
        }
      }
    });
  }
}

customElements.define('header-component', HeaderComponent);
