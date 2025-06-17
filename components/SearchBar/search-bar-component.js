class SearchBarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/SearchBar/search-bar-component.css');
      </style>
      <div class="search-bar">
        <div class="container">
          <a href="#" class="logo">EDUCA-STORE</a>
          <div class="search-container">
            <input type="search" id="searchInput" placeholder="O que você está procurando?" />
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const searchInput = this.shadowRoot.getElementById('searchInput');
    const searchIcon = this.shadowRoot.querySelector('.search-icon');

    if (searchInput) {
      // Search on input (real-time)
      searchInput.addEventListener('input', (e) => {
        this.performSearch(e.target.value);
      });

      // Search on Enter key
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.performSearch(e.target.value);
        }
      });
    }

    if (searchIcon) {
      // Search on icon click
      searchIcon.addEventListener('click', () => {
        if (searchInput) {
          this.performSearch(searchInput.value);
        }
      });
    }
  }

  performSearch(query) {
    // Dispatch custom search event that other components can listen to
    document.dispatchEvent(new CustomEvent('search-products', {
      detail: { query: query.trim() }
    }));
  }
}

customElements.define('search-bar-component', SearchBarComponent);
