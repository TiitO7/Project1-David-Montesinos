
import {Http} from './http.class';
import {SERVER} from '../constants';
import * as moment from 'moment';
import { IProduct } from '../interfaces/iproduct';
import { ICategory } from '../interfaces/icategory';
import { IPhoto } from '../interfaces/iphoto';
import { IUser } from '../interfaces/iuser';
import { ProductResponse, ProductsResponse } from '../interfaces/responses';
const productsTemplate: (prod: IProduct) => string = require('../templates/product.handlebars');

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

    async post() : Promise<Product>{
        const resp = await Http.post<ProductResponse>(`${SERVER}/products`, this);
        return new Product(resp.product);
    }

    async delete() : Promise<void> {
        await Http.delete<void>(`${SERVER}/products/${this.id}`);
    }

    toHTML() : HTMLTableRowElement {
        let card   = document.createElement("div") as HTMLTableRowElement;
        card.classList.add("card", "shadow");

        let prodJSON = {
            ...this, 
            category: this.category.name as string , 
            datePublished: moment(this.datePublished).fromNow()
        };

        let prodHTML = productsTemplate(prodJSON);
        card.innerHTML = prodHTML;

        card.querySelector(".card-body .btn-danger").addEventListener('click', async e => {
            await this.delete();
            card.remove();
        });

        return card;
    }
}