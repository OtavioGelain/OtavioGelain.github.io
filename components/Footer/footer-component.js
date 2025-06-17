class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/Footer/footer-component.css');
      </style>
      <footer>
        <div class="footer-content">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-column">
                <h3>Institucional</h3>
                <ul>
                  <li><a href="#">Quem Somos</a></li>
                  <li><a href="#">Política de Privacidade</a></li>
                  <li><a href="#">Termos de Uso</a></li>
                  <li><a href="#">Trabalhe Conosco</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h3>Atendimento</h3>
                <ul>
                  <li><a href="#">Central de Ajuda</a></li>
                  <li><a href="#">Fale Conosco</a></li>
                  <li><a href="#">Trocas e Devoluções</a></li>
                  <li><a href="#">Perguntas Frequentes</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h3>Minha Conta</h3>
                <ul>
                  <li><a href="#">Meus Pedidos</a></li>
                  <li><a href="#">Meus Dados</a></li>
                  <li><a href="#">Lista de Desejos</a></li>
                  <li><a href="#">Carrinho</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h3 class="social-title">Redes Sociais</h3>
                <div class="social-icons">
                  <a href="#"><i class="fab fa-facebook-f"></i></a>
                  <a href="#"><i class="fab fa-instagram"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                  <a href="#"><i class="fab fa-youtube"></i></a>
                  <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright">
          <div class="container">
            © 2025 EDUCA-STORE - Todos os direitos reservados. CNPJ:
            00.000.000/0001-00
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);
