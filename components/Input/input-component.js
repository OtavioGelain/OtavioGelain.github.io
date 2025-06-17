class InputComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['type', 'placeholder', 'label', 'required', 'disabled', 'error', 'icon', 'size', 'value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'value') {
        const input = this.shadowRoot.querySelector('input');
        if (input && input.value !== newValue) {
          input.value = newValue || '';
        }
      } else {
        this.render();
      }
    }
  }

  render() {
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const label = this.getAttribute('label') || '';
    const required = this.hasAttribute('required');
    const disabled = this.hasAttribute('disabled');
    const error = this.getAttribute('error') || '';
    const icon = this.getAttribute('icon') || '';
    const size = this.getAttribute('size') || 'medium';
    const value = this.getAttribute('value') || '';

    const labelHtml = label ? `
      <label class="input-label ${required ? 'required' : ''}" for="input">
        ${label}
        ${required ? '<span class="required-asterisk">*</span>' : ''}
      </label>
    ` : '';

    const iconHtml = icon ? `<i class="fas fa-${icon} input-icon"></i>` : '';
    const errorHtml = error ? `<div class="error-message">${error}</div>` : '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Input/input-component.css');
      </style>
      <div class="input-container ${size} ${error ? 'has-error' : ''} ${disabled ? 'disabled' : ''}">
        ${labelHtml}
        <div class="input-wrapper">
          ${iconHtml}
          <input 
            id="input"
            type="${type}"
            placeholder="${placeholder}"
            value="${value}"
            ${required ? 'required' : ''}
            ${disabled ? 'disabled' : ''}
            class="input-field ${icon ? 'has-icon' : ''}"
          />
        </div>
        ${errorHtml}
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');

    if (input) {
      input.addEventListener('input', (e) => {
        this.setAttribute('value', e.target.value);

        this.dispatchEvent(new CustomEvent('input-change', {
          detail: {
            value: e.target.value,
            type: this.getAttribute('type'),
            label: this.getAttribute('label')
          },
          bubbles: true
        }));
      });

      input.addEventListener('focus', () => {
        this.shadowRoot.querySelector('.input-container').classList.add('focused');

        this.dispatchEvent(new CustomEvent('input-focus', {
          detail: {
            value: input.value,
            type: this.getAttribute('type')
          },
          bubbles: true
        }));
      });

      input.addEventListener('blur', () => {
        this.shadowRoot.querySelector('.input-container').classList.remove('focused');

        this.dispatchEvent(new CustomEvent('input-blur', {
          detail: {
            value: input.value,
            type: this.getAttribute('type')
          },
          bubbles: true
        }));
      });

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.dispatchEvent(new CustomEvent('input-enter', {
            detail: {
              value: input.value,
              type: this.getAttribute('type')
            },
            bubbles: true
          }));
        }
      });
    }
  }

  getValue() {
    const input = this.shadowRoot.querySelector('input');
    return input ? input.value : '';
  }

  setValue(value) {
    this.setAttribute('value', value);
  }

  setError(error) {
    this.setAttribute('error', error);
  }

  clearError() {
    this.removeAttribute('error');
  }

  focus() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  validate() {
    const input = this.shadowRoot.querySelector('input');
    if (!input) return true;

    const required = this.hasAttribute('required');
    const type = this.getAttribute('type');
    const value = input.value.trim();

    // Check required
    if (required && !value) {
      this.setError('Este campo é obrigatório');
      return false;
    }

    // Type-specific validation
    if (value) {
      switch (type) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            this.setError('Digite um email válido');
            return false;
          }
          break;
        case 'tel':
          const phoneRegex = /^[\d\s\-\(\)\+]+$/;
          if (!phoneRegex.test(value)) {
            this.setError('Digite um telefone válido');
            return false;
          }
          break;
        case 'password':
          if (value.length < 6) {
            this.setError('Senha deve ter pelo menos 6 caracteres');
            return false;
          }
          break;
      }
    }

    this.clearError();
    return true;
  }
}

customElements.define('input-component', InputComponent); 