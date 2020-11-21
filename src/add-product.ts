import {Product} from './classes/product.class';
import {Http} from './classes/http.class';
import {SERVER} from './constants';

import { CategoriesResponse } from './interfaces/responses';
import { Auth } from './classes/auth.class';
import Swal from 'sweetalert2';

let newProductForm : HTMLFormElement = null;
let errorMsg : HTMLElement = null;
const imagenPreview =   document.getElementById('imgPreview') as HTMLImageElement;
let btnLogOut :  HTMLElement= null;
async function validateForm(event : Event) : Promise<void> {
    event.preventDefault();
    const title = (newProductForm.title as any).value.trim();
    const description = newProductForm.description.value.trim();
    const mainPhoto = newProductForm.image.name ? imagenPreview.src : '';
    const price = +newProductForm.price.value;
    const category = +newProductForm.category.value;

    if(!title || !description || !mainPhoto || !price || !category) {
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 3000);
    } else {
        
        const prod = new Product({title, mainPhoto, description, price, category});
        prod.post().then( () => {
            location.assign('index.html');
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
}

function loadImage(event: Event) : void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        imagenPreview.src  = reader.result as string;
    });
}

async function loadCategories() : Promise<void> {
    const catResp = await Http.get<CategoriesResponse>(`${SERVER}/categories`);

    catResp.categories.forEach(c  => {
        const option = document.createElement('option');
        option.value = '' + c.id;
        option.innerText = c.name;
        newProductForm.category.appendChild(option);
    });
    
}



window.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    if(localStorage.getItem('token')){
        btnLogOut = document.getElementById('logout') as HTMLElement;
        btnLogOut.addEventListener('click', () => {
            Auth.logout();
            Auth.checkToken().catch(()=>location.assign('login.html'));
        });    
        newProductForm = document.getElementById('newProduct') as HTMLFormElement;
        errorMsg = document.getElementById('errorMsg');    
        loadCategories();
    newProductForm.image.addEventListener('change', loadImage) as string;
    
    newProductForm.addEventListener('submit', validateForm);
    }else{
        location.assign('login.html');
    }
});