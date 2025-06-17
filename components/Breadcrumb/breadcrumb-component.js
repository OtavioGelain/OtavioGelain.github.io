class BreadcrumbComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.count = 0;
    this.searchTerm = '';
    this.render();
  }

  static get observedAttributes() {
    return ['count', 'search-term'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'count') {
        this.count = parseInt(newValue) || 0;
      } else if (name === 'search-term') {
        this.searchTerm = newValue || '';
      }
      this.render();
    }
  }

  render() {
    let text = `${this.count} produtos encontrados`;
    if (this.searchTerm) {
      text += ` para "${this.searchTerm}"`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Breadcrumb/breadcrumb-component.css');
      </style>
      <div class="breadcrumb">
        <span>${text}</span>
      </div>
    `;
  }

  updateCount(count, searchTerm = '') {
    this.setAttribute('count', count.toString());
    this.setAttribute('search-term', searchTerm);
  }
}

customElements.define('breadcrumb-component', BreadcrumbComponent); 