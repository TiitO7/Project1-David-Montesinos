import { User } from "./classes/user.class";

let newProductForm : HTMLFormElement = null;
let errorMsg : HTMLElement = null;
const imagenPreview =   document.getElementById('imgPreview') as HTMLImageElement;

async function validateForm(event : Event) : Promise<void> {
    event.preventDefault();
    const name = (newProductForm.name as any).value.trim();
    const email = newProductForm.email.value.trim();
    const email2 = newProductForm.email2.value;
    const password = newProductForm.password.value;
    const avatar =  newProductForm.image.value ? imagenPreview.src : '';
    if(email === email2){
        if(!name || !email || !password || !password || !avatar) {
            errorMsg.classList.remove('hidden');
            setTimeout(() => errorMsg.classList.add('hidden'), 3000);
        } else {
            try{
                const prod = new User({name, email, password});
                await prod.post();
                location.assign('index.html');
            } catch(e) {
                alert(e);
            }
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


window.addEventListener('DOMContentLoaded', e => {
    newProductForm = document.getElementById('newProduct') as HTMLFormElement;
    errorMsg = document.getElementById('errorMsg');

    newProductForm.image.addEventListener('change', loadImage) as string;

    newProductForm.addEventListener('submit', validateForm);
});