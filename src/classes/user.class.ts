import { SERVER } from '../constants';
import { IUser } from '../interfaces/iuser';
import { UserResponse } from '../interfaces/responses';
import { Http } from './http.class';

export class User implements IUser {
    name?: string;
    email: string;
    id?: number;
    password?: string;
    photo?: string;
    me?: boolean;
    lat?: number;
    lng?: number;

    static async getProfile(id?: number): Promise<User>{
        return null;
    }
    static async saveProfile(name: string, email: string): Promise<void>{
        return null;
    }
    async saveAvatar(avatar: string): Promise<string>{
        return null;
    }
    static async savePassword(password: string): Promise<void>{
        return null;
    }

    static post(user:User) : Promise<string>{
        const resp : Promise<string> =  Http.post(`${SERVER}/auth/register`, user);
        return resp;
    }

    async delete() : Promise<void> {
        await Http.delete<void>(`${SERVER}/auth/login/${this.id}`);
    }
}

/*toHTML() : HTMLTableRowElement {
        const card   = document.createElement('div') as HTMLTableRowElement;
        card.classList.add('card', 'shadow');

        const prodJSON = {
            ...this, 
            category: this.category.toString, 
            datePublished: moment(this.datePublished).fromNow()
        };

        const prodHTML = productsTemplate(prodJSON);
        card.innerHTML = prodHTML;

        if(card.querySelector('btn btn-outline-danger btn-sm')!==null){
            card.querySelector('btn btn-outline-danger btn-sm').addEventListener('click', async e => {
                await this.delete();
                card.remove();
            });
        }      

        return card;
    }*/