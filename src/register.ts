import { User } from './classes/user.class';

let newUserForm : HTMLFormElement = null;
let errorMsg : HTMLElement = null;
const imagenPreview =   document.getElementById('imgPreview') as HTMLImageElement;
let latitud : HTMLInputElement = null;
let longitud : HTMLInputElement = null;
let pos = null;
async function validateForm(event : Event) : Promise<void> {
    event.preventDefault();
    const name = (newUserForm.name as any).value.trim();
    const email = (newUserForm.email as any).value.trim();
    const email2 = (newUserForm.email2 as any).value.trim();
    const password = (newUserForm.password as any).value.trim();
    const photo =  newUserForm.image.name ? imagenPreview.src : '';
    if(email === email2){
        if(!name || !email || !password || !password || !photo) {
            errorMsg.classList.remove('hidden');
            setTimeout(() => errorMsg.classList.add('hidden'), 3000);
        } else {
            try{
                const prod = new User({name, email, password, photo});
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
function getMyPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos =>resolve(pos)); 
    });
}

window.addEventListener('DOMContentLoaded', async e => {
    newUserForm = document.getElementById('form-register') as HTMLFormElement;
    errorMsg = document.getElementById('errorMsg');
    newUserForm.avatar.addEventListener('change', loadImage) as string;
    pos = await getMyPosition();
    newUserForm.lat.value = pos.coords.latitude;
    newUserForm.lng.value = pos.coords.longitude;
    
    

    newUserForm.addEventListener('submit', validateForm);
});