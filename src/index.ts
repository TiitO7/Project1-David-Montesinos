import Swal from 'sweetalert2';
import {Product} from './classes/product.class';


let container :  HTMLTableElement = null;
let search = '';
let products : Product[] = [];

async function loadProducts() : Promise<void> {
    Product.getAll().then( ()=>{
        showProducts(products);
    }).catch(e=> {
        const error : Promise<ErrorEvent> = e.json() as Promise<ErrorEvent>;
        error.then((y : any) =>{
            const errors : string = y.message.join('\n');                    
            Swal.fire({
                icon:'error',
                title:'Register Error',
                text: errors
            });
        });
    });

}

function showProducts(products: Product[]) : void {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    products.forEach(p =>  container.appendChild(p.toHTML()));
}

window.addEventListener('DOMContentLoaded', e => {
    if(localStorage.getItem('token')){
        container = document.getElementById('productsContainer') as HTMLTableElement;
        loadProducts();

        document.getElementById('search').addEventListener('keyup', e => {
        
            search = (e.target as any).value;
            showProducts(products.filter(p => (p.title && p.title.toLowerCase().includes(search.toLowerCase())) || 
                                       (p.description && p.description.toLowerCase().includes(search.toLowerCase()))));
        });
    }else{
        location.assign('login.html');
    }
});

