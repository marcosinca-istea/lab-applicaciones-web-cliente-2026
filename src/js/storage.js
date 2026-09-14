const CART_KEY = 'scorpion_cart';

export function getCartFromStorage() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveCartToStorage(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCartStorage() {
    localStorage.removeItem(CART_KEY);
}