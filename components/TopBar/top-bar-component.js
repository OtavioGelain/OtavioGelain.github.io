class TopBarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('components/TopBar/top-bar-component.css');
      </style>
      <div class="top-bar">
        <div class="container">
          <div class="logo-small">
            <img src="https://via.placeholder.com/32" alt="Logo" />
            <span class="hide-mobile"
              >Envio grátis para compras acima de R$200,00</span
            >
          </div>
          <div class="welcome">
            <a href="#">Seja bem-vindo(a)!</a>
          </div>
          <div class="user-actions">
            <a href="#" class="account">
              <i class="fas fa-user"></i>
              <span class="hide-mobile">Minha conta</span>
            </a>
            <a href="#" class="cart">
              <i class="fas fa-shopping-cart"></i>
              <span class="hide-mobile">Carrinho (0)</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('top-bar-component', TopBarComponent);
