class MainNavComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/MainNav/main-nav-component.css');
      </style>
      <nav class="main-nav">
        <div class="container">
          <input type="checkbox" id="menu-toggle-nav" class="menu-toggle" />
          <label for="menu-toggle-nav" class="menu-icon">
            <i class="fas fa-bars"></i>
          </label>
          <ul class="nav-links">
            <li><a href="#">CATEGORIAS</a></li>
            <li><a href="pages/products-view/products-view.html">PRODUTOS</a></li>
            <li><a href="#">PROMOÇÕES</a></li>
            <li><a href="#">NOVIDADES</a></li>
            <li><a href="/pages/contact/contact.html">CONTATO</a></li>
            <li><a href="#">INSTITUCIONAL</a></li>
            <li><a href="#">BLOG</a></li>
          </ul>
        </div>
      </nav>
    `;

    this.setupMobileMenu();
  }

  setupMobileMenu() {
    const menuToggle = this.shadowRoot.getElementById('menu-toggle-nav');
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
}

customElements.define('main-nav-component', MainNavComponent);
