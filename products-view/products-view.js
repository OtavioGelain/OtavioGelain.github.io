// Dados dos produtos mockados com lorem ipsum
const products = [
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet consectetur",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 2,
        title: "Adipiscing elit sed do eiusmod tempor",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 3,
        title: "Incididunt ut labore et dolore magna",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: "placeholder"
    },
    {
        id: 4,
        title: "Aliqua enim ad minim veniam quis",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 5,
        title: "Nostrud exercitation ullamco laboris",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: "placeholder"
    },
    {
        id: 6,
        title: "Nisi ut aliquip ex ea commodo consequat",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 7,
        title: "Duis aute irure dolor in reprehenderit",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 8,
        title: "Voluptate velit esse cillum dolore",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: "placeholder"
    },
    {
        id: 9,
        title: "Fugiat nulla pariatur excepteur sint",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 10,
        title: "Occaecat cupidatat non proident sunt",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 11,
        title: "In culpa qui officia deserunt mollit",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: "placeholder"
    },
    {
        id: 12,
        title: "Anim id est laborum sed ut perspiciatis",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 13,
        title: "Unde omnis iste natus error sit",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: "placeholder"
    },
    {
        id: 14,
        title: "Voluptatem accusantium doloremque",
        price: 49.90,
        oldPrice: 59.90,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "OFERTA",
        image: "placeholder"
    },
    {
        id: 15,
        title: "Laudantium totam rem aperiam eaque",
        price: 49.90,
        oldPrice: null,
        installment: "ou 3x de R$ 16,63 sem juros",
        badge: "NOVO",
        image: "placeholder"
    }
];

// Estado da aplicação
let filteredProducts = [...products];

// Função para gerar imagem placeholder
function generatePlaceholderImage() {
    return `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#f8f9fa"/>
            <rect x="60" y="60" width="80" height="80" rx="8" fill="#dee2e6"/>
            <circle cx="85" cy="85" r="8" fill="#adb5bd"/>
            <path d="M70 120 L85 105 L100 115 L115 100 L130 120 Z" fill="#adb5bd"/>
            <text x="100" y="160" font-family="Arial" font-size="12" fill="#6c757d" text-anchor="middle">Sem imagem</text>
        </svg>
    `)}`;
}

// Função para renderizar produtos
function renderProducts(productsToRender = filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            
            <div class="product-image">
                <img src="${generatePlaceholderImage()}" alt="${product.title}" loading="lazy">
                <button class="product-favorite" onclick="toggleFavorite(${product.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                
                <div class="product-price">
                    ${product.oldPrice ? `<span class="price-old">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                    <span class="price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <div class="price-installment">${product.installment}</div>
                </div>
                
                <button class="product-button">
                    <i class="fas fa-shopping-cart"></i>
                    Comprar
                </button>
            </div>
        </div>
    `).join('');
}

// Função para alternar favorito
function toggleFavorite(productId) {
    const favoriteBtn = document.querySelector(`[data-product-id="${productId}"] .product-favorite i`);
    if (favoriteBtn) {
        if (favoriteBtn.classList.contains('far')) {
            favoriteBtn.classList.remove('far');
            favoriteBtn.classList.add('fas');
            favoriteBtn.style.color = '#ff6500';
        } else {
            favoriteBtn.classList.remove('fas');
            favoriteBtn.classList.add('far');
            favoriteBtn.style.color = '';
        }
    }
}

// Função de busca
function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts();
    updateSearchResults();
}

// Função para atualizar resultados da busca
function updateSearchResults() {
    const breadcrumb = document.querySelector('.breadcrumb span');
    if (breadcrumb) {
        const count = filteredProducts.length;
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput ? searchInput.value.trim() : '';
        
        if (searchTerm) {
            breadcrumb.textContent = `${count} produtos encontrados para "${searchTerm}"`;
        } else {
            breadcrumb.textContent = `${count} produtos encontrados`;
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar produtos iniciais
    renderProducts();
    
    // Configurar busca
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts(this.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (searchInput) {
                searchProducts(searchInput.value);
            }
        });
    }
    
    // Configurar navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adiciona active ao link clicado
            this.classList.add('active');
        });
    });
});

// Exportar funções para uso global
window.toggleFavorite = toggleFavorite;

