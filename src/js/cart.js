export function initCartEvents() {
    const openCartBtn = document.getElementById('btn-open-cart');
    const closeCartBtn = document.getElementById('btn-close-cart');
    const primaryCart = document.getElementById('primary-cart');

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
}