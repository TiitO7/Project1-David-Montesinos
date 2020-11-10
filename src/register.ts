import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
import { Auth } from './classes/auth.class';
import { Geolocation } from './classes/geolocation.class';
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
            
            }).catch(e=> {
                const error : Promise<ErrorEvent> = e.json() as Promise<ErrorEvent>;
                error.then((y : any) =>{
                    let errors = 'Errors: ';
                    y.message.map.foEach((x : string)=>{
                        errors +=  x + '/n';
                    }),
                    Swal.fire({
                        icon:'error',
                        title:'Register Error',
                        text: errors
                    });
                });
            });            
        }
    }else{
        Swal.fire({
            icon:'error',
            title:'Register Error',
            text: 'Error: The emails doesnt match'
        });
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
async function getMyPosition(): Promise<any> {
    pos = await Geolocation.getLocation();
    newUserForm.lat.value = pos.latitude;
    newUserForm.lng.value = pos.longitude;
}

window.addEventListener('DOMContentLoaded', async e => {
    newUserForm = document.getElementById('form-register') as HTMLFormElement;
    errorMsg = document.getElementById('errorMsg');
    getMyPosition();
    newUserForm.avatar.addEventListener('change', loadImage) as string;
    

    newUserForm.addEventListener('submit', validateForm);
});