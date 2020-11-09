
import { Auth } from './classes/auth.class';
import { Http } from './classes/http.class';
import {User} from './classes/user.class';
import { SERVER } from './constants';
import { TokenResponse } from './interfaces/responses';

let container :  HTMLFormElement = null;
const search = '';

      


async function validateUser(event : Event) : Promise<void> {
    event.preventDefault();
    const obj : any = {email:(container.email as HTMLInputElement).value, password:(container.password as HTMLInputElement).value};
    const resp = await Http.post<TokenResponse>(SERVER + '/auth/login',obj);
    localStorage.setItem('token',resp.accessToken);
    if(localStorage.getItem("token")){
        location.assign('index.html');
    }
}


window.addEventListener('DOMContentLoaded', async e => {
    container = document.getElementById('form-login') as HTMLFormElement;

    container.addEventListener('submit', validateUser);
});