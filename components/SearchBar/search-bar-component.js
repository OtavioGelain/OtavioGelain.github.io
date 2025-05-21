class SearchBarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('components/SearchBar/search-bar-component.css');
      </style>
      <div class="search-bar">
        <div class="container">
          <a href="#" class="logo">EDUCA-STORE</a>
          <div class="search-container">
            <input type="search" placeholder="O que você está procurando?" />
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('search-bar-component', SearchBarComponent);
