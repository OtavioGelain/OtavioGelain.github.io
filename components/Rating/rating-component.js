class RatingComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['rating', 'max-rating', 'size', 'readonly', 'show-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const rating = parseFloat(this.getAttribute('rating') || '0');
    const maxRating = parseInt(this.getAttribute('max-rating') || '5');
    const size = this.getAttribute('size') || 'medium';
    const readonly = this.hasAttribute('readonly');
    const showText = this.hasAttribute('show-text');
    const text = this.getAttribute('text') || '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Rating/rating-component.css');
      </style>
      <div class="rating-container ${size}">
        <div class="stars ${readonly ? 'readonly' : 'interactive'}">
          ${this.generateStars(rating, maxRating)}
        </div>
        ${showText || text ? `<span class="rating-text">${text || `${rating} de ${maxRating}`}</span>` : ''}
      </div>
    `;

    if (!readonly) {
      this.setupEventListeners();
    }
  }

  generateStars(rating, maxRating) {
    let starsHtml = '';

    for (let i = 1; i <= maxRating; i++) {
      let starClass = 'far fa-star';

      if (i <= Math.floor(rating)) {
        starClass = 'fas fa-star';
      } else if (i - 0.5 <= rating) {
        starClass = 'fas fa-star-half-alt';
      }

      starsHtml += `<i class="${starClass}" data-rating="${i}"></i>`;
    }

    return starsHtml;
  }

  setupEventListeners() {
    const stars = this.shadowRoot.querySelectorAll('.stars i');

    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => {
        this.highlightStars(index + 1);
      });

      star.addEventListener('click', () => {
        const newRating = index + 1;
        this.setAttribute('rating', newRating.toString());

        this.dispatchEvent(new CustomEvent('rating-change', {
          detail: {
            rating: newRating,
            maxRating: parseInt(this.getAttribute('max-rating') || '5')
          },
          bubbles: true
        }));
      });
    });

    const container = this.shadowRoot.querySelector('.stars');
    container.addEventListener('mouseleave', () => {
      this.resetStars();
    });
  }

  highlightStars(rating) {
    const stars = this.shadowRoot.querySelectorAll('.stars i');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.className = 'fas fa-star highlight';
      } else {
        star.className = 'far fa-star';
      }
    });
  }

  resetStars() {
    const currentRating = parseFloat(this.getAttribute('rating') || '0');
    const maxRating = parseInt(this.getAttribute('max-rating') || '5');

    const starsContainer = this.shadowRoot.querySelector('.stars');
    starsContainer.innerHTML = this.generateStars(currentRating, maxRating);
  }

  setRating(rating) {
    this.setAttribute('rating', rating.toString());
  }

  getRating() {
    return parseFloat(this.getAttribute('rating') || '0');
  }
}

customElements.define('rating-component', RatingComponent); 