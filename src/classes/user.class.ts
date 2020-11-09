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


     
    static async getUser() : Promise<UserResponse> {
        const resp = await Http.get<UserResponse>(`${SERVER}/auth/login`);
        return resp;
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