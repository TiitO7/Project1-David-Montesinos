import {Product} from './classes/product.class';

let container :  HTMLTableElement = null;
let search = '';
let products : Product[] = [];

async function loadProducts() : Promise<void> {
    products = await Product.getAll();
    showProducts(products);
}

function showProducts(products: Product[]) : void {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    products.forEach(p =>  container.appendChild(p.toHTML()));
}

window.addEventListener('DOMContentLoaded', e => {
    container = document.getElementById('productsContainer') as HTMLTableElement;
    loadProducts();

    document.getElementById('search').addEventListener('keyup', e => {
        search = (e.target as any).value;
        showProducts(products.filter(p => (p.title && p.title.toLowerCase().includes(search.toLowerCase())) || 
                                       (p.description && p.description.toLowerCase().includes(search.toLowerCase()))));
    });
});

