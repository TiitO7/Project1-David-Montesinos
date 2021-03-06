
import {Http} from './http.class';
import {SERVER} from '../constants';
import * as moment from 'moment';
import { IProduct } from '../interfaces/iproduct';
import { ICategory } from '../interfaces/icategory';
import { IPhoto } from '../interfaces/iphoto';
import { IUser } from '../interfaces/iuser';
import { ProductResponse, ProductsResponse } from '../interfaces/responses';
import Swal from 'sweetalert2';
const productsTemplate: (prod: IProduct) => string = require('../../templates/product.handlebars');

export class Product implements IProduct {

    id?: number;
    title: string;
    description: string;
    price: number;
    mainPhoto: string;
    owner?: IUser;
    numVisits?: number;
    category: number | ICategory;
    mine?: boolean;
    photos?: IPhoto;
    datePublished?: string;
    distance?: number;

    constructor(prodJSON : IProduct) {
        Object.assign(this, prodJSON);    
    }
  
    static async getAll() : Promise<Product[]> {
        const resp = await Http.get<ProductsResponse>(`${SERVER}/products`);
        return resp.products.map(r => new Product(r));
    }

    static async getProduct(id : number): Promise<any>{
        const resp = await Http.get<ProductResponse>(`${SERVER}/products/${id}`);
        return resp;
    }

    async post() : Promise<Product>{
        const resp = await Http.post<ProductResponse>(`${SERVER}/products`, this);
        return new Product(resp.product);
    }

    async delete() : Promise<void> {
        await Http.delete<void>(`${SERVER}/products/${this.id}`);
    }

    toHTML() : HTMLTableRowElement {
        const card   = document.createElement('div') as HTMLTableRowElement;
        card.classList.add('card', 'shadow');

        const prodJSON = {
            ...this,
            category: (this.category as ICategory).name, 
            datePublished: moment(this.datePublished).fromNow()
        };

        const prodHTML = productsTemplate(prodJSON);
        card.innerHTML = prodHTML;

        if(this.mine){
            const btnDelete:HTMLElement = card.querySelector('button.btn');
            btnDelete.addEventListener('click', e =>{
                this.delete().then(i => card.remove()).catch(error =>
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Error',
                        text: error
                    }));
            });

        }

        return card;
    }
}
