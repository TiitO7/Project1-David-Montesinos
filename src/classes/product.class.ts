
import {Http} from './http.class';
import {SERVER} from '../constants';
import * as moment from 'moment';
import { IProduct } from '../interfaces/iproduct';
import { ICategory } from '../interfaces/icategory';
import { IPhoto } from '../interfaces/iphoto';
import { IUser } from '../interfaces/iuser';
const productsTemplate = require('../templates/product.handlebars');

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
  
    static async getAll() {
        const resp = await Http.get(`${SERVER}/products`);
        return resp.products.map(r => new Product(r));
    }

    async post() {
        const resp = await Http.post(`${SERVER}/products`, this);
        return new Product(resp.product);
    }

    async delete() {
        await Http.delete(`${SERVER}/products/${this.id}`);
    }

    toHTML() {
        let card = document.createElement("div");
        card.classList.add("card", "shadow");

        let prodJSON = {
            ...this, 
            category: this.category.name, 
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
