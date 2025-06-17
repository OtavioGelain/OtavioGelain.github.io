class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'icon', 'loading', 'type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'medium';
    const disabled = this.hasAttribute('disabled');
    const icon = this.getAttribute('icon') || '';
    const loading = this.hasAttribute('loading');
    const type = this.getAttribute('type') || 'button';
    const text = this.textContent || 'Button';

    const iconHtml = icon ? `<i class="fas fa-${icon}"></i>` : '';
    const loadingIcon = loading ? '<i class="fas fa-spinner fa-spin"></i>' : '';
    const buttonContent = loading ? loadingIcon : `${iconHtml}${text}`;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Button/button-component.css');
      </style>
      <button 
        class="btn btn-${variant} btn-${size}" 
        type="${type}"
        ${disabled || loading ? 'disabled' : ''}
      >
        ${buttonContent}
      </button>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.addEventListener('click', (e) => {
        if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
          e.preventDefault();
          return;
        }

        this.dispatchEvent(
          new CustomEvent('button-click', {
            detail: {
              variant: this.getAttribute('variant'),
              size: this.getAttribute('size'),
              text: this.textContent,
            },
            bubbles: true,
          })
        );
      });
    }
  }

  setLoading(loading) {
    if (loading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  setDisabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
}

customElements.define('button-component', ButtonComponent); 