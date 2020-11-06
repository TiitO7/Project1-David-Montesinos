import {Product} from './classes/product.class';
import {Http} from './classes/http.class';
import {SERVER} from './constants';
import { ICategory } from './interfaces/icategory';
import { CategoriesResponse } from './interfaces/responses';

let newProductForm : HTMLFormElement = null;
let errorMsg : HTMLElement = null;
const imagenPreview =   document.getElementById('imgPreview') as HTMLImageElement;

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
        try{
            const prod = new Product({title, mainPhoto, description, price, category});
            await prod.post();
            location.assign('index.html');
        } catch(e) {
            alert(e);
        }
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
    newProductForm = document.getElementById('newProduct') as HTMLFormElement;
    errorMsg = document.getElementById('errorMsg');

    loadCategories();
    newProductForm.image.addEventListener('change', loadImage) as string;

    newProductForm.addEventListener('submit', validateForm);
});