import { getCartFromStorage, saveCartToStorage, clearCartStorage } from './storage.js';

let cart = getCartFromStorage();

export function initCartEvents() {
    const openCartBtn = document.getElementById('btn-open-cart');
    const closeCartBtn = document.getElementById('btn-close-cart');
    const primaryCart = document.getElementById('primary-cart');
    const checkoutBtn = document.getElementById('btn-checkout');
    const clearCartBtn = document.getElementById('btn-clear-cart');

    if (openCartBtn && primaryCart) {
        openCartBtn.addEventListener('click', () => {
            primaryCart.setAttribute('data-visible', 'true');
        });
    }

    if (closeCartBtn && primaryCart) {
        closeCartBtn.addEventListener('click', () => {
            primaryCart.setAttribute('data-visible', 'false');
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearAllProducts);
    }
    
    renderCart();
}

export function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        if (existingProduct.quantity < 9) {
            existingProduct.quantity += 1;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCartToStorage(cart);
    renderCart();  
    
    showToastMessage('Se agregó el producto al carrito');
}

export function renderCart() {
    const cartList = document.querySelector('.lista-carrito');
    const cartBadge = document.getElementById('cart-badge');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('btn-checkout');
    const clearCartBtn = document.getElementById('btn-clear-cart');

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
    }

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    const isCartEmpty = cart.length === 0;
    if (checkoutBtn) checkoutBtn.disabled = isCartEmpty;
    if (clearCartBtn) clearCartBtn.disabled = isCartEmpty;

    if (!cartList) return;

    if (isCartEmpty) {
        cartList.innerHTML = `<li class="text-center text-muted mt-4">El carrito está vacío</li>`;
        return;
    }

    cartList.innerHTML = cart.map(item => `
        <li class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <div class="d-flex align-items-center gap-3">
                <img src="${item.image}" alt="${item.title}" class="img-fluid" style="width: 50px; height: 50px; object-fit: contain;">
                
                <div>
                    <h6 class="m-0 text-truncate" style="max-width: 130px;">${item.title}</h6>
                    <p class="text-muted m-0 small">$${(item.price * item.quantity).toFixed(2)}</p>
                    
                    <div class="d-inline-flex align-items-center border rounded px-1 gap-1 mt-1">
                        <button class="btn btn-sm btn-link text-decoration-none text-dark p-0 px-1 btn-decrease" data-id="${item.id}">-</button>
                        <span class="fw-bold px-1 small">${item.quantity}</span>
                        <button class="btn btn-sm btn-link text-decoration-none text-dark p-0 px-1 btn-increase" data-id="${item.id}" ${item.quantity >= 9 ? 'disabled' : ''}>+</button>
                    </div>
                </div>
            </div>

            <button class="btn-remove" data-id="${item.id}" aria-label="Eliminar producto">
    <img src="./src/assets/trash.png" alt="Eliminar" class="trash-icon icon-default">
    <img src="./src/assets/trash2.png" alt="Eliminar" class="trash-icon icon-hover">
</button>
        </li>
    `).join('');

    document.querySelectorAll('.btn-increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            changeQuantity(id, 1);
        });
    });

    document.querySelectorAll('.btn-decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            changeQuantity(id, -1);
        });
    });

    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function changeQuantity(id, amount) {
    const product = cart.find(item => item.id === id);
    if (!product) return;

    product.quantity += amount;

    if (product.quantity < 1) {
        product.quantity = 1;
        return;
    } else if (product.quantity > 9) {
        product.quantity = 9;
    }

    saveCartToStorage(cart);
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage(cart);
    renderCart();
}

function clearAllProducts() {
    if (cart.length === 0) return;

    cart = [];
    clearCartStorage();
    renderCart();

    const primaryCart = document.getElementById('primary-cart');
    if (primaryCart) {
        primaryCart.setAttribute('data-visible', 'false');
    }

    showToastMessage('Se eliminaron los productos del carrito');
}

function checkout() {
    if (cart.length === 0) return;

    cart = [];
    clearCartStorage();
    renderCart();

    const primaryCart = document.getElementById('primary-cart');
    if (primaryCart) {
        primaryCart.setAttribute('data-visible', 'false');
    }

    showToastMessage('¡Gracias por su compra!');
}

function showToastMessage(text) {
    const mensaje = document.createElement('div');
    mensaje.textContent = text;
    
    Object.assign(mensaje.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#212529',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '25px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: '3000',
        fontWeight: 'bold',
        fontSize: '15px',
    });

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}