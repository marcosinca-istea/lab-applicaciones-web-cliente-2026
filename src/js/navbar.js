export const loadCategories = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        
        const categoryMenu = document.getElementById('category-menu');
        let html = '';
        
        categories.forEach(category => {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            html += `<li class="nav-item"><a class="nav-link category-link" href="#" data-category="${category}">${categoryName}</a></li>`;
        });
        
        categoryMenu.innerHTML = html;
    } catch (error) {
        console.error("Error al cargar las categorías", error);
    }
};