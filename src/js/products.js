import { getProducts } from "./api.js";
import { Modal } from "./modal.js";

let productsList = document.querySelector("#products-list");

export function renderProducts() {
  getProducts().then((products) => {
    let template = "";
    products.forEach((p) => {
      template += `
        <div class="col">
            <div class="card justify-content-center align-items-center" style ="width: 300px;">
                <img src="${p.image}" class="card-img-top" alt="${p.title}" style="height: 300px; width: 250px; object-fit: contain;">
                <div class="card-body" style ="width: 300px;">
                    <h5 class="card-title text-truncate">${p.title}</h5>
                    <p class="card-text fw-bold">$${p.price}</p>
                </div>
                <div class= "mb-3">
                  <button class="btn btn-dark" id="btn-${p.id}">Detalles</button>
                </div>
            </div>
        </div>
            `;
    });

    productsList.innerHTML = template;

    //Eventos botones
    products.forEach((p) => {
      let btn = document.querySelector(`#btn-${p.id}`);
      btn.addEventListener("click", () => {
        Modal(p);
      });
    });
  });
}
