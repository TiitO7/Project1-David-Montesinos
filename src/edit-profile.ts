import Swal from 'sweetalert2';
import { Auth } from './classes/auth.class';
import {User} from './classes/user.class';

let formProfile :  HTMLFormElement = null;
let formPhoto :  HTMLFormElement = null;
let formPassword :  HTMLFormElement = null;
const imgPreview = document.getElementById('imgPreview') as HTMLImageElement;
const imgPrincipal = document.getElementById('photo') as HTMLImageElement;
let btnLogOut :  HTMLElement= null;

function loadImage(event: Event) : void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        imgPreview.src  = reader.result as string;
        imgPreview.classList.remove('d-none');
    });
}
async function informationUser() : Promise<void>{
    User.getProfile().then(user =>{
        formProfile.nameUser.value = user.user.name;
        formProfile.email.value = user.user.email;
        formPhoto.photo.src = user.user.photo;
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

async function validateProfile(e : Event) : Promise<void> {
    e.preventDefault();
    const name = (formProfile.nameUser as HTMLInputElement).value.trim();
    const email = (formProfile.email as HTMLInputElement).value;
    User.saveProfile(name,email).then(data =>{
        return data;
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

async function validatePhoto(e : Event) : Promise<void> {
    e.preventDefault();    
    const img = (formPhoto.imgPreview as HTMLImageElement).src;
    imgPreview.classList.add('d-none');
    User.saveAvatar(img).then( data =>{
        return imgPrincipal.src = data.photo;
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
async function validatePassword(e : Event) : Promise<string> {
    e.preventDefault();
    const password = (formPassword.password as HTMLInputElement).value;
    const password2 = (formPassword.password2 as HTMLInputElement).value;
    if(password===password2){
        const data = await User.savePassword(password);
        formPassword.reset();
        return data;
    }else{
        Swal.fire({
            icon:'error',
            title:'Register Error',
            text: 'Error: The password doesnt equals'
        });
    }
}

window.addEventListener('DOMContentLoaded', async e => {
    e.preventDefault();

    if(localStorage.getItem('token')){
        formProfile = document.getElementById('form-profile') as HTMLFormElement;
        formPhoto = document.getElementById('form-photo') as HTMLFormElement;
        formPassword = document.getElementById('form-password') as HTMLFormElement;
        
        btnLogOut = document.getElementById('logout') as HTMLElement;
        btnLogOut.addEventListener('click', () => {
            Auth.logout();
            Auth.checkToken().catch(()=>location.assign('login.html'));
        }); 
        formPhoto.addEventListener('submit', validatePhoto);    
        formPhoto.image.addEventListener('change', loadImage) as string;
        formProfile.addEventListener('submit', validateProfile);
        formPassword.addEventListener('submit', validatePassword);
        await informationUser();
        
    }else{
        location.assign('login.html');
    }
});