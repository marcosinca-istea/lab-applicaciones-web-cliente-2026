import { getProducts } from "./api.js";
import { renderProducts, showSpinner } from "./products.js";
import { initCartEvents } from "./cart.js";

let allProducts = [];

export const renderNavbar = () => {
    const navbarContainer = document.getElementById('navbar-container');
    
    navbarContainer.innerHTML = `
        <nav class="navbar navbar-dark bg-dark py-2">
            <div class="container-fluid">
                <div class="row w-100 align-items-center g-2 mx-auto">
                    <!-- Logo / Marca -->
                    <div class="col-6 col-lg-3 d-flex align-items-center p-0">
                        <a class="navbar-brand d-flex align-items-center m-0" href="#">
                            <img src="./src/assets/Logo.png" alt="Scorpion Logo" width="30" height="30" class="d-inline-block align-text-top me-2" onerror="this.style.display='none'">
                            Scorpion
                        </a>
                    </div>

                    <!-- Buscador: Abajo en celular (col-12), en el medio en PC (col-lg-6) -->
                    <div class="col-12 col-lg-6 order-3 order-lg-2 px-0 px-lg-2">
                        <form class="w-100 m-0" id="search-form" aria-label="Buscar productos">
                            <input class="form-control" type="search" placeholder="Buscar productos..." id="search-input" aria-label="Campo de búsqueda">
                        </form>
                    </div>

                    <!-- Carrito: Arriba a la derecha en celular (col-6), a la derecha en PC (col-lg-3) -->
                    <div class="col-6 col-lg-3 order-2 order-lg-3 d-flex justify-content-end p-0">
                        <button class="btn-cart" id="btn-open-cart">
                            <img src="./src/assets/cart.svg" alt="Carrito" class="me-2">
                            <span class="cart-counter" id="cart-badge">0</span>                        
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <aside class="mi-carrito primary-cart" id="primary-cart" data-visible="false">
            <div class="cart-header">
                <h2>CARRITO</h2>
                <button class="cart-btn-cerrar" id="btn-close-cart" aria-label="Cerrar carrito">
                    <img src="./src/assets/close.svg" alt="Cerrar">
                </button>
            </div>
            <ul class="lista-carrito"></ul>

            <div class="cart-footer border-top pt-3 mt-auto">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="fs-5">Total:</span>
                    <span class="fw-bold fs-5" id="cart-total">$0.00</span>
                </div>
                <button class="btn btn-dark w-100 rounded-pill py-2" id="btn-checkout">Finalizar Compra</button>
                <button class="btn btn-clear-cart w-100 rounded-pill py-2 mt-2" id="btn-clear-cart">Eliminar productos</button>
            </div>
        </aside>

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
    initCartEvents();
};

const initLogic = async () => {
    const spinnerTimeout = setTimeout(() => {
        showSpinner();
    }, 300);
    
    try {
        allProducts = await getProducts();
        clearTimeout(spinnerTimeout);
        renderProducts(allProducts);
    } catch (error) {
        console.error(error);
        document.getElementById('products-list').innerHTML = 
            `<p class="text-center text-danger w-100 mt-5">Error al cargar los productos</p>`;
        return;
    }

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
            searchInput.value = '';
            
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