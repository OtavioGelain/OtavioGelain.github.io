class BadgeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'icon', 'removable'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'medium';
    const icon = this.getAttribute('icon') || '';
    const removable = this.hasAttribute('removable');
    const text = this.textContent || '';

    const iconHtml = icon ? `<i class="fas fa-${icon}"></i>` : '';
    const removeHtml = removable ? `<button class="remove-btn" type="button"><i class="fas fa-times"></i></button>` : '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Badge/badge-component.css');
      </style>
      <span class="badge badge-${variant} badge-${size}">
        ${iconHtml}
        <span class="badge-text">${text}</span>
        ${removeHtml}
      </span>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const removeBtn = this.shadowRoot.querySelector('.remove-btn');

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        this.dispatchEvent(new CustomEvent('badge-remove', {
          detail: {
            text: this.textContent,
            variant: this.getAttribute('variant')
          },
          bubbles: true
        }));

        // Animate out
        this.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.style.opacity = '0';
        this.style.transform = 'scale(0.8)';

        setTimeout(() => {
          this.remove();
        }, 300);
      });
    }

    // Click event for the badge itself
    const badge = this.shadowRoot.querySelector('.badge');
    badge.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('badge-click', {
        detail: {
          text: this.textContent,
          variant: this.getAttribute('variant')
        },
        bubbles: true
      }));
    });
  }

  setText(text) {
    this.textContent = text;
    this.render();
  }

  setVariant(variant) {
    this.setAttribute('variant', variant);
  }
}

customElements.define('badge-component', BadgeComponent); 