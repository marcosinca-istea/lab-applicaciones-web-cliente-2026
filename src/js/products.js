import { getProducts } from "./api.js";
import { Modal } from "./modal.js";

let productsList = document.querySelector("#products-list");

export function renderProducts() {
//Rueda de carga
productsList.innerHTML = `
  <div class = "d-flex justify-content-center my-5">
    <div class = "spinner-border text-dark" role="status">
      <span class = "visually-hidden">Cargando...</span>
    </div>
    <p>Cargando productos...</p>
  </div>
`;

  getProducts().then((products) => {
    console.log(products[0]);
    let template = "";
    products.forEach((p) => {
      template += `
        <div class="col" data-category="${p.category}">
            <div class="card product-card justify-content-center align-items-center">
                <img src="${p.image}" class="card-img-top" alt="${p.title}" style="height: 300px; width: 250px; object-fit: contain;">
                <div class="card-body" style ="width: 300px;">
                    <h5 class="card-title text-truncate">${p.title}</h5>
                    <p class="card-text">$${p.price}</p>
                </div>
                <div class= "mb-3">
                  <button class="btn btn-dark rounded-pill px-4" id="btn-${p.id}" >Detalles</button>
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
  })
      //Manejo de errores
  .catch((error)=>{
    productsList.innerHTML = `<p class = "text-center text-danger">Error al cargar los productos</p>`;
    console.error(error);
  });
  
}
