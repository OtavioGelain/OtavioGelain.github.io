class HeroBannerComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/HeroBanner/hero-banner-component.css');
      </style>
      <section class="hero-banner">
        <div class="container">
          <div class="hero-content">
            <h1>EDUCA-<span>STORE</span></h1>
            <p>MATERIAIS PARA VOLTA ÀS AULA ATÉ 10% DE DESCONTO</p>
          </div>
        </div>
        <div class="hero-decoration">
          <div class="dots-pattern"></div>
          <div class="decoration-top-right"></div>
          <div class="decoration-bottom-left"></div>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-banner-component', HeroBannerComponent);
