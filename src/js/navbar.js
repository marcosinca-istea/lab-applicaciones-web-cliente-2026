import { getProducts } from "./api.js";
import { renderProducts } from "./products.js";

let allProducts = [];

export const renderNavbar = () => {
    const navbarContainer = document.getElementById('navbar-container');
    
    navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <img src="./src/assets/logo.jpeg" alt="Scorpion Logo" width="30" height="30" class="d-inline-block align-text-top me-2" onerror="this.style.display='none'">
                    Scorpion
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <!-- Buscador -->
                    <form class="d-flex mx-auto w-50 my-2 my-lg-0" id="search-form" aria-label="Buscar productos">
                        <input class="form-control me-2" type="search" placeholder="Buscar productos..." id="search-input" aria-label="Campo de búsqueda">
                        <button class="btn btn-outline-light" type="submit">🔍</button>
                    </form>
                    
                    <!-- Botón del Carrito (Para Agustina/Grisel) -->
                    <button class="btn btn-warning ms-lg-3" id="btn-open-cart">
                        🛒 Carrito <span class="badge bg-danger rounded-pill" id="cart-badge">0</span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Navegación por Categorías (Diseño UI de píldoras) -->
        <div class="container mt-4 mb-2">
            <div class="d-flex justify-content-center gap-2 flex-wrap" id="category-menu">
                <button class="btn btn-dark rounded-pill category-btn" data-category="all">Todas</button>
                <button class="btn btn-outline-dark rounded-pill category-btn" data-category="electronics">Electrónica</button>
                <button class="btn btn-outline-dark rounded-pill category-btn" data-category="men's clothing">Ropa Hombre</button>
                <button class="btn btn-outline-dark rounded-pill category-btn" data-category="women's clothing">Ropa Mujer</button>
                <button class="btn btn-outline-dark rounded-pill category-btn" data-category="jewelery">Joyería</button>
            </div>
        </div>
    `;

    initLogic();
};

const initLogic = async () => {
    allProducts = await getProducts();
    
    renderProducts(allProducts);

    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const categoryBtns = document.querySelectorAll('.category-btn');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => p.title.toLowerCase().includes(term));
        renderProducts(filtered);
    });

    searchForm.addEventListener('submit', (e) => e.preventDefault());

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => {
                b.classList.remove('btn-dark');
                b.classList.add('btn-outline-dark');
            });
            e.target.classList.remove('btn-outline-dark');
            e.target.classList.add('btn-dark');

            const cat = e.target.getAttribute('data-category');
            if (cat === 'all') {
                renderProducts(allProducts);
            } else {
                const filtered = allProducts.filter(p => p.category === cat);
                renderProducts(filtered);
            }
        });
    });
};