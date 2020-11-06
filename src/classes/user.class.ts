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

    constructor(userJSON : IUser) {
        Object.assign(this, userJSON);    
    }
     
    static async getUser() : Promise<UserResponse> {
        const resp = await Http.get<UserResponse>(`${SERVER}/auth/login`);
        return resp;
    }

    async post() : Promise<User>{
        const resp = await Http.post<UserResponse>(`${SERVER}/auth/login`, this);
        return new User(resp.user);
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