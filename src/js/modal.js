export function Modal(prod) {
  let container = document.querySelector("#productModal");

  let template = `
      <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${prod.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-md-6">
                <img src="${prod.image}" class="img-fluid" alt= "${prod.title}">
            </div>
            <div class="col-md-6">
                <p>${prod.description}</p>
            </div>
            <div class="col-12 d-flex justify-content-end align-items-start">
                <p>
                    Precio: <small>$${prod.price}</small> 
                </p>
                
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
  </div>
    `;

  container.innerHTML = template;

  const bootstrapModal = new bootstrap.Modal(container);
  bootstrapModal.show();
}
