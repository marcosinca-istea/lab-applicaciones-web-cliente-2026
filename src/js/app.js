import { renderNavbar } from "./navbar.js";
import { renderProducts } from "./products.js";
//import { initCart } from './cart.js';

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();

  renderProducts();
  //initCart();
});
