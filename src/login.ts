
import { Auth } from './classes/auth.class';
import { Geolocation } from './classes/geolocation.class';
import { Http } from './classes/http.class';
import {User} from './classes/user.class';
import { SERVER } from './constants';
import { IUser } from './interfaces/iuser';
import { TokenResponse, UserResponse } from './interfaces/responses';

let container :  HTMLFormElement = null;
const search = '';
let pos : any;

      
async function getMyPosition(user : IUser): Promise<void> {
    
    user.lat = pos.latitude;
    user.lng = pos.longitude;
}

async function validateUser(event : Event) : Promise<void> {
    event.preventDefault();
    const obj : IUser = {email:(container.email as HTMLInputElement).value, password:(container.password as HTMLInputElement).value};
    
    const authUpdate : Auth = new Auth(obj);
    authUpdate.email = (container.email as HTMLInputElement).value;
    authUpdate.password = (container.password as HTMLInputElement).value;
    pos = await Geolocation.getLocation();
    authUpdate.lat = pos.latitude;
    authUpdate.lng = pos.longitude;
    const resp : TokenResponse = await Http.post<TokenResponse>(SERVER + '/auth/login',authUpdate);

    localStorage.setItem('token',resp.accessToken);
    if(localStorage.getItem('token')){
        location.assign('index.html');
    }
}


window.addEventListener('DOMContentLoaded', async e => {
    localStorage.setItem('token','');
    container = document.getElementById('form-login') as HTMLFormElement;

    container.addEventListener('submit', validateUser);
});