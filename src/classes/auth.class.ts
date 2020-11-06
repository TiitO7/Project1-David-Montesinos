import { User } from './user.class';

export class Auth {

    static async checkToken(user : User) : Promise<void>{
        const token = localStorage.getItem('token');
        if(token){}else{
            location.assign('register.html');
        }
    }
}