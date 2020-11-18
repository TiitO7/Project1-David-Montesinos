
import { Auth } from './classes/auth.class';
import { Geolocation } from './classes/geolocation.class';
import { Http } from './classes/http.class';
import {User} from './classes/user.class';
import { SERVER } from './constants';
import { IUser } from './interfaces/iuser';
import { TokenResponse, UserResponse } from './interfaces/responses';

let formProfile :  HTMLFormElement = null;
let formPhoto :  HTMLFormElement = null;
let formPassword :  HTMLFormElement = null;
const search = '';
let pos : any;
const imagenPreview = document.getElementById('imgPreview') as HTMLImageElement;

      
async function getMyPosition(user : IUser): Promise<void> {
    
    user.lat = pos.latitude;
    user.lng = pos.longitude;
}
function loadImage(event: Event) : void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        imagenPreview.src  = reader.result as string;
    });
}

async function validateProfile(event : Event) : Promise<void> {
    const name = (formProfile.nameUser as HTMLInputElement).value.trim();
    const email = (formProfile.email as HTMLInputElement).value;
    await User.saveProfile(name,email);
}

/*async function validatePhoto(event : Event) : Promise<void> {
    

}*/
async function validatePassword(event : Event) : Promise<void> {
    const password = (formPassword.password as HTMLInputElement).value;
    const password2 = (formPassword.password2 as HTMLInputElement).value;
    if(password==password2){
        await User.savePassword(password);
    }
}

window.addEventListener('DOMContentLoaded', async e => {

    formProfile = document.getElementById('form-profile') as HTMLFormElement;
    formPhoto = document.getElementById('form-photo') as HTMLFormElement;
    formPassword = document.getElementById('form-password') as HTMLFormElement;

    formProfile.addEventListener('submit', validateProfile);

    formPhoto.image.addEventListener('change', loadImage) as string;
    //formPhoto.addEventListener('submit', validatePhoto);

    formPassword.addEventListener('submit', validatePassword);
});