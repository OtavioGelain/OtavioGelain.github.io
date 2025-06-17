class AccountSettingsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentSection = 'account';
    this.userData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    this.render();
  }

  static get observedAttributes() {
    return ['user-name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const userName = this.getAttribute('user-name') || 'Usuário';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/components/AccountSettings/account-settings-component.css');
      </style>
      <div class="container">
        <aside class="sidebar">
          <div class="profile">
            <img src="https://i.pravatar.cc/100" alt="Foto de Perfil" />
            <h3 id="greeting">Olá, ${userName}!</h3>
          </div>
          <ul class="menu" id="menu">
            <li class="active" data-section="account">
              <i class="fas fa-user"></i>
              <span>Conta</span>
            </li>
            <li data-section="password">
              <i class="fas fa-lock"></i>
              <span>Senha</span>
            </li>
            <li data-section="security">
              <i class="fas fa-shield-alt"></i>
              <span>Segurança</span>
            </li>
            <li data-section="notification">
              <i class="fas fa-bell"></i>
              <span>Notificações</span>
            </li>
            <li data-section="orders">
              <i class="fas fa-shopping-bag"></i>
              <span>Pedidos</span>
            </li>
          </ul>
          <div class="sidebar-footer">
            <button-component type="button" variant="secondary" icon="sign-out-alt" id="logoutBtn">
              Sair
            </button-component>
          </div>
        </aside>

        <main class="content">
          ${this.renderAccountSection()}
          ${this.renderPasswordSection()}
          ${this.renderSecuritySection()}
          ${this.renderNotificationSection()}
          ${this.renderOrdersSection()}
        </main>
      </div>
    `;

    this.setupEventListeners();
  }

  renderAccountSection() {
    return `
      <section id="account" class="section visible">
        <div class="section-header">
          <h2>Configurações da conta</h2>
          <p>Gerencie suas informações pessoais</p>
        </div>
        <form id="accountForm">
          <div class="form-grid">
            <div class="input-group">
              <label for="firstName">Primeiro nome</label>
              <input id="firstName" type="text" value="${this.userData.firstName}" />
            </div>
            <div class="input-group">
              <label for="lastName">Último nome</label>
              <input id="lastName" type="text" value="${this.userData.lastName}" />
            </div>
          </div>
          <div class="form-grid">
            <div class="input-group">
              <label for="email">Email</label>
              <input id="email" type="email" value="${this.userData.email}" />
            </div>
            <div class="input-group">
              <label for="phone">Número de telefone</label>
              <input id="phone" type="tel" value="${this.userData.phone}" />
            </div>
          </div>
          <div class="input-group full-width">
            <label for="address">Endereço</label>
            <textarea id="address" placeholder="Endereço completo"></textarea>
          </div>
          <div class="form-actions">
            <button-component type="submit" variant="primary" icon="save">
              Salvar alterações
            </button-component>
            <button-component type="button" variant="secondary" icon="times">
              Cancelar
            </button-component>
          </div>
        </form>
      </section>
    `;
  }

  renderPasswordSection() {
    return `
      <section id="password" class="section hidden">
        <div class="section-header">
          <h2>Alterar senha</h2>
          <p>Mantenha sua conta segura com uma senha forte</p>
        </div>
        <form id="passwordForm">
          <div class="input-group">
            <label for="currentPassword">Senha atual</label>
            <input id="currentPassword" type="password" required />
          </div>
          <div class="form-grid">
            <div class="input-group">
              <label for="newPassword">Nova senha</label>
              <input id="newPassword" type="password" required />
            </div>
            <div class="input-group">
              <label for="confirmPassword">Confirmar nova senha</label>
              <input id="confirmPassword" type="password" required />
            </div>
          </div>
          <div class="password-requirements">
            <h4>Requisitos da senha:</h4>
            <ul>
              <li>Pelo menos 8 caracteres</li>
              <li>Uma letra maiúscula</li>
              <li>Uma letra minúscula</li>
              <li>Um número</li>
              <li>Um caractere especial</li>
            </ul>
          </div>
          <div class="form-actions">
            <button-component type="submit" variant="primary" icon="lock" class="btn-primary">
              Alterar senha
            </button-component>
          </div>
        </form>
      </section>
    `;
  }

  renderSecuritySection() {
    return `
      <section id="security" class="section hidden">
        <div class="section-header">
          <h2>Configurações de segurança</h2>
          <p>Configure opções avançadas de segurança</p>
        </div>
        <div class="security-options">
          <div class="security-item">
            <div class="security-info">
              <h3>Autenticação em duas etapas</h3>
              <p>Adicione uma camada extra de segurança à sua conta</p>
            </div>
            <label class="toggle">
              <input type="checkbox" id="twoFactor">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="security-item">
            <div class="security-info">
              <h3>Notificações de login</h3>
              <p>Receba alertas quando sua conta for acessada</p>
            </div>
            <label class="toggle">
              <input type="checkbox" id="loginNotifications" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="security-item">
            <div class="security-info">
              <h3>Sessões ativas</h3>
              <p>Gerencie dispositivos conectados à sua conta</p>
            </div>
            <button-component variant="secondary">Ver sessões</button-component>
          </div>
        </div>
      </section>
    `;
  }

  renderNotificationSection() {
    return `
      <section id="notification" class="section hidden">
        <div class="section-header">
          <h2>Configurar notificações</h2>
          <p>Escolha como e quando você quer ser notificado</p>
        </div>
        <div class="notification-options">
          <div class="notification-group">
            <h3>Pedidos e compras</h3>
            <div class="notification-item">
              <div class="notification-info">
                <label>Confirmação de pedido</label>
                <small>Receba confirmação quando um pedido for realizado</small>
              </div>
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="notification-item">
              <div class="notification-info">
                <label>Status de entrega</label>
                <small>Atualizações sobre o status do seu pedido</small>
              </div>
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          <div class="notification-group">
            <h3>Promoções e ofertas</h3>
            <div class="notification-item">
              <div class="notification-info">
                <label>Ofertas especiais</label>
                <small>Receba ofertas exclusivas e promoções</small>
              </div>
              <label class="toggle">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderOrdersSection() {
    return `
      <section id="orders" class="section hidden">
        <div class="section-header">
          <h2>Meus pedidos</h2>
          <p>Acompanhe seus pedidos e histórico de compras</p>
        </div>
        <div class="orders-container">
          <div class="order-item">
            <div class="order-header">
              <span class="order-number">#12345</span>
              <span class="order-status status-delivered">Entregue</span>
            </div>
            <div class="order-content">
              <p>Caderno Universitário - 96 folhas</p>
              <p class="order-date">Pedido em: 15/12/2023</p>
              <p class="order-total">Total: R$ 25,90</p>
            </div>
          </div>
          <div class="order-item">
            <div class="order-header">
              <span class="order-number">#12344</span>
              <span class="order-status status-shipping">Em trânsito</span>
            </div>
            <div class="order-content">
              <p>Kit de canetas coloridas</p>
              <p class="order-date">Pedido em: 10/12/2023</p>
              <p class="order-total">Total: R$ 45,50</p>
            </div>
          </div>
          <div class="empty-state" style="display: none;">
            <i class="fas fa-shopping-bag"></i>
            <h3>Nenhum pedido encontrado</h3>
            <p>Você ainda não fez nenhum pedido</p>
            <a href="/index.html">
              <button-component variant="primary">Continuar comprando</button-component>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  setupEventListeners() {
    const menuItems = this.shadowRoot.querySelectorAll("#menu li");
    const sections = this.shadowRoot.querySelectorAll(".section");
    const accountForm = this.shadowRoot.querySelector("#accountForm");
    const passwordForm = this.shadowRoot.querySelector("#passwordForm");
    const logoutBtn = this.shadowRoot.querySelector("#logoutBtn");
    const cancelBtn = this.shadowRoot.querySelector('button-component.btn-secondary');

    // Menu navigation
    menuItems.forEach(item => {
      item.addEventListener("click", () => {
        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const sectionToShow = item.getAttribute("data-section");
        this.currentSection = sectionToShow;

        sections.forEach(section => {
          section.classList.add("hidden");
          section.classList.remove("visible");
        });

        this.shadowRoot.getElementById(sectionToShow).classList.remove("hidden");
        this.shadowRoot.getElementById(sectionToShow).classList.add("visible");
      });
    });

    // Account form
    if (accountForm) {
      accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAccountSubmit(e);
      });

      // Submit button event for button-component
      const submitBtn = accountForm.querySelector('button-component[type="submit"]');
      if (submitBtn) {
        submitBtn.addEventListener('button-click', (e) => {
          e.preventDefault();
          const fakeEvent = { target: accountForm };
          this.handleAccountSubmit(fakeEvent);
        });
      }
    }

    // Password form
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePasswordSubmit(e);
      });

      // Submit button event for button-component
      const passwordSubmitBtn = passwordForm.querySelector('button-component[type="submit"]');
      if (passwordSubmitBtn) {
        passwordSubmitBtn.addEventListener('button-click', (e) => {
          e.preventDefault();
          const fakeEvent = { target: passwordForm };
          this.handlePasswordSubmit(fakeEvent);
        });
      }
    }

    // Cancel button
    if (cancelBtn) {
      cancelBtn.addEventListener('button-click', () => {
        this.clearForm();
      });
    }

    // Logout button
    if (logoutBtn) {
      logoutBtn.addEventListener('button-click', () => {
        this.handleLogout();
      });
    }

    // All button-components general event listener
    const allButtons = this.shadowRoot.querySelectorAll('button-component');
    allButtons.forEach(button => {
      button.addEventListener('button-click', (e) => {
        // Handle specific button actions based on content or attributes
        const buttonText = button.textContent.trim();

        if (buttonText === 'Ver sessões') {
          this.showMessage('Funcionalidade de sessões em desenvolvimento', 'info');
        }
      });
    });
  }

  handleAccountSubmit(e) {
    // Collect form data manually from inputs
    const form = e.target || this.shadowRoot.querySelector("#accountForm");
    const inputs = form.querySelectorAll('input, textarea');
    const data = {};

    inputs.forEach(input => {
      if (input.id) {
        data[input.id] = input.value;
      }
    });

    // Update user data
    this.userData = { ...this.userData, ...data };

    // Update greeting
    const greeting = this.shadowRoot.querySelector("#greeting");
    if (data.firstName) {
      greeting.textContent = `Olá, ${data.firstName}!`;
    }

    // Dispatch event
    document.dispatchEvent(
      new CustomEvent('account-updated', {
        detail: data
      })
    );

    this.showMessage('Dados salvos com sucesso!', 'success');
  }

  handlePasswordSubmit(e) {
    // Collect form data manually from inputs
    const form = e.target || this.shadowRoot.querySelector("#passwordForm");
    const inputs = form.querySelectorAll('input');
    const data = {};

    inputs.forEach(input => {
      if (input.id) {
        data[input.id] = input.value;
      }
    });

    // Basic validation
    if (data.newPassword !== data.confirmPassword) {
      this.showMessage('As senhas não coincidem!', 'error');
      return;
    }

    if (data.newPassword.length < 8) {
      this.showMessage('A senha deve ter pelo menos 8 caracteres!', 'error');
      return;
    }

    // Dispatch event
    document.dispatchEvent(
      new CustomEvent('password-changed', {
        detail: { success: true }
      })
    );

    this.showMessage('Senha alterada com sucesso!', 'success');
    form.reset();
  }

  handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
      document.dispatchEvent(new CustomEvent('user-logout'));
      window.location.href = '/pages/auth/login.html';
    }
  }

  showMessage(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  clearForm() {
    const form = this.shadowRoot.querySelector("#accountForm");
    form.reset();
    this.shadowRoot.querySelector("#greeting").textContent = "Olá!";
  }
}

customElements.define('account-settings-component', AccountSettingsComponent); 