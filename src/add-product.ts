import {Product} from './product.class';
import {Http} from './http.class';
import {SERVER} from './constants';

let newProductForm = null;
let errorMsg = null;

async function validateForm(event) {
    event.preventDefault();
    let title = newProductForm.title.value.trim();
    let description = newProductForm.description.value.trim();
    let mainPhoto = newProductForm.image.value ? document.getElementById('imgPreview').src : '';
    let price = +newProductForm.price.value;
    let category = +newProductForm.category.value;

    if(!title || !description || !mainPhoto || !price || !category) {
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 3000);
    } else {
        try{
            let prod = new Product({title, mainPhoto, description, price, category});
            await prod.post();
            location.assign('index.html');
        } catch(e) {
            alert(e);
        }
    }
}

function loadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        document.getElementById('imgPreview').src = reader.result;
    });
}

async function loadCategories() {
    let catResp = await Http.get(`${SERVER}/categories`);

    catResp.categories.forEach(c => {
        let option = document.createElement('option');
        option.value = c.id;
        option.innerText = c.name;
        newProductForm.category.appendChild(option);
    });
    
}

window.addEventListener('DOMContentLoaded', e => {
    newProductForm = document.getElementById('newProduct');
    errorMsg = document.getElementById('errorMsg');

    loadCategories();

    newProductForm.image.addEventListener('change', loadImage);

    newProductForm.addEventListener('submit', validateForm);
});