import Swal from 'sweetalert2';
import { SERVER } from '../constants';
import { IUser } from '../interfaces/iuser';
import { UserResponse } from '../interfaces/responses';
import { Http } from './http.class';
const userTemplate: (user: IUser) => string = require('../../templates/profile.handlebars');

export class User implements IUser {
    name?: string;
    email: string;
    id?: number;
    password?: string;
    photo?: string;
    me?: boolean;
    lat?: number;
    lng?: number;


    static async getProfile(id?: number): Promise<UserResponse>{
        if(id){
            return Http.get(`${SERVER}/users/${id}`);
        }
        else{
            return Http.get(`${SERVER}/users/me`);
        }
    }
    static async saveProfile(name: string, email: string): Promise<User>{

        let user = new User () as User;
        user.email = email;
        user.name = name;
        return Http.put<User>(`${SERVER}/users/me`,user);
    }
    static async saveAvatar(avatar: string): Promise<void>{
        return Http.put<void>(`${SERVER}/users/photo`,avatar);
    }
    static async savePassword(password: string): Promise<string>{
        return Http.put<string>(`${SERVER}/users/password`,password);
    }

    static post(user:User) : Promise<string>{
        const resp : Promise<string> =  Http.post(`${SERVER}/auth/register`, user);
        return resp;
    }

    async delete() : Promise<void> {
        await Http.delete<void>(`${SERVER}/auth/login/${this.id}`);
    }


    toHTML() : HTMLTableRowElement {
        const card   = document.createElement('div') as HTMLTableRowElement;
        card.classList.add('card', 'shadow');

        const userJSON = {
            ...this, 

        };

        const userHTML = userTemplate(userJSON);
        card.innerHTML = userHTML;
        

        return card;
    }
}