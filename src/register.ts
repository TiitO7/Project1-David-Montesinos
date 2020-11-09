import * as mapboxgl from 'mapbox-gl';
import { Auth } from './classes/auth.class';
import { User } from './classes/user.class';
import { IUser } from './interfaces/iuser';
import { TokenResponse } from './interfaces/responses';

let newUserForm : HTMLFormElement = null;
let errorMsg : HTMLElement = null;
const userImagen = document.getElementById('imgPreview') as HTMLImageElement;
let pos = null;
let user : User;

async function validateForm(event : Event) : Promise<void> {
    event.preventDefault();
    user = new User();
    user.name = (newUserForm.nameUser as HTMLInputElement).value;
    user.email = (newUserForm.email as HTMLInputElement).value.trim();
    const email2 = (newUserForm.email2 as HTMLInputElement).value.trim();
    user.password = (newUserForm.password as HTMLInputElement).value.trim();
    user.photo =  newUserForm.avatar.name ? userImagen.src : '';
    user.lat = parseFloat((newUserForm.lat as HTMLInputElement).value);
    user.lng = parseFloat((newUserForm.lng as HTMLInputElement).value);
    if(user.email === email2){
        {           
            User.post(user).then(e =>{
                location.assign('login.html');
            });            
        }
    }

}

function loadImage(event: Event) : void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        userImagen.src  = reader.result as string;
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