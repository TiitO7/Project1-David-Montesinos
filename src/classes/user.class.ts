import Swal from 'sweetalert2';
import { SERVER } from '../constants';
import { IUser } from '../interfaces/iuser';
import { PhotoResponse, UserResponse } from '../interfaces/responses';
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
    static async saveProfile(name: string, email: string): Promise<void>{
        const data = await Http.put<void>(`${SERVER}/users/me`,{name,email});
        return data;
    }
    static async saveAvatar(photo: string): Promise<PhotoResponse>{
        const data = await Http.put<PhotoResponse>(`${SERVER}/users/me/photo`,{photo:photo});
        return data;
    }
    static async savePassword(password: string): Promise<string>{
        const data= await Http.put<string>(`${SERVER}/users/me/password`,{password});
        return data;
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