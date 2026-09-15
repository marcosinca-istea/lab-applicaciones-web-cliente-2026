import { Modal } from "./modal.js";

let productsList = document.querySelector("#products-list");

export function showSpinner() {
  productsList.innerHTML = `
    <div class="d-flex justify-content-center my-5 w-100">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden"></span>
      </div>
      <p class="ms-3 mt-1">Cargando productos...</p>
    </div>
  `;
}

export function renderProducts(products) {
  productsList.innerHTML = "";

  // Si la búsqueda no encuentra nada, mostramos un mensaje
  if (!products || products.length === 0) {
    productsList.innerHTML = `<p class="text-center text-danger w-100 mt-5">No se encontraron productos.</p>`;
    return;
  }

  let template = "";
  products.forEach((p) => {
    template += `
      <div class="col" data-category="${p.category}">
          <div class="card product-card justify-content-center align-items-center h-100">
              <img src="${p.image}" class="card-img-top p-3" alt="${p.title}" style="height: 250px; width: 100%; object-fit: contain;">
              <div class="card-body w-100 d-flex flex-column">
                  <h5 class="card-title text-truncate" title="${p.title}">${p.title}</h5>
                  <p class="card-text fw-bold mt-auto">$${p.price}</p>
                  <button class="btn btn-dark rounded-pill w-100 mt-2" id="btn-${p.id}">Detalles</button>
              </div>
          </div>
      </div>
    `;
  });

  productsList.innerHTML = template;

  products.forEach((p) => {
    let btn = document.querySelector(`#btn-${p.id}`);
    if (btn) {
      btn.addEventListener("click", () => {
        Modal(p);
      });
    }
  });
}